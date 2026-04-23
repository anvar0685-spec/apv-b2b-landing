import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { LegalTableOfContentsAndSections } from "@/components/marketing/legal-body";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import { GARANTII_SECTIONS } from "@/content/garantii-sections";

export const metadata: Metadata = {
  title: "Гарантии и SLA",
  description: "Качество сервиса, замена персонала, комплаенс и прозрачные условия в договоре и приложении SLA.",
};

export default function Page() {
  return (
    <main id="main" className="pb-24">
      <MarketingPageHero
        kicker="SLA"
        title="Гарантии и уровень сервиса"
        description="Коммерческие и операционные обязательства фиксируются в договоре и приложении SLA. Ниже — рамочные принципы; числовые целевые значения согласуются под каждый проект."
      />

      <section className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-[var(--neutral-200)]/90">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">Реакция</p>
            <CardTitle className="mt-3">Сопровождение 24/7</CardTitle>
            <CardDescription>
              Линия диспетчеризации и курирующие менеджеры на критичных контрактах. Время реакции на инциденты
              прописывается в SLA с эскалацией до руководства.
            </CardDescription>
          </Card>
          <Card className="border-[var(--neutral-200)]/90">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">Замена</p>
            <CardTitle className="mt-3">Процедура подбора альтернативы</CardTitle>
            <CardDescription>
              Согласованные сроки замены, буфер резерва для сменных моделей, прозрачная коммуникация с заказчиком при
              каждом изменении состава бригады.
            </CardDescription>
          </Card>
          <Card className="border-[var(--neutral-200)]/90">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">Комплаенс</p>
            <CardTitle className="mt-3">Документы и учёт</CardTitle>
            <CardDescription>
              Инструктажи, табели, акты, кадровый и миграционный контур в зоне ответственности поставщика — по договору.
              Пакеты под аудит заказчика согласуются заранее.
            </CardDescription>
          </Card>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/zayavka">Запросить SLA под проект</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/kontakty">Связаться</Link>
          </Button>
        </div>
      </section>

      <div className="mx-auto max-w-[880px] px-4 pb-8 sm:px-6 lg:px-8">
        <LegalTableOfContentsAndSections sections={GARANTII_SECTIONS} />
      </div>
    </main>
  );
}
