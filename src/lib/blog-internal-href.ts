import { routing } from "@/i18n/routing";

const LOCALES: readonly string[] = routing.locales;

/**
 * Нормализует href для next-intl `Link`: без повторного префикса локали.
 * Внешние URL, tel:, mailto: и якоря не меняются.
 */
export function normalizeBlogInternalHref(href: string): string {
  const trimmed = href.trim();
  if (
    !trimmed ||
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("mailto:") ||
    trimmed.startsWith("tel:") ||
    trimmed.startsWith("#")
  ) {
    return trimmed;
  }

  let pathPart = trimmed;
  let suffix = "";

  const hashIdx = pathPart.indexOf("#");
  if (hashIdx !== -1) {
    suffix = pathPart.slice(hashIdx);
    pathPart = pathPart.slice(0, hashIdx);
  }
  const queryIdx = pathPart.indexOf("?");
  if (queryIdx !== -1) {
    suffix = pathPart.slice(queryIdx) + suffix;
    pathPart = pathPart.slice(0, queryIdx);
  }

  let path = pathPart.startsWith("/") ? pathPart : `/${pathPart}`;

  let changed = true;
  while (changed) {
    changed = false;
    for (const loc of LOCALES) {
      const prefix = `/${loc}`;
      if (path === prefix) {
        path = "/";
        changed = true;
        break;
      }
      if (path.startsWith(`${prefix}/`)) {
        path = path.slice(prefix.length) || "/";
        changed = true;
        break;
      }
    }
  }

  return path + suffix;
}
