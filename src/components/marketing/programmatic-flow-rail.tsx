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
  /** Приоритетный кластер: чуть плотнее акцент и иной ритм отступов */
  priorityCluster?: boolean;
  /** Подпись под kicker (только mid; обычно бейдж из programmatic) */
  priorityBadge?: string;
};

/**
 * Полноширинный «рельс» без карточки: секционные бордеры, моно-этапы, CTA.
 */
export function ProgrammaticFlowRail({
  professionSlug,
  cityName,
  calcHref,
  labels,
  variant,
  className,
  priorityCluster = false,
  priorityBadge,
}: Props) {
  const steps = [labels.step1, labels.step2, labels.step3];

  if (variant === "footer") {
    return (
      <div
        className={cn(
          "mt-14 border-t pt-10 dark:border-white/12",
          priorityCluster
            ? "border-[color-mix(in_srgb,var(--accent)_52%,var(--neutral-200))] dark:border-[var(--accent)]/38"
            : "border-[color-mix(in_srgb,var(--accent)_28%,var(--neutral-200))]",
          className,
        )}
      >
        <div className="mx-auto max-w-[680px] px-4 sm:px-6">
          <p className="type-kicker text-[var(--accent)] dark:text-[var(--accent-soft)]">{labels.footerCaption}</p>
          {priorityCluster && priorityBadge ? (
            <p className="mt-2 max-w-prose text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--neutral-500)] dark:text-white/55">
              {priorityBadge}
            </p>
          ) : null}
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
        "border-y py-8 dark:border-white/12 sm:my-12 sm:py-10",
        priorityCluster
          ? "border-[color-mix(in_srgb,var(--accent)_48%,var(--neutral-200))] bg-[color-mix(in_srgb,var(--accent)_12%,var(--surface))] ring-1 ring-[var(--accent)]/22 shadow-[0_14px_48px_-30px_color-mix(in_srgb,var(--accent)_40%,transparent)] dark:bg-white/[0.07] dark:ring-[var(--accent)]/28 sm:my-14 sm:py-12"
          : "border-[color-mix(in_srgb,var(--accent)_32%,var(--neutral-200))] bg-[color-mix(in_srgb,var(--accent)_7%,var(--surface))] dark:bg-white/[0.04]",
        className,
      )}
      role="region"
      aria-label={labels.railTitle}
    >
      <div className="mx-auto max-w-[680px] px-4 sm:px-6">
        <p className="type-kicker text-[var(--accent)] dark:text-[var(--accent-soft)]">{labels.railTitle}</p>
        {priorityCluster && priorityBadge ? (
          <p className="mt-2 inline-flex max-w-prose text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--accent)] dark:text-[var(--accent-soft)]">
            {priorityBadge}
          </p>
        ) : null}
        <p className={cn("text-sm leading-relaxed text-[var(--neutral-700)] dark:text-white/75", priorityCluster && priorityBadge ? "mt-3" : "mt-2")}>
          {labels.railLead}
        </p>
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
        <div
          className={cn(
            "mt-8 flex flex-wrap gap-3",
            priorityCluster ? "sm:gap-4" : null,
          )}
        >
          <Button asChild>
            <Link href={calcHref}>{labels.calcCta}</Link>
          </Button>
          <Button asChild variant={priorityCluster ? "ghost" : "secondary"} className={priorityCluster ? "border border-[var(--neutral-200)] dark:border-white/15" : undefined}>
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
