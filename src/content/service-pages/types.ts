export type ServiceFAQ = { q: string; a: string };

export type ServiceLocaleBlock = {
  h1: string;
  /** Лид под заголовком на странице услуги */
  subtitle: string;
  /** Title для `<title>` / OG — если не задан, в мета уходит `h1` */
  metaTitle?: string;
  /** Meta description — если не задан, используется `subtitle` */
  metaDescription?: string;
  /** Ключевые слова для `<meta name="keywords">` (опционально) */
  metaKeywords?: string[];
  /** Для JSON-LD `Service.serviceType` вместо технического slug */
  schemaServiceType?: string;
  intro: string[];
  segments: { title: string; text: string }[];
  howItWorks: string[];
  includes: { name: string; included: boolean }[];
  comparison: { label: string; us: string; staff: string; agency: string }[];
  faq: ServiceFAQ[];
};

export type ServicePageBilingual = {
  slug: string;
  ru: ServiceLocaleBlock;
  en: ServiceLocaleBlock;
};
