import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { CommercialSeoPage } from "@/components/marketing/commercial-seo-page";
import {
  commercialHeroFromSlug,
  commercialProductionStripFromSlug,
  commercialSectionDividerFromSlug,
  commercialVsStripFromSlug,
} from "@/lib/commercial-seo-variant";
import { buildPageMetadata, buildWebPageJsonLd } from "@/lib/seo";
import { geoRegionEditorial } from "@/content/commercial-editorial";
import {
  GEO_MOSCOW_DISTRICTS,
  GEO_MO_CITIES,
  GEO_REGION_SLUGS,
  type GeoRegionSlug,
  geoLabel,
} from "@/lib/site-structure";

type Props = { params: { locale: string; region: string } };

export function generateStaticParams() {
  return GEO_REGION_SLUGS.map((region) => ({ region }));
}

export function generateMetadata({ params }: Props): Metadata {
  if (!GEO_REGION_SLUGS.includes(params.region as GeoRegionSlug)) return {};
  const label = geoLabel(params.region);
  const title = `Аутсорсинг складского персонала — ${label.ru}`;
  const description = `Аутсорсинг персонала в ${label.ru}: каркас раздела под наполнение.`;
  return buildPageMetadata({
    locale: params.locale,
    pathname: `/geografiya/${params.region}`,
    title,
    description,
  });
}

export default function Page({ params }: Props) {
  if (!GEO_REGION_SLUGS.includes(params.region as GeoRegionSlug)) notFound();

  const { locale, region } = params;
  const label = geoLabel(region);
  const pageTitle = `География: ${label.ru}`;
  const lead = `Список локаций внутри «${label.ru}» — далее отдельные посадочные с уникальным текстом.`;

  const children =
    region === "moskva"
      ? GEO_MOSCOW_DISTRICTS.map((city) => ({ city, loc: geoLabel(city) }))
      : GEO_MO_CITIES.map((city) => ({ city, loc: geoLabel(city) }));

  const hub = "География";
  const kicker = "Регион";

  const editorial = geoRegionEditorial(region);

  return (
    <CommercialSeoPage
      heroVariant={commercialHeroFromSlug(region)}
      showComparisonStrip={commercialVsStripFromSlug(region)}
      showProductionVisualStrip={commercialProductionStripFromSlug(region)}
      showSectionDivider={commercialSectionDividerFromSlug(region)}
      editorialParagraphs={editorial}
      crumbs={[
        { href: "/", label: "Главная" },
        { href: "/geografiya", label: hub },
        { href: `/geografiya/${region}`, label: label.ru },
      ]}
      kicker={kicker}
      title={pageTitle}
      lead={lead}
      jsonLd={buildWebPageJsonLd({
        locale,
        pathname: `/geografiya/${region}`,
        name: pageTitle,
        description: lead,
      })}
    >
      <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {children.map(({ city, loc }) => (
          <li key={city}>
            <Link
              className="block rounded-xl border border-[var(--neutral-200)] bg-[var(--surface)] px-4 py-3 text-sm font-medium text-[var(--primary)] transition hover:border-[color-mix(in_srgb,var(--accent)_35%,var(--neutral-200))] hover:text-[var(--accent)] dark:border-white/10 dark:bg-[var(--card)]"
              href={`/geografiya/${region}/${city}`}
            >
              {loc.ru}
            </Link>
          </li>
        ))}
      </ul>
    </CommercialSeoPage>
  );
}
