import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { CommercialSeoPage } from "@/components/marketing/commercial-seo-page";
import { buildPageMetadata, buildWebPageJsonLd } from "@/lib/seo";
import { PLOSHCHADKI_SLUGS } from "@/lib/site-structure";

type Props = { params: { locale: string } };

export function generateMetadata({ params }: Props): Metadata {
  const { locale } = params;
  const title = locale === "en" ? "Marketplace & retail platforms" : "Площадки и маркетплейсы";
  const description =
    locale === "en"
      ? "Dedicated landing pages for major marketplace logistics sites."
      : "Отдельные посадочные под крупные маркетплейсы и логистические бренды.";
  return buildPageMetadata({ locale, pathname: "/ploshchadki", title, description });
}

export default function Page({ params }: Props) {
  const { locale } = params;
  const title = locale === "en" ? "Platforms" : "Площадки";
  const lead =
    locale === "en"
      ? "SEO hub for marketplace-specific staffing pages (master prompt §5)."
      : "SEO-хаб под посадочные «персонал под конкретную площадку» (мастер-документ §5).";
  const kicker = locale === "en" ? "Platforms" : "Площадки";

  return (
    <CommercialSeoPage
      locale={locale}
      crumbs={[
        { href: "/", label: locale === "en" ? "Home" : "Главная" },
        { href: "/ploshchadki", label: title },
      ]}
      kicker={kicker}
      title={title}
      lead={lead}
      jsonLd={buildWebPageJsonLd({
        locale,
        pathname: "/ploshchadki",
        name: title,
        description: lead,
      })}
    >
      <ul className="grid gap-3 sm:grid-cols-2">
        {PLOSHCHADKI_SLUGS.map((p) => (
          <li key={p.slug}>
            <Link
              className="group block rounded-2xl border border-[var(--neutral-200)] bg-[var(--surface)] p-5 text-[var(--primary)] shadow-[var(--card-shadow)] transition hover:border-[color-mix(in_srgb,var(--accent)_40%,var(--neutral-200))] hover:shadow-[var(--card-shadow-hover)] dark:border-white/10 dark:bg-[var(--card)]"
              href={`/ploshchadki/${p.slug}`}
            >
              <span className="font-display text-lg font-semibold tracking-tight group-hover:text-[var(--accent)]">
                {locale === "en" ? p.title.en : p.title.ru}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </CommercialSeoPage>
  );
}
