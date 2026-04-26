import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LegalBody } from "@/components/marketing/legal-body";
import { CONSENT_SECTIONS } from "@/content/legal-pages-stub";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "pagesSeo" });
  return buildPageMetadata({
    locale: params.locale,
    pathname: "/soglasie-na-obrabotku-pd",
    title: t("soglasiePd.metaTitle"),
    description: t("soglasiePd.metaDescription"),
  });
}

export default function Page() {
  return (
    <LegalBody
      title="Согласие на обработку персональных данных"
      lead="Используйте этот текст как основу для чекбоксов в формах заявки и подписки."
      sections={CONSENT_SECTIONS}
    />
  );
}
