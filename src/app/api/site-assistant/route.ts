import { createHash } from "crypto";
import { buildSiteAssistantSystemPrompt } from "@/lib/site-assistant-system-prompt";
import { CHAT_LIMIT_REPLY, CHAT_TOXIC_REPLY, isLikelyAbusiveUserText } from "@/lib/site-assistant-chat-policy";
import { logger } from "@/lib/logger";
import { rateLimitOrThrow } from "@/lib/rate-limit";
import { appendAssistantMessage, resolveAssistantThread } from "@/lib/site-assistant-persist";
import { verifyTurnstileToken } from "@/lib/verify-turnstile";

export const runtime = "nodejs";

const UPSTREAM_FETCH_MS = 75_000;
const MAX_MESSAGES = 18;
const MAX_USER_CHARS = 3500;
const MAX_ASSISTANT_CHARS = 12_000;

type ChatRole = "user" | "assistant" | "system";
type IncomingMessage = { role: string; content: unknown };

type SiteAssistantBody = {
  messages?: unknown;
  threadId?: unknown;
  locale?: unknown;
  aiConsent?: unknown;
  turnstileToken?: unknown;
};

function getClientIp(req: Request): string {
  const xf = req.headers.get("x-forwarded-for");
  if (xf) {
    const first = xf.split(",")[0]?.trim();
    if (first) return first;
  }
  return req.headers.get("x-real-ip") ?? "unknown";
}

function ipFingerprint(ip: string): string {
  return createHash("sha256").update(ip).digest("hex").slice(0, 20);
}

function streamPlainText(text: string): Response {
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(text));
      controller.close();
    },
  });
  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function isChatMessage(x: unknown): x is { role: ChatRole; content: string } {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  if (o.role !== "user" && o.role !== "assistant") return false;
  if (typeof o.content !== "string") return false;
  return true;
}

function jsonError(error: string, status: number, extra?: Record<string, unknown>) {
  return Response.json({ error, ...extra }, { status });
}

export async function POST(req: Request) {
  const apiKey = process.env.DEEPSEEK_API_KEY?.trim();

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonError("invalid_json", 400);
  }
  if (!body || typeof body !== "object") return jsonError("invalid_body", 400);

  const b = body as SiteAssistantBody;
  const rawMessages = b.messages;
  if (!Array.isArray(rawMessages) || rawMessages.length === 0) return jsonError("messages_required", 400);

  if (b.aiConsent !== true) {
    return jsonError("consent_required", 400);
  }

  const ip = getClientIp(req);
  const turn = await verifyTurnstileToken(typeof b.turnstileToken === "string" ? b.turnstileToken : undefined, ip);
  if (!turn.ok) {
    if (turn.reason === "missing_token") return jsonError("turnstile_required", 400);
    return jsonError("turnstile_invalid", 400);
  }

  const sliced = rawMessages.slice(-MAX_MESSAGES) as IncomingMessage[];
  const messages: { role: ChatRole; content: string }[] = [];

  for (const m of sliced) {
    if (!isChatMessage(m)) return jsonError("invalid_message_shape", 400);
    if (m.role === "user" && m.content.length > MAX_USER_CHARS) return jsonError("user_message_too_long", 400);
    if (m.role === "assistant" && m.content.length > MAX_ASSISTANT_CHARS) return jsonError("assistant_message_too_long", 400);
    messages.push({ role: m.role, content: m.content });
  }

  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUser) return jsonError("messages_required", 400);

  try {
    await rateLimitOrThrow({ ip, route: "site-assistant:15m", limit: 10, windowSec: 900 });
    await rateLimitOrThrow({ ip, route: "site-assistant:1h", limit: 48, windowSec: 3600 });
    await rateLimitOrThrow({ ip, route: "site-assistant:24h", limit: 150, windowSec: 86_400 });
  } catch (e) {
    if (e instanceof Error && e.message === "RATE_LIMITED") {
      return streamPlainText(CHAT_LIMIT_REPLY);
    }
    logger.error({ err: e, msg: "site_assistant_rate_limit_error" });
    return jsonError("rate_limit_unavailable", 503);
  }

  if (isLikelyAbusiveUserText(lastUser.content)) {
    return streamPlainText(CHAT_TOXIC_REPLY);
  }

  if (!apiKey) return jsonError("assistant_unconfigured", 503);

  const ipHash = ipFingerprint(ip);
  const locale = typeof b.locale === "string" && b.locale.length > 0 ? b.locale.slice(0, 16) : "ru";
  const threadIdFromClient = typeof b.threadId === "string" && b.threadId.length > 0 ? b.threadId : undefined;

  const resolved = await resolveAssistantThread(threadIdFromClient, ipHash, locale);
  if (resolved) {
    await appendAssistantMessage(resolved.threadId, "user", lastUser.content);
  }

  logger.info({
    msg: "site_assistant_turn",
    ipSha: ipHash,
    userChars: lastUser.content.length,
    historyPairs: messages.length,
    threadPersisted: !!resolved,
  });

  const systemPrompt = buildSiteAssistantSystemPrompt();
  const outbound = [{ role: "system" as const, content: systemPrompt }, ...messages];

  const model = process.env.DEEPSEEK_MODEL?.trim() || "deepseek-chat";
  const baseUrl = (process.env.DEEPSEEK_API_BASE?.trim() || "https://api.deepseek.com").replace(/\/$/, "");
  const url = `${baseUrl}/chat/completions`;

  let upstream: Response;
  try {
    const signal = AbortSignal.timeout(UPSTREAM_FETCH_MS);
    upstream = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model,
        messages: outbound,
        temperature: 0.4,
        max_tokens: 1200,
        stream: true,
      }),
      signal,
    });
  } catch (e) {
    const name = e instanceof Error ? e.name : "";
    if (name === "TimeoutError" || name === "AbortError") return jsonError("upstream_timeout", 504);
    return jsonError("upstream_unreachable", 502);
  }

  if (!upstream.ok) {
    const text = await upstream.text().catch(() => "");
    logger.warn({ msg: "site_assistant_upstream_http", status: upstream.status, detail: text.slice(0, 200) });
    return jsonError("upstream_error", 502, { status: upstream.status, detail: text.slice(0, 400) });
  }

  if (!upstream.body) return jsonError("upstream_no_body", 502);

  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();
  const persistId = resolved?.threadId;
  let assistantAcc = "";
  let assistantPersisted = false;

  const persistAssistantOnce = async () => {
    if (assistantPersisted) return;
    assistantPersisted = true;
    if (persistId && assistantAcc.trim()) {
      await appendAssistantMessage(persistId, "assistant", assistantAcc);
    }
  };

  const stream = new ReadableStream({
    async pull(controller) {
      let buf = "";
      let streamDone = false;
      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) {
          streamDone = true;
          await persistAssistantOnce();
          controller.close();
          return;
        }

        buf += decoder.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith("data: ")) continue;
          const payload = trimmed.slice(6);
          if (payload === "[DONE]") {
            await persistAssistantOnce();
            controller.close();
            return;
          }
          try {
            const parsed = JSON.parse(payload) as {
              choices?: { delta?: { content?: string } }[];
            };
            const chunk = parsed.choices?.[0]?.delta?.content;
            if (chunk) {
              assistantAcc += chunk;
              controller.enqueue(new TextEncoder().encode(chunk));
            }
          } catch {
            // skip malformed chunks
          }
        }
      }
    },
    cancel() {
      reader.cancel().catch(() => {});
    },
  });

  const headers: Record<string, string> = {
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "no-cache",
    "X-Content-Type-Options": "nosniff",
  };
  if (resolved?.threadId) {
    headers["X-Assistant-Thread-Id"] = resolved.threadId;
  }

  return new Response(stream, { headers });
}
