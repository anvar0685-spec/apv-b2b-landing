import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { PROFESSIONS } from "@/content/professions-cities";
import { ProfessionIcon } from "@/content/profession-icons";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const en = params.locale === "en";
  return buildPageMetadata({
    locale: params.locale,
    pathname: "/personal",
    title: en ? "Workforce roles — warehouses & DCs" : "Профили персонала — склады и DC",
    description: en
      ? "Loaders, pickers, forklift operators and more — Moscow & Moscow Oblast. Shift outsourcing positioning (no outstaffing)."
      : "Грузчики, комплектовщики, операторы погрузчика и др. — Москва и МО. Позиционирование аутсорсинга смен (без аутстаффинга).",
  });
}

export default function Page({ params }: Props) {
  const en = params.locale === "en";
  return (
    <main
      id="main"
      className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      <h1 className="font-display text-4xl font-bold tracking-tight text-[var(--primary)] md:text-5xl">
        {en ? "Workforce" : "Персонал"}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-[var(--neutral-700)]">
        {en
          ? "Programmatic clusters (roles × cities). Unique long-form copy rolls out gradually; URLs and CTAs are already wired."
          : "Программатические кластеры «профессия × город». Уникальные лонгриды подключаются постепенно; URL и CTA уже связаны."}
      </p>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROFESSIONS.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/personal/${p.slug}`}
              className="flex items-start gap-4 rounded-2xl border border-[var(--neutral-200)] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md motion-reduce:transform-none dark:bg-[var(--card)]"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-[var(--accent)]">
                <ProfessionIcon slug={p.slug} className="h-6 w-6" />
              </span>
              <span className="font-medium text-[var(--primary)] pt-1">
                {en ? p.titleEn : p.titleRu}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
