import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { WarehouseSchematic } from "@/components/graphics/warehouse-schematic";
import { CASES, caseDetailFields, getCase } from "@/content/cases-stub";
import { caseSchematicVariant } from "@/lib/case-schematic";
import { buildNotFoundPageMetadata, buildPageMetadata } from "@/lib/seo";
import { formatCaseCooperationRu } from "@/lib/format-cooperation-term";

type Props = { params: { locale: string; slug: string } };

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCase(params.slug);
  const t = await getTranslations({ locale: params.locale, namespace: "caseStudy" });
  if (!c) {
    return buildNotFoundPageMetadata(params.locale, `/keysy/${params.slug}`);
  }
  const d = caseDetailFields(c);
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
  const d = caseDetailFields(c);
  const schematic = caseSchematicVariant(c.slug);

  const idx = CASES.findIndex((x) => x.slug === c.slug);
  const prev = idx > 0 ? CASES[idx - 1]! : null;
  const next = idx >= 0 && idx < CASES.length - 1 ? CASES[idx + 1]! : null;
  const prevD = prev ? caseDetailFields(prev) : null;
  const nextD = next ? caseDetailFields(next) : null;

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
          <p className="mt-4 text-sm text-white/65">
            {formatCaseCooperationRu(d.durationMonths)} · {d.city}
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-[760px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="rounded-2xl border border-[var(--neutral-200)] bg-[var(--surface)] p-5">
          <WarehouseSchematic variant={schematic} className="max-h-[120px] text-[var(--accent)]" title={d.title} />
        </div>

        <section className="mt-12">
          <h2 className="font-display text-xl font-semibold text-[var(--primary)]">Задача</h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--neutral-700)]">{d.challenge}</p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-xl font-semibold text-[var(--primary)]">Как организовали работу</h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--neutral-700)]">{d.solution}</p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-xl font-semibold text-[var(--primary)]">Итог работы</h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--neutral-700)]">{d.outcome}</p>
        </section>

        <section className="mt-12 rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)] p-6">
          <h2 className="font-display text-lg font-semibold text-[var(--primary)]">Особенность объекта</h2>
          <p className="mt-3 text-base leading-relaxed text-[var(--neutral-700)]">{d.shiftProfile}</p>
        </section>

        {d.clientQuote.trim() ? (
          <figure className="mt-12 rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)] p-8 shadow-[var(--card-shadow)]">
            <blockquote className="text-lg font-medium leading-relaxed text-[var(--primary)]">«{d.clientQuote}»</blockquote>
            <figcaption className="mt-4 text-sm text-[var(--neutral-500)]">{t("quoteCaption")}</figcaption>
          </figure>
        ) : null}

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
                className="group rounded-2xl border border-[var(--neutral-200)] bg-[var(--surface)] p-5 transition hover:border-[var(--accent)]/30 sm:max-w-[48%]"
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
                className="group rounded-2xl border border-[var(--neutral-200)] bg-[var(--surface)] p-5 text-right transition hover:border-[var(--accent)]/30 sm:max-w-[48%]"
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
