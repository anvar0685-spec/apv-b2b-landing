"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { site } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * FAB «Обратный звонок» (нед. 7 мастер-док). Без бэкенда: телефон + заявка с пометкой.
 * Слева снизу — не пересекается с QuickContactDock справа.
 */
export function CallbackFab() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => panelRef.current?.querySelector("a")?.focus(), 0);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open, close]);

  const telHref = `tel:${site.phone.replace(/[^\d+]/g, "")}`;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? titleId : undefined}
        onClick={() => {
          setOpen((v) => !v);
          void trackEvent("callback_fab_open", { source: "fab" });
        }}
        className={cn(
          "fixed bottom-5 left-5 z-40 flex items-center justify-center gap-2 rounded-full bg-[var(--primary)] text-sm font-semibold text-white shadow-lg",
          "max-sm:h-12 max-sm:w-12 max-sm:px-0 sm:px-4 sm:py-3",
          "ring-2 ring-white/25 transition hover:ring-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
          "motion-reduce:transition-none",
        )}
      >
        <Phone className="h-4 w-4 shrink-0" aria-hidden />
        <span className="max-sm:sr-only">Обратный звонок</span>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-start bg-black/40 p-4 sm:items-center"
          role="presentation"
          onClick={close}
        >
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="w-full max-w-md rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)] p-6 shadow-2xl dark:border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id={titleId} className="text-lg font-semibold text-[var(--primary)]">
              Свяжитесь с нами
            </h2>
            <p className="type-body mt-2 text-sm text-[var(--neutral-700)]">
              Позвоните по телефону или оставьте заявку — укажем детали по объекту, срокам и SLA в КП. Номер и мессенджеры
              также в шапке и в правом нижнем углу.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <a
                href={telHref}
                className="inline-flex items-center justify-center rounded-xl bg-[var(--accent)] px-4 py-3 text-center text-sm font-medium text-white hover:opacity-95"
                onClick={() => void trackEvent("callback_fab_tel", {})}
              >
                {site.phone}
              </a>
              <Link
                href="/zayavka?topic=obratnyy-zvonok"
                className="inline-flex items-center justify-center rounded-xl border border-[var(--neutral-200)] bg-[var(--surface)] px-4 py-3 text-center text-sm font-medium text-[var(--primary)] hover:border-[var(--accent)]"
                onClick={() => void trackEvent("callback_fab_lead", {})}
              >
                Оставить заявку на обратный звонок
              </Link>
            </div>
            <button
              type="button"
              className="mt-4 w-full text-sm text-[var(--neutral-500)] underline-offset-2 hover:underline"
              onClick={close}
            >
              Закрыть
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
