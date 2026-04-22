import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { PROFESSIONS } from "@/content/professions-cities";

export const metadata: Metadata = {
  title: "Категории персонала — склад, производство, HoReCa",
  description:
    "Грузчики, комплектовщики, кладовщики, операторы погрузчика и другие профессии для Москвы и МО.",
};

export default function Page() {
  return (
    <main
      id="main"
      className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      <h1 className="font-display text-4xl font-bold tracking-tight text-[var(--primary)] md:text-5xl">
        Персонал
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-[var(--neutral-700)]">
        Программатические кластеры 10×30 городов — уникальный контент подключается
        постепенно.
      </p>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROFESSIONS.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/personal/${p.slug}`}
              className="block rounded-2xl border border-[var(--neutral-200)] bg-white p-5 font-medium text-[var(--primary)] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md motion-reduce:transform-none"
            >
              {p.titleRu}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
