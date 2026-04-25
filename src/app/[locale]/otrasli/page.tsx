import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { CommercialSeoPage } from "@/components/marketing/commercial-seo-page";
import { buildPageMetadata, buildWebPageJsonLd } from "@/lib/seo";
import { OTRASLI_SLUGS } from "@/lib/site-structure";

type Props = { params: { locale: string } };

export function generateMetadata({ params }: Props): Metadata {
  const { locale } = params;
  const title = locale === "en" ? "Industries we serve" : "Отрасли: складская логистика";
  const description =
    locale === "en"
      ? "E-commerce, retail DCs, 3PL, pharma and Class A warehouses — outsourcing structure."
      : "E-commerce, ритейл, 3PL, фарма и склады класса А — структура раздела под SEO.";
  return buildPageMetadata({ locale, pathname: "/otrasli", title, description });
}

export default function Page({ params }: Props) {
  const { locale } = params;
  const title = locale === "en" ? "Warehouse industries" : "Складские отрасли";
  const lead =
    locale === "en"
      ? "Hub for industry landing pages (section 5 of the master prompt). Each page will get unique copy."
      : "Хаб отраслевых посадочных (раздел 5 мастер-документа). Уникальные тексты подключаются из content/industries.";
  const kicker = locale === "en" ? "Industries" : "Отрасли";

  return (
    <CommercialSeoPage
      locale={locale}
      crumbs={[{ href: "/", label: locale === "en" ? "Home" : "Главная" }, { href: "/otrasli", label: title }]}
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
      <h2 className="type-kicker">{locale === "en" ? "Sections" : "Разделы"}</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {OTRASLI_SLUGS.map((o) => (
          <li key={o.slug}>
            <Link
              className="group block rounded-2xl border border-[var(--neutral-200)] bg-[var(--surface)] p-5 text-[var(--primary)] shadow-[var(--card-shadow)] transition hover:border-[color-mix(in_srgb,var(--accent)_40%,var(--neutral-200))] hover:shadow-[var(--card-shadow-hover)] dark:border-white/10 dark:bg-[var(--card)]"
              href={`/otrasli/${o.slug}`}
            >
              <span className="font-display text-lg font-semibold tracking-tight group-hover:text-[var(--accent)]">
                {locale === "en" ? o.title.en : o.title.ru}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </CommercialSeoPage>
  );
}
