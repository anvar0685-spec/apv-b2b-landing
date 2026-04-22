import { site } from "@/config/site";

/** Абсолютный URL с учётом локали (as-needed: ru без префикса, en с /en). */
export function absUrl(path: string, locale: string) {
  const base = site.url.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  if (locale === "en") {
    if (p === "/") return `${base}/en`;
    return `${base}/en${p}`;
  }
  return `${base}${p}`;
}
