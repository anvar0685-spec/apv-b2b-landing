import type { CaseStub } from "@/content/cases-stub";
import type { BlogStub } from "@/content/blog-stub";
import { blogCardFields } from "@/content/blog-stub";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { CaseSparkline } from "@/components/home/case-sparkline";

export function PremiumCaseCard({ c, index }: { c: CaseStub; index: number }) {
  const variant = index % 3 === 1 ? "flat" : "up";
  return (
    <Card className="group relative flex h-full flex-col overflow-hidden border-[var(--neutral-200)]/90 bg-gradient-to-b from-[var(--card)] via-[var(--card)] to-[var(--surface)] shadow-[0_1px_0_rgba(0,0,0,0.04)] transition-[box-shadow,transform,border-color] duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/30 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.14),0_0_0_1px_rgba(0,0,0,0.03),0_0_40px_-8px_var(--accent)] motion-reduce:transform-none">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">{c.industry}</p>
      <CardTitle className="mt-3">
        <Link className="transition hover:text-[var(--accent)]" href={`/keysy/${c.slug}`}>
          {c.title}
        </Link>
      </CardTitle>
      <CardDescription>{c.summary}</CardDescription>
      <CaseSparkline chartId={`keysy-${c.slug}`} variant={variant} />
      <p className="kpi-numerals mt-2 font-mono-nums text-lg font-semibold tabular-nums text-[var(--primary)]">{c.metricUp}</p>
      <dl className="mt-6 grid flex-1 grid-cols-2 gap-3 border-t border-[var(--neutral-200)] pt-6 text-sm">
        <div>
          <dt className="text-[var(--neutral-500)]">Персонал</dt>
          <dd className="font-semibold text-[var(--primary)]">{c.staff}</dd>
        </div>
        <div>
          <dt className="text-[var(--neutral-500)]">Месяцев</dt>
          <dd className="font-semibold text-[var(--primary)]">{c.durationMonths}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-[var(--neutral-500)]">Город</dt>
          <dd className="font-medium text-[var(--neutral-700)]">{c.city}</dd>
        </div>
      </dl>
      <div className="mt-auto pt-5">
        <Button asChild variant="secondary" size="sm">
          <Link href={`/keysy/${c.slug}`}>Разбор кейса</Link>
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
  const fields = blogCardFields(p, locale);
  const catLabel = blogCategories[p.category] ?? p.category.replace(/-/g, " ");
  const dateLocale = locale === "en" ? "en-US" : "ru-RU";

  return (
    <Card className="group flex h-full flex-col transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/25 hover:shadow-[var(--card-shadow-hover)] motion-reduce:transform-none">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--neutral-500)]">{catLabel}</p>
      <CardTitle className="mt-2 text-lg">
        <Link className="transition hover:text-[var(--accent)]" href={`/blog/${p.slug}`}>
          {fields.title}
        </Link>
      </CardTitle>
      <CardDescription className="flex-1">{fields.excerpt}</CardDescription>
      <div className="mt-5 flex items-center justify-between text-xs text-[var(--neutral-500)]">
        <time dateTime={p.publishedAt}>{new Date(p.publishedAt).toLocaleDateString(dateLocale)}</time>
        <span>
          {p.readingTime} {tCard("min")}
        </span>
      </div>
      <div className="mt-4">
        <Link className="text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline" href={`/blog/${p.slug}`}>
          {ts("readMore")}
        </Link>
      </div>
    </Card>
  );
}
