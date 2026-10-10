/**
 * Каркас URL: отрасли (`/otrasli`) и география в разделе «Персонал».
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
    title: { ru: "Персонал для складов интернет-магазинов и маркетплейсов", en: "E-commerce warehouse staffing" },
    description: {
      ru: "Подбираем работников для сборки и упаковки заказов, сортировки товара и обработки возвратов. До начала сезона согласуем нужный состав и график смен.",
      en: "Fulfillment staffing, peak seasons and marketplace guarantees in Moscow and the Moscow Oblast.",
    },
  },
  {
    slug: "sklady-riteyla",
    title: { ru: "Персонал для складов розничных сетей", en: "Retail DC staffing" },
    description: {
      ru: "Обсудим команду для приёмки, перемещения и подготовки товара к отгрузке в магазины. Состав работников и график согласуем под операции вашего склада.",
      en: "Distribution centers and retail logistics — shifts aligned with your procedures.",
    },
  },
  {
    slug: "sklady-3pl",
    title: { ru: "Персонал для складов логистических операторов", en: "3PL operator staffing" },
    description: {
      ru: "Организуем работу складской команды на площадке с несколькими заказчиками. Согласуем задачи участков, график, требования к работникам и порядок отчётности.",
      en: "Scalable teams for multi-tenant sites and variable volumes.",
    },
  },
  {
    slug: "proizvodstvennye-sklady",
    title: { ru: "Персонал для производственного склада", en: "Manufacturing warehouse staffing" },
    description: {
      ru: "Обсудим работников для складских и вспомогательных задач на производственной площадке. До подбора уточним операции, условия участков, инструктажи и график.",
      en: "Staffing for manufacturing warehouse flows in FMCG, pharma and electronics.",
    },
  },
  {
    slug: "farmatsevticheskie-sklady",
    title: { ru: "Персонал для фармацевтического склада", en: "Pharma warehouse staffing" },
    description: {
      ru: "Обсудим подбор работников под требования вашего фармацевтического склада. До выхода согласуем задачи, необходимые документы и инструктажи.",
      en: "Storage and serialization requirements respected while supplying shifts.",
    },
  },
  {
    slug: "fmcg-sklady",
    title: { ru: "Персонал для складов товаров повседневного спроса", en: "FMCG warehouse staffing" },
    description: {
      ru: "Обсудим команду для приёмки, комплектации и отгрузки товаров повседневного спроса. Уточним требования к товару, операции и нагрузку по сменам.",
      en: "Turnover speed, palletizing and seasonal peaks without shipping line downtime.",
    },
  },
  {
    slug: "sklady-klassa-a",
    title: { ru: "Персонал для складов класса А и А+", en: "Class A warehouse staffing" },
    description: {
      ru: "Обсудим подбор команды под процессы и требования вашего склада. Согласуем задачи участков, навыки работников, доступ и график.",
      en: "Teams for Class A facilities: WMS, KPIs and premium infrastructure standards.",
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

/** Пары регион/город для локальных programmatic-копирайтов (не публичные URL). */
export function geoStaticParams(): { region: GeoRegionSlug; city: string }[] {
  const msk = GEO_MOSCOW_DISTRICTS.map((city) => ({ region: "moskva" as const, city }));
  const mo = GEO_MO_CITIES.map((city) => ({ region: "moskovskaya-oblast" as const, city }));
  return [...msk, ...mo];
}

export function allMultipageSeoPaths(): string[] {
  const paths: string[] = ["/otrasli"];
  for (const o of OTRASLI_SLUGS) paths.push(`/otrasli/${o.slug}`);
  return paths;
}
