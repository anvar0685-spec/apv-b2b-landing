"use client";

import { useEffect, useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

function useCountUp(target: number, decimals: number, enabled: boolean, reduce: boolean) {
  const [v, setV] = useState(reduce ? target : 0);
  useEffect(() => {
    if (reduce) {
      setV(target);
      return;
    }
    if (!enabled) return;
    setV(0);
    const steps = 32;
    let frame = 0;
    const id = window.setInterval(() => {
      frame += 1;
      const t = frame / steps;
      const eased = 1 - (1 - t) ** 2;
      setV(Number((target * eased).toFixed(decimals)));
      if (frame >= steps) window.clearInterval(id);
    }, 22);
    return () => window.clearInterval(id);
  }, [target, decimals, enabled, reduce]);
  return v;
}

const SPARK_D =
  "M0 52 L28 48 L56 55 L84 38 L112 42 L140 28 L168 32 L196 22 L224 26 L252 14 L280 18 L280 72 L0 72 Z";
const SPARK_LINE =
  "M0 52 L28 48 L56 55 L84 38 L112 42 L140 28 L168 32 L196 22 L224 26 L252 14 L280 18";

export function HeroSlaDashboard() {
  const reduce = useReducedMotion();
  const uid = useId();
  const fillId = `heroSparkFill-${uid.replace(/:/g, "")}`;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const showMotion = mounted && !reduce;
  const y1 = useCountUp(97.2, 1, showMotion, !!reduce);
  const y2 = useCountUp(12, 0, showMotion, !!reduce);

  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.45)] backdrop-blur-md"
      aria-hidden
    >
      <div className="absolute inset-0 hero-ambient opacity-90" />
      <div className="relative flex flex-col gap-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
            SLA · смена
          </p>
          <motion.span
            className="rounded-full border border-[var(--accent)]/50 bg-[var(--accent)]/20 px-2.5 py-0.5 text-[10px] font-semibold text-[var(--accent-soft)] shadow-[0_0_12px_-2px_var(--accent)]"
            animate={reduce ? undefined : { scale: [1, 1.06, 1], opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            live
          </motion.span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <motion.div
            className="relative rounded-2xl border border-[var(--accent)]/45 bg-white/[0.1] p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_12px_40px_-12px_rgba(13,148,136,0.35)]"
            initial={reduce ? undefined : { scale: 0.98, opacity: 0.9 }}
            animate={reduce ? undefined : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <p className="text-[10px] font-medium text-white/55">Явка · фокус</p>
            <p className="mt-1 font-mono-nums text-2xl font-bold tabular-nums text-white md:text-[1.65rem]">
              {y1}
              <span className="text-[0.65em] font-semibold text-[var(--accent-soft)]">%</span>
            </p>
          </motion.div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-3">
            <p className="text-[10px] text-white/45">Замены</p>
            <p className="mt-1 font-mono-nums text-2xl font-bold tabular-nums text-[var(--accent-soft)] md:text-[1.65rem]">
              {y2}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-3">
            <p className="text-[10px] text-white/45">Инциденты</p>
            <p className="mt-1 font-mono-nums text-2xl font-bold tabular-nums text-white/90 md:text-[1.65rem]">0</p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/15 bg-black/25 p-4 ring-1 ring-white/[0.06]">
          <div className="flex items-end justify-between gap-2">
            <p className="text-[11px] font-medium text-white/60">Throughput · 14 дней</p>
            <motion.span
              className="text-[10px] font-semibold text-[var(--success)]"
              initial={reduce ? undefined : { opacity: 0, y: 4 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.4 }}
            >
              +18%
            </motion.span>
          </div>
          <svg viewBox="0 0 280 72" className="mt-3 h-[80px] w-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.55" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              d={SPARK_D}
              fill={`url(#${fillId})`}
              initial={reduce ? undefined : { opacity: 0 }}
              animate={reduce ? undefined : { opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
            <motion.path
              d={SPARK_LINE}
              fill="none"
              stroke="var(--accent-soft)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={reduce ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0.4 }}
              animate={reduce ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.45, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            />
          </svg>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {["Миграционный учёт", "Документы", "SLA смены"].map((label, i) => (
            <motion.span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[10px] font-medium text-white/70"
              initial={reduce ? undefined : { opacity: 0, y: 6 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 0.45 + i * 0.08, duration: 0.35 }}
            >
              <span className="h-1 w-1 shrink-0 rounded-full bg-[var(--success)]" />
              {label}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}
