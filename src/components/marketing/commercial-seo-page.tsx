import type { ReactNode } from "react";
import { JsonLd } from "@/components/seo/json-ld";
import { Link } from "@/i18n/navigation";
import { OperationalDarkHero } from "@/components/layout/operational-dark-hero";
import { CommercialAtlasHero, CommercialVerticalHero } from "@/components/marketing/commercial-light-heroes";
import { HubOpsRail } from "@/components/marketing/hub-ops-rail";
import { CommercialVsStrip } from "@/components/marketing/commercial-vs-strip";
import { SectionDivider } from "@/components/marketing/section-divider";
import { PRIORITY_PAGE_TEASERS } from "@/content/priority-pages-teasers";
import { cn } from "@/lib/utils";
import type { Crumb } from "@/components/seo/breadcrumbs";

export type CommercialHeroVariant = "ops" | "atlas" | "vertical";

type Props = {
  crumbs: Crumb[];
  kicker?: string;
  title: string;
  lead: string;
  jsonLd?: Record<string, unknown>;
  editorialParagraphs?: string[];
  children?: ReactNode;
  showPriorityTeasers?: boolean;
  bodyTone?: "default" | "geo";
  /** По умолчанию: atlas / vertical — светлый hero + разделитель как у главной */
  heroVariant?: CommercialHeroVariant;
  /** Второй якорь под лидом */
  hubSteps?: readonly string[];
  hubStepsCaption?: string;
  /** Явно включить/выключить разделитель после hero; по умолчанию — только для светлых hero */
  showSectionDivider?: boolean;
  showComparisonStrip?: boolean;
};

export function CommercialSeoPage({
  crumbs,
  kicker,
  title,
  lead,
  jsonLd,
  editorialParagraphs,
  children,
  showPriorityTeasers = false,
  bodyTone = "default",
  heroVariant = "ops",
  hubSteps,
  hubStepsCaption,
  showSectionDivider,
  showComparisonStrip = false,
}: Props) {
  /** Только если нет ни редактораских абзацев, ни блока со ссылками — крайний случай */
  const emptyBodyFallback =
    "Раздел скоро дополним расширенным описанием. По объекту и персоналу можно сразу запросить расчёт через калькулятор или заявку.";
  const relatedTitle = "Приоритетные разделы";

  const heroRail =
    hubSteps && hubSteps.length > 0 ? (
      <HubOpsRail steps={hubSteps} caption={hubStepsCaption} />
    ) : null;

  const dividerVisible = showSectionDivider ?? heroVariant !== "ops";

  const hero =
    heroVariant === "atlas" ? (
      <CommercialAtlasHero crumbs={crumbs} kicker={kicker} title={title} lead={lead}>
        {heroRail}
      </CommercialAtlasHero>
    ) : heroVariant === "vertical" ? (
      <CommercialVerticalHero crumbs={crumbs} kicker={kicker} title={title} lead={lead}>
        {heroRail}
      </CommercialVerticalHero>
    ) : (
      <OperationalDarkHero
        crumbs={crumbs}
        kicker={kicker}
        kickerAsText
        title={title}
        description={
          <>
            <p>{lead}</p>
            {heroRail}
          </>
        }
        titleClassName="font-display max-w-[20ch] text-balance text-4xl font-bold leading-[1.12] tracking-[-0.035em] text-white md:text-5xl lg:max-w-[24ch] lg:text-[2.75rem]"
        containerClassName="relative mx-auto max-w-content px-4 pb-12 pt-10 sm:px-6 sm:pb-14 sm:pt-12 lg:px-8"
      />
    );

  const calloutIndex = editorialParagraphs && editorialParagraphs.length >= 3 ? 1 : -1;

  return (
    <main id="main" className="pb-20">
      {jsonLd ? <JsonLd data={jsonLd} /> : null}
      {hero}
      {dividerVisible ? <SectionDivider className="py-5 sm:py-6" /> : null}

      <section
        className={cn(
          "relative overflow-hidden border-b border-[var(--neutral-200)] bg-[var(--background)] dark:border-white/10",
          bodyTone === "geo" && "ux-geo-chapter",
        )}
      >
        {bodyTone === "geo" ? null : (
          <div
            className="ux-page-body-subtle pointer-events-none absolute inset-0 -z-10 min-h-full opacity-[0.55] dark:opacity-[0.4]"
            aria-hidden
          />
        )}
        <div className="relative mx-auto max-w-content px-4 py-10 sm:px-6 lg:px-8">
          {editorialParagraphs?.length ? (
            <div className="type-body max-w-3xl space-y-4 text-[var(--neutral-700)]">
              {editorialParagraphs.map((para, i) =>
                i === calloutIndex ? (
                  <aside
                    key={i}
                    className="rounded-2xl border border-[color-mix(in_srgb,var(--accent)_28%,var(--neutral-200))] bg-[color-mix(in_srgb,var(--accent)_8%,var(--card))] px-5 py-4 text-[var(--neutral-800)] shadow-[var(--card-shadow)] dark:border-white/14 dark:bg-[var(--primary-dark)]/30 dark:text-white/85 dark:shadow-none"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">Суть для закупки</p>
                    <p className="mt-2 leading-relaxed">{para}</p>
                  </aside>
                ) : (
                  <p key={i}>{para}</p>
                ),
              )}
            </div>
          ) : children ? null : (
            <p className="type-body max-w-2xl text-[var(--neutral-700)]">{emptyBodyFallback}</p>
          )}
          {showComparisonStrip ? <CommercialVsStrip /> : null}
          {children ? (
            <div className={editorialParagraphs?.length ? "mt-10" : "mt-6"}>{children}</div>
          ) : null}

          {showPriorityTeasers ? (
            <div className="mt-14 border-t border-[var(--neutral-200)] pt-10 dark:border-white/10">
              <h2 className="type-kicker">{relatedTitle}</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {PRIORITY_PAGE_TEASERS.filter((p) => p.path !== "/").map((p) => (
                  <li key={p.path}>
                    <Link
                      href={p.path}
                      className="group block rounded-2xl border border-[var(--neutral-200)] bg-[var(--surface)] p-4 transition hover:border-[color-mix(in_srgb,var(--accent)_35%,var(--neutral-200))] dark:border-white/10 dark:bg-[var(--card)]"
                    >
                      <span className="font-display text-base font-semibold text-[var(--primary)] group-hover:text-[var(--accent)]">
                        {p.ru.title}
                      </span>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--neutral-700)]">{p.ru.teaser}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
