import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CITIES, PROFESSIONS, getCity, getProfession } from "@/content/professions-cities";
import { ProgrammaticStaffingPage } from "@/components/marketing/programmatic-staffing-page";
import { site } from "@/config/site";
import { buildNotFoundPageMetadata, buildPageMetadata } from "@/lib/seo";
import { isPriorityCross } from "@/content/cross-priority";

type Props = {
  params: { locale: string; profession: string; city: string };
};

export function generateStaticParams() {
  const out: { profession: string; city: string }[] = [];
  for (const p of PROFESSIONS) {
    for (const c of CITIES) {
      out.push({ profession: p.slug, city: c.slug });
    }
  }
  return out;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const prof = getProfession(params.profession);
  const city = getCity(params.city);
  if (!prof || !city) {
    return buildNotFoundPageMetadata(
      params.locale,
      `/personal/${params.profession}/${params.city}`,
    );
  }
  const brand = site.brandName.replace(/_/g, " ");
  const cityName = city.nameRu;
  const roleName = prof.titleRu;
  const title = `${roleName} в ${cityName} — складской персонал (аутсорсинг смен) — ${brand}`;
  const description = `${roleName} в ${cityName}: ориентиры по ставкам, логистика выхода на склад, документы и допуски. Аутсорсинг персонала на склад подрядчиком, без аутстаффинга.`;
  const priority = isPriorityCross(params.profession, params.city);
  return buildPageMetadata({
    locale: params.locale,
    pathname: `/personal/${params.profession}/${params.city}`,
    title,
    description,
    noindex: !priority,
  });
}

export default function ProgrammaticPage({ params }: Props) {
  const prof = getProfession(params.profession);
  const city = getCity(params.city);
  if (!prof || !city) notFound();

  return <ProgrammaticStaffingPage profession={prof} city={city} />;
}
