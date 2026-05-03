import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { CommercialSeoPage } from "@/components/marketing/commercial-seo-page";
import { buildPageMetadata, buildWebPageJsonLd } from "@/lib/seo";
import { MoDistrictMap } from "@/components/marketing/mo-district-map";
import { geoHubEditorial } from "@/content/commercial-editorial";
import { HUB_STEPS_GEO } from "@/content/hub-visual-presets";
import { GEO_REGION_SLUGS, geoLabel } from "@/lib/site-structure";

type Props = { params: { locale: string } };

export function generateMetadata({ params }: Props): Metadata {
  const { locale } = params;
  const title = "География: Москва и МО";
  const description = "Региональный хаб посадочных под аутсорсинг на складах.";
  return buildPageMetadata({ locale, pathname: "/geografiya", title, description });
}

export default function Page({ params }: Props) {
  const { locale } = params;
  const title = "География";
  const lead = "Округа Москвы и ключевые города Московской области — выберите локацию, чтобы перейти к странице с контекстом по региону.";
  const kicker = "География";

  return (
    <CommercialSeoPage
      heroVariant="atlas"
      hubSteps={HUB_STEPS_GEO}
      bodyTone="geo"
      editorialParagraphs={geoHubEditorial()}
      crumbs={[{ href: "/", label: "Главная" }, { href: "/geografiya", label: title }]}
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
      <MoDistrictMap />
      <ul className="mt-10 grid gap-3 sm:grid-cols-2">
        {GEO_REGION_SLUGS.map((slug) => (
          <li key={slug}>
            <Link
              className="group block rounded-2xl border border-[var(--neutral-200)] bg-[var(--surface)] p-5 text-[var(--primary)] shadow-[var(--card-shadow)] transition hover:border-[color-mix(in_srgb,var(--accent)_40%,var(--neutral-200))] hover:shadow-[var(--card-shadow-hover)] dark:border-white/10 dark:bg-[var(--card)]"
              href={`/geografiya/${slug}`}
            >
              <span className="font-display text-lg font-semibold tracking-tight group-hover:text-[var(--accent)]">
                {geoLabel(slug).ru}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </CommercialSeoPage>
  );
}
