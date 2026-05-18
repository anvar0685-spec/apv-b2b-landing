import type { Metadata } from "next";
import { site } from "@/config/site";
import { absUrl } from "@/lib/abs-url";

export type PageSeoInput = {
  locale: string;
  /** Путь без префикса локали, с ведущим слэшем, напр. `/otrasli/sklady-e-commerce` */
  pathname: string;
  title: string;
  description: string;
  /** Дополнительно для услуг и хабов */
  keywords?: string[];
  /** Закрыть страницу от индексации, но оставить follow (для тонких/повторяющихся страниц вне приоритетного кластера). */
  noindex?: boolean;
};

/**
 * Единая точка для title/description/canonical + Open Graph + Twitter.
 * Дефолтный `og:image` / `twitter:image` — маршрут `opengraph-image` (страницы при необходимости переопределяют).
 */
export function buildServiceJsonLd(input: {
  locale: string;
  pathname: string;
  name: string;
  description: string;
}) {
  const { locale, pathname, name, description } = input;
  const brand = site.brandName.replace(/_/g, " ");
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Аутсорсинг складского персонала",
    name,
    description,
    url: absUrl(pathname, locale),
    provider: {
      "@type": "Organization",
      name: brand,
      url: absUrl("/", locale),
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Москва и Московская область",
    },
  };
}

export function buildWebPageJsonLd(input: {
  locale: string;
  pathname: string;
  name: string;
  description: string;
}) {
  const { locale, pathname, name, description } = input;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: absUrl(pathname, locale),
    inLanguage: "ru-RU",
  };
}

export function buildPageMetadata({
  locale,
  pathname,
  title,
  description,
  keywords,
  noindex,
}: PageSeoInput): Metadata {
  const canonical = absUrl(pathname, locale);
  const brand = site.brandName.replace(/_/g, " ");
  const fullTitle = title.includes(brand) ? title : `${title} | ${brand}`;
  const ogImage = absUrl("/opengraph-image", locale);

  return {
    title: fullTitle,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: { canonical },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: brand,
      locale: "ru_RU",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}
