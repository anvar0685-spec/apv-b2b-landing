import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LegalBody } from "@/components/marketing/legal-body";
import { SITE_RULES_SECTIONS } from "@/content/legal-pages-stub";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "pagesSeo" });
  return buildPageMetadata({
    locale: params.locale,
    pathname: "/pravila-saita",
    title: t("pravilaSaita.metaTitle"),
    description: t("pravilaSaita.metaDescription"),
  });
}

export default function Page() {
  return (
    <LegalBody
      title="Правила сайта"
      lead="Расширенная редакция появится вместе с продуктовой моделью и личным кабинетом (если планируется)."
      sections={SITE_RULES_SECTIONS}
    />
  );
}
