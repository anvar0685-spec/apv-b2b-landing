import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { PROFESSIONS } from "@/content/professions-cities";
import { ProfessionIcon } from "@/content/profession-icons";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return buildPageMetadata({
    locale: params.locale,
    pathname: "/personal",
    title: "Профили персонала — склады и DC",
    description:
      "Грузчики, комплектовщики, операторы погрузчика и др. — Москва и МО. Позиционирование аутсорсинга смен (без аутстаффинга).",
  });
}

export default function Page() {
  return (
    <main id="main" className="pb-24">
      <section className="grain-dark relative overflow-hidden border-b border-white/[0.08] bg-[var(--primary-dark)] text-white">
        <div className="hero-ambient pointer-events-none absolute inset-0 opacity-70" />
        <div className="relative mx-auto max-w-[1280px] px-4 pb-12 pt-10 sm:px-6 sm:pb-14 sm:pt-12 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-soft)]">
            Персонал · программатика
          </p>
          <h1 className="font-display mt-4 max-w-4xl text-balance text-4xl font-bold tracking-tight text-white md:text-5xl">
            Персонал
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl md:leading-[1.55]">
            Программатические кластеры «профессия × город». Уникальные лонгриды подключаются постепенно; URL и CTA уже связаны.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROFESSIONS.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/personal/${p.slug}`}
                className="flex items-start gap-4 rounded-2xl border border-[var(--neutral-200)] bg-[var(--surface)] p-5 shadow-[var(--card-shadow)] transition hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--accent)_35%,var(--neutral-200))] hover:shadow-[var(--card-shadow-hover)] motion-reduce:transform-none dark:border-white/10 dark:bg-[var(--card)]"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-[var(--accent)]">
                  <ProfessionIcon slug={p.slug} className="h-6 w-6" />
                </span>
                <span className="pt-1 font-medium text-[var(--primary)]">{p.titleRu}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
