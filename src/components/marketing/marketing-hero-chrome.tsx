import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type MarketingHeroSurface =
  | "default"
  | "blog"
  | "cases"
  | "contacts"
  | "faq"
  | "garantii"
  | "about";

/** Общая «премиальная рубашка» светлых хабов: паттерн + акцентная линия сверху */
export function MarketingHeroChrome({
  children,
  className,
  innerClassName,
  surface = "default",
}: {
  children: ReactNode;
  className?: string;
  /** контейнер контента (отступы / max-width) */
  innerClassName?: string;
  /** Визуальный ритм в рамках одной дизайн-системы (фон/градиент) */
  surface?: MarketingHeroSurface;
}) {
  return (
    <section
      className={cn(
        "ux-tech-field-light relative overflow-hidden border-b border-[var(--neutral-200)] bg-[var(--surface)] py-12 lg:py-16 dark:border-[color-mix(in_srgb,var(--accent)_18%,transparent)] dark:bg-gradient-to-b dark:from-[var(--hero-operational-top)] dark:to-[var(--hero-operational-bottom)]",
        surface !== "default" && `ux-hero-surface--${surface}`,
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
