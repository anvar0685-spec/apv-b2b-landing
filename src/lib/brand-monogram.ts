/** Две буквы для логомарка из названия бренда (кириллица, дефисы). */
export function getBrandMonogram(brand: string): string {
  const normalized = brand.trim().replace(/_/g, " ");
  const tokens = normalized.split(/[\s\-–—]+/).filter((t) => t.length > 0);

  const first = tokens[0] || "";
  const lettersOnly = /^[a-zA-Z\u0400-\u04FF]{2,5}$/;
  if (first.length >= 2 && first.length <= 5 && lettersOnly.test(first)) {
    return first.slice(0, 2).toUpperCase();
  }

  if (tokens.length >= 2) {
    const a = tokens[0].charAt(0);
    const b = tokens[1].charAt(0);
    return `${a}${b}`.toUpperCase();
  }

  if (normalized.length >= 2) return normalized.slice(0, 2).toUpperCase();
  const c = normalized.charAt(0) || "А";
  return `${c}${c}`.toUpperCase();
}
