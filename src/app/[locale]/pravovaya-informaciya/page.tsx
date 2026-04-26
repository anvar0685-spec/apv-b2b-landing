import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LegalBody } from "@/components/marketing/legal-body";
import { PRAVOVAYA_INFO_SECTIONS } from "@/content/pravovaya-info-sections";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "pagesSeo" });
  return buildPageMetadata({
    locale: params.locale,
    pathname: "/pravovaya-informaciya",
    title: t("pravovayaInformaciya.metaTitle"),
    description: t("pravovayaInformaciya.metaDescription"),
  });
}

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
