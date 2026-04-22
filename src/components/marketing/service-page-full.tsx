import { PROFESSIONS } from "@/content/professions-cities";
import type { ServicePageModel } from "@/content/service-page-data";
import { site } from "@/config/site";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

type Props = { model: ServicePageModel; locale: string };

export function ServicePageFull({ model, locale }: Props) {
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
    areaServed: "Москва и Московская область",
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
      <section className="border-b border-[var(--neutral-200)] bg-[var(--surface)] py-6">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={crumbs} locale={locale} />
          <h1 className="font-display mt-6 max-w-4xl text-balance text-3xl font-bold tracking-tight text-[var(--primary)] md:text-5xl">
            {model.h1}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-[var(--neutral-700)]">
            {model.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/kalkulyator">Рассчитать стоимость</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/zayavka">Получить КП</Link>
            </Button>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-[800px] px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-semibold text-[var(--primary)]">
          {locale === "en" ? "Overview" : "О услуге"}
        </h2>
        <div className="mt-4 space-y-4 text-base leading-relaxed text-[var(--neutral-700)]">
          {model.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <h2 className="font-display mt-14 text-2xl font-semibold text-[var(--primary)]">
          {locale === "en" ? "Who it fits" : "Кому подходит"}
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {model.segments.map((s) => (
            <Card key={s.title}>
              <CardTitle>{s.title}</CardTitle>
              <CardDescription>{s.text}</CardDescription>
            </Card>
          ))}
        </div>

        <h2 className="font-display mt-14 text-2xl font-semibold text-[var(--primary)]">
          {locale === "en" ? "How it works" : "Как это работает"}
        </h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--neutral-700)]">
          {model.howItWorks.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>

        <h2 className="font-display mt-14 text-2xl font-semibold text-[var(--primary)]">
          {locale === "en" ? "What is included" : "Что входит"}
        </h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[var(--neutral-200)]">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="bg-[var(--surface)] text-xs uppercase tracking-wide text-[var(--neutral-500)]">
              <tr>
                <th className="px-4 py-3">Позиция</th>
                <th className="px-4 py-3">Включено</th>
              </tr>
            </thead>
            <tbody>
              {model.includes.map((row) => (
                <tr key={row.name} className="border-t border-[var(--neutral-200)]">
                  <td className="px-4 py-3">{row.name}</td>
                  <td className="px-4 py-3 font-mono-nums">
                    {row.included ? "да" : "опционально"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="font-display mt-14 text-2xl font-semibold text-[var(--primary)]">
          {locale === "en" ? "Comparison" : "Сравнение подходов"}
        </h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[var(--neutral-200)]">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="bg-[var(--surface)] text-xs uppercase tracking-wide text-[var(--neutral-500)]">
              <tr>
                <th className="px-4 py-3">Критерий</th>
                <th className="px-4 py-3">С нами</th>
                <th className="px-4 py-3">Штат</th>
                <th className="px-4 py-3">Класс. агентство</th>
              </tr>
            </thead>
            <tbody>
              {model.comparison.map((r) => (
                <tr key={r.label} className="border-t border-[var(--neutral-200)]">
                  <td className="px-4 py-3 font-medium text-[var(--primary)]">
                    {r.label}
                  </td>
                  <td className="px-4 py-3 text-[var(--neutral-700)]">{r.us}</td>
                  <td className="px-4 py-3 text-[var(--neutral-700)]">{r.staff}</td>
                  <td className="px-4 py-3 text-[var(--neutral-700)]">{r.agency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="font-display mt-14 text-2xl font-semibold text-[var(--primary)]">
          Профессии
        </h2>
        <ul className="mt-4 columns-1 gap-2 sm:columns-2">
          {PROFESSIONS.map((p) => (
            <li key={p.slug} className="mb-2 break-inside-avoid">
              <Link
                className="text-sm font-medium text-[var(--accent)] hover:underline"
                href={`/personal/${p.slug}`}
              >
                {p.titleRu}
              </Link>
            </li>
          ))}
        </ul>

        <h2 className="font-display mt-14 text-2xl font-semibold text-[var(--primary)]">
          Кейсы и материалы
        </h2>
        <p className="mt-4 text-[var(--neutral-700)]">
          Перейдите в раздел кейсов и блога — там публикуется отраслевая аналитика и
          примеры внедрений.{" "}
          <Link className="font-medium text-[var(--accent)] hover:underline" href="/keysy">
            Кейсы
          </Link>{" "}
          ·{" "}
          <Link className="font-medium text-[var(--accent)] hover:underline" href="/blog">
            Блог
          </Link>
        </p>

        <h2 className="font-display mt-14 text-2xl font-semibold text-[var(--primary)]">
          FAQ
        </h2>
        <div className="mt-4 space-y-4">
          {model.faq.map((f) => (
            <div
              key={f.q}
              className="rounded-2xl border border-[var(--neutral-200)] bg-white p-5"
            >
              <h3 className="font-semibold text-[var(--primary)]">{f.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--neutral-700)]">{f.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl bg-[var(--primary-dark)] p-8 text-center text-white">
          <p className="font-display text-xl font-semibold">Нужен расчёт под ваш объект?</p>
          <p className="mt-2 text-sm text-white/80">
            Оставьте заявку — менеджер свяжется в течение 15 минут в рабочее время (заглушка
            SLA).
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href="/zayavka">Оставить заявку</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/kalkulyator">Калькулятор</Link>
            </Button>
          </div>
        </div>
      </article>
    </main>
  );
}
