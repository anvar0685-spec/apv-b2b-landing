import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Labels = {
  railTitle: string;
  railLead: string;
  step1: string;
  step2: string;
  step3: string;
  footerCaption: string;
  l1: string;
  l2: string;
  l3: string;
  calcCta: string;
  proposalCta: string;
};

type Props = {
  professionSlug: string;
  cityName: string;
  calcHref: string;
  labels: Labels;
  /** mid — полный блок с кнопками; footer — только перелинковка в конце */
  variant: "mid" | "footer";
  className?: string;
};

/**
 * Полноширинный «рельс» без карточки: секционные бордеры, моно-этапы, CTA.
 */
export function ProgrammaticFlowRail({ professionSlug, cityName, calcHref, labels, variant, className }: Props) {
  const steps = [labels.step1, labels.step2, labels.step3];

  if (variant === "footer") {
    return (
      <div
        className={cn(
          "mt-14 border-t border-[color-mix(in_srgb,var(--accent)_28%,var(--neutral-200))] pt-10 dark:border-white/12",
          className,
        )}
      >
        <div className="mx-auto max-w-[680px] px-4 sm:px-6">
          <p className="type-kicker text-[var(--accent)] dark:text-[var(--accent-soft)]">{labels.footerCaption}</p>
          <ul className="mt-5 flex flex-col gap-3 text-sm text-[var(--neutral-700)] dark:text-white/78">
            <li>
              <Link className="font-medium text-[var(--accent)] underline-offset-4 hover:underline dark:text-[var(--accent-soft)]" href="/keysy">
                {labels.l1}
              </Link>
            </li>
            <li>
              <Link className="font-medium text-[var(--accent)] underline-offset-4 hover:underline dark:text-[var(--accent-soft)]" href="/uslugi/autsorsing">
                {labels.l2}
              </Link>
            </li>
            <li>
              <Link
                className="font-medium text-[var(--accent)] underline-offset-4 hover:underline dark:text-[var(--accent-soft)]"
                href={`/personal/${professionSlug}`}
              >
                {labels.l3}
              </Link>
            </li>
            <li className="pt-1">
              <Link
                href={calcHref}
                className="inline-flex font-semibold text-[var(--accent)] underline-offset-4 hover:underline dark:text-[var(--accent-soft)]"
              >
                {labels.calcCta} →
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "border-y border-[color-mix(in_srgb,var(--accent)_32%,var(--neutral-200))] bg-[color-mix(in_srgb,var(--accent)_7%,var(--surface))] py-8 dark:border-white/12 dark:bg-white/[0.04] sm:my-12 sm:py-10",
        className,
      )}
      role="region"
      aria-label={labels.railTitle}
    >
      <div className="mx-auto max-w-[680px] px-4 sm:px-6">
        <p className="type-kicker text-[var(--accent)] dark:text-[var(--accent-soft)]">{labels.railTitle}</p>
        <p className="mt-2 text-sm leading-relaxed text-[var(--neutral-700)] dark:text-white/75">{labels.railLead}</p>
        <p className="mt-3 font-mono-nums text-xs tabular-nums text-[var(--accent)] dark:text-[var(--accent-soft)]">{cityName}</p>

        <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--neutral-500)] dark:text-white/50">Этапы</p>
        <p className="mt-2 font-mono-nums text-sm leading-relaxed text-[var(--primary)] dark:text-white/88">
          {steps.map((s, i) => (
            <span key={s}>
              <span className="text-[var(--accent)] dark:text-[var(--accent-soft)]">{String(i + 1).padStart(2, "0")}</span> {s}
              {i < steps.length - 1 ? <span className="text-[var(--neutral-400)] dark:text-white/35"> · </span> : null}
            </span>
          ))}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link href={calcHref}>{labels.calcCta}</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/zayavka">{labels.proposalCta}</Link>
          </Button>
        </div>

        <ul className="mt-10 flex flex-col gap-3 border-t border-[var(--neutral-200)] pt-8 text-sm text-[var(--neutral-700)] dark:border-white/10 dark:text-white/78">
          <li>
            <Link className="font-medium text-[var(--accent)] underline-offset-4 hover:underline dark:text-[var(--accent-soft)]" href="/keysy">
              {labels.l1}
            </Link>
          </li>
          <li>
            <Link className="font-medium text-[var(--accent)] underline-offset-4 hover:underline dark:text-[var(--accent-soft)]" href="/uslugi/autsorsing">
              {labels.l2}
            </Link>
          </li>
          <li>
            <Link
              className="font-medium text-[var(--accent)] underline-offset-4 hover:underline dark:text-[var(--accent-soft)]"
              href={`/personal/${professionSlug}`}
            >
              {labels.l3}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
