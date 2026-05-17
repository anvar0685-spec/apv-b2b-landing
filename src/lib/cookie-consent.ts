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

/** Сброс выбора (например из футера) — снова покажется баннер; Яндекс.Метрика грузится только после «Принять всё». */
export function clearConsent() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(CONSENT_KEY);
  window.dispatchEvent(new Event("apv-consent-changed"));
}

export function analyticsAllowed(): boolean {
  return readConsent() === "all";
}
