"use client";

import { site } from "@/config/site";
import { cn } from "@/lib/utils";
import { MessageCircle, Phone, Send } from "lucide-react";

/**
 * Быстрый доступ к телефону / WhatsApp / Telegram (нед. 7 мастер-дока: мессенджеры).
 * `motion-reduce`: без анимации пульса.
 */
export function QuickContactDock() {
  const telHref = `tel:${site.phone.replace(/[^\d+]/g, "")}`;
  return (
    <div
      className={cn(
        "fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2",
        "motion-reduce:transform-none",
      )}
      role="navigation"
      aria-label="Быстрые контакты"
    >
      <a
        href={telHref}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white shadow-lg ring-2 ring-white/30 transition hover:scale-105 hover:ring-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] motion-reduce:hover:scale-100"
        aria-label="Позвонить"
        title="Позвонить"
      >
        <Phone className="h-5 w-5" aria-hidden />
      </a>
      <a
        href={site.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg ring-2 ring-white/30 transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] motion-reduce:hover:scale-100"
        aria-label="WhatsApp"
        title="WhatsApp"
      >
        <MessageCircle className="h-5 w-5" aria-hidden />
      </a>
      <a
        href={site.telegram}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#229ED9] text-white shadow-lg ring-2 ring-white/30 transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] motion-reduce:hover:scale-100"
        aria-label="Telegram"
        title="Telegram"
      >
        <Send className="h-5 w-5" aria-hidden />
      </a>
    </div>
  );
}
