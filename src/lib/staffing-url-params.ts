import { CITIES, PROFESSIONS } from "@/content/professions-cities";

const DEFAULT_PROFESSION = "gruzchiki";
const DEFAULT_CITY = "moskva";

export function isValidProfessionSlug(slug: string): boolean {
  return PROFESSIONS.some((p) => p.slug === slug);
}

export function isValidCitySlug(slug: string): boolean {
  return CITIES.some((c) => c.slug === slug);
}

export function resolveProfessionSlug(raw: string | null | undefined): string {
  const v = raw?.trim();
  if (v && isValidProfessionSlug(v)) return v;
  return DEFAULT_PROFESSION;
}

export function resolveCitySlug(raw: string | null | undefined): string {
  const v = raw?.trim();
  if (v && isValidCitySlug(v)) return v;
  return DEFAULT_CITY;
}

/** Калькулятор: `p`, `city`, `n` */
export function parseCalculatorSearchParams(sp: URLSearchParams | ReadonlyMap<string, string> | null) {
  const get = (k: string) => {
    if (!sp) return null;
    if (sp instanceof URLSearchParams) return sp.get(k);
    return sp.get(k) ?? null;
  };
  const profession = resolveProfessionSlug(get("p"));
  const city = resolveCitySlug(get("city"));
  const nRaw = get("n");
  const headcount = nRaw ? Math.max(1, Number(nRaw) || 30) : 30;
  return { profession, city, headcount };
}

/** Заявка: `profession` или `p`, `city`, `headcount` */
export function parseLeadSearchParams(sp: URLSearchParams | ReadonlyMap<string, string> | null) {
  const get = (k: string) => {
    if (!sp) return null;
    if (sp instanceof URLSearchParams) return sp.get(k);
    return sp.get(k) ?? null;
  };
  const profession = resolveProfessionSlug(get("profession") ?? get("p"));
  const city = resolveCitySlug(get("city"));
  const hRaw = get("headcount") ?? get("n");
  const headcount = hRaw ? Math.max(1, Number(hRaw) || 20) : 20;
  const service = get("service") ?? "autsorsing";
  return { profession, city, headcount, service };
}

export function buildCalculatorHref(input: {
  profession: string;
  city: string;
  headcount?: number;
}): string {
  const p = resolveProfessionSlug(input.profession);
  const city = resolveCitySlug(input.city);
  const q = new URLSearchParams({ p, city });
  if (input.headcount != null && input.headcount > 0) {
    q.set("n", String(Math.round(input.headcount)));
  }
  return `/kalkulyator?${q.toString()}`;
}

export function buildZayavkaHref(input: {
  profession: string;
  city: string;
  headcount?: number;
  service?: string;
}): string {
  const profession = resolveProfessionSlug(input.profession);
  const city = resolveCitySlug(input.city);
  const q = new URLSearchParams({
    service: input.service ?? "autsorsing",
    profession,
    city,
  });
  if (input.headcount != null && input.headcount > 0) {
    q.set("headcount", String(Math.round(input.headcount)));
  }
  return `/zayavka?${q.toString()}`;
}
