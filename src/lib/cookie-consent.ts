export const CONSENT_KEY = "apv_cookie_consent";

export type ConsentValue = "all" | "necessary" | "unset";

export function readConsent(): ConsentValue {
  if (typeof window === "undefined") return "unset";
  const v = window.localStorage.getItem(CONSENT_KEY);
  if (v === "all" || v === "necessary") return v;
  return "unset";
}

export function writeConsent(v: Exclude<ConsentValue, "unset">) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONSENT_KEY, v);
}

export function analyticsAllowed(): boolean {
  return readConsent() === "all";
}

/**
 * Поднимает consent до `all` для Метрики (unset / устаревший necessary).
 * Вызывать из `YandexMetrika` до чтения `analyticsAllowed`, чтобы не ловить гонку с `CookieBanner`.
 * @returns значение consent **до** возможной записи.
 */
export function ensureAnalyticsConsentForMetrika(): ConsentValue {
  if (typeof window === "undefined") return "unset";
  const before = readConsent();
  if (before === "unset" || before === "necessary") {
    writeConsent("all");
    window.dispatchEvent(new Event("apv-consent-changed"));
  }
  return before;
}
