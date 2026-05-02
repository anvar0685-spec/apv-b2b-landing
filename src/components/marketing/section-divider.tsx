import { cn } from "@/lib/utils";

/** Тонкая премиальная линия между крупными блоками главной (без семантики секции). */
export function SectionDivider({ className }: { className?: string }) {
  return (
    <div className={cn("relative mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8", className)} aria-hidden>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[color-mix(in_srgb,var(--accent)_30%,var(--neutral-200))] to-transparent dark:via-[color-mix(in_srgb,var(--accent)_38%,var(--neutral-200))]" />
    </div>
  );
}
