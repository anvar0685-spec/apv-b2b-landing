"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { readConsent, writeConsent } from "@/lib/cookie-consent";

/**
 * Имплицитное согласие (распространённая практика для B2B в РФ): при первом визите
 * фиксируем режим «все» (в т.ч. Яндекс.Метрика), без блокирующего диалога «принять / отказать».
 * Показываем только компактную полоску-уведомление со ссылкой на политику и «Скрыть».
 */
export function CookieBanner() {
  const t = useTranslations("cookieBanner");
  const [strip, setStrip] = useState(false);
  const hideTimer = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (readConsent() === "unset") {
      writeConsent("all");
      window.dispatchEvent(new Event("apv-consent-changed"));
      setStrip(true);
      hideTimer.current = window.setTimeout(() => setStrip(false), 14000);
      return () => {
        if (hideTimer.current != null) window.clearTimeout(hideTimer.current);
      };
    }
    return undefined;
  }, []);

  const dismiss = () => {
    if (hideTimer.current != null) window.clearTimeout(hideTimer.current);
    setStrip(false);
  };

  if (!strip) return null;

  return (
    <div
      role="status"
      className="fixed inset-x-0 bottom-0 z-[50] border-t border-white/15 bg-[var(--primary-dark)]/96 px-3 py-2.5 text-[13px] leading-snug text-white shadow-[0_-8px_30px_-12px_rgba(0,0,0,0.35)] backdrop-blur-md sm:px-5 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
    >
      <div className="mx-auto flex max-w-[1280px] items-start gap-3 sm:items-center">
        <p className="min-w-0 flex-1 text-white/95">
          {t("stripLead")}{" "}
          <Link
            href="/politika-konfidencialnosti"
            className="font-medium text-[var(--accent)] underline underline-offset-2 hover:text-white"
          >
            {t("policyLink")}
          </Link>
          .
          {t("stripAfterPolicy")}
        </p>
        <button
          type="button"
          className="shrink-0 rounded-lg border border-white/20 p-1.5 text-white/90 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          aria-label={t("dismissAria")}
          onClick={dismiss}
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}
