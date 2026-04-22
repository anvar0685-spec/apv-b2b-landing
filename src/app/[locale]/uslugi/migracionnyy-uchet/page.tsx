import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServicePage } from "@/content/service-page-data";
import { ServicePageFull } from "@/components/marketing/service-page-full";

type Props = { params: { locale: string } };

export async function generateMetadata(): Promise<Metadata> {
  const m = getServicePage("migracionnyy-uchet");
  if (!m) return {};
  return {
    title: "Миграционный учёт и compliance",
    description: m.subtitle,
    alternates: { canonical: "/uslugi/migracionnyy-uchet" },
  };
}

export default function Page({ params }: Props) {
  const m = getServicePage("migracionnyy-uchet");
  if (!m) notFound();
  return <ServicePageFull model={m} locale={params.locale} />;
}
