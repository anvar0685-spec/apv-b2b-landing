/** Путь с префиксом локали для `redirect` / `permanentRedirect` при `localePrefix: "as-needed"`. */
export function localizedPath(locale: string, pathname: string): string {
  const p = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (locale === "en") {
    if (p === "/") return "/en";
    return `/en${p}`;
  }
  return p;
}
