import { site } from "@/config/site";

/** Абсолютный URL (сайт только на русском, без префикса локали). */
export function absUrl(path: string) {
  const base = site.url.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
