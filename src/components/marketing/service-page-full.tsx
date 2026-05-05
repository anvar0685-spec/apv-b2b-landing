import { PROFESSIONS } from "@/content/professions-cities";
import type { ServicePageModel } from "@/content/service-page-data";
import { ProfessionIcon } from "@/content/profession-icons";
import { site } from "@/config/site";
import { JsonLd } from "@/components/seo/json-ld";
import { OperationalDarkHero } from "@/components/layout/operational-dark-hero";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { ServiceScrollStory } from "@/components/marketing/service-scroll-story";
import { ServiceSectionWrap } from "@/components/marketing/service-section-wrap";
import { cn } from "@/lib/utils";
import { slugVisualVariant, variantClass } from "@/lib/slug-visual-seed";
const WAREHOUSE_PROFESSIONS = PROFESSIONS.slice(0, 10);

type Props = { model: ServicePageModel; /** Горизонтальный scroll-story + reveal секций (включаем точечно на 1–2 URL) */ scrollStory?: boolean };

const t = {
  kicker: "Услуга",
  overview: "О услуге",
  whoFits: "Кому подходит",
  how: "Как это работает",
  howStoryLead:
    "Те же шаги, что в операционном регламенте — в формате карточек для быстрого сканирования на мобильных и планшетах.",
  includes: "Что входит",
  tableItem: "Позиция",
  tableIncluded: "Включено",
  yes: "да",
  optional: "опционально",
  compare: "Сравнение подходов",
  crit: "Критерий",
  us: "С нами",
  staff: "Штат",
  agency: "Класс. агентство",
  professions: "Профессии",
  casesTitle: "Кейсы и материалы",
  casesBody:
    "Перейдите в раздел кейсов и блога — там публикуется отраслевая аналитика и примеры внедрений.",
  casesLink: "Кейсы",
  blogLink: "Блог",
  faq: "FAQ",
  ctaTitle: "Нужен расчёт под ваш объект?",
  ctaLead:
    "Оставьте заявку — менеджер свяжется в течение 15 минут в рабочее время (срок фиксируется в регламенте обслуживания клиентов).",
  req: "Оставить заявку",
  calc: "Калькулятор",
  tableSwipeHint: "На узком экране таблицу можно прокручивать горизонтально.",
  areaServed: "Москва и Московская область",
};

export function ServicePageFull({ model, scrollStory = false }: Props) {
  const base = site.url.replace(/\/$/, "");
  const path = `/uslugi/${model.slug}`;
  const motion = scrollStory;
  const decorV = slugVisualVariant(model.slug);
  const heroAmbient = (["opacity-[0.62]", "opacity-[0.70]", "opacity-[0.78]"] as const)[decorV];

  const serviceJson = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: model.h1,
    description: model.metaDescription ?? model.subtitle,
    provider: {
      "@type": "Organization",
      name: site.brandName,
      url: base,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: t.areaServed,
    },
    serviceType: model.schemaServiceType ?? model.slug,
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
    { href: "/", label: "Главная" },
    { href: "/uslugi", label: "Услуги" },
    { href: path, label: model.h1 },
  ];

  return (
    <main id="main" className="min-w-0 pb-24">
      <JsonLd data={serviceJson} />
      <JsonLd data={faqJson} />
      <OperationalDarkHero
        crumbs={crumbs}
        kicker={t.kicker}
        title={model.h1}
        description={model.subtitle}
        ambientClassName={heroAmbient}
        decoration={
          <div className={cn("ux-prog-angled", variantClass(decorV))} aria-hidden />
        }
        actions={
          <>
            <Button asChild>
              <Link href="/kalkulyator">{t.calc}</Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              className="border-white/25 bg-white/10 text-white hover:bg-white/15"
            >
              <Link href="/zayavka">{t.req}</Link>
            </Button>
          </>
        }
      />

      <article className="relative z-[1] mx-auto max-w-[800px] rounded-[1.5rem] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 ux-inner-section-canopy">
        <div className="ux-page-body-subtle pointer-events-none absolute inset-x-0 top-0 -z-10 h-[min(100%,48rem)] opacity-[0.45] dark:opacity-[0.32]" aria-hidden />

        <ServiceSectionWrap motionEnabled={motion}>
          <h2 className="type-headline">{t.overview}</h2>
          <div className="mt-4 space-y-4 text-[0.9375rem] leading-relaxed text-[var(--neutral-700)] sm:text-base">
            {model.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </ServiceSectionWrap>

        <ServiceSectionWrap motionEnabled={motion} className="mt-14">
          <h2 className="type-headline">{t.whoFits}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {model.segments.map((s) => (
              <Card key={s.title}>
                <CardTitle>{s.title}</CardTitle>
                <CardDescription>{s.text}</CardDescription>
              </Card>
            ))}
          </div>
        </ServiceSectionWrap>

        <ServiceSectionWrap motionEnabled={motion} className="mt-14">
          {scrollStory ? (
            <>
              <ServiceScrollStory steps={model.howItWorks} title={t.how} lead={t.howStoryLead} />
              <ol className="sr-only" aria-label={t.how}>
                {model.howItWorks.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </>
          ) : (
            <>
              <h2 className="type-headline">{t.how}</h2>
              <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--neutral-700)]">
                {model.howItWorks.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </>
          )}
        </ServiceSectionWrap>

        <ServiceSectionWrap motionEnabled={motion} className="mt-14">
          <h2 className="type-headline">{t.includes}</h2>
          <p className="mt-2 text-xs text-[var(--neutral-500)] md:hidden">{t.tableSwipeHint}</p>
          <div className="mt-3 overflow-x-auto overscroll-x-contain rounded-2xl border border-[var(--neutral-200)] [-webkit-overflow-scrolling:touch]">
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
        </ServiceSectionWrap>

        <ServiceSectionWrap motionEnabled={motion} className="mt-14">
          <h2 className="type-headline">{t.compare}</h2>
          <p className="mt-2 text-xs text-[var(--neutral-500)] md:hidden">{t.tableSwipeHint}</p>
          <div className="mt-3 overflow-x-auto overscroll-x-contain rounded-2xl border border-[var(--neutral-200)] [-webkit-overflow-scrolling:touch]">
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
        </ServiceSectionWrap>

        <ServiceSectionWrap motionEnabled={motion} className="mt-14">
          <h2 className="type-headline">{t.professions}</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {WAREHOUSE_PROFESSIONS.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/personal/${p.slug}`}
                  className="flex items-center gap-3 rounded-2xl border border-[var(--neutral-200)] bg-[var(--surface)] px-4 py-3 text-sm font-medium text-[var(--primary)] shadow-[var(--card-shadow)] transition hover:border-[color-mix(in_srgb,var(--accent)_35%,var(--neutral-200))] hover:text-[var(--accent)] dark:border-white/10 dark:bg-[var(--card)]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-[var(--accent)]">
                    <ProfessionIcon slug={p.slug} className="h-5 w-5" />
                  </span>
                  {p.titleRu}
                </Link>
              </li>
            ))}
          </ul>
        </ServiceSectionWrap>

        <ServiceSectionWrap motionEnabled={motion} className="mt-14">
          <h2 className="type-headline">{t.casesTitle}</h2>
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
        </ServiceSectionWrap>

        <ServiceSectionWrap motionEnabled={motion} className="mt-14">
          <h2 className="type-headline">{t.faq}</h2>
          <div className="mt-4 space-y-4">
            {model.faq.map((f) => (
              <div
                key={f.q}
                className="rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)] p-5 shadow-[var(--card-shadow)]"
              >
                <h3 className="font-semibold text-[var(--primary)]">{f.q}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--neutral-700)] sm:text-sm">{f.a}</p>
              </div>
            ))}
          </div>
        </ServiceSectionWrap>

        <ServiceSectionWrap motionEnabled={motion} className="mt-14">
          <div className="rounded-2xl bg-[var(--primary-dark)] p-8 text-center text-white">
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
        </ServiceSectionWrap>
      </article>
    </main>
  );
}
