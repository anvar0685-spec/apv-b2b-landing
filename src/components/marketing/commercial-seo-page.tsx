import type { ReactNode } from "react";
import { JsonLd } from "@/components/seo/json-ld";
import { Link } from "@/i18n/navigation";
import { OperationalDarkHero } from "@/components/layout/operational-dark-hero";
import { PRIORITY_PAGE_TEASERS } from "@/content/priority-pages-teasers";
import { cn } from "@/lib/utils";
import type { Crumb } from "@/components/seo/breadcrumbs";

type Props = {
  crumbs: Crumb[];
  kicker?: string;
  title: string;
  lead: string;
  jsonLd?: Record<string, unknown>;
  editorialParagraphs?: string[];
  children?: ReactNode;
  showPriorityTeasers?: boolean;
  bodyTone?: "default" | "geo";
};

export function CommercialSeoPage({
  crumbs,
  kicker,
  title,
  lead,
  jsonLd,
  editorialParagraphs,
  children,
  showPriorityTeasers = false,
  bodyTone = "default",
}: Props) {
  /** Только если нет ни редактораских абзацев, ни блока со ссылками — крайний случай */
  const emptyBodyFallback =
    "Раздел скоро дополним расширенным описанием. По объекту и персоналу можно сразу запросить расчёт через калькулятор или заявку.";
  const relatedTitle = "Приоритетные разделы";

  return (
    <main id="main" className="pb-20">
      {jsonLd ? <JsonLd data={jsonLd} /> : null}
      <OperationalDarkHero
        crumbs={crumbs}
        kicker={kicker}
        kickerAsText
        title={title}
        description={<p>{lead}</p>}
        titleClassName="font-display max-w-[20ch] text-balance text-4xl font-bold leading-[1.12] tracking-[-0.035em] text-white md:text-5xl lg:max-w-[24ch] lg:text-[2.75rem]"
        containerClassName="relative mx-auto max-w-content px-4 pb-12 pt-10 sm:px-6 sm:pb-14 sm:pt-12 lg:px-8"
      />

      <section
        className={cn(
          "relative overflow-hidden border-b border-[var(--neutral-200)] bg-[var(--background)] dark:border-white/10",
          bodyTone === "geo" && "ux-geo-chapter",
        )}
      >
        {bodyTone === "geo" ? null : (
          <div
            className="ux-page-body-subtle pointer-events-none absolute inset-0 -z-10 min-h-full opacity-[0.55] dark:opacity-[0.4]"
            aria-hidden
          />
        )}
        <div className="relative mx-auto max-w-content px-4 py-10 sm:px-6 lg:px-8">
          {editorialParagraphs?.length ? (
            <div className="type-body max-w-3xl space-y-4 text-[var(--neutral-700)]">
              {editorialParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          ) : children ? null : (
            <p className="type-body max-w-2xl text-[var(--neutral-700)]">{emptyBodyFallback}</p>
          )}
          {children ? (
            <div className={editorialParagraphs?.length ? "mt-10" : "mt-6"}>{children}</div>
          ) : null}

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
                        {p.ru.title}
                      </span>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--neutral-700)]">{p.ru.teaser}</p>
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
