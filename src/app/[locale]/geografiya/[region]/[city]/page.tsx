import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CommercialSeoPage } from "@/components/marketing/commercial-seo-page";
import { buildPageMetadata, buildWebPageJsonLd } from "@/lib/seo";
import {
  GEO_MOSCOW_DISTRICTS,
  GEO_MO_CITIES,
  type GeoRegionSlug,
  geoLabel,
  geoStaticParams,
} from "@/lib/site-structure";

type Props = { params: { locale: string; region: string; city: string } };

export function generateStaticParams() {
  return geoStaticParams().map(({ region, city }) => ({ region, city }));
}

function isValidPair(region: string, city: string): region is GeoRegionSlug {
  if (region === "moskva") return (GEO_MOSCOW_DISTRICTS as readonly string[]).includes(city);
  if (region === "moskovskaya-oblast") return (GEO_MO_CITIES as readonly string[]).includes(city);
  return false;
}

export function generateMetadata({ params }: Props): Metadata {
  const { locale, region, city } = params;
  if (!isValidPair(region, city)) return {};
  const loc = geoLabel(city);
  const reg = geoLabel(region);
  const title =
    locale === "en"
      ? `Warehouse staffing — ${loc.en} (${reg.en})`
      : `Аутсорсинг складского персонала — ${loc.ru} (${reg.ru})`;
  const description =
    locale === "en"
      ? `Outsourcing in ${loc.en}: rates, logistics reaction time, cases — content TBD.`
      : `Аутсорсинг в ${loc.ru}: ставки, время выхода на объект, кейсы — контент по роадмапу.`;
  return buildPageMetadata({
    locale,
    pathname: `/geografiya/${region}/${city}`,
    title,
    description,
  });
}

export default function Page({ params }: Props) {
  const { locale, region, city } = params;
  if (!isValidPair(region, city)) notFound();

  const loc = geoLabel(city);
  const reg = geoLabel(region);
  const h1 = locale === "en" ? `Staffing in ${loc.en}` : `Персонал в ${loc.ru}`;
  const lead =
    locale === "en"
      ? `Geo landing for ${loc.en} within ${reg.en}.`
      : `Гео-посадочная: ${loc.ru} (${reg.ru}).`;

  const hub = locale === "en" ? "Geography" : "География";
  const kicker = locale === "en" ? "Geo" : "Локация";

  return (
    <CommercialSeoPage
      locale={locale}
      crumbs={[
        { href: "/", label: locale === "en" ? "Home" : "Главная" },
        { href: "/geografiya", label: hub },
        { href: `/geografiya/${region}`, label: locale === "en" ? reg.en : reg.ru },
        { href: `/geografiya/${region}/${city}`, label: locale === "en" ? loc.en : loc.ru },
      ]}
      kicker={kicker}
      title={h1}
      lead={lead}
      showPriorityTeasers
      jsonLd={buildWebPageJsonLd({
        locale,
        pathname: `/geografiya/${region}/${city}`,
        name: h1,
        description: lead,
      })}
    />
  );
}
