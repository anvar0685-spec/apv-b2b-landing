import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CITIES, PROFESSIONS, getCity, getProfession } from "@/content/professions-cities";
import { ProgrammaticStaffingPage } from "@/components/marketing/programmatic-staffing-page";
import { site } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo";

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
  if (!prof || !city) return { title: "Персонал" };
  const en = params.locale === "en";
  const brand = site.brandName.replace(/_/g, " ");
  const cityName = en ? city.nameEn : city.nameRu;
  const roleName = en ? prof.titleEn : prof.titleRu;
  const title = en
    ? `${roleName} in ${cityName} — shift outsourcing — ${brand}`
    : `${roleName} в ${cityName} — аутсорсинг смен — ${brand}`;
  const description = en
    ? `Local page for ${roleName} in ${cityName}: indicative rates, shift logistics, compliance. We deliver warehouse shift outsourcing (no outstaffing).`
    : `Локальная страница «${roleName}» в ${cityName}: ориентиры по ставкам, логистика смен, compliance. Поставка складских смен подрядчиком (без аутстаффинга).`;
  return buildPageMetadata({
    locale: params.locale,
    pathname: `/personal/${params.profession}/${params.city}`,
    title,
    description,
  });
}

export default function ProgrammaticPage({ params }: Props) {
  const prof = getProfession(params.profession);
  const city = getCity(params.city);
  if (!prof || !city) notFound();

  return <ProgrammaticStaffingPage profession={prof} city={city} locale={params.locale} />;
}
