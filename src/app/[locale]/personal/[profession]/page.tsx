import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { CITIES, PROFESSIONS, getProfession } from "@/content/professions-cities";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: { locale: string; profession: string } };

export function generateStaticParams() {
  return PROFESSIONS.map((p) => ({ profession: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const prof = getProfession(params.profession);
  if (!prof) return { title: "Персонал" };
  const en = params.locale === "en";
  const title = en
    ? `${prof.titleEn} — Moscow & Moscow Oblast (cities)`
    : `${prof.titleRu} — Москва и МО (города)`;
  const description = en
    ? `Role hub for ${prof.titleEn}: local landing pages per city in the Moscow region. Shift outsourcing (we do not supply outstaffing).`
    : `Хаб профессии «${prof.titleRu}»: локальные страницы по городам МО. Аутсорсинг смен (аутстаффинг не поставляем).`;
  return buildPageMetadata({
    locale: params.locale,
    pathname: `/personal/${params.profession}`,
    title,
    description,
  });
}

export default function ProfessionHubPage({ params }: Props) {
  const prof = getProfession(params.profession);
  if (!prof) notFound();
  const en = params.locale === "en";

  return (
    <main
      id="main"
      className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      <h1 className="font-display text-4xl font-bold text-[var(--primary)] md:text-5xl">
        {en ? prof.titleEn : prof.titleRu}
      </h1>
      <p className="mt-4 text-lg text-[var(--neutral-700)]">
        {en
          ? "Pick a city for the local landing page (rates context, calculator deep-link, compliance note)."
          : "Выберите город для локальной посадочной (контекст ставок, ссылка в калькулятор, compliance)."}
      </p>
      <ul className="mt-8 grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {CITIES.map((c) => (
          <li key={c.slug}>
            <Link
              className="text-sm font-medium text-[var(--accent)] hover:underline"
              href={`/personal/${prof.slug}/${c.slug}`}
            >
              {en ? c.nameEn : c.nameRu}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
