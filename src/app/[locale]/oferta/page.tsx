import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LegalBody } from "@/components/marketing/legal-body";
import { OFFER_SECTIONS } from "@/content/legal-pages-stub";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "pagesSeo" });
  return buildPageMetadata({
    locale: params.locale,
    pathname: "/oferta",
    title: t("oferta.metaTitle"),
    description: t("oferta.metaDescription"),
  });
}

export default function Page() {
  return (
    <LegalBody
      title="Публичная оферта"
      lead="Ниже — каркас оферты. Условия, цены и порядок акцепта согласуются с юристом."
      sections={OFFER_SECTIONS}
    />
  );
}
