/** Детерминированный вариант «украшения» из slug (без random на SSR). */
export function pairingVisualVariant(profSlug: string, citySlug: string): 0 | 1 | 2 {
  const s = `${profSlug}\0${citySlug}`;
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (Math.abs(h) % 3) as 0 | 1 | 2;
}

export function slugVisualVariant(slug: string): 0 | 1 | 2 {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (Math.abs(h) % 3) as 0 | 1 | 2;
}

export function variantClass(v: 0 | 1 | 2): "ux-prog-v0" | "ux-prog-v1" | "ux-prog-v2" {
  return v === 0 ? "ux-prog-v0" : v === 1 ? "ux-prog-v1" : "ux-prog-v2";
}
