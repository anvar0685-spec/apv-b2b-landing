/** Две буквы для логомарка из названия бренда (без внешних зависимостей). */
export function getBrandMonogram(brand: string): string {
  const normalized = brand.trim().replace(/_/g, " ");
  const parts = normalized.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    const a = parts[0].charAt(0);
    const b = parts[1].charAt(0);
    return `${a}${b}`.toUpperCase();
  }
  if (normalized.length >= 2) return normalized.slice(0, 2).toUpperCase();
  const c = normalized.charAt(0) || "A";
  return `${c}${c}`.toUpperCase();
}
