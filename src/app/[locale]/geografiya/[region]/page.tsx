import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { CommercialSeoPage } from "@/components/marketing/commercial-seo-page";
import { buildPageMetadata, buildWebPageJsonLd } from "@/lib/seo";
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
  const title =
    params.locale === "en"
      ? `Warehouse staffing — ${label.en}`
      : `Аутсорсинг складского персонала — ${label.ru}`;
  const description =
    params.locale === "en"
      ? `Outsourcing teams in ${label.en}: scaffold page for SEO expansion.`
      : `Аутсорсинг персонала в ${label.ru}: каркас раздела под наполнение.`;
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
  const pageTitle = locale === "en" ? `Geography: ${label.en}` : `География: ${label.ru}`;
  const lead =
    locale === "en"
      ? `List of locations inside ${label.en} — each will become a full SEO page.`
      : `Список локаций внутри «${label.ru}» — далее отдельные посадочные с уникальным текстом.`;

  const children =
    region === "moskva"
      ? GEO_MOSCOW_DISTRICTS.map((city) => ({ city, loc: geoLabel(city) }))
      : GEO_MO_CITIES.map((city) => ({ city, loc: geoLabel(city) }));

  const hub = locale === "en" ? "Geography" : "География";
  const kicker = locale === "en" ? "Region" : "Регион";

  return (
    <CommercialSeoPage
      locale={locale}
      crumbs={[
        { href: "/", label: locale === "en" ? "Home" : "Главная" },
        { href: "/geografiya", label: hub },
        { href: `/geografiya/${region}`, label: locale === "en" ? label.en : label.ru },
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
              {locale === "en" ? loc.en : loc.ru}
            </Link>
          </li>
        ))}
      </ul>
    </CommercialSeoPage>
  );
}
