import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Общая «премиальная рубашка» светлых хабов: паттерн + акцентная линия сверху */
export function MarketingHeroChrome({
  children,
  className,
  innerClassName,
}: {
  children: ReactNode;
  className?: string;
  /** контейнер контента (отступы / max-width) */
  innerClassName?: string;
}) {
  return (
    <section
      className={cn(
        "ux-tech-field-light relative overflow-hidden border-b border-[var(--neutral-200)] bg-[var(--surface)] py-10 lg:py-14 dark:border-white/10 dark:bg-[var(--primary-dark)]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color-mix(in_srgb,var(--accent)_55%,transparent)] to-transparent dark:via-[color-mix(in_srgb,var(--accent)_40%,transparent)]"
        aria-hidden
      />
      <div className={innerClassName}>{children}</div>
    </section>
  );
}
