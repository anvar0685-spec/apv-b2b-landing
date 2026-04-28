import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServicePage } from "@/content/service-page-data";
import { ServicePageFull } from "@/components/marketing/service-page-full";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const m = getServicePage("autstaffing");
  if (!m) return {};
  const title = "Аутстаффинг — как отличается модель (справочно)";
  return buildPageMetadata({
    locale: params.locale,
    pathname: `/uslugi/${m.slug}`,
    title,
    description: m.subtitle,
  });
}

export default function Page() {
  const m = getServicePage("autstaffing");
  if (!m) notFound();
  return <ServicePageFull model={m} />;
}
