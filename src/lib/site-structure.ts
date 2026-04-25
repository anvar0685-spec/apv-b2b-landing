/**
 * Каркас URL из my-guide/COMPOSER-2-MASTER-PROMPT.md §5 (отрасли, площадки, география).
 * Заголовки/описания — черновик для SSG и sitemap; полный текст — из /content и my-guide/content.
 */

export type LocalizedLabel = { ru: string; en: string };

export type SlugPageDef = {
  slug: string;
  title: LocalizedLabel;
  description: LocalizedLabel;
};

/** /otrasli/[slug] */
export const OTRASLI_SLUGS: readonly SlugPageDef[] = [
  {
    slug: "sklady-e-commerce",
    title: { ru: "Аутсорсинг на склады e-commerce", en: "E-commerce warehouse staffing" },
    description: {
      ru: "Персонал под fulfillment, пики продаж и SLA маркетплейсов в Москве и МО.",
      en: "Fulfillment staffing, peak seasons and marketplace SLAs in Moscow and the Moscow Oblast.",
    },
  },
  {
    slug: "sklady-riteyla",
    title: { ru: "Аутсорсинг на склады ритейла", en: "Retail DC staffing" },
    description: {
      ru: "Распределительные центры и складская логистика ритейла — смены под ваши регламенты.",
      en: "Distribution centers and retail logistics — shifts aligned with your procedures.",
    },
  },
  {
    slug: "sklady-3pl",
    title: { ru: "Аутсорсинг для 3PL-операторов", en: "3PL operator staffing" },
    description: {
      ru: "Масштабируемые команды под мульти-клиентские площадки и переменный объём.",
      en: "Scalable teams for multi-tenant sites and variable volumes.",
    },
  },
  {
    slug: "proizvodstvennye-sklady",
    title: { ru: "Производственные склады", en: "Manufacturing warehouse staffing" },
    description: {
      ru: "Персонал под производственные складские контуры FMCG, фармы, электроники.",
      en: "Staffing for manufacturing warehouse flows in FMCG, pharma and electronics.",
    },
  },
  {
    slug: "farmatsevticheskie-sklady",
    title: { ru: "Фармацевтические склады", en: "Pharma warehouse staffing" },
    description: {
      ru: "Соблюдение регламентов хранения и сериализации при поставке смен.",
      en: "Storage and serialization requirements respected while supplying shifts.",
    },
  },
  {
    slug: "fmcg-sklady",
    title: { ru: "FMCG-склады", en: "FMCG warehouse staffing" },
    description: {
      ru: "Скорость оборота, паллетизация, сезонные пики — без простоя линий отгрузки.",
      en: "Turnover speed, palletizing and seasonal peaks without shipping line downtime.",
    },
  },
  {
    slug: "sklady-klassa-a",
    title: { ru: "Склады класса А и А+", en: "Class A warehouse staffing" },
    description: {
      ru: "Персонал под высокие стандарты WMS, KPI и инфраструктуры класса А.",
      en: "Teams for Class A facilities: WMS, KPIs and premium infrastructure standards.",
    },
  },
] as const;

/** /ploshchadki/[slug] — как в §5 (расширение под KazanExpress и т.д. — по согласованию). */
export const PLOSHCHADKI_SLUGS: readonly SlugPageDef[] = [
  {
    slug: "wildberries",
    title: { ru: "Персонал под площадки Wildberries", en: "Staffing for Wildberries sites" },
    description: {
      ru: "Аутсорсинг складских профессий под требования крупных площадок WB.",
      en: "Warehouse role outsourcing aligned with large WB site requirements.",
    },
  },
  {
    slug: "ozon",
    title: { ru: "Персонал под склады Ozon", en: "Staffing for Ozon warehouses" },
    description: {
      ru: "Смены, явка и замены под высокую интенсивность e-com линий.",
      en: "Shifts, attendance and replacements for high-intensity e-com lines.",
    },
  },
  {
    slug: "yandex-market",
    title: { ru: "Персонал под Яндекс.Маркет", en: "Staffing for Yandex Market" },
    description: {
      ru: "Подбор и выход бригад под логистические хабы маркетплейса.",
      en: "Team mobilization for the marketplace logistics hubs.",
    },
  },
  {
    slug: "lamoda",
    title: { ru: "Персонал под Lamoda", en: "Staffing for Lamoda" },
    description: {
      ru: "Fashion fulfillment: комплектовка, упаковка, сортировка.",
      en: "Fashion fulfillment: picking, packing and sorting.",
    },
  },
  {
    slug: "sber-market",
    title: { ru: "Персонал под СберМегаМаркет", en: "Staffing for SberMegaMarket" },
    description: {
      ru: "Аутсорсинг под распределительную сеть и логистику экосистемы.",
      en: "Outsourcing for the ecosystem distribution and logistics network.",
    },
  },
] as const;

export const GEO_REGION_SLUGS = ["moskva", "moskovskaya-oblast"] as const;
export type GeoRegionSlug = (typeof GEO_REGION_SLUGS)[number];

export const GEO_MOSCOW_DISTRICTS = [
  "vao",
  "zao",
  "sao",
  "svao",
  "yuao",
  "yuvao",
  "yuzao",
  "szao",
] as const;

export const GEO_MO_CITIES = [
  "khimki",
  "mytischi",
  "podolsk",
  "domodedovo",
  "krasnogorsk",
  "balashikha",
  "dolgoprudnyy",
  "reutov",
  "lyubertsy",
  "odintsovo",
  "elektrostal",
  "noginsk",
  "schelkovo",
  "dmitrov",
  "kotelniki",
  "chekhov",
  "klimovsk",
] as const;

const GEO_LABELS: Record<string, LocalizedLabel> = {
  moskva: { ru: "Москва", en: "Moscow" },
  "moskovskaya-oblast": { ru: "Московская область", en: "Moscow Oblast" },
  vao: { ru: "ВАО", en: "Eastern Administrative Okrug" },
  zao: { ru: "ЗАО", en: "Western Administrative Okrug" },
  sao: { ru: "САО", en: "Northern Administrative Okrug" },
  svao: { ru: "СВАО", en: "North-Eastern Administrative Okrug" },
  yuao: { ru: "ЮАО", en: "Southern Administrative Okrug" },
  yuvao: { ru: "ЮВАО", en: "South-Eastern Administrative Okrug" },
  yuzao: { ru: "ЮЗАО", en: "South-Western Administrative Okrug" },
  szao: { ru: "СЗАО", en: "North-Western Administrative Okrug" },
  khimki: { ru: "Химки", en: "Khimki" },
  mytischi: { ru: "Мытищи", en: "Mytishchi" },
  podolsk: { ru: "Подольск", en: "Podolsk" },
  domodedovo: { ru: "Домодедово", en: "Domodedovo" },
  krasnogorsk: { ru: "Красногорск", en: "Krasnogorsk" },
  balashikha: { ru: "Балашиха", en: "Balashikha" },
  dolgoprudnyy: { ru: "Долгопрудный", en: "Dolgoprudny" },
  reutov: { ru: "Реутов", en: "Reutov" },
  lyubertsy: { ru: "Люберцы", en: "Lyubertsy" },
  odintsovo: { ru: "Одинцово", en: "Odintsovo" },
  elektrostal: { ru: "Электросталь", en: "Elektrostal" },
  noginsk: { ru: "Ногинск", en: "Noginsk" },
  schelkovo: { ru: "Щёлково", en: "Shchyolkovo" },
  dmitrov: { ru: "Дмитров", en: "Dmitrov" },
  kotelniki: { ru: "Котельники", en: "Kotelniki" },
  chekhov: { ru: "Чехов", en: "Chekhov" },
  klimovsk: { ru: "Климовск", en: "Klimovsk" },
};

export function geoLabel(slug: string): LocalizedLabel {
  return GEO_LABELS[slug] ?? { ru: slug, en: slug };
}

/** Пары для /geografiya/[region]/[city] */
export function geoStaticParams(): { region: GeoRegionSlug; city: string }[] {
  const msk = GEO_MOSCOW_DISTRICTS.map((city) => ({ region: "moskva" as const, city }));
  const mo = GEO_MO_CITIES.map((city) => ({ region: "moskovskaya-oblast" as const, city }));
  return [...msk, ...mo];
}

export function allMultipageSeoPaths(): string[] {
  const paths = ["/otrasli", "/ploshchadki", "/geografiya"];
  for (const o of OTRASLI_SLUGS) paths.push(`/otrasli/${o.slug}`);
  for (const p of PLOSHCHADKI_SLUGS) paths.push(`/ploshchadki/${p.slug}`);
  for (const r of GEO_REGION_SLUGS) paths.push(`/geografiya/${r}`);
  for (const { region, city } of geoStaticParams()) paths.push(`/geografiya/${region}/${city}`);
  return paths;
}
