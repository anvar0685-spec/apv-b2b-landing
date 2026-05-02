"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

function useCount(target: number, reduce: boolean) {
  const [v, setV] = useState(reduce ? target : 0);
  useEffect(() => {
    if (reduce) return;
    const steps = 40;
    const inc = target / steps;
    let cur = 0;
    const id = window.setInterval(() => {
      cur += inc;
      if (cur >= target) {
        setV(target);
        window.clearInterval(id);
      } else setV(Math.floor(cur));
    }, 20);
    return () => window.clearInterval(id);
  }, [target, reduce]);
  return v;
}

export type StatEntry = {
  target: number;
  /** Текст сразу после крупной цифры (например « года», «+», пусто). */
  numberSuffix: string;
  label: string;
  hint: string;
};

function StatBlock({
  entry,
  inView,
  reduce,
  index,
}: {
  entry: StatEntry;
  inView: boolean;
  reduce: boolean;
  index: number;
}) {
  const v = useCount(inView ? entry.target : 0, !!reduce);
  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, y: 16 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="relative"
    >
      <p className="kpi-numerals font-mono-nums text-5xl font-bold tabular-nums leading-none tracking-tight text-[var(--primary)] sm:text-6xl lg:text-7xl xl:text-8xl">
        {v}
        {entry.numberSuffix ? (
          <span className="text-[0.55em] font-semibold text-[var(--accent)]">{entry.numberSuffix}</span>
        ) : null}
      </p>
      <p className="mt-4 text-sm font-semibold text-[var(--primary)]">{entry.label}</p>
      <p className="mt-1 text-xs text-[var(--neutral-500)]">{entry.hint}</p>
    </motion.div>
  );
}

export function StatsCounters() {
  const reduce = useReducedMotion();
  const t = useTranslations("homePage.stats");
  const entries = t.raw("entries") as StatEntry[];

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section
      id="stats"
      ref={ref}
      className="border-y border-[var(--neutral-200)] bg-[var(--surface)] py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-[var(--neutral-500)]">
          {t("kicker")}
        </p>
        <div className="mt-14 grid gap-y-14 gap-x-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-12">
          {entries.map((entry, idx) => (
            <StatBlock key={entry.label} entry={entry} inView={inView} reduce={!!reduce} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
