"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

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

export function StatsCounters() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const y1 = useCount(inView ? 12 : 0, !!reduce);
  const y2 = useCount(inView ? 3500 : 0, !!reduce);
  const y3 = useCount(inView ? 180 : 0, !!reduce);
  const y4 = useCount(inView ? 100 : 0, !!reduce);

  const items = [
    {
      label: "Лет на рынке (заглушка)",
      value: y1,
      suffix: "+",
      hint: "операционный след",
    },
    {
      label: "Сотрудников под управлением",
      value: y2,
      suffix: "+",
      hint: "пиковые волны",
    },
    {
      label: "Клиентов B2B",
      value: y3,
      suffix: "+",
      hint: "логистика · ритейл · производство",
    },
    {
      label: "Compliance-рейтинг",
      value: y4,
      suffix: "%",
      hint: "миграционный контур",
    },
  ];

  return (
    <section
      id="stats"
      ref={ref}
      className="border-y border-[var(--neutral-200)] bg-[var(--surface)] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-[var(--neutral-500)]">
          Цифры, с которыми заходит COO
        </p>
        <div className="mt-14 grid gap-y-14 gap-x-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-12">
          {items.map((s, idx) => (
            <motion.div
              key={s.label}
              initial={reduce ? undefined : { opacity: 0, y: 16 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              className="relative"
            >
              <p className="font-display text-5xl font-bold tabular-nums leading-none tracking-tight text-[var(--primary)] sm:text-6xl lg:text-7xl xl:text-8xl">
                {s.value}
                <span className="text-[0.55em] font-semibold text-[var(--accent)]">{s.suffix}</span>
              </p>
              <p className="mt-4 text-sm font-semibold text-[var(--primary)]">{s.label}</p>
              <p className="mt-1 text-xs text-[var(--neutral-500)]">{s.hint}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
