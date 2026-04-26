import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServicePage } from "@/content/service-page-data";
import { ServicePageFull } from "@/components/marketing/service-page-full";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const m = getServicePage("autstaffing", params.locale);
  if (!m) return {};
  const title =
    params.locale === "en"
      ? "Outstaffing — how the model differs (reference)"
      : "Аутстаффинг — как отличается модель (справочно)";
  return buildPageMetadata({
    locale: params.locale,
    pathname: `/uslugi/${m.slug}`,
    title,
    description: m.subtitle,
  });
}

export default function Page({ params }: Props) {
  const m = getServicePage("autstaffing", params.locale);
  if (!m) notFound();
  return <ServicePageFull model={m} locale={params.locale} />;
}
