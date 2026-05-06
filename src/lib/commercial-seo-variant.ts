import type { CommercialHeroVariant } from "@/components/marketing/commercial-seo-page";
import { slugVisualVariant } from "@/lib/slug-visual-seed";

/** Герой commercial-шаблона из slug (SSR-детерминированно). */
export function commercialHeroFromSlug(slug: string): CommercialHeroVariant {
  const v = slugVisualVariant(slug);
  if (v === 0) return "ops";
  if (v === 1) return "atlas";
  return "vertical";
}

/** Чередование полосы «мы vs штат vs агентство». */
export function commercialVsStripFromSlug(slug: string): boolean {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h) % 2 === 0;
}

/** Фото-блок «продакшен» (~⅔ страниц). */
export function commercialProductionStripFromSlug(slug: string): boolean {
  let h = 5381;
  for (let i = 0; i < slug.length; i++) {
    h = Math.imul(h, 33) ^ slug.charCodeAt(i);
  }
  return Math.abs(h) % 3 !== 0;
}

/** Разделитель под hero: часть страниц без линии для ритма. */
export function commercialSectionDividerFromSlug(slug: string): boolean | undefined {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  if (h % 5 === 0) return false;
  return undefined;
}
