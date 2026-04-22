import type { Metadata } from "next";
import { LegalBody } from "@/components/marketing/legal-body";
import { OFFER_SECTIONS } from "@/content/legal-pages-stub";

export const metadata: Metadata = {
  title: "Оферта на услуги",
  description: "Публичная оферта на оказание услуг аутстаффинга и смежных сервисов (шаблон).",
};

export default function Page() {
  return (
    <LegalBody
      title="Публичная оферта"
      lead="Ниже — каркас оферты. Условия, цены и порядок акцепта согласуются с юристом."
      sections={OFFER_SECTIONS}
    />
  );
}
