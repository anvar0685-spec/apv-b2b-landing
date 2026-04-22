import { CASES } from "@/content/cases-stub";
import { BLOG_POSTS } from "@/content/blog-stub";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { CalculatorEmbed } from "@/components/home/calculator-embed";
import { Button } from "@/components/ui/button";
import { CaseSparkline } from "@/components/home/case-sparkline";
import { ProcessStickySplit } from "@/components/home/process-sticky-split";

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

const REVIEWS = [
  { initials: "АК", name: "Алексей К.", role: "COO · логистика", quote: "Заглушка: явка и замены стали предсказуемыми после первого месяца пилота." },
  { initials: "МС", name: "Марина С.", role: "HRD · ритейл", quote: "Заглушка: миграционный контур перестал быть «чёрным ящиком» для внутреннего аудита." },
  { initials: "ДВ", name: "Дмитрий В.", role: "Операционный директор · производство", quote: "Заглушка: cost per shift снизился без передачи риска на линейку." },
  { initials: "ЕП", name: "Елена П.", role: "CFO · маркетплейс", quote: "Заглушка: отчётность по сменам совпала с финмоделью пика сезона." },
  { initials: "ИН", name: "Игорь Н.", role: "Руководитель склада", quote: "Заглушка: онбординг бригад укладывается в заявленный SLA." },
  { initials: "ОТ", name: "Ольга Т.", role: "Комплаенс", quote: "Заглушка: документы и сроки уведомлений под контролем, без сюрпризов." },
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
      <section id="services-preview" className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <h2 className="font-display text-4xl font-bold tracking-[-0.03em] text-[var(--primary)] md:text-6xl lg:text-[clamp(2.75rem,5.5vw,5rem)]">
          Наши услуги
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--neutral-700)]">
          Четыре ключевых направления + подбор. Карточки ведут на SEO-страницы услуг.
        </p>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
              <div className="mt-5">
                <Button asChild variant="secondary" size="sm">
                  <Link href={s.href}>Подробнее</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section id="calc" className="bg-[var(--surface)] py-20 lg:py-28">
        <div className="mx-auto grid max-w-[1280px] gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--primary)] md:text-5xl">
              Калькулятор стоимости
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[var(--neutral-700)]">
              Встроенная мини-версия на главной. Полный мультистеп — на отдельной странице.
            </p>
            <ul className="mt-8 space-y-3 text-[var(--neutral-700)]">
              <li className="flex gap-2 text-sm md:text-base">
                <span className="font-mono-nums text-[var(--accent)]">01</span>
                тип услуги и профиль;
              </li>
              <li className="flex gap-2 text-sm md:text-base">
                <span className="font-mono-nums text-[var(--accent)]">02</span>
                численность и график (в полной версии);
              </li>
              <li className="flex gap-2 text-sm md:text-base">
                <span className="font-mono-nums text-[var(--accent)]">03</span>
                локация в МО и доп. опции.
              </li>
            </ul>
          </div>
          <CalculatorEmbed />
        </div>
      </section>

      <section id="cases" className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--primary)] md:text-5xl">
          Кейсы-флагманы
        </h2>
        <p className="mt-4 max-w-2xl text-[var(--neutral-700)]">
          Каждая карточка — мини-история с трендом (декоративный sparkline). После NDA — реальные цифры и логотипы.
        </p>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {CASES.slice(0, 3).map((c, i) => (
            <Card
              key={c.slug}
              className="group relative flex flex-col overflow-hidden border-[var(--neutral-200)]/90 bg-gradient-to-b from-white via-white to-[var(--surface)] shadow-[0_1px_0_rgba(0,0,0,0.04)] transition-[box-shadow,transform,border-color] duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/30 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.14),0_0_0_1px_rgba(0,0,0,0.03),0_0_40px_-8px_var(--accent)] motion-reduce:transform-none"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
                {c.industry}
              </p>
              <CardTitle className="mt-3">{c.title}</CardTitle>
              <CardDescription>{c.summary}</CardDescription>
              <CaseSparkline chartId={`home-case-${c.slug}`} variant={i === 1 ? "flat" : "up"} />
              <p className="mt-2 font-mono-nums text-lg font-semibold tabular-nums text-[var(--primary)]">
                {c.metricUp}
              </p>
              <div className="mt-auto pt-5">
                <Button asChild variant="secondary" size="sm">
                  <Link href={`/keysy/${c.slug}`}>Разбор кейса</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <ProcessStickySplit />

      <section id="tech" className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--primary)] md:text-5xl">
          Технологии и compliance
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
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

      <section id="reviews" className="bg-[var(--surface)] py-20 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--primary)] md:text-5xl">
            Отзывы
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--neutral-700)]">
            Карточки с инициалами и ролями — после согласования клиентов подставим реальные имена и логотипы.
          </p>
          <div className="mt-14 columns-1 gap-5 md:columns-2 lg:columns-3">
            {REVIEWS.map((r) => (
              <figure
                key={r.name}
                className="mb-5 break-inside-avoid rounded-3xl border border-[var(--neutral-200)] bg-white p-6 shadow-sm"
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

      <section id="blog" className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--primary)] md:text-5xl">
            Блог — свежие материалы
          </h2>
          <Button asChild variant="secondary" size="sm">
            <Link href="/blog">Все статьи</Link>
          </Button>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {BLOG_POSTS.slice(0, 3).map((b) => (
            <Card key={b.slug}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--neutral-500)]">
                {b.category}
              </p>
              <CardTitle className="mt-2 text-lg">{b.title}</CardTitle>
              <CardDescription>{b.excerpt}</CardDescription>
              <div className="mt-5">
                <Link className="text-sm font-semibold text-[var(--accent)] hover:underline" href={`/blog/${b.slug}`}>
                  Читать
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section id="faq" className="border-t border-[var(--neutral-200)] bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-[880px] px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-center text-3xl font-bold tracking-tight text-[var(--primary)] md:text-5xl">
            Частые вопросы
          </h2>
          <div className="mt-14 space-y-3">
            {FAQ.map((f) => (
              <details key={f.q} className="faq-item group rounded-2xl border border-[var(--neutral-200)] bg-[var(--surface)] transition open:bg-white open:shadow-md">
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

      <section id="cta" className="grain-dark bg-[var(--primary-dark)] py-20 text-white lg:py-28">
        <div className="mx-auto max-w-[720px] px-4 text-center sm:px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            Оставить заявку на расчёт
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-white/75 md:text-base">
            Переход на мультистеп-форму: контакты, параметры проекта, согласие на обработку ПД.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href="/zayavka">Заполнить заявку</Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              className="border-white/25 bg-white/10 text-white hover:bg-white/15"
            >
              <Link href="/kalkulyator">Открыть калькулятор</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
