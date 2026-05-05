import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { CommercialSeoPage } from "@/components/marketing/commercial-seo-page";
import { ListingGridShell } from "@/components/marketing/listing-grid-shell";
import { buildPageMetadata, buildWebPageJsonLd } from "@/lib/seo";
import { HUB_STEPS_PLATFORM } from "@/content/hub-visual-presets";
import { platformHubEditorial } from "@/content/commercial-editorial";
import { PLOSHCHADKI_SLUGS } from "@/lib/site-structure";

type Props = { params: { locale: string } };

export function generateMetadata({ params }: Props): Metadata {
  const { locale } = params;
  const title = "Площадки и маркетплейсы";
  const description = "Отдельные посадочные под крупные маркетплейсы и логистические бренды.";
  return buildPageMetadata({ locale, pathname: "/ploshchadki", title, description });
}

export default function Page({ params }: Props) {
  const { locale } = params;
  const title = "Площадки";
  const lead =
    "Маркетплейсы и логистические бренды задают свои правила допуска и графики — ниже отдельные страницы под персонал конкретной площадки.";
  const kicker = "Площадки";

  return (
    <CommercialSeoPage
      heroVariant="ops"
      hubSteps={HUB_STEPS_PLATFORM}
      editorialParagraphs={platformHubEditorial()}
      editorialCalloutParagraphIndex={1}
      crumbs={[{ href: "/", label: "Главная" }, { href: "/ploshchadki", label: title }]}
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
      <ListingGridShell className="max-w-full px-0 py-6 sm:py-8 lg:py-10">
        <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          {PLOSHCHADKI_SLUGS.map((p) => (
            <li key={p.slug}>
              <Link
                className="group relative block overflow-hidden rounded-2xl border border-[var(--neutral-200)]/85 bg-gradient-to-br from-[var(--card)] via-[var(--surface)] to-[var(--card)] p-5 text-[var(--primary)] shadow-[0_2px_12px_rgba(7,21,37,0.06)] ring-1 ring-inset ring-black/[0.04] transition-[box-shadow,transform,border-color] duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/35 hover:shadow-[0_22px_44px_-14px_rgba(7,21,37,0.14)] motion-reduce:transform-none dark:border-white/11 dark:bg-[var(--card)] dark:ring-white/[0.06]"
                href={`/ploshchadki/${p.slug}`}
              >
                <span className="font-display text-lg font-semibold tracking-tight group-hover:text-[var(--accent)]">
                  {p.title.ru}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </ListingGridShell>
    </CommercialSeoPage>
  );
}
