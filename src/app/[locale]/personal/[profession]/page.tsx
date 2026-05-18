import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import type { Crumb } from "@/components/seo/breadcrumbs";
import { OperationalDarkHero } from "@/components/layout/operational-dark-hero";
import { ProfessionIcon } from "@/content/profession-icons";
import { CITIES, PROFESSIONS, getProfession } from "@/content/professions-cities";
import { buildPageMetadata } from "@/lib/seo";
import { slugVisualVariant, variantClass } from "@/lib/slug-visual-seed";
import { cn } from "@/lib/utils";

type Props = { params: { locale: string; profession: string } };

export function generateStaticParams() {
  return PROFESSIONS.map((p) => ({ profession: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const prof = getProfession(params.profession);
  if (!prof) return { title: "Персонал" };
  const title = `${prof.titleRu} — Москва и МО (города)`;
  const description = `Закрываем смены роли «${prof.titleRu}» в Москве и Московской области: ставки, документы, допуски, резерв на замену. Работаем как подрядчик по сменам, аутстаффинг не оказываем.`;
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

  const crumbs: Crumb[] = [
    { href: "/", label: "Главная" },
    { href: "/personal", label: "Персонал" },
    { href: `/personal/${prof.slug}`, label: prof.titleRu },
  ];

  const v = slugVisualVariant(prof.slug);

  return (
    <main id="main" className="pb-24">
      <OperationalDarkHero
        crumbs={crumbs}
        kickerAsText={false}
        kicker={
          <p className="inline-flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-[var(--accent-soft)]">
              <ProfessionIcon slug={prof.slug} className="h-6 w-6" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-soft)]">
              Персонал · по городам Московской области
            </span>
          </p>
        }
        title={`${prof.titleRu} — Москва и Московская область`}
        description={
          <p>
            Выберите город — там разбираем ставку, логистику выхода на объект, документы и допуски, а также резерв на замену.
            Калькулятор сразу подставит параметры по городу и роли.
          </p>
        }
        decoration={<div className={cn("ux-prog-angled", variantClass(v))} aria-hidden />}
      />

      <div className="relative">
        <div
          className="ux-page-body-subtle pointer-events-none absolute inset-0 -z-10 min-h-full opacity-[0.55] dark:opacity-[0.38]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {CITIES.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/personal/${prof.slug}/${c.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-[var(--neutral-200)] bg-[var(--surface)] p-5 shadow-[var(--card-shadow)] transition hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--accent)_38%,var(--neutral-200))] hover:shadow-[var(--card-shadow-hover)] motion-reduce:transform-none dark:border-white/10 dark:bg-[var(--card)]"
                >
                  <span className="font-display text-lg font-semibold tracking-tight text-[var(--primary)] group-hover:text-[var(--accent)]">
                    {c.nameRu}
                  </span>
                  <span className="mt-3 text-xs leading-relaxed text-[var(--neutral-600)]">
                    Ставки, документы и резерв на замену · калькулятор с параметрами города
                  </span>
                  <span className="mt-4 text-sm font-medium text-[var(--accent)] group-hover:underline">Открыть →</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
