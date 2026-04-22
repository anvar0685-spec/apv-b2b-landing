import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServicePage } from "@/content/service-page-data";
import { ServicePageFull } from "@/components/marketing/service-page-full";

type Props = { params: { locale: string } };

export async function generateMetadata(): Promise<Metadata> {
  const m = getServicePage("podbor-personala");
  if (!m) return {};
  return {
    title: "Подбор персонала под ключ",
    description: m.subtitle,
    alternates: { canonical: "/uslugi/podbor-personala" },
  };
}

export default function Page({ params }: Props) {
  const m = getServicePage("podbor-personala");
  if (!m) notFound();
  return <ServicePageFull model={m} locale={params.locale} />;
}
