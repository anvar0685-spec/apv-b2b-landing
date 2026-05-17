"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useState } from "react";
import { ChevronDown, MessageCircle, Phone, Send, X } from "lucide-react";
import { MaxAppSymbol } from "@/components/icons/max-app-symbol";
import { site } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * Премиум-карточка менеджера в правом нижнем углу.
 *
 * Состояния:
 *  - collapsed (persist в localStorage 'apv-mc-collapsed'): пользователь
 *    вручную свернул карточку → отображается компактная пилюля с аватаром.
 *    Тап по пилюле → разворачивает обратно.
 *  - open (только мобайл, in-memory): развёрнута ли карточка в overlay.
 *    На десктопе карточка раскрыта по умолчанию (open игнорируется при sm+).
 *
 * Появление: после прокрутки вниз (~140px) или не раньше чем через ~5 с с момента
 * гидратации — чтобы hero не перекрывался сразу.
 *
 * Видимость на тёмных секциях: solid background + accent-halo (двойная тень
 * + постоянный ring) → карточка читается на любом фоне без зависимости от
 * темы текущей секции.
 */

const STORAGE_KEY = "apv-mc-collapsed";
const SCROLL_UNLOCK_PX = 140;
const FALLBACK_DELAY_MS = 5000;

export function ManagerCard() {
  const telHref = `tel:${site.phone.replace(/[^\d+]/g, "")}`;
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [dockVisible, setDockVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "1") setCollapsed(true);
    } catch {
      // localStorage may throw in private mode — игнор, дефолт = развёрнуто
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let done = false;
    const unlock = () => {
      if (done) return;
      done = true;
      setDockVisible(true);
    };
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      if (y >= SCROLL_UNLOCK_PX) unlock();
    };
    const tid = window.setTimeout(unlock, FALLBACK_DELAY_MS);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      done = true;
      window.clearTimeout(tid);
      window.removeEventListener("scroll", onScroll);
    };
  }, [mounted]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const collapse = useCallback(() => {
    setCollapsed(true);
    setOpen(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // intentionally swallowed
    }
    void trackEvent("manager_card_collapse", { source: "manager_card" });
  }, []);

  const expand = useCallback(() => {
    setCollapsed(false);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // intentionally swallowed
    }
    void trackEvent("manager_card_expand", { source: "manager_card" });
  }, []);

  // До гидратации не рендерим ничего — иначе мигнёт «развёрнутая» карточка
  // у пользователя, который её свернул в прошлой сессии (FOUC).
  if (!mounted) return null;
  if (!dockVisible) return null;

  const msgrBtn =
    "interactive-hover-ring group flex h-[68px] min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-1.5 text-[11px] font-semibold text-white shadow-[0_6px_18px_-8px_rgba(7,21,37,0.35)] ring-1 ring-white/15 transition hover:scale-[1.02] hover:shadow-[0_10px_22px_-8px_rgba(7,21,37,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] motion-reduce:hover:scale-100";

  // Свёрнутое состояние — единая «пилюля» для desktop и mobile
  if (collapsed) {
    return (
      <div
        className={cn(
          "pointer-events-none fixed z-40 sm:bottom-6 sm:right-6",
          "bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))]",
        )}
      >
        <button
          type="button"
          onClick={expand}
          aria-label="Развернуть карточку менеджера Анвара"
          className={cn(
            "interactive-hover-ring pointer-events-auto group relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-white transition hover:scale-105 motion-reduce:hover:scale-100",
            // Halo: видно на тёмном (accent-glow) и на светлом (drop shadow)
            "shadow-[0_18px_44px_-12px_rgba(7,21,37,0.55),0_0_0_2px_rgba(13,148,136,0.45),0_0_28px_-6px_rgba(13,148,136,0.55)]",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
          )}
        >
          <Image
            src="/team/anvar-200.webp"
            alt=""
            fill
            sizes="56px"
            className="object-cover"
          />
          {/* Pulse-индикатор «онлайн» */}
          <span
            className="absolute bottom-0.5 right-0.5 flex h-3 w-3 items-center justify-center rounded-full border-2 border-white bg-[var(--success)] shadow-[0_0_8px_rgba(5,150,105,0.7)]"
            aria-hidden
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--success)] opacity-60 motion-reduce:animate-none" />
          </span>
          {/* Tooltip-подсказка при hover (только sm+) */}
          <span className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 whitespace-nowrap rounded-lg bg-[var(--primary)] px-2.5 py-1.5 text-[11px] font-semibold text-white opacity-0 shadow-lg transition group-hover:opacity-100 sm:block">
            Связаться с Анваром
            <span
              className="absolute left-full top-1/2 h-0 w-0 -translate-y-1/2 border-y-4 border-l-4 border-y-transparent border-l-[var(--primary)]"
              aria-hidden
            />
          </span>
        </button>
      </div>
    );
  }

  const cardContent = (
    <div
      id={panelId}
      className={cn(
        "pointer-events-auto flex w-[min(calc(100vw-1.5rem),22rem)] flex-col overflow-hidden rounded-2xl border bg-[var(--card)] backdrop-blur-xl",
        // Двойная тень: дроп (для светлых фонов) + accent-halo (для тёмных) + accent ring
        "shadow-[0_24px_60px_-18px_rgba(7,21,37,0.5),0_0_0_1px_rgba(13,148,136,0.25),0_0_42px_-8px_rgba(13,148,136,0.45)]",
        "border-[var(--neutral-200)]/90 dark:border-white/12 dark:bg-[color-mix(in_srgb,var(--primary-dark)_94%,var(--surface))]",
        "max-sm:absolute max-sm:bottom-[4.5rem] max-sm:right-0",
        open ? "max-sm:flex" : "max-sm:hidden",
        "sm:relative sm:w-[22rem]",
      )}
    >
      {/* Top: photo + identity + controls */}
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
        {/* Controls: collapse (sm+) + close (mobile) */}
        <div className="ml-auto flex shrink-0 flex-col items-end gap-1.5">
          <button
            type="button"
            className="hidden h-7 w-7 items-center justify-center rounded-lg border border-[var(--neutral-200)] text-[var(--neutral-500)] transition hover:border-[var(--accent)] hover:text-[var(--primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] sm:flex dark:border-white/12 dark:text-[var(--text-on-dark-muted)] dark:hover:text-white"
            aria-label="Свернуть карточку менеджера"
            title="Свернуть"
            onClick={collapse}
          >
            <ChevronDown className="h-4 w-4" aria-hidden />
          </button>
          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--neutral-200)] text-[var(--neutral-500)] transition hover:border-[var(--accent)] hover:text-[var(--primary)] sm:hidden dark:border-white/12 dark:text-[var(--text-on-dark-muted)]"
            aria-label="Закрыть"
            onClick={() => setOpen(false)}
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>

      <div
        className="mx-3.5 mt-3.5 h-px bg-gradient-to-r from-transparent via-[var(--neutral-200)] to-transparent dark:via-white/10"
        aria-hidden
      />

      <p className="px-3.5 pt-3 text-[12px] leading-snug text-[var(--neutral-600)] dark:text-[var(--text-on-dark-base)]">
        Напишите в&nbsp;удобном канале — пришлю ставки, документы и условия по&nbsp;вашему складу.
      </p>

      <div className="px-3.5 pt-3">
        <a
          href={telHref}
          className="interactive-hover-ring group flex h-12 items-center justify-center gap-2.5 rounded-xl bg-[var(--primary)] px-4 text-white shadow-[0_10px_24px_-10px_rgba(7,21,37,0.55)] ring-1 ring-white/10 transition hover:bg-[var(--primary-dark)] hover:shadow-[0_14px_28px_-10px_rgba(7,21,37,0.65)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          aria-label={`Позвонить менеджеру по номеру ${site.phone}`}
          onClick={() => void trackEvent("manager_card_tel", { source: "manager_card" })}
        >
          <Phone className="h-4 w-4 shrink-0" aria-hidden />
          <span className="font-display text-[15px] font-semibold tracking-tight tabular-nums">
            {site.phone}
          </span>
        </a>
      </div>

      <nav
        className="grid grid-cols-3 gap-2 px-3.5 pb-3.5 pt-2"
        aria-label="Написать менеджеру в мессенджер: WhatsApp, Telegram, MAX"
      >
        <a
          href={site.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(msgrBtn, "bg-[#25D366] hover:bg-[#1eb858]")}
          aria-label="Написать в WhatsApp"
          title="WhatsApp"
          onClick={() => void trackEvent("manager_card_whatsapp", { source: "manager_card" })}
        >
          <MessageCircle className="h-5 w-5 shrink-0" aria-hidden />
          <span className="leading-none">WhatsApp</span>
        </a>
        <a
          href={site.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(msgrBtn, "bg-[#229ED9] hover:bg-[#1e8cbf]")}
          aria-label="Написать в Telegram"
          title="Telegram"
          onClick={() => void trackEvent("manager_card_telegram", { source: "manager_card" })}
        >
          <Send className="h-5 w-5 shrink-0" aria-hidden />
          <span className="leading-none">Telegram</span>
        </a>
        <a
          href={site.max}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            msgrBtn,
            "bg-gradient-to-br from-[#4f8cff] via-[#7c5cff] to-[#d946ef] hover:opacity-95",
          )}
          aria-label="Написать в MAX"
          title="MAX"
          onClick={() => void trackEvent("manager_card_max", { source: "manager_card" })}
        >
          <MaxAppSymbol className="h-[22px] w-[22px] shrink-0 text-white" />
          <span className="leading-none">MAX</span>
        </a>
      </nav>

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
      {/* Mobile FAB trigger — фото-аватар (открывает overlay-карточку) */}
      <button
        type="button"
        className={cn(
          "interactive-hover-ring relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] sm:hidden motion-reduce:hover:scale-100",
          // Тот же halo, что и у свёрнутой пилюли — видно на любом фоне
          "shadow-[0_18px_44px_-12px_rgba(7,21,37,0.55),0_0_0_2px_rgba(13,148,136,0.45),0_0_28px_-6px_rgba(13,148,136,0.55)]",
          open ? "bg-[var(--primary)] text-white" : "bg-white",
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
            <span
              className="absolute bottom-0.5 right-0.5 flex h-3 w-3 items-center justify-center rounded-full border-2 border-white bg-[var(--success)] shadow-[0_0_8px_rgba(5,150,105,0.7)]"
              aria-hidden
            >
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--success)] opacity-60 motion-reduce:animate-none" />
            </span>
          </>
        )}
      </button>

      {cardContent}
    </div>
  );
}
