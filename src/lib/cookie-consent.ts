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
