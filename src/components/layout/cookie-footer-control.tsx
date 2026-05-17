"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import type { ConsentValue } from "@/lib/cookie-consent";
import { CONSENT_KEY, readConsent, writeConsent } from "@/lib/cookie-consent";

export function CookieFooterControl() {
  const t = useTranslations("cookieBanner");
  const [mode, setMode] = useState<ConsentValue>("unset");

  const sync = useCallback(() => setMode(readConsent()), []);

  useEffect(() => {
    sync();
    window.addEventListener("apv-consent-changed", sync);
    const onStorage = (e: StorageEvent) => {
      if (e.key === CONSENT_KEY || e.key === null) sync();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("apv-consent-changed", sync);
      window.removeEventListener("storage", onStorage);
    };
  }, [sync]);

  if (mode === "unset") return null;

  if (mode === "all") {
    return (
      <button
        type="button"
        className="text-[var(--accent)] underline underline-offset-2 hover:text-white"
        onClick={() => {
          writeConsent("necessary");
          window.dispatchEvent(new Event("apv-consent-changed"));
        }}
      >
        {t("footerDisable")}
      </button>
    );
  }

  return (
    <button
      type="button"
      className="text-[var(--accent)] underline underline-offset-2 hover:text-white"
      onClick={() => {
        writeConsent("all");
        window.dispatchEvent(new Event("apv-consent-changed"));
      }}
    >
      {t("footerEnable")}
    </button>
  );
}
