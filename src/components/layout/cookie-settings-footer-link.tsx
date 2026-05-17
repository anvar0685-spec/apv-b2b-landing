"use client";

import { useTranslations } from "next-intl";
import { clearConsent } from "@/lib/cookie-consent";

export function CookieSettingsFooterLink() {
  const t = useTranslations("footer");
  return (
    <button
      type="button"
      className="text-[var(--accent)] underline underline-offset-2 hover:text-white"
      onClick={() => clearConsent()}
    >
      {t("cookieSettings")}
    </button>
  );
}
