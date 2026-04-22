import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CITIES,
  PROFESSIONS,
  getCity,
  getProfession,
} from "@/content/professions-cities";
import { StubPage } from "@/components/marketing/stub-page";

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
  if (!prof || !city) return { title: "Страница" };
  const title = `Аутстаффинг ${prof.titleRu} в ${city.nameRu} | PLACEHOLDER`;
  const description = `Подбор и аутстаффинг ${prof.titleRu.toLowerCase()} в ${city.nameRu}: ставки, логистика, кейсы. Запросите расчёт.`;
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

  return (
    <StubPage
      title={`Аутстаффинг ${prof.titleRu} в ${city.nameRu}`}
      description="Уникальный локальный контент (вилки, работодатели, карта, FAQ) подключится после наполнения редакцией и human-review."
    >
      <p>
        Программатическая страница: {prof.slug} × {city.slug}. Здесь будут
        таблица ставок, перечень крупных работодателей региона, встраивание
        Яндекс.Карт и локальный FAQ с JSON-LD.
      </p>
    </StubPage>
  );
}
