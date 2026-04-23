import type { Metadata } from "next";
import { LegalBody } from "@/components/marketing/legal-body";
import { PRAVOVAYA_INFO_SECTIONS } from "@/content/pravovaya-info-sections";

export const metadata: Metadata = {
  title: "Правовая информация",
  description: "Оператор сайта, интеллектуальная собственность, ограничение ответственности и порядок споров.",
};

export default function Page() {
  return (
    <LegalBody
      kicker="Право"
      title="Правовая информация"
      lead="Общие положения о статусе материалов сайта, интеллектуальной собственности и порядке разрешения споров. Не заменяют индивидуальную юридическую консультацию."
      sections={PRAVOVAYA_INFO_SECTIONS}
    />
  );
}
