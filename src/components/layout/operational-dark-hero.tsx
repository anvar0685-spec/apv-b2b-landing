import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/seo/breadcrumbs";
import { cn } from "@/lib/utils";

type Props = {
  crumbs?: Crumb[];
  kicker?: ReactNode;
  /** классы для `<p className="type-kicker ...">` если kicker — строка; иначе рендерится как есть */
  kickerAsText?: boolean;
  title: ReactNode;
  description?: ReactNode;
  /** доп. ряд под лидом (бейджи и т.п.) */
  meta?: ReactNode;
  actions?: ReactNode;
  /** компактный техно-блок справа на lg (портал не нужен — вне backdrop-blur) */
  aside?: ReactNode;
  /** доп. слой внутри hero (напр. параметрический градиент) */
  decoration?: ReactNode;
  className?: string;
  sectionClassName?: string;
  ambientClassName?: string;
  containerClassName?: string;
  titleClassName?: string;
};

export function OperationalDarkHero({
  crumbs,
  kicker,
  kickerAsText = true,
  title,
  description,
  meta,
  actions,
  aside,
  decoration,
  className,
  sectionClassName,
  ambientClassName = "opacity-70",
  containerClassName = "relative mx-auto max-w-[1280px] px-4 pb-14 pt-10 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8",
  titleClassName,
}: Props) {
  const hasCrumbs = Boolean(crumbs?.length);
  const kickerEl =
    kicker == null ? null : kickerAsText && typeof kicker === "string" ? (
      <p className={cn("type-kicker text-[var(--accent-soft)]", hasCrumbs ? "mt-8" : "mt-0")}>{kicker}</p>
    ) : (
      <div className={hasCrumbs ? "mt-8" : undefined}>{kicker}</div>
    );

  const mainColumn = (
    <>
      {hasCrumbs ? <Breadcrumbs items={crumbs!} variant="dark" /> : null}
      {kickerEl}
      <h1
        className={cn(
          titleClassName ??
            "font-display max-w-[min(100%,42ch)] text-balance text-3xl font-bold tracking-[-0.04em] text-white md:text-5xl md:leading-[1.06] md:tracking-[-0.045em] lg:text-[2.85rem] lg:tracking-[-0.048em]",
          kicker != null ? "mt-4" : hasCrumbs ? "mt-8" : "mt-0",
        )}
      >
        {title}
      </h1>
      {description ? (
        <div className="mt-6 max-w-3xl text-base leading-relaxed text-white/80 sm:text-lg md:text-xl md:leading-[1.55]">{description}</div>
      ) : null}
      {meta}
      {actions ? <div className="mt-10 flex flex-wrap gap-3">{actions}</div> : null}
    </>
  );

  return (
    <section
      className={cn(
        "grain-dark relative overflow-hidden border-b border-[color-mix(in_srgb,var(--accent)_22%,transparent)] bg-gradient-to-b from-[var(--hero-operational-top)] to-[var(--hero-operational-bottom)] text-white",
        sectionClassName,
        className,
      )}
    >
      <div className={cn("hero-ambient pointer-events-none absolute inset-0", ambientClassName)} />
      <div className="ux-pattern-hero pointer-events-none absolute inset-0 opacity-[0.14] dark:opacity-[0.11]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-px bg-gradient-to-r from-transparent via-[color-mix(in_srgb,var(--accent)_52%,transparent)] to-transparent"
        aria-hidden
      />
      {decoration}
      <div className={cn(containerClassName, aside && "min-w-0")}>
        {aside ? (
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-x-10">
            <div className="min-w-0 lg:col-span-7">{mainColumn}</div>
            <div className="min-w-0 lg:col-span-5 lg:row-span-1 lg:self-start">{aside}</div>
          </div>
        ) : (
          mainColumn
        )}
      </div>
    </section>
  );
}
