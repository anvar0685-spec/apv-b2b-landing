import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { CommercialSeoPage } from "@/components/marketing/commercial-seo-page";
import { buildPageMetadata, buildWebPageJsonLd } from "@/lib/seo";
import { HUB_STEPS_INDUSTRY } from "@/content/hub-visual-presets";
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
    "Выберите профиль склада или цепочки — на каждой странице ниже собраны ориентиры по персоналу, SLA и типичным сценариям закупки под ваш объект.";
  const kicker = "Отрасли";

  return (
    <CommercialSeoPage
      heroVariant="vertical"
      hubSteps={HUB_STEPS_INDUSTRY}
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
      <h2 className="type-kicker">Разделы</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {OTRASLI_SLUGS.map((o) => (
          <li key={o.slug}>
            <Link
              className="group block rounded-2xl border border-[var(--neutral-200)] bg-[var(--surface)] p-5 text-[var(--primary)] shadow-[var(--card-shadow)] transition hover:border-[color-mix(in_srgb,var(--accent)_40%,var(--neutral-200))] hover:shadow-[var(--card-shadow-hover)] dark:border-white/10 dark:bg-[var(--card)]"
              href={`/otrasli/${o.slug}`}
            >
              <span className="font-display text-lg font-semibold tracking-tight group-hover:text-[var(--accent)]">
                {o.title.ru}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </CommercialSeoPage>
  );
}
