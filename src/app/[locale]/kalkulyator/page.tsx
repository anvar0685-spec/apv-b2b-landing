import type { Metadata } from "next";
import { Suspense } from "react";
import { CalculatorFull } from "@/components/kalkulyator/calculator-full";

export const metadata: Metadata = {
  title: "Калькулятор стоимости аутстаффинга и аутсорсинга",
  description:
    "Пять шагов расчёта и блок дополнений: предварительная вилка стоимости и переход к КП.",
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
