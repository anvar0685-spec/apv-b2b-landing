import type { Metadata } from "next";
import { site } from "@/config/site";
import { absUrl } from "@/lib/abs-url";

export type PageSeoInput = {
  locale: string;
  /** Путь без префикса локали, с ведущим слэшем, напр. `/otrasli/sklady-e-commerce` */
  pathname: string;
  title: string;
  description: string;
};

/**
 * Единая точка для title/description/canonical + Open Graph + Twitter (§3.3 мастер-документа).
 * og:image подключается на уровне layout/opengraph-image при необходимости.
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
    serviceType: locale === "en" ? "Warehouse shift outsourcing" : "Аутсорсинг складского персонала",
    name,
    description,
    url: absUrl(pathname, locale),
    provider: {
      "@type": "Organization",
      name: brand,
      url: site.url.replace(/\/$/, ""),
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: locale === "en" ? "Moscow and Moscow Oblast" : "Москва и Московская область",
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
    inLanguage: locale === "en" ? "en-RU" : "ru-RU",
  };
}

export function buildPageMetadata({ locale, pathname, title, description }: PageSeoInput): Metadata {
  const canonical = absUrl(pathname, locale);
  const brand = site.brandName.replace(/_/g, " ");
  const fullTitle = title.includes(brand) ? title : `${title} | ${brand}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: brand,
      locale: locale === "en" ? "en_US" : "ru_RU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
