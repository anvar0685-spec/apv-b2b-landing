import type { Metadata } from "next";
import { ServicesHub } from "@/components/marketing/services-hub";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return buildPageMetadata({
    locale: params.locale,
    pathname: "/uslugi",
    title: "Складские услуги — Москва и МО",
    description:
      "Аутсорсинг смен на склады и DC: явка, гарантии. Подбор и документы на допуск — в рамках договора на закрытие смен.",
  });
}

export default function Page() {
  return <ServicesHub />;
}
