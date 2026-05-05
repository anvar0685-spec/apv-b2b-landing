import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Единая «витрина» для листингов блога и кейсов — в том же визуальном ключе, что галерея писем / главная. */
export function ListingGridShell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24", className)}>
      <div className="relative overflow-hidden rounded-[1.75rem] border border-[var(--neutral-200)] bg-[var(--card)] px-5 py-8 shadow-[0_24px_64px_-28px_rgba(7,21,37,0.14),0_0_0_1px_rgba(7,21,37,0.03)] sm:px-8 sm:py-10 lg:px-11 lg:py-12 dark:border-white/10 dark:shadow-[0_32px_80px_-32px_rgba(0,0,0,0.55)]">
        <div
          className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] blur-3xl dark:opacity-90"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-8 -left-20 h-64 w-64 rounded-full bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] blur-3xl dark:opacity-80"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.45] dark:opacity-[0.18]"
          aria-hidden
          style={{
            backgroundImage: `repeating-linear-gradient(
              -14deg,
              transparent,
              transparent 56px,
              color-mix(in srgb, var(--accent) 6%, transparent) 56px,
              transparent 57px
            )`,
          }}
        />
        <div className="relative z-[1]">{children}</div>
      </div>
    </div>
  );
}
