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
  decoration,
  className,
  sectionClassName,
  ambientClassName = "opacity-70",
  containerClassName = "relative mx-auto max-w-[1280px] px-4 pb-12 pt-8 sm:px-6 sm:pb-14 sm:pt-10 lg:px-8",
  titleClassName,
}: Props) {
  const hasCrumbs = Boolean(crumbs?.length);
  const kickerEl =
    kicker == null ? null : kickerAsText && typeof kicker === "string" ? (
      <p className={cn("type-kicker text-[var(--accent-soft)]", hasCrumbs ? "mt-8" : "mt-0")}>{kicker}</p>
    ) : (
      <div className={hasCrumbs ? "mt-8" : undefined}>{kicker}</div>
    );

  return (
    <section
      className={cn(
        "grain-dark relative overflow-hidden border-b border-white/[0.08] bg-[var(--primary-dark)] text-white",
        sectionClassName,
        className,
      )}
    >
      <div className={cn("hero-ambient pointer-events-none absolute inset-0", ambientClassName)} />
      {decoration}
      <div className={containerClassName}>
        {hasCrumbs ? <Breadcrumbs items={crumbs!} variant="dark" /> : null}
        {kickerEl}
        <h1
          className={cn(
            titleClassName ??
              "font-display max-w-4xl text-balance text-3xl font-bold tracking-[-0.035em] text-white md:text-[2.75rem] md:leading-[1.1]",
            kicker != null ? "mt-4" : hasCrumbs ? "mt-8" : "mt-0",
          )}
        >
          {title}
        </h1>
        {description ? (
          <div className="mt-6 max-w-3xl text-lg leading-relaxed text-white/80 md:text-xl md:leading-[1.55]">{description}</div>
        ) : null}
        {meta}
        {actions ? <div className="mt-10 flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </section>
  );
}
