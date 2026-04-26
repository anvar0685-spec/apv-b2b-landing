import { PROFESSIONS } from "@/content/professions-cities";
import type { ServicePageModel } from "@/content/service-page-data";
import { site } from "@/config/site";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

const WAREHOUSE_PROFESSIONS = PROFESSIONS.slice(0, 10);

type Props = { model: ServicePageModel; locale: string };

function ui(locale: string) {
  const en = locale === "en";
  return {
    kicker: en ? "Service" : "Услуга",
    overview: en ? "Overview" : "О услуге",
    whoFits: en ? "Who it fits" : "Кому подходит",
    how: en ? "How it works" : "Как это работает",
    includes: en ? "What is included" : "Что входит",
    tableItem: en ? "Item" : "Позиция",
    tableIncluded: en ? "Included" : "Включено",
    yes: en ? "yes" : "да",
    optional: en ? "optional" : "опционально",
    compare: en ? "Comparison" : "Сравнение подходов",
    crit: en ? "Criterion" : "Критерий",
    us: en ? "With us" : "С нами",
    staff: en ? "In-house" : "Штат",
    agency: en ? "Classic agency" : "Класс. агентство",
    professions: en ? "Roles" : "Профессии",
    casesTitle: en ? "Cases and content" : "Кейсы и материалы",
    casesBody: en
      ? "Visit case studies and the blog for sector notes and rollout examples."
      : "Перейдите в раздел кейсов и блога — там публикуется отраслевая аналитика и примеры внедрений.",
    casesLink: en ? "Case studies" : "Кейсы",
    blogLink: en ? "Blog" : "Блог",
    faq: "FAQ",
    ctaTitle: en ? "Need a quote for your site?" : "Нужен расчёт под ваш объект?",
    ctaLead: en
      ? "Submit a request — the team replies during business hours (exact SLA is in the client service policy)."
      : "Оставьте заявку — менеджер свяжется в течение 15 минут в рабочее время (срок фиксируется в регламенте обслуживания клиентов).",
    req: en ? "Request proposal" : "Оставить заявку",
    calc: en ? "Calculator" : "Калькулятор",
    areaServed: en ? "Moscow and Moscow Oblast" : "Москва и Московская область",
  };
}

export function ServicePageFull({ model, locale }: Props) {
  const t = ui(locale);
  const base = site.url.replace(/\/$/, "");
  const path = `/uslugi/${model.slug}`;
  const serviceJson = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: model.h1,
    description: model.subtitle,
    provider: {
      "@type": "Organization",
      name: site.brandName,
      url: base,
    },
    areaServed: t.areaServed,
    serviceType: model.slug,
  };

  const faqJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: model.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const crumbs = [
    { href: "/", label: locale === "en" ? "Home" : "Главная" },
    { href: "/uslugi", label: locale === "en" ? "Services" : "Услуги" },
    { href: path, label: model.h1 },
  ];

  return (
    <main id="main" className="pb-24">
      <JsonLd data={serviceJson} />
      <JsonLd data={faqJson} />
      <section className="border-b border-[var(--neutral-200)] bg-[var(--surface)] py-8 lg:py-12">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={crumbs} locale={locale} />
          <p className="type-kicker mt-8">{t.kicker}</p>
          <h1 className="font-display mt-3 max-w-4xl text-balance text-3xl font-bold tracking-[-0.035em] text-[var(--primary)] md:text-[2.75rem] md:leading-[1.1]">
            {model.h1}
          </h1>
          <p className="type-lead mt-5 max-w-3xl">{model.subtitle}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/kalkulyator">{t.calc}</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/zayavka">{t.req}</Link>
            </Button>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-[800px] px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="type-headline">{t.overview}</h2>
        <div className="mt-4 space-y-4 text-base leading-relaxed text-[var(--neutral-700)]">
          {model.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <h2 className="type-headline mt-14">{t.whoFits}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {model.segments.map((s) => (
            <Card key={s.title}>
              <CardTitle>{s.title}</CardTitle>
              <CardDescription>{s.text}</CardDescription>
            </Card>
          ))}
        </div>

        <h2 className="type-headline mt-14">{t.how}</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--neutral-700)]">
          {model.howItWorks.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>

        <h2 className="type-headline mt-14">{t.includes}</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[var(--neutral-200)]">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="bg-[var(--surface)] text-xs uppercase tracking-wide text-[var(--neutral-500)]">
              <tr>
                <th className="px-4 py-3">{t.tableItem}</th>
                <th className="px-4 py-3">{t.tableIncluded}</th>
              </tr>
            </thead>
            <tbody>
              {model.includes.map((row) => (
                <tr key={row.name} className="border-t border-[var(--neutral-200)]">
                  <td className="px-4 py-3">{row.name}</td>
                  <td className="px-4 py-3 font-mono-nums">{row.included ? t.yes : t.optional}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="type-headline mt-14">{t.compare}</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[var(--neutral-200)]">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="bg-[var(--surface)] text-xs uppercase tracking-wide text-[var(--neutral-500)]">
              <tr>
                <th className="px-4 py-3">{t.crit}</th>
                <th className="px-4 py-3">{t.us}</th>
                <th className="px-4 py-3">{t.staff}</th>
                <th className="px-4 py-3">{t.agency}</th>
              </tr>
            </thead>
            <tbody>
              {model.comparison.map((r) => (
                <tr key={r.label} className="border-t border-[var(--neutral-200)]">
                  <td className="px-4 py-3 font-medium text-[var(--primary)]">{r.label}</td>
                  <td className="px-4 py-3 text-[var(--neutral-700)]">{r.us}</td>
                  <td className="px-4 py-3 text-[var(--neutral-700)]">{r.staff}</td>
                  <td className="px-4 py-3 text-[var(--neutral-700)]">{r.agency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="type-headline mt-14">{t.professions}</h2>
        <ul className="mt-4 columns-1 gap-2 sm:columns-2">
          {WAREHOUSE_PROFESSIONS.map((p) => (
            <li key={p.slug} className="mb-2 break-inside-avoid">
              <Link
                className="text-sm font-medium text-[var(--accent)] hover:underline"
                href={`/personal/${p.slug}`}
              >
                {locale === "en" ? p.titleEn : p.titleRu}
              </Link>
            </li>
          ))}
        </ul>

        <h2 className="type-headline mt-14">{t.casesTitle}</h2>
        <p className="mt-4 text-[var(--neutral-700)]">
          {t.casesBody}{" "}
          <Link className="font-medium text-[var(--accent)] hover:underline" href="/keysy">
            {t.casesLink}
          </Link>{" "}
          ·{" "}
          <Link className="font-medium text-[var(--accent)] hover:underline" href="/blog">
            {t.blogLink}
          </Link>
        </p>

        <h2 className="type-headline mt-14">{t.faq}</h2>
        <div className="mt-4 space-y-4">
          {model.faq.map((f) => (
            <div
              key={f.q}
              className="rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)] p-5 shadow-[var(--card-shadow)]"
            >
              <h3 className="font-semibold text-[var(--primary)]">{f.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--neutral-700)]">{f.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl bg-[var(--primary-dark)] p-8 text-center text-white">
          <p className="font-display text-xl font-semibold">{t.ctaTitle}</p>
          <p className="mt-2 text-sm text-white/80">{t.ctaLead}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href="/zayavka">{t.req}</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/kalkulyator">{t.calc}</Link>
            </Button>
          </div>
        </div>
      </article>
    </main>
  );
}
