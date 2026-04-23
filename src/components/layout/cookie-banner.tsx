"use client";

import { useEffect, useState } from "react";
import { CONSENT_KEY, readConsent, writeConsent } from "@/lib/cookie-consent";
import { Button } from "@/components/ui/button";

export function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const v = readConsent();
    setOpen(v === "unset");
    const onStorage = (e: StorageEvent) => {
      if (e.key === CONSENT_KEY) setOpen(readConsent() === "unset");
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label="Настройки cookies"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-[var(--neutral-200)] bg-[var(--card)]/95 p-4 shadow-lg backdrop-blur-md md:left-auto md:right-6 md:bottom-6 md:max-w-lg md:rounded-2xl md:border"
    >
      <p className="text-sm font-medium text-[var(--primary)]">
        Мы используем cookies
      </p>
      <p className="mt-2 text-sm leading-relaxed text-[var(--neutral-700)]">
        Необходимые cookies нужны для работы сайта. Аналитика (Яндекс.Метрика) —
        только с согласия. Подробности — в политике конфиденциальности.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          onClick={() => {
            writeConsent("necessary");
            window.dispatchEvent(new Event("apv-consent-changed"));
            setOpen(false);
          }}
        >
          Только необходимые
        </Button>
        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={() => {
            writeConsent("all");
            window.dispatchEvent(new Event("apv-consent-changed"));
            setOpen(false);
          }}
        >
          Принять всё
        </Button>
      </div>
    </div>
  );
}
