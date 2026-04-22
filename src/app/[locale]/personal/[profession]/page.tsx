import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { CITIES, PROFESSIONS, getProfession } from "@/content/professions-cities";

type Props = { params: { profession: string } };

export function generateStaticParams() {
  return PROFESSIONS.map((p) => ({ profession: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const prof = getProfession(params.profession);
  if (!prof) return { title: "Персонал" };
  return {
    title: `${prof.titleRu} — аутстаффинг и подбор в Москве и МО`,
    description: `Страница профессии «${prof.titleRu}»: ссылки на программатику по городам.`,
  };
}

export default function ProfessionHubPage({ params }: Props) {
  const prof = getProfession(params.profession);
  if (!prof) notFound();

  return (
    <main
      id="main"
      className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      <h1 className="font-display text-4xl font-bold text-[var(--primary)] md:text-5xl">
        {prof.titleRu}
      </h1>
      <p className="mt-4 text-lg text-[var(--neutral-700)]">
        Выберите город для локальной посадочной страницы.
      </p>
      <ul className="mt-8 grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {CITIES.map((c) => (
          <li key={c.slug}>
            <Link
              className="text-sm font-medium text-[var(--accent)] hover:underline"
              href={`/personal/${prof.slug}/${c.slug}`}
            >
              {c.nameRu}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
