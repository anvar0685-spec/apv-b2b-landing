"use client";

import { useEffect, useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { SPARK_AREA_PATH, SPARK_LINE_PATH } from "@/components/marketing/spark-chart-paths";

type Preset = "geo" | "services";

/**
 * Светлый «инженерный» акцент для atlas/vertical hero и /uslugi:
 * сетка + вертикальный рельс + список без фейковых KPI-карточек главной.
 */
export function TechAtlasAccent({ preset = "geo", className }: { preset?: Preset; className?: string }) {
  const ns = preset === "services" ? "techPatterns.services" : "techPatterns.atlas";
  const t = useTranslations(ns);
  const lines = t.raw("lines") as string[];
  const reduce = useReducedMotion();
  const uid = useId();
  const fillId = `techAtlasFill-${uid.replace(/:/g, "")}`;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const showMotion = mounted && !reduce;

  return (
    <aside
      className={cn(
        "relative overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--accent)_18%,var(--neutral-200))] bg-[color-mix(in_srgb,var(--accent)_4%,var(--card))] p-4 shadow-[var(--card-shadow)] dark:border-white/12 dark:bg-white/[0.06] dark:shadow-none sm:p-5",
        className,
      )}
      aria-label={t("ariaLabel")}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.2]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, color-mix(in srgb, var(--neutral-500) 28%, transparent) 1px, transparent 0)",
          backgroundSize: "18px 18px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-4 left-3 top-4 w-[3px] rounded-full bg-gradient-to-b from-[var(--accent)] via-[color-mix(in_srgb,var(--accent)_55%,var(--primary))] to-[var(--primary)] opacity-90 dark:opacity-95"
        aria-hidden
      />

      <div className="relative flex flex-col gap-4 pl-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--neutral-500)] dark:text-white/55">{t("kicker")}</p>

        <ul className="space-y-3">
          {lines.map((line, i) => (
            <motion.li
              key={line}
              className="flex gap-3 text-sm leading-snug text-[var(--neutral-700)] dark:text-white/78"
              initial={showMotion ? { opacity: 0, x: -6 } : undefined}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 + i * 0.07, duration: 0.35 }}
            >
              <span className="font-mono-nums shrink-0 text-[11px] font-semibold tabular-nums text-[var(--accent)] opacity-80 dark:text-[var(--accent-soft)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{line}</span>
            </motion.li>
          ))}
        </ul>

        <div className="rounded-xl border border-[var(--neutral-200)] bg-[var(--surface)]/90 p-3 dark:border-white/10 dark:bg-black/35">
          <p className="text-[10px] font-medium text-[var(--neutral-500)] dark:text-white/50">{t("sparkCaption")}</p>
          <svg viewBox="0 0 280 72" className="mt-2 h-[52px] w-full sm:h-[60px]" preserveAspectRatio="none">
            <defs>
              <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.28} />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              d={SPARK_AREA_PATH}
              fill={`url(#${fillId})`}
              initial={showMotion ? { opacity: 0 } : undefined}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
            <motion.path
              d={SPARK_LINE_PATH}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="dark:stroke-[var(--accent-soft)]"
              initial={reduce ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0.35 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            />
          </svg>
        </div>

        <p className="border-t border-[var(--neutral-200)] pt-3 text-center text-[10px] leading-snug text-[var(--neutral-500)] dark:border-white/10 dark:text-white/45">
          {t("footnote")}
        </p>
      </div>
    </aside>
  );
}
