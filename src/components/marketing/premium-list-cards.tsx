import type { CaseStub } from "@/content/cases-stub";
import type { BlogStub } from "@/content/blog-stub";
import { blogCardFields } from "@/content/blog-stub";
import { caseCardFields } from "@/content/cases-stub";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { CaseSparkline } from "@/components/home/case-sparkline";
import { cn } from "@/lib/utils";
import { formatCaseCooperationRu } from "@/lib/format-cooperation-term";

export async function PremiumCaseCard({ c, index, locale }: { c: CaseStub; index: number; locale: string }) {
  const t = await getTranslations({ locale, namespace: "caseCard" });
  const card = caseCardFields(c);
  const variant = index % 3 === 1 ? "flat" : "up";
  return (
    <Card
      className={cn(
        "group relative flex h-full flex-col overflow-hidden",
        "border-[var(--neutral-200)]/85 bg-gradient-to-br from-[var(--card)] via-[var(--surface)] to-[var(--card)]",
        "shadow-[0_2px_12px_rgba(7,21,37,0.07)] ring-1 ring-inset ring-black/[0.04]",
        "transition-[box-shadow,transform,border-color] duration-300",
        "before:pointer-events-none before:absolute before:left-0 before:top-5 before:bottom-5 before:z-0 before:w-[3px] before:rounded-full before:bg-gradient-to-b before:from-[var(--accent)] before:to-[color-mix(in_srgb,var(--primary)_58%,var(--accent))] before:opacity-[0.85] before:transition-opacity group-hover:before:opacity-100",
        "hover:-translate-y-1 hover:border-[var(--accent)]/38 hover:shadow-[0_28px_56px_-18px_rgba(7,21,37,0.2),0_0_0_1px_color-mix(in_srgb,var(--accent)_16%,transparent),0_0_52px_-14px_color-mix(in_srgb,var(--accent)_28%,transparent)]",
        "dark:border-white/12 dark:ring-white/[0.06]",
        "motion-reduce:transform-none",
      )}
    >
      <p className="relative z-[1] text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">{card.industry}</p>
      <CardTitle className="relative z-[1] mt-3">
        <Link className="transition hover:text-[var(--accent)]" href={`/keysy/${c.slug}`}>
          {card.title}
        </Link>
      </CardTitle>
      <CardDescription className="relative z-[1]">{card.summary}</CardDescription>
      <div className="relative z-[1]">
        <CaseSparkline chartId={`keysy-${c.slug}`} variant={variant} />
      </div>
      <p className="kpi-numerals relative z-[1] mt-2 font-mono-nums text-lg font-semibold tabular-nums text-[var(--primary)]">{card.metricUp}</p>
      <dl className="relative z-[1] mt-6 grid flex-1 grid-cols-2 gap-3 border-t border-[var(--neutral-200)] pt-6 text-sm">
        <div>
          <dt className="text-[var(--neutral-500)]">{t("months")}</dt>
          <dd className="font-semibold text-[var(--primary)]">{formatCaseCooperationRu(c.durationMonths)}</dd>
        </div>
        <div>
          <dt className="text-[var(--neutral-500)]">{t("city")}</dt>
          <dd className="font-semibold text-[var(--primary)]">{card.city}</dd>
        </div>
      </dl>
      <div className="relative z-[1] mt-auto pt-5">
        <Button asChild variant="secondary" size="sm">
          <Link href={`/keysy/${c.slug}`}>{t("cta")}</Link>
        </Button>
      </div>
    </Card>
  );
}

export async function PremiumBlogCard({ p, locale }: { p: BlogStub; locale: string }) {
  const tHome = await getTranslations({ locale, namespace: "homePage" });
  const ts = await getTranslations({ locale, namespace: "homePage.sections" });
  const tCard = await getTranslations({ locale, namespace: "blogCard" });
  const blogCategories = tHome.raw("blogCategories") as Record<string, string>;
  const fields = blogCardFields(p);
  const catLabel = blogCategories[p.category] ?? p.category.replace(/-/g, " ");
  return (
    <Card
      lang="ru"
      className={cn(
        "group relative flex h-full flex-col overflow-hidden",
        "border-[var(--neutral-200)]/85 bg-gradient-to-br from-[var(--card)] via-[var(--surface)]/88 to-[var(--card)]",
        "shadow-[0_2px_12px_rgba(7,21,37,0.06)] ring-1 ring-inset ring-black/[0.035]",
        "transition-[box-shadow,transform,border-color] duration-300",
        "hover:-translate-y-[5px] hover:border-[var(--accent)]/30 hover:shadow-[0_24px_52px_-16px_rgba(7,21,37,0.16),0_0_0_1px_color-mix(in_srgb,var(--accent)_12%,transparent)]",
        "dark:border-white/11 dark:ring-white/[0.05]",
        "motion-reduce:transform-none",
      )}
    >
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[color-mix(in_srgb,var(--accent)_78%,var(--neutral-500))] shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent)_18%,transparent)]" aria-hidden />
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[color-mix(in_srgb,var(--accent)_72%,var(--neutral-600))] dark:text-[color-mix(in_srgb,var(--accent)_65%,var(--neutral-400))]">
          {catLabel}
        </p>
      </div>
      <CardTitle className="relative z-[1] mt-3 text-lg">
        <Link className="transition hover:text-[var(--accent)]" href={`/blog/${p.slug}`}>
          {fields.title}
        </Link>
      </CardTitle>
      <CardDescription className="relative z-[1] flex-1">{fields.excerpt}</CardDescription>
      <div className="relative z-[1] mt-5 flex items-center justify-between text-xs tabular-nums text-[var(--neutral-600)]">
        <time className="font-mono text-[11px] tracking-tight" dateTime={p.publishedAt}>
          {new Date(p.publishedAt).toLocaleDateString("ru-RU")}
        </time>
        <span>
          {p.readingTime} {tCard("min")}
        </span>
      </div>
      <div className="relative z-[1] mt-4">
        <Link className="text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline" href={`/blog/${p.slug}`}>
          {ts("readMore")}
        </Link>
      </div>
    </Card>
  );
}
