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
      lead="Документ в структуре 152-ФЗ: актуальные реквизиты оператора указаны в подвале сайта и в разделах политики ниже."
      sections={PRIVACY_POLICY_SECTIONS}
    />
  );
}
