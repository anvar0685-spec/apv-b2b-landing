import type { Metadata } from "next";
import { Suspense } from "react";
import { CalculatorFull } from "@/components/kalkulyator/calculator-full";

export const metadata: Metadata = {
  title: "Калькулятор складского аутсорсинга — ставки ₽/час",
  description:
    "Ориентир по Москве и МО: грузчики 600, комплектовщики 620, кладовщики 650, водители ПРТ 750, уборщики и разнорабочие 600 ₽/час. Вилка к месячному фонду и заявка на КП.",
  alternates: { canonical: "/kalkulyator" },
};

export default function Page() {
  return (
    <main id="main" className="pb-24">
      <Suspense fallback={<p className="p-8 text-center text-sm text-[var(--neutral-500)]">Загрузка…</p>}>
        <CalculatorFull />
      </Suspense>
    </main>
  );
}
