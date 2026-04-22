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
    { label: "Лет на рынке (заглушка)", value: y1, suffix: "+" },
    { label: "Сотрудников под управлением", value: y2, suffix: "+" },
    { label: "Клиентов B2B", value: y3, suffix: "+" },
    { label: "Compliance-рейтинг", value: y4, suffix: "%" },
  ];

  return (
    <section
      id="stats"
      ref={ref}
      className="border-y border-[var(--neutral-200)] bg-white py-16 lg:py-24"
    >
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {items.map((s) => (
          <motion.div
            key={s.label}
            initial={reduce ? undefined : { opacity: 0, y: 12 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono-nums text-4xl font-bold text-[var(--primary)] md:text-5xl">
              {s.value}
              {s.suffix}
            </p>
            <p className="mt-2 text-sm text-[var(--neutral-700)]">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
