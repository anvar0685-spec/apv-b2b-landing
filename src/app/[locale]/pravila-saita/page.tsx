import type { Metadata } from "next";
import { LegalBody } from "@/components/marketing/legal-body";
import { SITE_RULES_SECTIONS } from "@/content/legal-pages-stub";

export const metadata: Metadata = {
  title: "Правила сайта",
  description: "Пользовательское соглашение и правила использования сервисов сайта (шаблон).",
};

export default function Page() {
  return (
    <LegalBody
      title="Правила сайта"
      lead="Расширенная редакция появится вместе с продуктовой моделью и личным кабинетом (если планируется)."
      sections={SITE_RULES_SECTIONS}
    />
  );
}
