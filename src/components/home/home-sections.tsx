import { CASES, caseCardFields } from "@/content/cases-stub";
import { BLOG_POSTS, blogCardFields } from "@/content/blog-stub";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { CalculatorEmbed } from "@/components/home/calculator-embed";
import { Button } from "@/components/ui/button";
import { CaseSparkline } from "@/components/home/case-sparkline";
import { ProcessStickySplit } from "@/components/home/process-sticky-split";
import { HomeProfessionsHubs } from "@/components/home/home-professions-hubs";
import { HomeWhyUs } from "@/components/home/home-why-us";
import { getLocale, getTranslations } from "next-intl/server";

type FaqItem = { q: string; a: string };
type ReviewItem = { initials: string; name: string; role: string; quote: string };
type TechTile = { t: string; d: string };

export async function HomeSections() {
  const locale = await getLocale();
  const t = await getTranslations("homePage");
  const ts = await getTranslations("homePage.sections");

  const faq = t.raw("faq") as FaqItem[];
  const reviews = t.raw("reviews") as ReviewItem[];
  const techItems = ts.raw("techItems") as TechTile[];
  const calcBullets = ts.raw("calcBullets") as string[];
  const blogCategories = t.raw("blogCategories") as Record<string, string>;

  const faqJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const serviceTiles = [
    {
      href: "/uslugi/migracionnyy-uchet",
      title: ts("tileMigrationTitle"),
      desc: ts("tileMigrationDesc"),
    },
    {
      href: "/uslugi/podbor-personala",
      title: ts("tileRecruitingTitle"),
      desc: ts("tileRecruitingDesc"),
    },
    {
      href: "/uslugi/upravlyaemyy-podryad",
      title: ts("tileManagedTitle"),
      desc: ts("tileManagedDesc"),
    },
  ] as const;

  return (
    <>
      <JsonLd data={faqJson} />
      <section id="services-preview" className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <h2 className="font-display text-[clamp(2.85rem,6.5vw,5.75rem)] font-extrabold leading-[1.02] tracking-[-0.045em] text-[var(--primary)]">
          {ts("servicesTitle")}
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--neutral-700)]">
          {ts("servicesLead")}{" "}
          <strong>{ts("servicesLeadStrong")}</strong>
          {ts("servicesLeadAfter")}
        </p>
        <div className="mt-14 flex flex-col gap-5">
          <Card className="border-[var(--accent)]/20 ring-1 ring-[var(--accent)]/10">
            <CardTitle>{ts("outsourcingTitle")}</CardTitle>
            <CardDescription>{ts("outsourcingDesc")}</CardDescription>
            <div className="mt-5">
              <Button asChild variant="secondary" size="sm">
                <Link href="/uslugi/autsorsing">{ts("outsourcingCta")}</Link>
              </Button>
            </div>
          </Card>
          <div className="grid gap-5 md:grid-cols-3">
            {serviceTiles.map((s) => (
              <Card key={s.href}>
                <CardTitle>{s.title}</CardTitle>
                <CardDescription>{s.desc}</CardDescription>
                <div className="mt-5">
                  <Button asChild variant="secondary" size="sm">
                    <Link href={s.href}>{ts("more")}</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <HomeProfessionsHubs />

      <section id="calc" className="bg-[var(--surface)] py-32 lg:py-40">
        <div className="mx-auto grid max-w-[1280px] gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--neutral-500)]">
              {ts("calcKicker")}
            </p>
            <h2 className="font-display mt-3 text-2xl font-bold tracking-tight text-[var(--primary)] md:text-4xl md:leading-[1.15]">
              {ts("calcTitle")}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[var(--neutral-700)]">{ts("calcLead")}</p>
            <ul className="mt-8 space-y-3 text-[var(--neutral-700)]">
              {calcBullets.map((line, i) => (
                <li key={line} className="flex gap-2 text-sm md:text-base">
                  <span className="font-mono-nums text-[var(--accent)]">{String(i + 1).padStart(2, "0")}</span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <CalculatorEmbed />
        </div>
      </section>

      <section id="cases" className="mx-auto max-w-[1280px] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <h2 className="font-display text-3xl font-bold tracking-[-0.035em] text-[var(--primary)] md:text-[2.625rem] md:leading-[1.12]">
          {ts("casesTitle")}
        </h2>
        <p className="mt-4 max-w-2xl text-[var(--neutral-700)]">{ts("casesLead")}</p>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {CASES.slice(0, 3).map((c, i) => {
            const card = caseCardFields(c, locale);
            return (
              <Card
                key={c.slug}
                className="group relative flex flex-col overflow-hidden border-[var(--neutral-200)]/90 bg-gradient-to-b from-[var(--card)] via-[var(--card)] to-[var(--surface)] shadow-[0_1px_0_rgba(0,0,0,0.04)] transition-[box-shadow,transform,border-color] duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/30 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.14),0_0_0_1px_rgba(0,0,0,0.03),0_0_40px_-8px_var(--accent)] motion-reduce:transform-none"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
                  {card.industry}
                </p>
                <CardTitle className="mt-3">{card.title}</CardTitle>
                <CardDescription>{card.summary}</CardDescription>
                <CaseSparkline chartId={`home-case-${c.slug}`} variant={i === 1 ? "flat" : "up"} />
                <p className="kpi-numerals mt-2 font-mono-nums text-lg font-semibold tabular-nums text-[var(--primary)]">
                  {card.metricUp}
                </p>
                <div className="mt-auto pt-5">
                  <Button asChild variant="secondary" size="sm">
                    <Link href={`/keysy/${c.slug}`}>{ts("caseCta")}</Link>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      <ProcessStickySplit />

      <section id="tech" className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--neutral-500)]">{ts("techKicker")}</p>
        <h2 className="font-display mt-3 text-2xl font-bold tracking-tight text-[var(--primary)] md:text-4xl md:leading-[1.15]">
          {ts("techTitle")}
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {techItems.map((x) => (
            <Card key={x.t}>
              <CardTitle>{x.t}</CardTitle>
              <CardDescription>{x.d}</CardDescription>
            </Card>
          ))}
        </div>
      </section>

      <section id="reviews" className="bg-[var(--surface)] py-32 lg:py-36">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold tracking-[-0.035em] text-[var(--primary)] md:text-[2.625rem] md:leading-[1.12]">
            {ts("reviewsTitle")}
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--neutral-700)]">{ts("reviewsLead")}</p>
          <div className="mt-14 columns-1 gap-5 md:columns-2 lg:columns-3">
            {reviews.map((r, idx) => (
              <figure
                key={`${r.name}-${idx}`}
                className="mb-5 break-inside-avoid rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)] p-6 shadow-[var(--card-shadow)] transition-shadow duration-300 hover:shadow-[var(--card-shadow-hover)]"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[var(--neutral-200)] bg-[var(--surface)] font-mono-nums text-sm font-bold text-[var(--primary)]"
                    aria-hidden
                  >
                    {r.initials}
                  </div>
                  <div>
                    <figcaption className="font-semibold text-[var(--primary)]">{r.name}</figcaption>
                    <p className="text-xs text-[var(--neutral-500)]">{r.role}</p>
                  </div>
                </div>
                <blockquote className="mt-5 text-sm leading-relaxed text-[var(--neutral-700)] md:text-base">
                  «{r.quote}»
                </blockquote>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <HomeWhyUs />

      <section id="blog" className="mx-auto max-w-[1280px] px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-bold tracking-[-0.035em] text-[var(--primary)] md:text-[2.625rem] md:leading-[1.12]">
            {ts("blogTitle")}
          </h2>
          <Button asChild variant="secondary" size="sm">
            <Link href="/blog">{ts("blogAll")}</Link>
          </Button>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {BLOG_POSTS.slice(0, 3).map((b) => {
            const card = blogCardFields(b, locale);
            const catLabel = blogCategories[b.category] ?? b.category;
            return (
              <Card key={b.slug}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--neutral-500)]">
                  {catLabel}
                </p>
                <CardTitle className="mt-2 text-lg">{card.title}</CardTitle>
                <CardDescription>{card.excerpt}</CardDescription>
                <div className="mt-5">
                  <Link className="text-sm font-semibold text-[var(--accent)] hover:underline" href={`/blog/${b.slug}`}>
                    {ts("readMore")}
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      <section id="faq" className="border-t border-[var(--neutral-200)] bg-white py-20 lg:py-32">
        <div className="mx-auto max-w-[880px] px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.12em] text-[var(--neutral-500)]">
            {ts("faqKicker")}
          </p>
          <h2 className="font-display mt-3 text-center text-2xl font-bold tracking-tight text-[var(--primary)] md:text-4xl md:leading-[1.15]">
            {ts("faqTitle")}
          </h2>
          <div className="mt-14 space-y-3">
            {faq.map((f) => (
              <details
                key={f.q}
                className="faq-item group rounded-2xl border border-[var(--neutral-200)] bg-[var(--surface)] transition open:bg-[var(--card)] open:shadow-[var(--card-shadow-hover)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5">
                  <span className="font-semibold text-[var(--primary)] md:text-lg">{f.q}</span>
                  <svg
                    className="faq-chevron h-5 w-5 shrink-0 text-[var(--accent)] transition-transform duration-300"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden
                  >
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <div className="border-t border-[var(--neutral-200)] px-5 pb-5 pt-0 text-sm leading-relaxed text-[var(--neutral-700)] md:px-6 md:pb-6 md:text-base">
                  <p className="pt-4">{f.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="cta" className="grain-dark bg-[var(--primary-dark)] py-24 text-white lg:py-36">
        <div className="mx-auto max-w-[720px] px-4 text-center sm:px-6">
          <h2 className="font-display text-2xl font-bold tracking-tight md:text-4xl md:leading-[1.15]">{ts("ctaTitle")}</h2>
          <p className="mt-5 text-sm leading-relaxed text-white/75 md:text-base">{ts("ctaLead")}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button
              asChild
              className="focus-visible:ring-2 focus-visible:ring-white/90 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--primary-dark)]"
            >
              <Link href="/zayavka">{ts("ctaProposal")}</Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              className="border-white/25 bg-white/10 text-white hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-white/90 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--primary-dark)]"
            >
              <Link href="/kalkulyator">{ts("ctaCalculator")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
