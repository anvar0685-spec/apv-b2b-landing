import { cn } from "@/lib/utils";

/** Разделитель секций — заметнее линии 1px: акцент + «шов» бренда */
export function SectionDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn("relative mx-auto flex w-full max-w-[1280px] flex-col items-center px-4 sm:px-6 lg:px-8", className)}
      aria-hidden
    >
      <div className="flex w-full items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[color-mix(in_srgb,var(--accent)_45%,var(--neutral-200))]" />
        <div className="h-2 w-2 shrink-0 rounded-full bg-[var(--accent)] shadow-[0_0_14px_var(--accent)] opacity-90" />
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[color-mix(in_srgb,var(--accent)_45%,var(--neutral-200))]" />
      </div>
    </div>
  );
}
