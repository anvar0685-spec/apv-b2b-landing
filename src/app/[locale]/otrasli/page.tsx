import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { hubDirectoryLinkClass } from "@/components/marketing/hub-premium-classes";
import { ListingGridShell } from "@/components/marketing/listing-grid-shell";
import { CommercialSeoPage } from "@/components/marketing/commercial-seo-page";
import { buildPageMetadata, buildWebPageJsonLd } from "@/lib/seo";
import { OTRASLI_SLUGS } from "@/lib/site-structure";

type Props = { params: { locale: string } };

const HUB_TITLE = "Персонал для разных типов складов";
const HUB_LEAD =
  "Выберите направление. Обсудим задачи, требования к работникам и график вашего объекта.";

export function generateMetadata({ params }: Props): Metadata {
  const { locale } = params;
  return buildPageMetadata({
    locale,
    pathname: "/otrasli",
    title: HUB_TITLE,
    description: HUB_LEAD,
  });
}

export default function Page({ params }: Props) {
  const { locale } = params;

  return (
    <CommercialSeoPage
      heroVariant="vertical"
      showPriorityTeasers={false}
      crumbs={[{ href: "/", label: "Главная" }, { href: "/otrasli", label: HUB_TITLE }]}
      kicker="Отрасли"
      title={HUB_TITLE}
      lead={HUB_LEAD}
      jsonLd={buildWebPageJsonLd({
        locale,
        pathname: "/otrasli",
        name: HUB_TITLE,
        description: HUB_LEAD,
      })}
    >
      <ListingGridShell className="max-w-full px-0 py-6 sm:py-8 lg:py-10">
        <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          {OTRASLI_SLUGS.map((o) => (
            <li key={o.slug}>
              <Link className={hubDirectoryLinkClass} href={`/otrasli/${o.slug}`}>
                <span className="font-display text-lg font-semibold tracking-tight group-hover:text-[var(--accent)]">
                  {o.title.ru}
                </span>
                <p className="mt-2 text-sm leading-relaxed text-[var(--neutral-600)] group-hover:text-[var(--neutral-700)]">
                  {o.description.ru}
                </p>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-[var(--neutral-600)]">
          Требования к работникам уточняем для каждого объекта.
        </p>
      </ListingGridShell>
    </CommercialSeoPage>
  );
}
