import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServicePage } from "@/content/service-page-data";
import { ServicePageFull } from "@/components/marketing/service-page-full";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const m = getServicePage("autsorsing", params.locale);
  if (!m) return {};
  return buildPageMetadata({
    locale: params.locale,
    pathname: `/uslugi/${m.slug}`,
    title: m.h1,
    description: m.subtitle,
  });
}

export default function Page({ params }: Props) {
  const m = getServicePage("autsorsing", params.locale);
  if (!m) notFound();
  return <ServicePageFull model={m} locale={params.locale} />;
}
