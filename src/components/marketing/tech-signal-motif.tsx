"use client";

import { useEffect, useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { SPARK_AREA_PATH, SPARK_LINE_PATH } from "@/components/marketing/spark-chart-paths";

type Variant = "dark" | "light";

/**
 * Компактный «техно»-мотив: мини-метрики + линия вперёд + чипы.
 * Для светлых/тёмных hero и hub-shell; дисклеймер всегда внизу.
 */
export function TechSignalMotif({ variant, className }: { variant: Variant; className?: string }) {
  const reduce = useReducedMotion();
  const uid = useId();
  const fillId = `techMotifFill-${uid.replace(/:/g, "")}`;
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("techMotif");
  const chips = t.raw("chips") as string[];

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = variant === "dark";
  const showMotion = mounted && !reduce;

  return (
    <aside
      className={cn(
        "relative overflow-hidden rounded-2xl border p-4 sm:p-5",
        isDark
          ? "border-white/12 bg-white/[0.06] shadow-[0_20px_60px_-28px_rgba(0,0,0,0.55)] backdrop-blur-md"
          : "border-[color-mix(in_srgb,var(--accent)_22%,var(--neutral-200))] bg-[color-mix(in_srgb,var(--accent)_5%,var(--card))] shadow-[var(--card-shadow)] dark:border-white/12 dark:bg-white/[0.06] dark:shadow-none",
        className,
      )}
      aria-label={t("ariaLabel")}
    >
      {isDark ? <div className="pointer-events-none absolute inset-0 hero-ambient opacity-70" aria-hidden /> : null}
      <div className="relative flex flex-col gap-4">
        <div className="flex items-center justify-between gap-2">
          <p
            className={cn(
              "text-[10px] font-semibold uppercase tracking-[0.14em]",
              isDark ? "text-white/55" : "text-[var(--neutral-500)] dark:text-white/55",
            )}
          >
            {t("kicker")}
          </p>
          <span
            className={cn(
              "rounded-full border px-2 py-0.5 text-[10px] font-semibold",
              isDark
                ? "border-[var(--accent)]/45 bg-[var(--accent)]/15 text-[var(--accent-soft)] shadow-[0_0_10px_-2px_var(--accent)]"
                : "border-[color-mix(in_srgb,var(--accent)_40%,var(--neutral-200))] bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-[var(--accent)] dark:border-[var(--accent)]/40 dark:text-[var(--accent-soft)]",
            )}
          >
            {t("demo")}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <div
            className={cn(
              "rounded-xl border p-2.5 sm:p-3",
              isDark ? "border-[var(--accent)]/35 bg-white/[0.08]" : "border-[var(--neutral-200)] bg-[var(--surface)] dark:border-white/12 dark:bg-white/[0.06]",
            )}
          >
            <p className={cn("text-[10px] font-medium", isDark ? "text-white/50" : "text-[var(--neutral-500)] dark:text-white/55")}>
              {t("metricPrimary")}
            </p>
            <p
              className={cn(
                "metric-num mt-1 font-mono-nums text-lg font-bold tabular-nums sm:text-xl",
                isDark ? "text-white" : "text-[var(--primary)]",
              )}
            >
              {t("metricPrimaryValue")}
            </p>
          </div>
          <div
            className={cn(
              "rounded-xl border p-2.5 sm:p-3",
              isDark ? "border-white/10 bg-white/[0.05]" : "border-[var(--neutral-200)] bg-[var(--surface)] dark:border-white/10 dark:bg-white/[0.05]",
            )}
          >
            <p className={cn("text-[10px] font-medium", isDark ? "text-white/45" : "text-[var(--neutral-500)] dark:text-white/50")}>
              {t("replacements")}
            </p>
            <p className={cn("mt-1 font-mono-nums text-lg font-bold tabular-nums text-[var(--accent)] sm:text-xl", isDark && "text-[var(--accent-soft)]")}>
              {t("replacementsValue")}
            </p>
          </div>
          <div
            className={cn(
              "hidden rounded-xl border p-2.5 sm:block sm:p-3",
              isDark ? "border-white/10 bg-white/[0.05]" : "border-[var(--neutral-200)] bg-[var(--surface)] dark:border-white/10 dark:bg-white/[0.05]",
            )}
          >
            <p className={cn("text-[10px] font-medium", isDark ? "text-white/45" : "text-[var(--neutral-500)] dark:text-white/50")}>
              {t("incidents")}
            </p>
            <p className={cn("mt-1 font-mono-nums text-lg font-bold tabular-nums sm:text-xl", isDark ? "text-white" : "text-[var(--primary)]")}>
              {t("incidentsValue")}
            </p>
          </div>
        </div>

        <div
          className={cn(
            "rounded-xl border p-3",
            isDark ? "border-white/12 bg-black/30 ring-1 ring-white/[0.05]" : "border-[var(--neutral-200)] bg-[var(--card)] dark:border-white/12 dark:bg-black/25",
          )}
        >
          <div className="flex items-end justify-between gap-2">
            <p className={cn("text-[10px] font-medium", isDark ? "text-white/55" : "text-[var(--neutral-600)] dark:text-white/60")}>
              {t("throughput")}
            </p>
            <motion.span
              className={cn("text-[10px] font-semibold", isDark ? "text-[var(--success)]" : "text-[var(--success)]")}
              initial={showMotion ? { opacity: 0, y: 4 } : undefined}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.35 }}
            >
              {t("trend")}
            </motion.span>
          </div>
          <svg viewBox="0 0 280 72" className="mt-2 h-[68px] w-full sm:h-[76px]" preserveAspectRatio="none">
            <defs>
              <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity={isDark ? 0.5 : 0.35} />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              d={SPARK_AREA_PATH}
              fill={`url(#${fillId})`}
              initial={showMotion ? { opacity: 0 } : undefined}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.1 }}
            />
            <motion.path
              d={SPARK_LINE_PATH}
              fill="none"
              stroke={isDark ? "var(--accent-soft)" : "var(--accent)"}
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={reduce ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0.35 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            />
          </svg>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {chips.map((label, i) => (
            <motion.span
              key={label}
              className={cn(
                "inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-medium",
                isDark
                  ? "border-white/10 bg-white/[0.05] text-white/72"
                  : "border-[var(--neutral-200)] bg-[var(--surface)] text-[var(--neutral-700)] dark:border-white/10 dark:bg-white/[0.05] dark:text-white/75",
              )}
              initial={showMotion ? { opacity: 0, y: 6 } : undefined}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.06, duration: 0.3 }}
            >
              <span className="h-1 w-1 shrink-0 rounded-full bg-[var(--success)]" aria-hidden />
              {label}
            </motion.span>
          ))}
        </div>

        <p
          className={cn(
            "border-t pt-3 text-center text-[10px] leading-snug",
            isDark ? "border-white/[0.08] text-white/42" : "border-[var(--neutral-200)] text-[var(--neutral-500)] dark:border-white/10 dark:text-white/45",
          )}
        >
          {t("caption")}
        </p>
      </div>
    </aside>
  );
}
