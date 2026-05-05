import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { hubDirectoryLinkClass } from "@/components/marketing/hub-premium-classes";
import { ListingGridShell } from "@/components/marketing/listing-grid-shell";
import { CommercialSeoPage } from "@/components/marketing/commercial-seo-page";
import { buildPageMetadata, buildWebPageJsonLd } from "@/lib/seo";
import { MoDistrictMap } from "@/components/marketing/mo-district-map";
import { geoHubEditorial } from "@/content/commercial-editorial";
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
      <ListingGridShell className="max-w-full px-0 py-8 sm:py-10 lg:py-12">
        <p className="type-kicker">Регионы</p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5">
          {GEO_REGION_SLUGS.map((slug) => (
            <li key={slug}>
              <Link className={hubDirectoryLinkClass} href={`/geografiya/${slug}`}>
                <span className="font-display text-lg font-semibold tracking-tight group-hover:text-[var(--accent)]">
                  {geoLabel(slug).ru}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </ListingGridShell>
    </CommercialSeoPage>
  );
}
