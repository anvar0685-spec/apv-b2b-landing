import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LegalBody } from "@/components/marketing/legal-body";
import { PRIVACY_POLICY_SECTIONS } from "@/content/legal-pages-stub";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "pagesSeo" });
  return buildPageMetadata({
    locale: params.locale,
    pathname: "/politika-konfidencialnosti",
    title: t("politikaKonfidencialnosti.metaTitle"),
    description: t("politikaKonfidencialnosti.metaDescription"),
  });
}

export default function Page() {
  return (
    <LegalBody
      title="Политика конфиденциальности"
      lead="Политика обработки персональных данных в соответствии с 152-ФЗ: цели и правовые основания, категории данных, сроки хранения, меры защиты, права субъекта и контакты оператора с актуальными реквизитами ИП."
      sections={PRIVACY_POLICY_SECTIONS}
    />
  );
}
