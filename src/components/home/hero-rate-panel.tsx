"use client";

import { useEffect, useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SPARK_AREA_PATH, SPARK_LINE_PATH } from "@/components/marketing/spark-chart-paths";
import { WAREHOUSE_HOURLY_RATE_RUB } from "@/content/warehouse-hourly-rates";

const ROWS = [
  { label: "Грузчики, разнорабочие, уборщики", rate: WAREHOUSE_HOURLY_RATE_RUB.gruzchiki },
  { label: "Комплектовщики, упаковщики, сборщики", rate: WAREHOUSE_HOURLY_RATE_RUB.komplektovschiki },
  { label: "Кладовщики", rate: WAREHOUSE_HOURLY_RATE_RUB.kladovschiki },
  { label: "Водители ПРТ и погрузчиков", rate: WAREHOUSE_HOURLY_RATE_RUB["voditeli-prt"] },
] as const;

function useCountUp(target: number, enabled: boolean, reduce: boolean) {
  const [v, setV] = useState(target);

  useEffect(() => {
    if (reduce || !enabled) {
      setV(target);
      return;
    }
    setV(0);
    const steps = 28;
    let frame = 0;
    const id = window.setInterval(() => {
      frame += 1;
      const t = frame / steps;
      const eased = 1 - (1 - t) ** 2;
      setV(Math.round(target * eased));
      if (frame >= steps) window.clearInterval(id);
    }, 22);
    return () => window.clearInterval(id);
  }, [target, enabled, reduce]);

  return v;
}

function RateRow({
  label,
  rate,
  enabled,
  reduce,
  delay,
}: {
  label: string;
  rate: number;
  enabled: boolean;
  reduce: boolean;
  delay: number;
}) {
  const shown = useCountUp(rate, enabled, reduce);
  return (
    <motion.li
      className="flex items-baseline justify-between gap-4 py-2.5"
      initial={reduce ? undefined : { opacity: 0, y: 8 }}
      animate={reduce ? undefined : { opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="text-sm text-[var(--text-on-dark-base)]">{label}</span>
      <span className="shrink-0 font-mono-nums text-sm font-semibold tabular-nums text-white">{shown} ₽</span>
    </motion.li>
  );
}

export function HeroRatePanel() {
  const reduce = useReducedMotion();
  const uid = useId();
  const fillId = `heroRateFill-${uid.replace(/:/g, "")}`;
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("homePage.heroDashboard");
  const chips = t.raw("chips") as string[];

  useEffect(() => {
    setMounted(true);
  }, []);

  const showMotion = mounted && !reduce;

  return (
    <figure
      className="relative w-full min-w-0 max-w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.45)] backdrop-blur-md sm:p-6"
      aria-label="Ориентир ставок по ролям, день, Москва и Московская область"
    >
      <div className="absolute inset-0 hero-ambient opacity-90" aria-hidden />
      <div className="relative flex flex-col gap-4">
        <div className="flex min-w-0 flex-wrap items-center justify-between gap-2">
          <figcaption className="min-w-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-on-dark-muted)]">
            Ориентир ставки · день · Москва и МО
          </figcaption>
          <motion.span
            className="shrink-0 rounded-full border border-[var(--accent)]/50 bg-[var(--accent)]/20 px-2.5 py-0.5 text-[10px] font-semibold text-[var(--accent-soft)] shadow-[0_0_12px_-2px_var(--accent)]"
            animate={reduce ? undefined : { scale: [1, 1.06, 1], opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            до КП
          </motion.span>
        </div>

        <motion.p
          className="font-display text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl"
          initial={reduce ? undefined : { opacity: 0, y: 10 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          600–800 ₽/час
        </motion.p>

        <ul className="divide-y divide-white/10">
          {ROWS.map((row, i) => (
            <RateRow
              key={row.label}
              label={row.label}
              rate={row.rate}
              enabled={showMotion}
              reduce={!!reduce}
              delay={0.12 + i * 0.08}
            />
          ))}
        </ul>

        <div className="hidden min-w-0 overflow-hidden rounded-2xl border border-white/15 bg-black/25 p-3 ring-1 ring-white/[0.06] md:block">
          <p className="text-[11px] font-medium text-[var(--text-on-dark-base)]">Коридор ставки по ролям</p>
          <svg viewBox="0 0 280 72" className="mt-2 h-[72px] w-full" preserveAspectRatio="none" aria-hidden>
            <defs>
              <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.55" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              d={SPARK_AREA_PATH}
              fill={`url(#${fillId})`}
              initial={reduce ? undefined : { opacity: 0 }}
              animate={reduce ? undefined : { opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
            <motion.path
              d={SPARK_LINE_PATH}
              fill="none"
              stroke="var(--accent-soft)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={reduce ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0.4 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.45, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            />
          </svg>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {chips.map((label, i) => (
            <motion.span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[10px] font-medium text-[var(--text-on-dark-base)]"
              initial={reduce ? undefined : { opacity: 0, y: 6 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 0.45 + i * 0.08, duration: 0.35 }}
            >
              <span className="h-1 w-1 shrink-0 rounded-full bg-[var(--success)]" />
              {label}
            </motion.span>
          ))}
        </div>

        <p className="border-t border-white/[0.07] pt-3 text-[10px] leading-snug text-[var(--text-on-dark-muted)]">
          Витринный ориентир до КП. Ночная смена +8%. Срок замены невыхода фиксируется в договоре.
        </p>
      </div>
    </figure>
  );
}
