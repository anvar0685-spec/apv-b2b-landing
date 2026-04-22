import { CASES } from "@/content/cases-stub";
import { BLOG_POSTS } from "@/content/blog-stub";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { CalculatorEmbed } from "@/components/home/calculator-embed";
import { Button } from "@/components/ui/button";

const FAQ = [
  {
    q: "Чем аутстаффинг отличается от классического агентства?",
    a: "Мы отвечаем за поставку смен, явку и compliance-контур, а не только за подбор резюме.",
  },
  {
    q: "Как быстро можно выйти на объём?",
    a: "Пилот — от нескольких дней; масштаб зависит от профилей и локации. Детали фиксируются в КП.",
  },
  {
    q: "Кто отвечает за миграционный учёт?",
    a: "В стандартной модели подрядчика — документальный контур на нашей стороне; условия договора уточняются юристом.",
  },
  {
    q: "Работаете по всей Московской области?",
    a: "Да, программатика покрывает 30 городов МО плюс Москва.",
  },
  {
    q: "Есть ли SLA по явке?",
    a: "SLA согласуется индивидуально и закрепляется в приложении к договору.",
  },
  {
    q: "Как получить КП?",
    a: "Через форму заявки или калькулятор — данные попадают в CRM и события аналитики.",
  },
];

export function HomeSections() {
  const faqJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={faqJson} />
      <section id="services-preview" className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <h2 className="font-display text-3xl font-bold text-[var(--primary)] md:text-4xl">
          Наши услуги
        </h2>
        <p className="mt-3 max-w-2xl text-[var(--neutral-700)]">
          Четыре ключевых направления + подбор. Карточки ведут на SEO-страницы услуг.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { href: "/uslugi/autstaffing", t: "Аутстаффинг", d: "Поставка линейного персонала под ваши смены." },
            { href: "/uslugi/autsorsing", t: "Аутсорсинг", d: "Функции склада/производства под KPI." },
            { href: "/uslugi/upravlyaemyy-podryad", t: "Managed service", d: "Управляемый подряд и отчётность." },
            { href: "/uslugi/migracionnyy-uchet", t: "Миграционный учёт", d: "Compliance без «сюрпризов» для заказчика." },
            { href: "/uslugi/podbor-personala", t: "Подбор персонала", d: "Воронка и выход на смену под ключ." },
          ].map((s) => (
            <Card key={s.href}>
              <CardTitle>{s.t}</CardTitle>
              <CardDescription>{s.d}</CardDescription>
              <div className="mt-4">
                <Button asChild variant="secondary" size="sm">
                  <Link href={s.href}>Подробнее</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section id="calc" className="bg-[var(--surface)] py-16 lg:py-24">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="font-display text-3xl font-bold text-[var(--primary)] md:text-4xl">
              Калькулятор стоимости
            </h2>
            <p className="mt-4 text-[var(--neutral-700)]">
              Встроенная мини-версия на главной. Полный мультистеп — на отдельной странице.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-[var(--neutral-700)]">
              <li>• тип услуги и профиль;</li>
              <li>• численность и график (в полной версии);</li>
              <li>• локация в МО и доп. опции.</li>
            </ul>
          </div>
          <CalculatorEmbed />
        </div>
      </section>

      <section id="cases" className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <h2 className="font-display text-3xl font-bold text-[var(--primary)] md:text-4xl">
          Кейсы-флагманы
        </h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {CASES.slice(0, 3).map((c) => (
            <Card key={c.slug}>
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
                {c.industry}
              </p>
              <CardTitle className="mt-2">{c.title}</CardTitle>
              <CardDescription>{c.summary}</CardDescription>
              <p className="mt-4 font-mono-nums text-lg font-semibold text-[var(--primary)]">
                {c.metricUp}
              </p>
              <div className="mt-4">
                <Button asChild variant="secondary" size="sm">
                  <Link href={`/keysy/${c.slug}`}>Разбор кейса</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section id="process" className="border-y border-[var(--neutral-200)] bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-[var(--primary)] md:text-4xl">
            Процесс работы
          </h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-5">
            {[
              "Заявка и SLA",
              "Подбор",
              "Compliance-check",
              "Онбординг",
              "Операция",
            ].map((t, i) => (
              <li key={t} className="relative rounded-2xl border border-[var(--neutral-200)] bg-[var(--surface)] p-5">
                <span className="font-mono-nums text-sm font-bold text-[var(--accent)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 font-semibold text-[var(--primary)]">{t}</p>
                <p className="mt-2 text-sm text-[var(--neutral-700)]">
                  Заглушка описания этапа; детали процесса — в КП и онбординг-пакете.
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="tech" className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <h2 className="font-display text-3xl font-bold text-[var(--primary)] md:text-4xl">
          Технологии и compliance
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            {
              t: "Миграционный учёт",
              d: "Чек-листы, сроки уведомлений, контроль версий документов.",
            },
            {
              t: "AI-скрининг (план)",
              d: "Квалификация лидов и черновики статей под редакцию человека.",
            },
            {
              t: "SLA-дашборды",
              d: "Явка, замены, инциденты смены — в одном контуре отчётности.",
            },
          ].map((x) => (
            <Card key={x.t}>
              <CardTitle>{x.t}</CardTitle>
              <CardDescription>{x.d}</CardDescription>
            </Card>
          ))}
        </div>
      </section>

      <section id="reviews" className="bg-[var(--surface)] py-16 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-[var(--primary)] md:text-4xl">
            Отзывы
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <CardTitle>Имя Фамилия · Должность</CardTitle>
                <CardDescription>
                  «Заглушка отзыва {i + 1}. После согласования клиента — реальная цитата, логотип и
                  JSON-LD Review.»
                </CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-bold text-[var(--primary)] md:text-4xl">
            Блог — свежие материалы
          </h2>
          <Button asChild variant="secondary" size="sm">
            <Link href="/blog">Все статьи</Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {BLOG_POSTS.slice(0, 3).map((b) => (
            <Card key={b.slug}>
              <p className="text-xs uppercase tracking-wide text-[var(--neutral-500)]">
                {b.category}
              </p>
              <CardTitle className="mt-2 text-lg">{b.title}</CardTitle>
              <CardDescription>{b.excerpt}</CardDescription>
              <div className="mt-4">
                <Link className="text-sm font-semibold text-[var(--accent)] hover:underline" href={`/blog/${b.slug}`}>
                  Читать
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section id="faq" className="border-t border-[var(--neutral-200)] bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-center text-3xl font-bold text-[var(--primary)] md:text-4xl">
            Частые вопросы
          </h2>
          <div className="mt-10 space-y-4">
            {FAQ.map((f) => (
              <div key={f.q} className="rounded-2xl border border-[var(--neutral-200)] p-5">
                <h3 className="font-semibold text-[var(--primary)]">{f.q}</h3>
                <p className="mt-2 text-sm text-[var(--neutral-700)]">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cta" className="bg-[var(--primary-dark)] py-16 text-white lg:py-24">
        <div className="mx-auto max-w-[720px] px-4 text-center sm:px-6">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Оставить заявку на расчёт
          </h2>
          <p className="mt-4 text-sm text-white/80">
            Переход на мультистеп-форму: контакты, параметры проекта, согласие на обработку ПД.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href="/zayavka">Заполнить заявку</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/kalkulyator">Открыть калькулятор</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
