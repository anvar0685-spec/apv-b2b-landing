/**
 * Cloudflare Turnstile server-side verify.
 * Если `TURNSTILE_SECRET_KEY` не задан — проверка отключена (виджет на клиенте тоже не обязателен).
 */
export async function verifyTurnstileToken(token: string | undefined, remoteIp: string): Promise<{ ok: true } | { ok: false; reason: "missing_token" | "invalid" }> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) return { ok: true };

  if (!token?.trim()) return { ok: false, reason: "missing_token" };

  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", token.trim());
  if (remoteIp && remoteIp !== "unknown") body.set("remoteip", remoteIp);

  let res: Response;
  try {
    res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    return { ok: false, reason: "invalid" };
  }

  if (!res.ok) return { ok: false, reason: "invalid" };

  const data = (await res.json().catch(() => null)) as { success?: boolean } | null;
  if (!data?.success) return { ok: false, reason: "invalid" };
  return { ok: true };
}
