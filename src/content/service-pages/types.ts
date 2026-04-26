export type ServiceFAQ = { q: string; a: string };

export type ServiceLocaleBlock = {
  h1: string;
  subtitle: string;
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
