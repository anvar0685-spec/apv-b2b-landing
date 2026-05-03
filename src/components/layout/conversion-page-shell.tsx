import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  header: ReactNode;
  children: ReactNode;
  footerNote?: ReactNode;
  className?: string;
};

/** Общая «техно»-оболочка для калькулятора и заявки: поле без бокового карточного виджета */
export function ConversionPageShell({ header, children, footerNote, className }: Props) {
  return (
    <main id="main" className={cn("min-w-0 pb-20", className)}>
      <section className="ux-tech-field-light relative overflow-hidden border-b border-[var(--neutral-200)] bg-[var(--surface)] dark:border-white/10 dark:bg-[var(--primary-dark)]">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-px bg-gradient-to-r from-transparent via-[color-mix(in_srgb,var(--accent)_48%,transparent)] to-transparent"
          aria-hidden
        />
        <div className="relative z-[2] mx-auto max-w-[960px] px-4 py-10 sm:px-6 lg:py-14">{header}</div>
      </section>
      <div className="relative mx-auto max-w-[960px] min-w-0 px-4 py-10 sm:px-6 lg:py-14">{children}</div>
      {footerNote ? (
        <div className="mx-auto max-w-[960px] px-4 pb-14 text-center sm:px-6">
          <div className="text-xs leading-relaxed text-[var(--neutral-500)] dark:text-white/45">{footerNote}</div>
        </div>
      ) : null}
    </main>
  );
}
