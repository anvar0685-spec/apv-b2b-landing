"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Sparkles, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "@/i18n/navigation";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const WELCOME_SESSION_KEY = "apv-session-assistant-welcome-v1";
const CLIENT_CHAT_MS = 88_000;

type Role = "user" | "assistant";
type Msg = { id: string; role: Role; content: string };

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function SiteAssistantDock() {
  const t = useTranslations("siteAssistant");
  const panelId = useId();
  const welcomeTitleId = useId();
  const listRef = useRef<HTMLDivElement>(null);

  const welcomeBubble: Msg = useMemo(
    () => ({
      id: "welcome",
      role: "assistant",
      content: t("chatWelcome"),
    }),
    [t],
  );

  const [welcomeOpen, setWelcomeOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([welcomeBubble]);
  const [pending, setPending] = useState(false);
  const [streamingId, setStreamingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(WELCOME_SESSION_KEY)) setWelcomeOpen(true);
    } catch {
      setWelcomeOpen(true);
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

  const dismissWelcome = useCallback(() => {
    try {
      sessionStorage.setItem(WELCOME_SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
    setWelcomeOpen(false);
    void trackEvent("site_assistant_welcome_dismiss", { source: "modal" });
  }, []);

  const openChatFromWelcome = useCallback(() => {
    dismissWelcome();
    setChatOpen(true);
    void trackEvent("site_assistant_welcome_to_chat", {});
  }, [dismissWelcome]);

  const scrollDown = useCallback(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

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
      a: ({ href, children }) => (
        <a
          href={href}
          target={href?.startsWith("http") ? "_blank" : undefined}
          rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
          className="font-medium text-[var(--accent)] underline decoration-[var(--accent)]/35 underline-offset-2 hover:decoration-[var(--accent)]/70"
        >
          {children}
        </a>
      ),
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

    try {
      const res = await fetch("/api/site-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.length ? history : [{ role: "user" as const, content: text }],
        }),
        signal: ac.signal,
      });

      const ct = res.headers.get("content-type") ?? "";
      const isStream = ct.includes("text/plain");

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        if (res.status === 503 && data.error === "assistant_unconfigured") {
          setError(t("errUnconfigured"));
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
    }
  }, [input, messages, pending, scrollDown, t]);

  useEffect(() => {
    if (!chatOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setChatOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [chatOpen]);

  useEffect(() => {
    if (!welcomeOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismissWelcome();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [welcomeOpen, dismissWelcome]);

  return (
    <>
      <AnimatePresence>
        {welcomeOpen ? (
          <motion.div
            key="welcome"
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] flex items-end justify-center bg-black/45 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-[2px] sm:items-center"
            onClick={dismissWelcome}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={welcomeTitleId}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.99 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "relative w-full max-w-md overflow-hidden rounded-2xl border shadow-2xl",
                "border-[var(--neutral-200)]/95 bg-[var(--card)]",
                "dark:border-white/12 dark:bg-[color-mix(in_srgb,var(--primary-dark)_88%,var(--surface))]",
              )}
            >
              <div
                className={cn(
                  "pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full blur-3xl",
                  "bg-[color-mix(in_srgb,var(--accent)_35%,transparent)] opacity-90",
                )}
                aria-hidden
              />
              <div className="relative border-b border-[var(--neutral-200)]/80 px-5 pb-4 pt-5 dark:border-white/10">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--accent)_22%,var(--card))] text-[var(--accent)] ring-1 ring-[var(--accent)]/25 dark:bg-[color-mix(in_srgb,var(--accent)_18%,transparent)]">
                      <Sparkles className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <p className="type-kicker text-[var(--accent)]">{t("welcomeKicker")}</p>
                      <h2 id={welcomeTitleId} className="font-display text-lg font-bold tracking-tight text-[var(--primary)] dark:text-white">
                        {t("welcomeTitle")}
                      </h2>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={dismissWelcome}
                    className="rounded-lg p-2 text-[var(--neutral-500)] transition hover:bg-[var(--surface)] hover:text-[var(--primary)] dark:hover:bg-white/10 dark:hover:text-white"
                    aria-label={t("close")}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[var(--neutral-700)] dark:text-slate-300">{t("welcomeBody")}</p>
              </div>
              <div className="relative flex flex-col gap-2 px-5 py-4">
                <button
                  type="button"
                  onClick={openChatFromWelcome}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--accent)]/25 transition hover:opacity-[0.96]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  {t("welcomeCtaChat")}
                </button>
                <Link
                  href="/kalkulyator"
                  onClick={dismissWelcome}
                  className="inline-flex w-full items-center justify-center rounded-xl border border-[var(--neutral-200)] bg-[var(--surface)] px-4 py-3 text-center text-sm font-medium text-[var(--primary)] transition hover:border-[var(--accent)] dark:border-white/15 dark:bg-white/5 dark:text-slate-100 dark:hover:border-[var(--accent)]"
                >
                  {t("welcomeCtaCalc")}
                </Link>
                <Link
                  href="/zayavka"
                  onClick={dismissWelcome}
                  className="inline-flex w-full items-center justify-center rounded-xl border border-transparent px-4 py-2.5 text-center text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline"
                >
                  {t("welcomeCtaLead")}
                </Link>
                <button
                  type="button"
                  onClick={dismissWelcome}
                  className="text-center text-xs text-[var(--neutral-500)] underline-offset-2 hover:underline"
                >
                  {t("welcomeLater")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="pointer-events-none fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-[max(1.25rem,env(safe-area-inset-left))] z-[55] flex flex-col items-start sm:bottom-8 sm:left-8">
        <AnimatePresence>
          {chatOpen ? (
            <motion.div
              key="panel"
              id={panelId}
              role="dialog"
              aria-label={t("dialogLabel")}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "pointer-events-auto mb-3 flex min-h-0 w-[min(100vw-2.5rem,22rem)] max-h-[min(86dvh,34rem)] flex-col overflow-hidden rounded-2xl border shadow-[0_28px_90px_-24px_rgba(7,21,37,0.45)] backdrop-blur-md sm:w-[min(100vw-4rem,26rem)]",
                "border-[var(--neutral-200)]/90 bg-[var(--card)]/96",
                "dark:border-white/12 dark:bg-[color-mix(in_srgb,var(--primary-dark)_92%,var(--surface))]/96 dark:shadow-[0_28px_80px_-20px_rgba(0,0,0,0.65)]",
              )}
            >
              <div className="flex shrink-0 items-center justify-between border-b border-[var(--neutral-200)]/90 px-4 py-3 dark:border-white/10">
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">{t("statusOnline")}</p>
                  <p className="font-display text-sm font-bold text-[var(--primary)] dark:text-white">{t("chatTitle")}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href="/kontakty"
                    className="rounded-lg border border-[var(--accent)]/35 bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] px-2.5 py-1 text-xs font-medium text-[var(--accent)] transition hover:bg-[color-mix(in_srgb,var(--accent)_22%,transparent)]"
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
                className="min-h-0 flex-1 max-h-[min(52dvh,22rem)] space-y-3 overflow-y-auto overscroll-contain px-4 py-3 sm:max-h-[min(54dvh,24rem)]"
              >
                {messages.map((m) => (
                  <div key={m.id} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                    <div
                      className={cn(
                        "max-w-[92%] rounded-xl px-3 py-2 text-sm leading-relaxed shadow-sm",
                        m.role === "user"
                          ? "border border-[var(--accent)]/30 bg-[color-mix(in_srgb,var(--accent)_14%,var(--card))] text-[var(--primary)] dark:text-slate-100"
                          : "border border-[var(--neutral-200)]/80 bg-[var(--surface)]/95 dark:border-white/10 dark:bg-white/[0.06]",
                      )}
                    >
                      {m.role === "assistant" ? (
                        <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                          {m.content || "…"}
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
                    className={cn(
                      "min-h-[2.75rem] flex-1 resize-none rounded-xl border px-3 py-2 text-sm placeholder:text-[var(--neutral-500)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/35",
                      "border-[var(--neutral-200)] bg-[var(--background)] text-[var(--primary)]",
                      "dark:border-white/12 dark:bg-[var(--primary-dark)] dark:text-slate-100",
                    )}
                    disabled={pending}
                    aria-label={t("inputLabel")}
                  />
                  <button
                    type="button"
                    onClick={() => void send()}
                    disabled={pending || !input.trim()}
                    className="shrink-0 self-end rounded-xl bg-[var(--accent)] px-3.5 py-2 text-sm font-semibold text-white transition hover:opacity-95 disabled:opacity-40"
                  >
                    {t("send")}
                  </button>
                </div>
                <p className="mt-2 text-[10px] leading-relaxed text-[var(--neutral-500)]">
                  {t("disclaimer")}{" "}
                  <Link href="/zayavka" className="text-[var(--accent)] underline-offset-2 hover:underline">
                    {t("disclaimerLead")}
                  </Link>
                </p>
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
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className={cn(
            "pointer-events-auto relative flex h-14 w-14 items-center justify-center rounded-full border-2 text-white shadow-xl transition",
            "border-[color-mix(in_srgb,white_35%,var(--accent))] bg-gradient-to-br from-[var(--accent)] to-[color-mix(in_srgb,var(--accent)_55%,#0f766e)]",
            "ring-4 ring-[var(--accent)]/15 hover:ring-[var(--accent)]/25",
          )}
        >
          <MessageCircle className="h-6 w-6" aria-hidden />
          <span className="sr-only">{chatOpen ? t("fabClose") : t("fabOpen")}</span>
        </motion.button>
      </div>
    </>
  );
}
