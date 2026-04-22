import type { Metadata } from "next";
import { StubPage } from "@/components/marketing/stub-page";

export const metadata: Metadata = {
  title: "Аутстаффинг персонала — Москва и МО",
  description:
    "Премиальный аутстаффинг линейного персонала: SLA, прозрачная цена, compliance без риска для заказчика.",
};

export default function Page() {
  return (
    <StubPage
      title="Аутстаффинг персонала"
      description="Полноформатная SEO-страница услуги (800–1200 слов, таблицы, FAQ, кейсы) — в бэклоге контента."
    />
  );
}
