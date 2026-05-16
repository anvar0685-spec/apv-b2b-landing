"use client";

import { useEffect, useState } from "react";
import { CONSENT_KEY, readConsent, writeConsent } from "@/lib/cookie-consent";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

/** Broadcast'им видимость баннера, чтобы плавающие dock'и могли временно прятаться. */
function broadcastDocksHidden(hidden: boolean) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("apv-floating-docks", { detail: { hidden } }));
}

export function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const v = readConsent();
    const initialOpen = v === "unset";
    setOpen(initialOpen);
    broadcastDocksHidden(initialOpen);
    const onStorage = (e: StorageEvent) => {
      if (e.key === CONSENT_KEY) {
        const nextOpen = readConsent() === "unset";
        setOpen(nextOpen);
        broadcastDocksHidden(nextOpen);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  if (!open) return null;

  const accept = (mode: "necessary" | "all") => {
    writeConsent(mode);
    window.dispatchEvent(new Event("apv-consent-changed"));
    setOpen(false);
    broadcastDocksHidden(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Настройки cookies"
      className="fixed z-[60] border border-[var(--neutral-200)] bg-[var(--card)]/95 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-xl backdrop-blur-md dark:border-white/10 max-md:inset-x-3 max-md:bottom-3 max-md:rounded-2xl max-md:px-3 md:left-auto md:right-6 md:bottom-6 md:max-w-lg md:rounded-2xl md:border md:p-4 md:pb-4 md:pt-4 md:shadow-lg"
    >
      <p className="text-sm font-medium text-[var(--primary)]">
        Мы используем cookies
      </p>
      <p className="mt-2 text-sm leading-relaxed text-[var(--neutral-700)]">
        Необходимые cookies нужны для работы сайта. Аналитика (Яндекс.Метрика) — только с согласия. При включённой защите чата от ботов может подгружаться виджет Cloudflare Turnstile. Подробности — в{" "}
        <Link href="/politika-konfidencialnosti" className="text-[var(--accent)] underline underline-offset-2">
          политике конфиденциальности
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button type="button" size="sm" onClick={() => accept("necessary")}>
          Только необходимые
        </Button>
        <Button type="button" size="sm" variant="secondary" onClick={() => accept("all")}>
          Принять всё
        </Button>
      </div>
    </div>
  );
}
