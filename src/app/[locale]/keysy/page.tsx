import type { Metadata } from "next";
import { CASES } from "@/content/cases-stub";
import { PremiumCaseCard } from "@/components/marketing/premium-list-cards";

export const metadata: Metadata = {
  title: "Кейсы — цифры и результаты",
  description:
    "Подборка внедрений аутстаффинга и аутсорсинга: метрики по явке, throughput, compliance и операционной экономике.",
};

export default function Page() {
  return (
    <main id="main" className="pb-24">
      <section className="border-b border-[var(--neutral-200)] bg-[var(--surface)] py-10 lg:py-14">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <p className="type-kicker">Доказательная база</p>
          <h1 className="font-display mt-3 max-w-3xl text-balance text-3xl font-bold tracking-[-0.035em] text-[var(--primary)] md:text-[2.625rem] md:leading-[1.12]">
            Кейсы
          </h1>
          <p className="type-lead mt-5 max-w-2xl">
            Карточки с отраслью, цифрами и кратким контекстом — единый визуальный язык с главной. Детальная страница
            раскрывает задачу, решение и цитату заказчика.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <ul className="grid gap-8 md:grid-cols-2">
          {CASES.map((c, i) => (
            <li key={c.slug}>
              <PremiumCaseCard c={c} index={i} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
