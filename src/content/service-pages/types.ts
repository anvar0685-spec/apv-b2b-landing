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
  /** Заголовок блока вводного текста (по умолчанию «Об услуге»). */
  overviewTitle?: string;
  /** Заголовок блока карточек под вводным (по умолчанию «Кому подходит»). */
  segmentsTitle?: string;
  segments: { title: string; text: string }[];
  howItWorks: string[];
  includes: { name: string; included: boolean }[];
  comparison: { label: string; us: string; staff: string; agency: string }[];
  /** Короткое описание модели вместо таблицы сравнения (если задано). */
  positioningNote?: string;
  positioningLink?: { href: string; label: string };
  howLead?: string;
  casesLead?: string;
  finalCta?: { title: string; lead: string };
  faq: ServiceFAQ[];
};

export type ServicePageBilingual = {
  slug: string;
  ru: ServiceLocaleBlock;
  en: ServiceLocaleBlock;
};
