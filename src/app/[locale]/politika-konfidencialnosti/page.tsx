import type { Metadata } from "next";
import { LegalBody } from "@/components/marketing/legal-body";
import { PRIVACY_POLICY_SECTIONS } from "@/content/legal-pages-stub";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description: "Обработка персональных данных в соответствии с 152-ФЗ (шаблон до юр. финализации).",
};

export default function Page() {
  return (
    <LegalBody
      title="Политика конфиденциальности"
      lead="Документ в структуре 152-ФЗ с плейсхолдерами: финальный текст и реквизиты оператора подставятся перед запуском."
      sections={PRIVACY_POLICY_SECTIONS}
    />
  );
}
