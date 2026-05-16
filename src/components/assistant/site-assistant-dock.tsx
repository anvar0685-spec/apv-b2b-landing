"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "@/i18n/navigation";
import { trackEvent } from "@/lib/analytics";
import { linkifyBarePathsForMarkdown, sameSitePathOrNull } from "@/lib/site-assistant-linkify";
import { cn } from "@/lib/utils";

const THREAD_KEY = "apv-site-assistant-thread-v1";
const AI_CHAT_CONSENT_LS = "apv-ai-chat-consent-v1";
const CLIENT_CHAT_MS = 88_000;
const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

type Role = "user" | "assistant";
type Msg = { id: string; role: Role; content: string };

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function SiteAssistantDock() {
  const t = useTranslations("siteAssistant");
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const panelId = useId();
  const chatTitleId = useId();
  const disclaimerId = useId();
  const aiConsentId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const turnstileRef = useRef<TurnstileInstance | null>(null);

  const welcomeBubble: Msg = useMemo(
    () => ({
      id: "welcome",
      role: "assistant",
      content: t("chatWelcome"),
    }),
    [t],
  );

  const [chatOpen, setChatOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([welcomeBubble]);
  const [pending, setPending] = useState(false);
  const [streamingId, setStreamingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [aiConsent, setAiConsent] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem(AI_CHAT_CONSENT_LS) === "1") setAiConsent(true);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    setMessages((prev) => {
      const rest = prev.filter((m) => m.id !== "welcome");
      return [welcomeBubble, ...rest];
    });
  }, [welcomeBubble]);

  useEffect(() => {
    if (!chatOpen) return;
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, chatOpen, pending]);

  const scrollDown = useCallback(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  const resetChat = useCallback(() => {
    setMessages([welcomeBubble]);
    setError(null);
    setInput("");
    try {
      sessionStorage.removeItem(THREAD_KEY);
    } catch {
      /* ignore */
    }
    setTurnstileToken(null);
    turnstileRef.current?.reset();
    void trackEvent("site_assistant_new_chat", {});
  }, [welcomeBubble]);

  useEffect(() => {
    if (!chatOpen || !panelRef.current) return;
    const focusTimer = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLTextAreaElement>("textarea")?.focus();
    }, 40);

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !panelRef.current?.contains(e.target as Node)) return;
      const root = panelRef.current;
      const focusables = Array.from(
        root.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => !el.hasAttribute("hidden") && el.tabIndex !== -1);
      if (focusables.length === 0) return;
      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;
      if (e.shiftKey) {
        if (e.target === first) {
          e.preventDefault();
          last.focus();
        }
      } else if (e.target === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey, true);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKey, true);
    };
  }, [chatOpen]);

  const mdComponents: Components = useMemo(
    () => ({
      p: ({ children }) => (
        <p className="mb-2 text-[13px] leading-relaxed text-[var(--neutral-700)] last:mb-0 dark:text-slate-300">
          {children}
        </p>
      ),
      ul: ({ children }) => (
        <ul className="mb-2 list-disc pl-4 text-[13px] text-[var(--neutral-700)] last:mb-0 dark:text-slate-300">
          {children}
        </ul>
      ),
      ol: ({ children }) => (
        <ol className="mb-2 list-decimal pl-4 text-[13px] text-[var(--neutral-700)] last:mb-0 dark:text-slate-300">
          {children}
        </ol>
      ),
      li: ({ children }) => <li className="my-0.5">{children}</li>,
      a: ({ href, children }) => {
        const internal = sameSitePathOrNull(href ?? undefined);
        if (internal) {
          return (
            <Link
              href={internal as never}
              className="font-medium text-[var(--accent)] underline decoration-[var(--accent)]/35 underline-offset-2 hover:decoration-[var(--accent)]/70"
              onClick={() => void trackEvent("site_assistant_markdown_link", { href: internal })}
            >
              {children}
            </Link>
          );
        }
        return (
          <a
            href={href}
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            className="font-medium text-[var(--accent)] underline decoration-[var(--accent)]/35 underline-offset-2 hover:decoration-[var(--accent)]/70"
          >
            {children}
          </a>
        );
      },
      strong: ({ children }) => (
        <strong className="font-semibold text-[var(--primary)] dark:text-slate-100">{children}</strong>
      ),
      h2: ({ children }) => (
        <h2 className="mb-1 mt-2 font-display text-base font-semibold text-[var(--primary)] dark:text-white">{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className="mb-1 mt-2 font-display text-sm font-semibold text-[var(--primary)] dark:text-slate-100">{children}</h3>
      ),
    }),
    [],
  );

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || pending) return;
    if (!aiConsent) {
      setError(t("errConsentRequired"));
      return;
    }
    if (turnstileSiteKey && !turnstileToken) {
      setError(t("errTurnstileRequired"));
      return;
    }
    setInput("");
    setError(null);
    const userMsg: Msg = { id: uid(), role: "user", content: text };
    setMessages((m) => [...m, userMsg]);
    setPending(true);

    const history = [...messages.filter((x) => x.id !== "welcome"), userMsg].map(({ role, content }) => ({
      role,
      content,
    }));

    const ac = new AbortController();
    const kill = window.setTimeout(() => ac.abort(), CLIENT_CHAT_MS);
    const assistantId = uid();

    let threadId: string | undefined;
    try {
      threadId = sessionStorage.getItem(THREAD_KEY) ?? undefined;
    } catch {
      threadId = undefined;
    }

    try {
      const res = await fetch("/api/site-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.length ? history : [{ role: "user" as const, content: text }],
          threadId,
          locale,
          aiConsent: true,
          turnstileToken: turnstileToken ?? undefined,
        }),
        signal: ac.signal,
      });

      try {
        const tid = res.headers.get("x-assistant-thread-id");
        if (tid) sessionStorage.setItem(THREAD_KEY, tid);
      } catch {
        /* ignore */
      }

      const ct = res.headers.get("content-type") ?? "";
      const isStream = ct.includes("text/plain");

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        if (res.status === 400 && data.error === "consent_required") {
          setError(t("errConsentRequired"));
        } else if (res.status === 400 && data.error === "turnstile_required") {
          setError(t("errTurnstileRequired"));
        } else if (res.status === 400 && data.error === "turnstile_invalid") {
          setError(t("errTurnstileInvalid"));
        } else if (res.status === 503 && data.error === "assistant_unconfigured") {
          setError(t("errUnconfigured"));
        } else if (res.status === 503 && data.error === "rate_limit_unavailable") {
          setError(t("rateLimitServer"));
        } else if (res.status === 504) {
          setError(t("errTimeout"));
        } else if (res.status === 502 && data.error === "upstream_error") {
          setError(t("errUpstream"));
        } else {
          setError(t("errGeneric"));
        }
        return;
      }

      if (isStream && res.body) {
        setStreamingId(assistantId);
        setMessages((m) => [...m, { id: assistantId, role: "assistant", content: "" }]);

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";

        let streamDone = false;
        while (!streamDone) {
          const { done, value } = await reader.read();
          if (done) {
            streamDone = true;
            break;
          }
          acc += decoder.decode(value, { stream: true });
          const snapshot = acc;
          setMessages((prev) => prev.map((m) => (m.id === assistantId ? { ...m, content: snapshot } : m)));
          scrollDown();
        }

        if (!acc.trim()) {
          setMessages((prev) => prev.filter((m) => m.id !== assistantId));
          setError(t("errEmpty"));
        }
        setStreamingId(null);
      } else {
        setError(t("errGeneric"));
      }
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") {
        setError(t("errAbort"));
      } else {
        setError(t("errNetwork"));
      }
    } finally {
      window.clearTimeout(kill);
      setPending(false);
      setStreamingId(null);
      if (turnstileSiteKey) {
        setTurnstileToken(null);
        turnstileRef.current?.reset();
      }
    }
  }, [aiConsent, input, locale, messages, pending, scrollDown, t, turnstileToken]);

  useEffect(() => {
    if (!chatOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setChatOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [chatOpen]);

  // Скрываем док пока виден cookie banner — он перекрывал бы FAB на мобильном.
  const [dockHidden, setDockHidden] = useState(false);
  useEffect(() => {
    const onHide = (e: Event) => {
      const ce = e as CustomEvent<{ hidden?: boolean }>;
      setDockHidden(!!ce.detail?.hidden);
    };
    window.addEventListener("apv-floating-docks", onHide as EventListener);
    return () => window.removeEventListener("apv-floating-docks", onHide as EventListener);
  }, []);

  if (dockHidden) return null;

  return (
    <>
      <div className="pointer-events-none fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-[max(1.25rem,env(safe-area-inset-left))] z-[55] flex flex-col items-start sm:bottom-8 sm:left-8">
        <AnimatePresence>
          {chatOpen ? (
            <motion.div
              key="panel"
              ref={panelRef}
              id={panelId}
              role="dialog"
              aria-modal="true"
              aria-labelledby={chatTitleId}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "pointer-events-auto mb-3 flex min-h-0 w-[min(100vw-2.5rem,22rem)] max-h-[min(86dvh,34rem)] flex-col overflow-hidden rounded-2xl border shadow-lg backdrop-blur-md sm:w-[min(100vw-4rem,26rem)]",
                "border-[var(--neutral-200)]/90 bg-[var(--card)]/98",
                "dark:border-white/10 dark:bg-[color-mix(in_srgb,var(--primary-dark)_94%,var(--surface))]/98 dark:shadow-[0_20px_50px_-18px_rgba(0,0,0,0.5)]",
              )}
            >
              <div className="flex shrink-0 items-center justify-between border-b border-[var(--neutral-200)]/90 px-4 py-3 dark:border-white/10">
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--neutral-500)] dark:text-slate-400">
                    {t("statusOnline")}
                  </p>
                  <p id={chatTitleId} className="font-display text-sm font-bold text-[var(--primary)] dark:text-white">
                    {t("chatTitle")}
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={resetChat}
                    disabled={pending}
                    className="rounded-lg border border-[var(--neutral-200)] bg-[var(--surface)]/90 px-2.5 py-1 text-xs font-medium text-[var(--neutral-700)] transition hover:border-[var(--accent)] hover:text-[var(--primary)] disabled:opacity-40 dark:border-white/12 dark:bg-white/5 dark:text-slate-300 dark:hover:border-[var(--accent)]"
                  >
                    {t("newChat")}
                  </button>
                  <Link
                    href="/kontakty"
                    className="rounded-lg border border-[var(--neutral-200)] bg-[var(--surface)]/90 px-2.5 py-1 text-xs font-medium text-[var(--neutral-700)] transition hover:border-[var(--neutral-400)] dark:border-white/12 dark:bg-white/5 dark:text-slate-300 dark:hover:border-white/25"
                    onClick={() => void trackEvent("site_assistant_header_contacts", {})}
                  >
                    {t("contacts")}
                  </Link>
                  <button
                    type="button"
                    onClick={() => setChatOpen(false)}
                    className="rounded-lg border border-[var(--neutral-200)] bg-[var(--surface)]/80 px-2.5 py-1 text-xs text-[var(--neutral-700)] transition hover:border-[var(--neutral-500)] dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-white/20"
                  >
                    {t("closeShort")}
                  </button>
                </div>
              </div>

              <div
                ref={listRef}
                role="region"
                aria-label={t("messagesRegion")}
                aria-busy={pending || !!streamingId}
                className="min-h-0 flex-1 max-h-[min(52dvh,22rem)] space-y-3 overflow-y-auto overscroll-contain px-4 py-3 sm:max-h-[min(54dvh,24rem)]"
              >
                {messages.map((m) => (
                  <div key={m.id} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                    <div
                      className={cn(
                        "max-w-[92%] rounded-xl px-3 py-2 text-sm leading-relaxed shadow-sm",
                        m.role === "user"
                          ? "border border-[var(--neutral-200)] bg-[var(--surface)] text-[var(--primary)] dark:border-white/12 dark:bg-white/[0.08] dark:text-slate-100"
                          : "border border-[var(--neutral-200)]/80 bg-[var(--surface)]/95 dark:border-white/10 dark:bg-white/[0.06]",
                      )}
                    >
                      {m.role === "assistant" ? (
                        <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                          {linkifyBarePathsForMarkdown(m.content || "…")}
                        </ReactMarkdown>
                      ) : (
                        <p className="whitespace-pre-wrap text-[var(--primary)] dark:text-slate-100">{m.content}</p>
                      )}
                    </div>
                  </div>
                ))}
                {pending && !streamingId ? (
                  <div className="flex justify-start">
                    <div className="rounded-xl border border-[var(--neutral-200)] bg-[var(--surface)] px-3 py-2 font-mono text-[11px] text-[var(--neutral-500)] dark:border-white/10 dark:bg-white/5">
                      {t("connecting")}
                    </div>
                  </div>
                ) : null}
                {error ? (
                  <div className="space-y-2">
                    <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-950 dark:text-amber-100/95">
                      {error}
                    </p>
                    <Link
                      href="/kontakty"
                      className="block w-full rounded-xl border border-[var(--accent)]/35 bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] py-2 text-center text-xs font-medium text-[var(--accent)]"
                    >
                      {t("errCtaContacts")}
                    </Link>
                  </div>
                ) : null}
              </div>

              <div className="shrink-0 border-t border-[var(--neutral-200)]/90 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] dark:border-white/10">
                {turnstileSiteKey ? (
                  <div className="mb-2 flex justify-center">
                    <Turnstile
                      ref={turnstileRef}
                      siteKey={turnstileSiteKey}
                      options={{ size: "flexible" }}
                      onSuccess={(tok) => setTurnstileToken(tok)}
                      onExpire={() => setTurnstileToken(null)}
                      onError={() => setTurnstileToken(null)}
                    />
                  </div>
                ) : null}
                <label htmlFor={aiConsentId} className="mb-2 flex cursor-pointer gap-2 text-[11px] leading-snug text-[var(--neutral-600)] dark:text-slate-400">
                  <input
                    id={aiConsentId}
                    type="checkbox"
                    checked={aiConsent}
                    onChange={(e) => {
                      const v = e.target.checked;
                      setAiConsent(v);
                      try {
                        if (v) localStorage.setItem(AI_CHAT_CONSENT_LS, "1");
                        else localStorage.removeItem(AI_CHAT_CONSENT_LS);
                      } catch {
                        /* ignore */
                      }
                      if (v) setError(null);
                    }}
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded border-[var(--neutral-300)] text-[var(--accent)] focus:ring-[var(--accent)]/40 dark:border-white/25"
                  />
                  <span>
                    {t("aiConsentLabel")}
                    <Link
                      href="/politika-konfidencialnosti"
                      className="font-medium text-[var(--accent)] underline-offset-2 hover:underline"
                      onClick={() => void trackEvent("site_assistant_policy_link", {})}
                    >
                      {t("aiConsentPolicyLink")}
                    </Link>
                    {t("aiConsentLabelEnd")}
                  </span>
                </label>
                <div className="flex gap-2">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        void send();
                      }
                    }}
                    rows={2}
                    placeholder={t("placeholder")}
                    aria-label={t("inputLabel")}
                    aria-describedby={`${disclaimerId} ${aiConsentId}`}
                    className={cn(
                      "min-h-[2.75rem] flex-1 resize-none rounded-xl border px-3 py-2 text-base placeholder:text-[var(--neutral-500)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/35 sm:text-sm",
                      "border-[var(--neutral-200)] bg-[var(--background)] text-[var(--primary)]",
                      "dark:border-white/12 dark:bg-[var(--primary-dark)] dark:text-slate-100",
                    )}
                    disabled={pending}
                  />
                  <button
                    type="button"
                    onClick={() => void send()}
                    disabled={pending || !input.trim()}
                    className="shrink-0 self-end rounded-xl border border-[var(--neutral-300)] bg-[var(--primary)] px-3.5 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-40 dark:border-white/20 dark:bg-slate-100 dark:text-[var(--primary)]"
                  >
                    {t("send")}
                  </button>
                </div>
                <div id={disclaimerId} className="mt-2 space-y-1 text-[10px] leading-relaxed text-[var(--neutral-500)]">
                  <p>
                    {t("disclaimer")}{" "}
                    <Link href="/zayavka" className="text-[var(--accent)] underline-offset-2 hover:underline">
                      {t("disclaimerLead")}
                    </Link>
                  </p>
                  <p>{t("disclaimerAi")}</p>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <motion.button
          type="button"
          layout
          onClick={() => {
            setChatOpen((v) => !v);
            void trackEvent("site_assistant_fab_toggle", { open: !chatOpen });
          }}
          aria-expanded={chatOpen}
          aria-controls={chatOpen ? panelId : undefined}
          whileHover={reduceMotion ? undefined : { scale: 1.03 }}
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          className={cn(
            "pointer-events-auto relative flex h-11 w-11 items-center justify-center rounded-full border text-[var(--primary)] shadow-md transition sm:h-12 sm:w-12",
            "border-[var(--neutral-200)]/95 bg-[var(--card)]/95 backdrop-blur-sm dark:border-white/12 dark:bg-[var(--primary-dark)]/92 dark:text-slate-100",
            "hover:border-[var(--neutral-300)] hover:shadow-lg dark:hover:border-white/20",
          )}
        >
          <MessageCircle className="h-5 w-5 opacity-80 sm:h-5 sm:w-5" aria-hidden />
          <span className="sr-only">{chatOpen ? t("fabClose") : t("fabOpen")}</span>
        </motion.button>
      </div>
    </>
  );
}
