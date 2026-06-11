import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { hubDirectoryLinkClass } from "@/components/marketing/hub-premium-classes";
import { ListingGridShell } from "@/components/marketing/listing-grid-shell";
import { CommercialSeoPage } from "@/components/marketing/commercial-seo-page";
import { buildPageMetadata, buildWebPageJsonLd } from "@/lib/seo";
import { industryHubEditorial } from "@/content/commercial-editorial";
import { OTRASLI_SLUGS } from "@/lib/site-structure";

type Props = { params: { locale: string } };

export function generateMetadata({ params }: Props): Metadata {
  const { locale } = params;
  const title = "Отрасли: складская логистика";
  const description =
    "Отраслевые направления складской логистики: e-commerce, ритейл, 3PL, фарма, FMCG и склады класса А — с отдельными страницами под ваш контекст.";
  return buildPageMetadata({ locale, pathname: "/otrasli", title, description });
}

export default function Page({ params }: Props) {
  const { locale } = params;
  const title = "Складские отрасли";
  const lead =
    "Выберите профиль склада или цепочки — на каждой странице ниже собраны ориентиры по персоналу, гарантии и типичным сценариям закупки под ваш объект.";
  const kicker = "Отрасли";

  return (
    <CommercialSeoPage
      heroVariant="vertical"
      editorialParagraphs={industryHubEditorial()}
      editorialCalloutParagraphIndex={1}
      crumbs={[{ href: "/", label: "Главная" }, { href: "/otrasli", label: title }]}
      kicker={kicker}
      title={title}
      lead={lead}
      jsonLd={buildWebPageJsonLd({
        locale,
        pathname: "/otrasli",
        name: title,
        description: lead,
      })}
    >
      <ListingGridShell className="max-w-full px-0 py-6 sm:py-8 lg:py-10">
        <h2 className="type-kicker">Разделы</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5">
          {OTRASLI_SLUGS.map((o) => (
            <li key={o.slug}>
              <Link className={hubDirectoryLinkClass} href={`/otrasli/${o.slug}`}>
                <span className="font-display text-lg font-semibold tracking-tight group-hover:text-[var(--accent)]">
                  {o.title.ru}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </ListingGridShell>
    </CommercialSeoPage>
  );
}
