import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Props = {
  professionSlug: string;
  cityName: string;
  calcHref: string;
  labels: {
    cardTitle: string;
    cardDesc: string;
    step1: string;
    step2: string;
    step3: string;
    l1: string;
    l2: string;
    l3: string;
    calcCta: string;
  };
};

export function ProgrammaticOpsAside({ professionSlug, cityName, calcHref, labels }: Props) {
  return (
    <aside className="lg:col-span-5">
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)] p-6 shadow-[var(--card-shadow)] dark:border-white/10",
        )}
      >
        <div className="ux-pattern-calc pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.22]" aria-hidden />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--neutral-500)]">{labels.cardTitle}</p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--neutral-700)]">{labels.cardDesc}</p>
          <p className="mt-4 inline-flex rounded-full border border-[var(--neutral-200)] bg-[var(--surface)] px-3 py-1 text-xs font-semibold text-[var(--primary)] dark:border-white/12 dark:bg-white/[0.06] dark:text-white">
            {cityName}
          </p>

          <ol className="mt-6 flex flex-wrap gap-2" aria-label="Этапы выхода на объект">
            {[labels.step1, labels.step2, labels.step3].map((label, i) => (
              <li
                key={label}
                className="flex items-center gap-2 rounded-xl border border-[var(--neutral-200)] bg-[var(--surface)] px-3 py-2 text-xs font-medium text-[var(--primary)] dark:border-white/10 dark:bg-[var(--primary-dark)]/40 dark:text-white/90"
              >
                <span className="font-mono-nums text-[var(--accent)]">{String(i + 1).padStart(2, "0")}</span>
                {label}
              </li>
            ))}
          </ol>

          <ul className="mt-6 space-y-3 border-t border-[var(--neutral-200)] pt-6 text-sm text-[var(--neutral-700)] dark:border-white/10">
            <li className="flex gap-2">
              <span className="font-mono-nums shrink-0 text-[var(--accent)]">→</span>
              <Link className="font-medium text-[var(--accent)] hover:underline" href="/keysy">
                {labels.l1}
              </Link>
            </li>
            <li className="flex gap-2">
              <span className="font-mono-nums shrink-0 text-[var(--accent)]">→</span>
              <Link className="font-medium text-[var(--accent)] hover:underline" href="/uslugi/autsorsing">
                {labels.l2}
              </Link>
            </li>
            <li className="flex gap-2">
              <span className="font-mono-nums shrink-0 text-[var(--accent)]">→</span>
              <Link className="font-medium text-[var(--accent)] hover:underline" href={`/personal/${professionSlug}`}>
                {labels.l3}
              </Link>
            </li>
            <li className="pt-2">
              <Link
                href={calcHref}
                className="inline-flex w-full items-center justify-center rounded-xl bg-[var(--accent)] px-4 py-3 text-center text-sm font-medium text-white shadow-[0_8px_28px_-8px_color-mix(in_srgb,var(--accent)_55%,transparent)] transition hover:opacity-95"
              >
                {labels.calcCta}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
