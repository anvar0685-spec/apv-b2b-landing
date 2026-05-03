import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CommercialSeoPage } from "@/components/marketing/commercial-seo-page";
import { HUB_STEPS_GEO } from "@/content/hub-visual-presets";
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
  const title = `Аутсорсинг складского персонала — ${loc.ru} (${reg.ru})`;
  const description = `Аутсорсинг в ${loc.ru}: ставки, время выхода на объект, кейсы — контент по роадмапу.`;
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
  const h1 = `Персонал в ${loc.ru}`;
  const lead = `Гео-посадочная: ${loc.ru} (${reg.ru}).`;

  const hub = "География";
  const kicker = "Локация";

  return (
    <CommercialSeoPage
      heroVariant="atlas"
      hubSteps={HUB_STEPS_GEO}
      crumbs={[
        { href: "/", label: "Главная" },
        { href: "/geografiya", label: hub },
        { href: `/geografiya/${region}`, label: reg.ru },
        { href: `/geografiya/${region}/${city}`, label: loc.ru },
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
