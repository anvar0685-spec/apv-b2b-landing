"use client";

import { MessageCircle, Phone, Send } from "lucide-react";
import { MaxAppSymbol } from "@/components/icons/max-app-symbol";
import { site } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * Единый блок быстрых контактов: звонок, WhatsApp, Telegram, MAX.
 */
export function ContactStack() {
  const telHref = `tel:${site.phone.replace(/[^\d+]/g, "")}`;

  const dockBtn =
    "flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg ring-2 ring-white/30 transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] motion-reduce:hover:scale-100";

  return (
    <div
      className={cn(
        "fixed bottom-5 right-5 z-40 rounded-[2rem] border border-[var(--neutral-200)]/90 bg-[var(--card)]/93 p-2 shadow-[0_20px_55px_-14px_rgba(7,21,37,0.38)] backdrop-blur-md",
        "dark:border-white/18 dark:bg-[var(--primary-dark)]/78 dark:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.55)]",
      )}
    >
      <nav
        className={cn("flex flex-col-reverse items-center gap-2", "motion-reduce:transform-none")}
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
