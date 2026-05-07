import { site } from "@/config/site";
import { routing } from "@/i18n/routing";

/**
 * Путь без префикса локали (как в `pathname` у `buildPageMetadata`) → публичный путь в URL.
 * При `localePrefix: "always"` совпадает с next-intl (например `/ru`, `/ru/uslugi/...`).
 */
export function localizedPublicPath(pathname: string, locale: string): string {
  const p = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const mode = typeof routing.localePrefix === "string" ? routing.localePrefix : "always";

  if (mode === "always") {
    return p === "/" ? `/${locale}` : `/${locale}${p}`;
  }
  if (mode === "as-needed") {
    if (locale === routing.defaultLocale) return p === "/" ? "/" : p;
    return p === "/" ? `/${locale}` : `/${locale}${p}`;
  }
  return p === "/" ? "/" : p;
}

/** Абсолютный URL страницы. `pathname` — без префикса локали; `locale` — сегмент (сейчас всегда `ru`). */
export function absUrl(path: string, locale: string = routing.defaultLocale) {
  const base = site.url.replace(/\/$/, "");
  return `${base}${localizedPublicPath(path, locale)}`;
}
