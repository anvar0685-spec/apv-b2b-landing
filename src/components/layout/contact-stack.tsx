"use client";

import { useEffect, useId, useState } from "react";
import { MessageCircle, Phone, Send, X } from "lucide-react";
import { MaxAppSymbol } from "@/components/icons/max-app-symbol";
import { site } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * Единый блок быстрых контактов: звонок, WhatsApp, Telegram, MAX.
 *
 * Mobile (<sm): collapsed FAB с тоггл-кнопкой (паттерн speed dial).
 * Desktop (sm+): всегда раскрыт.
 */
export function ContactStack() {
  const telHref = `tel:${site.phone.replace(/[^\d+]/g, "")}`;
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const panelId = useId();

  // Скрываем док пока виден cookie banner (паттерн зеркальный к panel-trigger).
  useEffect(() => {
    const onHide = (e: Event) => {
      const ce = e as CustomEvent<{ hidden?: boolean }>;
      setHidden(!!ce.detail?.hidden);
    };
    window.addEventListener("apv-floating-docks", onHide as EventListener);
    return () => window.removeEventListener("apv-floating-docks", onHide as EventListener);
  }, []);

  // Закрываем speed-dial по Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (hidden) return null;

  const dockBtn =
    "flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg ring-2 ring-white/30 transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] motion-reduce:hover:scale-100";

  return (
    <div
      className={cn(
        "fixed z-40 sm:bottom-5 sm:right-5",
        "bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))]",
        // На мобильном — без обёртки-карточки (одна кнопка), на sm+ — карточка с фоном.
        "sm:rounded-[2rem] sm:border sm:border-[var(--neutral-200)]/90 sm:bg-[var(--card)]/93 sm:p-2 sm:shadow-[0_20px_55px_-14px_rgba(7,21,37,0.38)] sm:backdrop-blur-md",
        "sm:dark:border-white/18 sm:dark:bg-[var(--primary-dark)]/78 sm:dark:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.55)]",
      )}
    >
      {/* Mobile-only trigger: при closed показывает Phone (как основной канал), при open — X */}
      <button
        type="button"
        className={cn(
          dockBtn,
          "sm:hidden",
          open
            ? "bg-[var(--neutral-700)] hover:ring-white/60"
            : "bg-[var(--primary)] hover:ring-[var(--accent)]",
        )}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Скрыть контакты" : "Связаться: звонок, мессенджеры"}
        onClick={() => {
          setOpen((o) => !o);
          if (!open) void trackEvent("contact_stack_toggle_open", { source: "dock_mobile" });
        }}
      >
        {open ? <X className="h-5 w-5" aria-hidden /> : <Phone className="h-5 w-5" aria-hidden />}
      </button>

      <nav
        id={panelId}
        className={cn(
          "flex flex-col-reverse items-center gap-2 motion-reduce:transform-none",
          "max-sm:absolute max-sm:bottom-14 max-sm:right-0 max-sm:rounded-[2rem] max-sm:border max-sm:border-[var(--neutral-200)]/90 max-sm:bg-[var(--card)]/95 max-sm:p-2 max-sm:shadow-[0_20px_55px_-14px_rgba(7,21,37,0.38)] max-sm:backdrop-blur-md",
          "max-sm:dark:border-white/18 max-sm:dark:bg-[var(--primary-dark)]/85",
          // На мобильном — скрываем стек, пока speed-dial не открыт.
          open ? "max-sm:flex" : "max-sm:hidden",
        )}
        aria-label="Связаться: звонок, MAX, мессенджеры"
      >
        <a
          href={telHref}
          className={cn(dockBtn, "bg-[var(--primary)] hover:ring-[var(--accent)]")}
          aria-label="Позвонить"
          title="Позвонить"
          onClick={() => void trackEvent("contact_stack_tel", { source: "dock" })}
        >
          <Phone className="h-5 w-5" aria-hidden />
        </a>
        <a
          href={site.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(dockBtn, "bg-[#25D366]")}
          aria-label="WhatsApp"
          title="WhatsApp"
          onClick={() => void trackEvent("contact_stack_whatsapp", { source: "dock" })}
        >
          <MessageCircle className="h-5 w-5" aria-hidden />
        </a>
        <a
          href={site.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(dockBtn, "bg-[#229ED9]")}
          aria-label="Telegram"
          title="Telegram"
          onClick={() => void trackEvent("contact_stack_telegram", { source: "dock" })}
        >
          <Send className="h-5 w-5" aria-hidden />
        </a>
        <a
          href={site.max}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            dockBtn,
            "bg-gradient-to-br from-[#4f8cff] via-[#7c5cff] to-[#d946ef] hover:ring-[#93c5fd]",
          )}
          aria-label="Написать в MAX"
          title="Написать в MAX"
          onClick={() => void trackEvent("contact_stack_max", { source: "dock" })}
        >
          <MaxAppSymbol className="h-[22px] w-[22px] shrink-0 text-white drop-shadow-sm" />
        </a>
      </nav>
    </div>
  );
}
