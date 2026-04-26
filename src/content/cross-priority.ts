import { PROFESSIONS } from "@/content/professions-cities";

/** 30 приоритетных cross «профессия × город» (неделя 5) — Москва, Химки, Подольск × первые 10 профессий. */
const CITIES = ["moskva", "himki", "podolsk"] as const;

export const PRIORITY_CROSS_30 = PROFESSIONS.slice(0, 10).flatMap((p) =>
  CITIES.map((city) => ({ profession: p.slug, city })),
);

export function isPriorityCross(professionSlug: string, citySlug: string): boolean {
  return PRIORITY_CROSS_30.some((x) => x.profession === professionSlug && x.city === citySlug);
}
