import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServicePage } from "@/content/service-page-data";
import { ServicePageFull } from "@/components/marketing/service-page-full";

type Props = { params: { locale: string } };

export async function generateMetadata(): Promise<Metadata> {
  const m = getServicePage("autsorsing");
  if (!m) return {};
  return {
    title: "Аутсорсинг персонала на склады — Москва и МО",
    description: m.subtitle,
    alternates: { canonical: "/uslugi/autsorsing" },
  };
}

export default function Page({ params }: Props) {
  const m = getServicePage("autsorsing");
  if (!m) notFound();
  return <ServicePageFull model={m} locale={params.locale} />;
}
