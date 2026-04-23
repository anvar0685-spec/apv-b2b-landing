import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CITIES, PROFESSIONS, getCity, getProfession } from "@/content/professions-cities";
import { ProgrammaticStaffingPage } from "@/components/marketing/programmatic-staffing-page";
import { site } from "@/config/site";

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
  const brand = site.brandName.replace(/_/g, " ");
  const title = `Аутстаффинг ${prof.titleRu} в ${city.nameRu} — ${brand}`;
  const description = `Подбор и аутстаффинг ${prof.titleRu.toLowerCase()} в ${city.nameRu}: расчёт вилки, логистика смен, compliance. Запросите КП.`;
  return {
    title,
    description,
    alternates: {
      canonical: `/personal/${params.profession}/${params.city}`,
    },
    openGraph: { title, description },
  };
}

export default function ProgrammaticPage({ params }: Props) {
  const prof = getProfession(params.profession);
  const city = getCity(params.city);
  if (!prof || !city) notFound();

  return <ProgrammaticStaffingPage profession={prof} city={city} />;
}
