/** Путь для `redirect` / `permanentRedirect` при единственной локали `ru` и `localePrefix: "as-needed"`. */
export function localizedPath(_locale: string, pathname: string): string {
  const p = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return p;
}
