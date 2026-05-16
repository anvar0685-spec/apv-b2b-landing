"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import { MessageCircle, Phone, Send, X } from "lucide-react";
import { MaxAppSymbol } from "@/components/icons/max-app-symbol";
import { site } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * Премиум-карточка менеджера. Заменяет прежний ContactStack:
 *
 * Desktop (sm+):
 *   Раскрытая карточка с фото слева, именем/статусом справа,
 *   нижний ряд — 4 канала связи (тел, WhatsApp, Telegram, MAX).
 *
 * Mobile (<sm):
 *   FAB-аватар с фото менеджера. Tap → раскрывается компактная карточка
 *   с тем же содержимым; Esc / external click — скрывает.
 *
 * Скрывается, пока виден cookie banner (broadcast 'apv-floating-docks').
 */
export function ManagerCard() {
  const telHref = `tel:${site.phone.replace(/[^\d+]/g, "")}`;
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const panelId = useId();

  useEffect(() => {
    const onHide = (e: Event) => {
      const ce = e as CustomEvent<{ hidden?: boolean }>;
      setHidden(!!ce.detail?.hidden);
    };
    window.addEventListener("apv-floating-docks", onHide as EventListener);
    return () => window.removeEventListener("apv-floating-docks", onHide as EventListener);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (hidden) return null;

  const channelBtn =
    "interactive-hover-ring flex h-10 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl px-2 text-[11px] font-semibold text-white shadow-sm ring-1 ring-white/15 transition hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] motion-reduce:hover:scale-100";

  const cardContent = (
    <div
      id={panelId}
      className={cn(
        "pointer-events-auto flex w-[min(calc(100vw-1.5rem),21rem)] flex-col overflow-hidden rounded-2xl border bg-[var(--card)]/96 shadow-[0_24px_60px_-18px_rgba(7,21,37,0.4)] backdrop-blur-xl",
        "border-[var(--neutral-200)]/90 dark:border-white/12 dark:bg-[color-mix(in_srgb,var(--primary-dark)_94%,var(--surface))]/96",
        "max-sm:absolute max-sm:bottom-[4.5rem] max-sm:right-0",
        open ? "max-sm:flex" : "max-sm:hidden",
        "sm:relative sm:w-[20.5rem]",
      )}
    >
      {/* Top: photo + identity */}
      <div className="flex items-center gap-3 px-3.5 pt-3.5">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl ring-2 ring-[var(--accent)]/35 shadow-[0_8px_24px_-8px_rgba(13,148,136,0.5)]">
          <Image
            src="/team/anvar-400.webp"
            alt="Анвар, менеджер проекта АПВ-СИСТЕМА"
            fill
            sizes="56px"
            className="object-cover"
            priority={false}
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-display text-base font-bold leading-tight tracking-tight text-[var(--primary)] dark:text-white">
            Анвар
          </p>
          <p className="mt-0.5 text-[11px] font-medium leading-snug text-[var(--neutral-500)] dark:text-[var(--text-on-dark-muted)]">
            Менеджер проекта
          </p>
          <p className="mt-1.5 flex items-center gap-1.5 text-[11px] font-medium text-[var(--neutral-700)] dark:text-[var(--text-on-dark-base)]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--success)] opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
            </span>
            <span>Онлайн · ответим за 15&nbsp;минут</span>
          </p>
        </div>
        {/* Mobile-only close */}
        <button
          type="button"
          className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--neutral-200)] text-[var(--neutral-700)] transition hover:border-[var(--accent)] hover:text-[var(--primary)] sm:hidden dark:border-white/12 dark:text-[var(--text-on-dark-base)]"
          aria-label="Скрыть карточку"
          onClick={() => setOpen(false)}
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>

      {/* Subtle separator */}
      <div className="mx-3.5 mt-3.5 h-px bg-gradient-to-r from-transparent via-[var(--neutral-200)] to-transparent dark:via-white/10" aria-hidden />

      {/* Hint copy */}
      <p className="px-3.5 pt-3 text-[12px] leading-snug text-[var(--neutral-600)] dark:text-[var(--text-on-dark-base)]">
        Напишите в&nbsp;удобном канале — пришлю ставки, документы и условия по&nbsp;вашему складу.
      </p>

      {/* Channels */}
      <nav
        className="grid grid-cols-4 gap-2 p-3.5 pt-3"
        aria-label="Связаться с менеджером: звонок, WhatsApp, Telegram, MAX"
      >
        <a
          href={telHref}
          className={cn(channelBtn, "bg-[var(--primary)] hover:bg-[var(--primary-dark)]")}
          aria-label="Позвонить менеджеру"
          title="Позвонить"
          onClick={() => void trackEvent("manager_card_tel", { source: "manager_card" })}
        >
          <Phone className="h-4 w-4 shrink-0" aria-hidden />
          <span>Звонок</span>
        </a>
        <a
          href={site.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(channelBtn, "bg-[#25D366] hover:bg-[#1eb858]")}
          aria-label="Написать в WhatsApp"
          title="WhatsApp"
          onClick={() => void trackEvent("manager_card_whatsapp", { source: "manager_card" })}
        >
          <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
          <span>WhatsApp</span>
        </a>
        <a
          href={site.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(channelBtn, "bg-[#229ED9] hover:bg-[#1e8cbf]")}
          aria-label="Написать в Telegram"
          title="Telegram"
          onClick={() => void trackEvent("manager_card_telegram", { source: "manager_card" })}
        >
          <Send className="h-4 w-4 shrink-0" aria-hidden />
          <span>Telegram</span>
        </a>
        <a
          href={site.max}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            channelBtn,
            "bg-gradient-to-br from-[#4f8cff] via-[#7c5cff] to-[#d946ef] hover:opacity-95",
          )}
          aria-label="Написать в MAX"
          title="MAX"
          onClick={() => void trackEvent("manager_card_max", { source: "manager_card" })}
        >
          <MaxAppSymbol className="h-[18px] w-[18px] shrink-0 text-white" />
          <span>MAX</span>
        </a>
      </nav>

      {/* Footer micro-line */}
      <p className="border-t border-[var(--neutral-200)]/80 bg-[var(--surface)]/60 px-3.5 py-2 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--neutral-500)] dark:border-white/10 dark:bg-white/[0.03] dark:text-[var(--text-on-dark-muted)]">
        пн–пт · 09:00 – 19:00 МСК
      </p>
    </div>
  );

  return (
    <div
      className={cn(
        "fixed z-40 sm:bottom-6 sm:right-6",
        "bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))]",
      )}
    >
      {/* Mobile FAB trigger — фото-аватар */}
      <button
        type="button"
        className={cn(
          "interactive-hover-ring relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full shadow-[0_16px_40px_-10px_rgba(7,21,37,0.45)] ring-2 ring-[var(--accent)]/40 transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] sm:hidden motion-reduce:hover:scale-100",
          open
            ? "bg-[var(--primary)] text-white"
            : "bg-[var(--card)]",
        )}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Скрыть карточку менеджера" : "Связаться с менеджером Анваром"}
        onClick={() => {
          setOpen((o) => !o);
          if (!open) void trackEvent("manager_card_open", { source: "manager_card_mobile" });
        }}
      >
        {open ? (
          <X className="h-5 w-5" aria-hidden />
        ) : (
          <>
            <Image
              src="/team/anvar-200.webp"
              alt=""
              fill
              sizes="56px"
              className="object-cover"
            />
            {/* Pulse-indicator «онлайн» — нижний правый */}
            <span
              className="absolute bottom-0.5 right-0.5 flex h-3 w-3 items-center justify-center rounded-full border-2 border-white bg-[var(--success)] shadow-[0_0_8px_rgba(5,150,105,0.7)] motion-reduce:animate-none"
              aria-hidden
            />
          </>
        )}
      </button>

      {cardContent}
    </div>
  );
}
