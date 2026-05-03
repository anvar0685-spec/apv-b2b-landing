"use client";

import { useId } from "react";

type Props = {
  steps: readonly string[];
  caption?: string;
};

/** Второй визуальный якорь под лидом — «операционная» цепочка */
export function HubOpsRail({ steps, caption }: Props) {
  const captionId = useId();
  return (
    <div className="mt-8 rounded-2xl border border-[color-mix(in_srgb,var(--accent)_22%,var(--neutral-200))] bg-[color-mix(in_srgb,var(--accent)_6%,var(--card))] px-4 py-5 shadow-[var(--card-shadow)] motion-reduce:shadow-none dark:border-white/12 dark:bg-[var(--primary-dark)]/35 dark:shadow-none">
      <p id={captionId} className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--neutral-500)] dark:text-white/55">
        {caption}
      </p>
      <ol aria-labelledby={captionId} className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((label, i) => (
          <li
            key={`${label}-${i}`}
            className="rounded-xl border border-[var(--neutral-200)] bg-[var(--card)] px-3 py-3 dark:border-white/10 dark:bg-white/[0.04]"
          >
            <span className="font-mono-nums text-xs font-semibold text-[var(--accent)]">{String(i + 1).padStart(2, "0")}</span>
            <p className="mt-1.5 text-sm leading-snug text-[var(--neutral-800)] dark:text-white/88">{label}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
