import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { CASES, caseDetailFields, getCase } from "@/content/cases-stub";
import { CaseSparkline } from "@/components/home/case-sparkline";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: { locale: string; slug: string } };

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCase(params.slug);
  const t = await getTranslations({ locale: params.locale, namespace: "caseStudy" });
  if (!c) {
    return buildPageMetadata({
      locale: params.locale,
      pathname: `/keysy/${params.slug}`,
      title: t("fallbackTitle"),
      description: t("fallbackDescription"),
    });
  }
  const d = caseDetailFields(c, params.locale);
  return buildPageMetadata({
    locale: params.locale,
    pathname: `/keysy/${c.slug}`,
    title: `${d.title}${t("metaTitleSuffix")}`,
    description: d.summary,
  });
}

export default async function CasePage({ params }: Props) {
  const c = getCase(params.slug);
  if (!c) notFound();

  const t = await getTranslations({ locale: params.locale, namespace: "caseStudy" });
  const d = caseDetailFields(c, params.locale);

  const idx = CASES.findIndex((x) => x.slug === c.slug);
  const prev = idx > 0 ? CASES[idx - 1]! : null;
  const next = idx >= 0 && idx < CASES.length - 1 ? CASES[idx + 1]! : null;
  const prevD = prev ? caseDetailFields(prev, params.locale) : null;
  const nextD = next ? caseDetailFields(next, params.locale) : null;

  return (
    <main id="main" className="pb-24">
      <section className="grain-dark relative overflow-hidden border-b border-[var(--neutral-200)] bg-[var(--primary-dark)] py-12 text-white lg:py-16">
        <div className="hero-ambient pointer-events-none absolute inset-0 opacity-70" />
        <div className="relative mx-auto max-w-[880px] px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-white/60">
            <Link className="text-[var(--accent-soft)] transition hover:underline" href="/keysy">
              {t("backToList")}
            </Link>
          </p>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-soft)]">{d.industry}</p>
          <h1 className="font-display mt-3 text-balance text-3xl font-bold tracking-[-0.035em] md:text-5xl md:leading-[1.08]">
            {d.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/80">{d.summary}</p>
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-md">
            <CaseSparkline chartId={`case-hero-${c.slug}`} variant={idx % 2 === 0 ? "up" : "flat"} />
            <p className="kpi-numerals mt-4 font-mono-nums text-2xl font-bold tabular-nums text-white md:text-3xl">{d.metricUp}</p>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-[880px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <section className="rounded-2xl border border-[var(--neutral-200)] bg-[var(--surface)] p-8 shadow-[var(--card-shadow)]">
          <h2 className="font-display text-lg font-semibold text-[var(--primary)]">{t("paramsTitle")}</h2>
          <dl className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-[var(--neutral-500)]">{t("staffDt")}</dt>
              <dd className="mt-1 text-xl font-semibold text-[var(--primary)]">
                {d.staff} {t("staffSuffix")}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-[var(--neutral-500)]">{t("durationDt")}</dt>
              <dd className="mt-1 text-xl font-semibold text-[var(--primary)]">
                {d.durationMonths} {t("monthsSuffix")}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm text-[var(--neutral-500)]">{t("locationDt")}</dt>
              <dd className="mt-1 text-lg font-medium text-[var(--neutral-700)]">{d.city}</dd>
            </div>
          </dl>
        </section>

        <section className="mt-14 space-y-10">
          <div>
            <p className="type-kicker">{t("kickerContext")}</p>
            <h2 className="type-headline mt-2">{t("headlineChallenge")}</h2>
            <p className="type-body mt-4">{d.challenge}</p>
          </div>
          <div>
            <p className="type-kicker">{t("kickerSolution")}</p>
            <h2 className="type-headline mt-2">{t("headlineSolution")}</h2>
            <p className="type-body mt-4">{d.solution}</p>
          </div>
          <div>
            <p className="type-kicker">{t("kickerOutcome")}</p>
            <h2 className="type-headline mt-2">{t("headlineOutcome")}</h2>
            <p className="type-body mt-4">{d.outcome}</p>
          </div>
        </section>

        <figure className="mt-14 rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)] p-8 shadow-[var(--card-shadow)]">
          <blockquote className="font-display text-lg font-medium leading-relaxed text-[var(--primary)] md:text-xl">
            «{d.clientQuote}»
          </blockquote>
          <figcaption className="mt-4 text-sm text-[var(--neutral-500)]">{t("quoteCaption")}</figcaption>
        </figure>

        <div className="mt-14 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/zayavka">{t("discussCta")}</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/kalkulyator">{t("calcCta")}</Link>
          </Button>
        </div>

        {(prev || next) && (
          <nav
            className="mt-20 flex flex-col gap-4 border-t border-[var(--neutral-200)] pt-10 sm:flex-row sm:justify-between"
            aria-label={t("navAria")}
          >
            {prev && prevD ? (
              <Link
                className="group rounded-2xl border border-[var(--neutral-200)] bg-[var(--surface)] p-5 transition hover:border-[var(--accent)]/30 hover:shadow-[var(--card-shadow-hover)] sm:max-w-[48%]"
                href={`/keysy/${prev.slug}`}
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--neutral-500)]">{t("navPrev")}</p>
                <p className="mt-2 font-semibold text-[var(--primary)] group-hover:text-[var(--accent)]">{prevD.title}</p>
              </Link>
            ) : (
              <span />
            )}
            {next && nextD ? (
              <Link
                className="group rounded-2xl border border-[var(--neutral-200)] bg-[var(--surface)] p-5 text-right transition hover:border-[var(--accent)]/30 hover:shadow-[var(--card-shadow-hover)] sm:max-w-[48%]"
                href={`/keysy/${next.slug}`}
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--neutral-500)]">{t("navNext")}</p>
                <p className="mt-2 font-semibold text-[var(--primary)] group-hover:text-[var(--accent)]">{nextD.title}</p>
              </Link>
            ) : null}
          </nav>
        )}
      </article>
    </main>
  );
}
