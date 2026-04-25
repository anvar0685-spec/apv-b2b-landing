import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { Link } from "@/i18n/navigation";
import { PRIORITY_PAGE_TEASERS } from "@/content/priority-pages-teasers";

type Props = {
  locale: string;
  crumbs: Crumb[];
  kicker?: string;
  title: string;
  lead: string;
  jsonLd?: Record<string, unknown>;
  /** Доп. контент под лидом (карточки, списки ссылок) */
  children?: ReactNode;
  /** Показать блок перелинковки по приоритетным URL */
  showPriorityTeasers?: boolean;
};

export function CommercialSeoPage({
  locale,
  crumbs,
  kicker,
  title,
  lead,
  jsonLd,
  children,
  showPriorityTeasers = false,
}: Props) {
  const foot =
    locale === "en"
      ? "Full copy will be wired from my-guide/content per the 6-week roadmap."
      : "Полный текст подключается из my-guide/content по 6-недельному плану (нед. 2–4).";

  const relatedTitle = locale === "en" ? "Priority pages" : "Приоритетные разделы";

  return (
    <main id="main" className="pb-20">
      <section className="grain-dark relative overflow-hidden border-b border-white/[0.08] bg-[var(--primary-dark)] text-white">
        <div className="hero-ambient pointer-events-none absolute inset-0 opacity-70" />
        <div className="relative mx-auto max-w-content px-4 pb-12 pt-10 sm:px-6 sm:pb-14 sm:pt-12 lg:px-8">
          {jsonLd ? <JsonLd data={jsonLd} /> : null}
          <Breadcrumbs items={crumbs} locale={locale} variant="dark" />
          {kicker ? (
            <p className="type-kicker mt-8 text-[var(--accent-soft)] opacity-95">{kicker}</p>
          ) : null}
          <h1
            className={`font-display max-w-[20ch] text-balance text-4xl font-bold leading-[1.12] tracking-[-0.035em] text-white md:text-5xl lg:max-w-[24ch] lg:text-[2.75rem] ${kicker ? "mt-4" : "mt-8"}`}
          >
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl md:leading-[1.55]">
            {lead}
          </p>
        </div>
      </section>

      <section className="border-b border-[var(--neutral-200)] bg-[var(--background)] dark:border-white/10">
        <div className="mx-auto max-w-content px-4 py-10 sm:px-6 lg:px-8">
          <p className="type-body max-w-2xl text-[var(--neutral-700)]">{foot}</p>
          {children ? <div className="mt-10">{children}</div> : null}

          {showPriorityTeasers ? (
            <div className="mt-14 border-t border-[var(--neutral-200)] pt-10 dark:border-white/10">
              <h2 className="type-kicker">{relatedTitle}</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {PRIORITY_PAGE_TEASERS.filter((p) => p.path !== "/").map((p) => (
                  <li key={p.path}>
                    <Link
                      href={p.path}
                      className="group block rounded-2xl border border-[var(--neutral-200)] bg-[var(--surface)] p-4 transition hover:border-[color-mix(in_srgb,var(--accent)_35%,var(--neutral-200))] dark:border-white/10 dark:bg-[var(--card)]"
                    >
                      <span className="font-display text-base font-semibold text-[var(--primary)] group-hover:text-[var(--accent)]">
                        {locale === "en" ? p.en.title : p.ru.title}
                      </span>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--neutral-700)]">
                        {locale === "en" ? p.en.teaser : p.ru.teaser}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
