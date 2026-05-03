import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
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
import { Button } from "@/components/ui/button";
import { COMMERCIAL_CALLOUT_DISABLED } from "@/content/commercial-editorial";

export type CommercialHeroVariant = "ops" | "atlas" | "vertical";

type Props = {
  crumbs: Crumb[];
  kicker?: string;
  title: string;
  lead: string;
  jsonLd?: Record<string, unknown>;
  editorialParagraphs?: string[];
  /** Явный индекс абзаца-callout; -1 — отключить; если не передан и абзацев ≥ 3 — используется 1 */
  editorialCalloutParagraphIndex?: number;
  children?: ReactNode;
  showPriorityTeasers?: boolean;
  bodyTone?: "default" | "geo";
  heroVariant?: CommercialHeroVariant;
  hubSteps?: readonly string[];
  hubStepsCaption?: string;
  showSectionDivider?: boolean;
  showComparisonStrip?: boolean;
  /** CTA под rail на светлых hero (по умолчанию true) */
  showHeroCtas?: boolean;
};

export async function CommercialSeoPage({
  crumbs,
  kicker,
  title,
  lead,
  jsonLd,
  editorialParagraphs,
  editorialCalloutParagraphIndex,
  children,
  showPriorityTeasers = false,
  bodyTone = "default",
  heroVariant = "ops",
  hubSteps,
  hubStepsCaption,
  showSectionDivider,
  showComparisonStrip = false,
  showHeroCtas = true,
}: Props) {
  const t = await getTranslations("commercial");
  const tc = await getTranslations("cta");

  const emptyBodyFallback = t("sectionSoon");
  const relatedTitle = t("prioritySections");
  const railCaption = hubStepsCaption ?? t("hubStepsCaption");

  const heroRail =
    hubSteps && hubSteps.length > 0 ? (
      <HubOpsRail steps={hubSteps} caption={railCaption} />
    ) : null;

  const lightHeroCtas =
    showHeroCtas && (heroVariant === "atlas" || heroVariant === "vertical") ? (
      <div className="mt-6 flex flex-wrap gap-2">
        <Button asChild size="sm">
          <Link href="/kalkulyator">{tc("calc")}</Link>
        </Button>
        <Button asChild variant="secondary" size="sm">
          <Link href="/zayavka">{tc("proposal")}</Link>
        </Button>
      </div>
    ) : null;

  const dividerVisible = showSectionDivider ?? heroVariant !== "ops";

  const resolvedCalloutIndex =
    editorialCalloutParagraphIndex !== undefined
      ? editorialCalloutParagraphIndex
      : editorialParagraphs && editorialParagraphs.length >= 3
        ? 1
        : COMMERCIAL_CALLOUT_DISABLED;

  const calloutActive =
    Boolean(editorialParagraphs?.length) &&
    resolvedCalloutIndex >= 0 &&
    resolvedCalloutIndex < (editorialParagraphs?.length ?? 0);

  const hero =
    heroVariant === "atlas" ? (
      <CommercialAtlasHero crumbs={crumbs} kicker={kicker} title={title} lead={lead}>
        {heroRail}
        {lightHeroCtas}
      </CommercialAtlasHero>
    ) : heroVariant === "vertical" ? (
      <CommercialVerticalHero crumbs={crumbs} kicker={kicker} title={title} lead={lead}>
        {heroRail}
        {lightHeroCtas}
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
            className="ux-page-body-subtle pointer-events-none absolute inset-0 -z-10 min-h-full opacity-[0.55] motion-reduce:opacity-[0.35] dark:opacity-[0.4]"
            aria-hidden
          />
        )}
        <div className="relative mx-auto max-w-content px-4 py-10 sm:px-6 lg:px-8">
          {editorialParagraphs?.length ? (
            <div className="type-body max-w-3xl space-y-4 text-[var(--neutral-700)] dark:text-[var(--neutral-200)]">
              {editorialParagraphs.map((para, i) =>
                calloutActive && i === resolvedCalloutIndex ? (
                  <aside
                    key={i}
                    className="rounded-2xl border border-[color-mix(in_srgb,var(--accent)_28%,var(--neutral-200))] bg-[color-mix(in_srgb,var(--accent)_8%,var(--card))] px-5 py-4 text-[var(--neutral-800)] shadow-[var(--card-shadow)] motion-reduce:shadow-none dark:border-white/14 dark:bg-[var(--primary-dark)]/30 dark:text-white/88 dark:shadow-none"
                  >
                    <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">{t("purchaseEssence")}</h2>
                    <p className="mt-2 leading-relaxed">{para}</p>
                  </aside>
                ) : (
                  <p key={i}>{para}</p>
                ),
              )}
            </div>
          ) : children ? null : (
            <p className="type-body max-w-2xl text-[var(--neutral-700)] dark:text-[var(--neutral-200)]">{emptyBodyFallback}</p>
          )}
          {showComparisonStrip ? (
            <CommercialVsStrip
              title={t("vsStripTitle")}
              cols={[
                { label: t("vsWithUs"), body: t("vsWithUsBody") },
                { label: t("vsStaff"), body: t("vsStaffBody") },
                { label: t("vsAgency"), body: t("vsAgencyBody") },
              ]}
            />
          ) : null}
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
                      <span className="font-display text-base font-semibold text-[var(--primary)] group-hover:text-[var(--accent)] dark:text-white">
                        {p.ru.title}
                      </span>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--neutral-700)] dark:text-[var(--neutral-300)]">{p.ru.teaser}</p>
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
