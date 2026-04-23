import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";

export const metadata: Metadata = {
  title: "Для поставщиков и субподряда",
  description: "Требования к партнёрам, антикоррупционные стандарты и порядок квалификации перед допуском к проектам.",
};

const STEPS = [
  {
    step: "01",
    title: "Регистрация интереса",
    body: "Краткий профиль компании, регионы присутствия, отраслевой опыт и контакт ответственного за производство.",
  },
  {
    step: "02",
    title: "Комплаенс-проверка",
    body: "Реквизиты, отсутствие критичных рисков, подтверждение лицензий и страховых программ при необходимости.",
  },
  {
    step: "03",
    title: "Пилотный участок",
    body: "Ограниченный объём смен с усиленной отчётностью и обратной связью от операционной команды заказчика.",
  },
  {
    step: "04",
    title: "Рамочное соглашение",
    body: "Фиксация тарифов, KPI, форматов документов и каналов коммуникации перед масштабированием.",
  },
] as const;

const REQUIREMENTS = [
  "Прозрачная модель ценообразования без скрытых надбавок в табеле.",
  "Готовность к электронному документообороту и согласованным SLA по замене.",
  "Соблюдение охраны труда, инструктажей и требований заказчика на площадке.",
  "Конфиденциальность данных и персонала; отсутствие конфликта интересов с прямым конкурентом на том же объекте.",
] as const;

export default function Page() {
  return (
    <main id="main" className="pb-24">
      <MarketingPageHero
        kicker="Партнёрам"
        title="Для поставщиков и субподряда"
        description="Мы расширяем производственный контур через проверенных партнёров. Ниже — прозрачный путь квалификации и этические стандарты, которые не подлежат обсуждению на объекте."
      />

      <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="type-headline">Как проходит допуск</h2>
            <p className="type-body mt-4">
              Процесс унифицирован для снижения операционных рисков заказчика. Сроки этапов зависят от полноты пакета
              документов и профиля работ.
            </p>
            <ol className="mt-10 space-y-6">
              {STEPS.map((s) => (
                <li key={s.step} className="flex gap-5">
                  <span className="font-mono-nums text-sm font-semibold tabular-nums text-[var(--accent)]">{s.step}</span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-[var(--primary)]">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--neutral-700)]">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h2 className="type-headline">Требования к партнёрам</h2>
            <ul className="mt-6 space-y-4">
              {REQUIREMENTS.map((text) => (
                <li
                  key={text}
                  className="rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)] px-5 py-4 text-sm leading-relaxed text-[var(--neutral-700)] shadow-[var(--card-shadow)]"
                >
                  {text}
                </li>
              ))}
            </ul>

            <Card className="mt-10 border-[var(--accent)]/20 bg-gradient-to-br from-[var(--surface)] to-[var(--card)]">
              <CardTitle>Антикоррупция и этика</CardTitle>
              <CardDescription>
                Любые попытки неофициальных выплат или искажения табеля немедленно прекращают сотрудничество и
                фиксируются во внутреннем реестре инцидентов. По вопросам этики используйте официальный канал в договоре.
              </CardDescription>
            </Card>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/zayavka">Стать партнёром</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/kontakty">Контакты закупок</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
