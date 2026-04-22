import type { Metadata } from "next";
import { LegalBody } from "@/components/marketing/legal-body";
import { CONSENT_SECTIONS } from "@/content/legal-pages-stub";

export const metadata: Metadata = {
  title: "Согласие на обработку персональных данных",
  description: "Текст согласия для форм и чекбоксов на сайте (шаблон).",
};

export default function Page() {
  return (
    <LegalBody
      title="Согласие на обработку персональных данных"
      lead="Используйте этот текст как основу для чекбоксов в формах заявки и подписки."
      sections={CONSENT_SECTIONS}
    />
  );
}
