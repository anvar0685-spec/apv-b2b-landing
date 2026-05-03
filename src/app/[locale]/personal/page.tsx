import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { OperationalDarkHero } from "@/components/layout/operational-dark-hero";
import { PROFESSIONS } from "@/content/professions-cities";
import { ProfessionIcon } from "@/content/profession-icons";
import { buildPageMetadata } from "@/lib/seo";
import { slugVisualVariant, variantClass } from "@/lib/slug-visual-seed";
import { cn } from "@/lib/utils";

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
  const v = slugVisualVariant("personal-index");

  return (
    <main id="main" className="pb-24">
      <OperationalDarkHero
        kickerAsText={false}
        kicker={
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-soft)]">
            Персонал · программатика
          </p>
        }
        title="Персонал"
        description={
          <p>
            Программатические кластеры «профессия × город». Уникальные лонгриды подключаются постепенно; URL и CTA уже
            связаны.
          </p>
        }
        titleClassName="font-display max-w-4xl text-balance text-4xl font-bold tracking-tight text-white md:text-5xl"
        decoration={<div className={cn("ux-prog-angled", variantClass(v))} aria-hidden />}
      />

      <div className="relative">
        <div
          className="ux-page-body-subtle pointer-events-none absolute inset-0 -z-10 min-h-full opacity-[0.55] dark:opacity-[0.38]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
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
      </div>
    </main>
  );
}
