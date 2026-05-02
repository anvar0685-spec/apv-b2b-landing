"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Headphones, MessageCircle, Phone, Send } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { site } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * Единый блок быстрых контактов: звонок, обратный звонок (диалог), WhatsApp, Telegram.
 * Заменяет пару CallbackFab + QuickContactDock — один столбец справа снизу.
 */
export function ContactStack() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const close = useCallback(() => setDialogOpen(false), []);

  const telHref = `tel:${site.phone.replace(/[^\d+]/g, "")}`;

  useEffect(() => {
    if (!dialogOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => panelRef.current?.querySelector("a")?.focus(), 0);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [dialogOpen, close]);

  const dockBtn =
    "flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg ring-2 ring-white/30 transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] motion-reduce:hover:scale-100";

  return (
    <>
      <nav
        className={cn(
          "fixed bottom-5 right-5 z-40 flex flex-col-reverse items-end gap-2",
          "motion-reduce:transform-none",
        )}
        aria-label="Связаться: звонок, заявка, мессенджеры"
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
        <button
          type="button"
          aria-haspopup="dialog"
          aria-expanded={dialogOpen}
          aria-controls={dialogOpen ? titleId : undefined}
          className={cn(
            dockBtn,
            "bg-[color-mix(in_srgb,var(--accent)_92%,var(--primary))] ring-[color-mix(in_srgb,var(--accent)_55%,white)] hover:ring-[var(--accent)]",
          )}
          title="Обратный звонок"
          onClick={() => {
            setDialogOpen((v) => !v);
            void trackEvent("callback_fab_open", { source: "contact_stack" });
          }}
        >
          <Headphones className="h-5 w-5" aria-hidden />
          <span className="sr-only">Обратный звонок</span>
        </button>
      </nav>

      {dialogOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
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
              также в шапке и в блоке контактов справа внизу.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <a
                href={telHref}
                className="inline-flex items-center justify-center rounded-xl bg-[var(--accent)] px-4 py-3 text-center text-sm font-medium text-white hover:opacity-95"
                onClick={() => void trackEvent("callback_fab_tel", { source: "contact_stack" })}
              >
                {site.phone}
              </a>
              <Link
                href="/zayavka?topic=obratnyy-zvonok"
                className="inline-flex items-center justify-center rounded-xl border border-[var(--neutral-200)] bg-[var(--surface)] px-4 py-3 text-center text-sm font-medium text-[var(--primary)] hover:border-[var(--accent)]"
                onClick={() => void trackEvent("callback_fab_lead", { source: "contact_stack" })}
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
