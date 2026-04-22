import type { Metadata } from "next";
import { StubPage } from "@/components/marketing/stub-page";

export const metadata: Metadata = {
  title: "Калькулятор стоимости аутстаффинга",
  description:
    "Пять шагов: услуга, профессия, численность, график, локация. Итог с вилкой ±15% и CTA на КП.",
};

export default function Page() {
  return <StubPage title="Калькулятор" description="Мультистеп UI + сохранение в URL — Sprint 2." />;
}
