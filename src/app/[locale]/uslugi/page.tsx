import type { Metadata } from "next";
import { ServicesHub } from "@/components/marketing/services-hub";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const en = params.locale === "en";
  return buildPageMetadata({
    locale: params.locale,
    pathname: "/uslugi",
    title: en ? "Warehouse services — Moscow & Moscow Oblast" : "Складские услуги — Москва и МО",
    description: en
      ? "Shift outsourcing for warehouses and DCs: attendance, SLA. Migration compliance and recruiting within the supply contract."
      : "Аутсорсинг смен на склады и DC: явка, SLA. Миграционный учёт и подбор — в контракте поставки.",
  });
}

export default function Page({ params }: Props) {
  return <ServicesHub locale={params.locale} />;
}
