"use client";

import { useEffect, useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { SPARK_LINE_PATH } from "@/components/marketing/spark-chart-paths";

const TRACE_HEIGHTS = [72, 58, 81, 64, 90, 55, 77, 69, 84, 61, 94, 52, 79, 68, 88] as const;

/**
 * Тёмный ops-hero: «спектр канала» + тонкая линия тренда — без клонирования KPI-карточек главной.
 */
export function TechOpsAside({ className }: { className?: string }) {
  const t = useTranslations("techPatterns.ops");
  const reduce = useReducedMotion();
  const uid = useId();
  const glowId = `techOpsGlow-${uid.replace(/:/g, "")}`;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const showMotion = mounted && !reduce;

  return (
    <aside
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.05] p-4 shadow-[0_24px_70px_-34px_rgba(0,0,0,0.65)] backdrop-blur-md sm:p-5",
        className,
      )}
      aria-label={t("ariaLabel")}
    >
      <div className="pointer-events-none absolute inset-0 hero-ambient opacity-60" aria-hidden />

      <div
        className="pointer-events-none absolute inset-3 rounded-xl border border-white/[0.14]"
        style={{
          clipPath: "polygon(0 10px,10px 0,calc(100% - 10px) 0,100% 10px,100% calc(100% - 10px),calc(100% - 10px) 100%,10px 100%,0 calc(100% - 10px))",
        }}
        aria-hidden
      />

      <div className="relative flex flex-col gap-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55">{t("kicker")}</p>
            <p className="mt-2 max-w-[26ch] text-sm leading-snug text-white/78">{t("lead")}</p>
          </div>
          <span className="shrink-0 rounded border border-[var(--accent)]/40 bg-[var(--accent)]/12 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--accent-soft)]">
            {t("badge")}
          </span>
        </div>

        <div className="flex h-[88px] items-end justify-between gap-1 rounded-lg border border-white/10 bg-black/35 px-2 pb-2 pt-3">
          {TRACE_HEIGHTS.map((h, i) => (
            <motion.span
              key={i}
              className="origin-bottom w-full max-w-[5px] rounded-full bg-gradient-to-t from-white/10 via-[var(--accent)]/35 to-[var(--accent-soft)]"
              style={{ height: `${h}%` }}
              initial={showMotion ? { opacity: 0.35, scaleY: 0.4 } : undefined}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ delay: i * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </div>

        <div className="rounded-lg border border-white/10 bg-black/40 p-3 ring-1 ring-white/[0.04]">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[10px] font-medium text-white/55">{t("traceLabel")}</p>
            <motion.span
              className="text-[10px] font-semibold text-[var(--success)]"
              initial={showMotion ? { opacity: 0 } : undefined}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.35 }}
            >
              {t("traceHint")}
            </motion.span>
          </div>
          <svg viewBox="0 0 280 72" className="mt-2 h-[48px] w-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id={glowId} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--accent-soft)" stopOpacity="0" />
                <stop offset="50%" stopColor="var(--accent-soft)" stopOpacity="0.95" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.35" />
              </linearGradient>
            </defs>
            <motion.path
              d={SPARK_LINE_PATH}
              fill="none"
              stroke={`url(#${glowId})`}
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={reduce ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0.4 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
            />
          </svg>
        </div>

        <p className="border-t border-white/[0.08] pt-3 text-center text-[10px] leading-snug text-white/42">{t("footnote")}</p>
      </div>
    </aside>
  );
}
