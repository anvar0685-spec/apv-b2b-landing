import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { CommercialSeoPage } from "@/components/marketing/commercial-seo-page";
import { buildPageMetadata, buildWebPageJsonLd } from "@/lib/seo";
import { GEO_REGION_SLUGS, geoLabel } from "@/lib/site-structure";

type Props = { params: { locale: string } };

export function generateMetadata({ params }: Props): Metadata {
  const { locale } = params;
  const title = locale === "en" ? "Geography: Moscow & MO" : "География: Москва и МО";
  const description =
    locale === "en"
      ? "Regional hub for warehouse staffing SEO pages."
      : "Региональный хаб посадочных под аутсорсинг на складах.";
  return buildPageMetadata({ locale, pathname: "/geografiya", title, description });
}

export default function Page({ params }: Props) {
  const { locale } = params;
  const title = locale === "en" ? "Geography" : "География";
  const lead =
    locale === "en"
      ? "Moscow districts and key cities in the Moscow Oblast — landing scaffold per master prompt §5."
      : "Округа Москвы и ключевые города МО — каркас посадочных по §5 мастер-документа.";
  const kicker = locale === "en" ? "Geography" : "География";

  return (
    <CommercialSeoPage
      locale={locale}
      crumbs={[{ href: "/", label: locale === "en" ? "Home" : "Главная" }, { href: "/geografiya", label: title }]}
      kicker={kicker}
      title={title}
      lead={lead}
      jsonLd={buildWebPageJsonLd({
        locale,
        pathname: "/geografiya",
        name: title,
        description: lead,
      })}
    >
      <ul className="grid gap-3 sm:grid-cols-2">
        {GEO_REGION_SLUGS.map((slug) => (
          <li key={slug}>
            <Link
              className="group block rounded-2xl border border-[var(--neutral-200)] bg-[var(--surface)] p-5 text-[var(--primary)] shadow-[var(--card-shadow)] transition hover:border-[color-mix(in_srgb,var(--accent)_40%,var(--neutral-200))] hover:shadow-[var(--card-shadow-hover)] dark:border-white/10 dark:bg-[var(--card)]"
              href={`/geografiya/${slug}`}
            >
              <span className="font-display text-lg font-semibold tracking-tight group-hover:text-[var(--accent)]">
                {locale === "en" ? geoLabel(slug).en : geoLabel(slug).ru}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </CommercialSeoPage>
  );
}
