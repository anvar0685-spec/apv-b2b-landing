import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServicePage } from "@/content/service-page-data";
import { ServicePageFull } from "@/components/marketing/service-page-full";

type Props = { params: { locale: string } };

export async function generateMetadata(): Promise<Metadata> {
  const m = getServicePage("autstaffing");
  if (!m) return {};
  const title = "Аутстаффинг персонала — Москва и МО | PLACEHOLDER_BRAND";
  return {
    title,
    description: m.subtitle,
    alternates: { canonical: "/uslugi/autstaffing" },
  };
}

export default function Page({ params }: Props) {
  const m = getServicePage("autstaffing");
  if (!m) notFound();
  return <ServicePageFull model={m} locale={params.locale} />;
}
