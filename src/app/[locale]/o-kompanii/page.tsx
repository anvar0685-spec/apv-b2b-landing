import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "О компании — команда и EEAT",
  description: "Миссия, цифры, ценности и навигация к команде, документам и прессе. Прозрачность для заказчиков и поисковых систем.",
};

const STATS = [
  { label: "Фокус", value: "B2B персонал" },
  { label: "Модели", value: "Аутстафф · аутсорс · подряд" },
  { label: "География", value: "РФ + удалёнка" },
  { label: "Комплаенс", value: "152-ФЗ · ОТ · ТБ" },
] as const;

const PILLARS = [
  {
    href: "/o-kompanii/komanda",
    title: "Команда",
    body: "Роли руководства и ключевые функции: операции, HR, юристы, финансы и развитие.",
  },
  {
    href: "/o-kompanii/dokumenty",
    title: "Документы",
    body: "Устав, лицензии при наличии, локальные акты и справки для тендеров — по запросу.",
  },
  {
    href: "/o-kompanii/pressa",
    title: "Пресса",
    body: "Публикации, выступления и отраслевые материалы — единая лента для EEAT.",
  },
] as const;

export default function Page() {
  return (
    <main id="main" className="pb-24">
      <MarketingPageHero
        kicker="Компания"
        title={site.brandName}
        description="Мы строим предсказуемый персональный контур для промышленности и сервисных компаний: прозрачная цена, документы и SLA, которые выдерживают аудит заказчика."
      />

      <section className="border-b border-[var(--neutral-200)] bg-[var(--background)] py-12 lg:py-16">
        <div className="mx-auto grid max-w-[1280px] gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)] px-5 py-6 shadow-[var(--card-shadow)]"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--neutral-500)]">{s.label}</p>
              <p className="font-display mt-2 text-lg font-semibold tracking-tight text-[var(--primary)]">{s.value}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="type-headline">Как мы работаем</h2>
            <div className="type-editorial-dropcap mt-6 space-y-5 text-base leading-relaxed text-[var(--neutral-700)]">
              <p>
                Каждый проект начинается с профиля рисков: сменность, удалённость, допуски, миграционный контур и
                требования к отчётности. Мы не продаём «коробку» — собираем решение из сервисных модулей и людей.
              </p>
              <p>
                Цифры и обещания на сайте — ориентир. Итоговые обязательства закрепляются в договоре, приложениях SLA и
                коммерческом предложении с разбивкой затрат.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/zayavka">Обсудить проект</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/keysy">Кейсы</Link>
              </Button>
            </div>
          </div>

          <div className="space-y-5 lg:col-span-7">
            {PILLARS.map((p) => (
              <Card key={p.href} className="border-[var(--neutral-200)]/90">
                <CardTitle>
                  <Link className="transition hover:text-[var(--accent)]" href={p.href}>
                    {p.title}
                  </Link>
                </CardTitle>
                <CardDescription>{p.body}</CardDescription>
                <div className="mt-4">
                  <Link className="text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline" href={p.href}>
                    Перейти
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <section className="mt-20 rounded-3xl border border-[var(--neutral-200)] bg-gradient-to-br from-[var(--surface)] via-[var(--card)] to-[var(--surface)] p-8 md:p-12">
          <h2 className="type-headline max-w-2xl">Ценности, которые видны в договоре</h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              "Прозрачность цены без скрытых строк в табеле.",
              "Дисциплина документов и готовность к аудиту.",
              "Уважение к людям на площадке и в офисе заказчика.",
            ].map((t) => (
              <li
                key={t}
                className="rounded-2xl border border-[var(--neutral-200)]/80 bg-[var(--card)]/80 px-5 py-6 text-sm leading-relaxed text-[var(--neutral-700)] shadow-sm backdrop-blur-sm"
              >
                {t}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
