import { SERVICE_PAGES_BILINGUAL } from "@/content/service-pages";
import type { ServiceLocaleBlock } from "@/content/service-pages/types";

/** Плоская модель для компонентов (одна локаль). */
export type ServicePageModel = ServiceLocaleBlock & { slug: string };

export type ServiceFAQ = import("@/content/service-pages/types").ServiceFAQ;

export function getServicePage(slug: string, locale = "ru"): ServicePageModel | null {
  const b = SERVICE_PAGES_BILINGUAL[slug];
  if (!b) return null;
  const block = locale === "en" ? b.en : b.ru;
  return { slug: b.slug, ...block };
}
