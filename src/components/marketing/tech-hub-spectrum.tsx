"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

/** Детерминированные «полосы спектра» — не случайный SSR/CSR split */
const BAR_HEIGHTS = [
  38, 62, 44, 71, 52, 33, 58, 47, 69, 41, 55, 36, 64, 49, 73, 42, 59, 51, 67, 45,
] as const;

/**
 * Маркетинговые hub-страницы: ритм полос вместо дубля главного дашборда.
 */
export function TechHubSpectrum({ className }: { className?: string }) {
  const t = useTranslations("techPatterns.hub");
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const animate = mounted && !reduce;

  return (
    <aside
      className={cn(
        "relative overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--accent)_18%,var(--neutral-200))] bg-[color-mix(in_srgb,var(--accent)_5%,var(--card))] p-4 shadow-[var(--card-shadow)] dark:border-white/12 dark:bg-white/[0.06] dark:shadow-none sm:p-5",
        className,
      )}
      aria-label={t("ariaLabel")}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/45 to-transparent opacity-80"
        aria-hidden
      />

      <div className="relative flex flex-col gap-4">
        <div className="flex items-end justify-between gap-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--neutral-500)] dark:text-white/55">{t("kicker")}</p>
          <span className="font-mono-nums text-[10px] tabular-nums text-[var(--accent)] dark:text-[var(--accent-soft)]">{t("monoTag")}</span>
        </div>

        <div className="flex h-[104px] items-end justify-between gap-[3px] rounded-xl border border-[var(--neutral-200)] bg-[var(--surface)] px-2 pb-2 pt-4 dark:border-white/10 dark:bg-black/30">
          {BAR_HEIGHTS.map((h, i) => (
            <motion.span
              key={i}
              className="origin-bottom w-full max-w-[6px] rounded-full bg-gradient-to-t from-[var(--accent)]/25 via-[var(--accent)]/55 to-[var(--accent-soft)] dark:from-white/15 dark:via-[var(--accent)]/50 dark:to-[var(--accent-soft)]"
              style={{ height: `${h}%` }}
              initial={animate ? { scaleY: 0.35, opacity: 0.5 } : undefined}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ delay: i * 0.035, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </div>

        <p className="text-center text-[11px] leading-relaxed text-[var(--neutral-600)] dark:text-white/65">{t("body")}</p>

        <p className="border-t border-[var(--neutral-200)] pt-3 text-center text-[10px] leading-snug text-[var(--neutral-500)] dark:border-white/10 dark:text-white/42">
          {t("footnote")}
        </p>
      </div>
    </aside>
  );
}
