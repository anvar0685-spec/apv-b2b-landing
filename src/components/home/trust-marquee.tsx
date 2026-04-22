"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Заглушки до NDA: отраслевые якоря в стиле бренда, не «MP / 3PL». */
const CLIENTS = [
  { code: "АП", label: "Логистика · МО" },
  { code: "СК", label: "Склад · пики сезона" },
  { code: "ПР", label: "Производство · смены" },
  { code: "РТ", label: "Ритейл · явка" },
  { code: "МП", label: "Маркетплейс · DC" },
  { code: "ФМ", label: "FMCG · подряд" },
  { code: "ФА", label: "Фарма · compliance" },
  { code: "ХР", label: "HoReCa · линейка" },
  { code: "СТ", label: "Стройка · бригады" },
  { code: "3L", label: "3PL · хабы" },
] as const;

export function TrustMarquee() {
  const reduce = useReducedMotion();
  const strip = [...CLIENTS, ...CLIENTS];

  return (
    <div className="relative overflow-hidden border-y border-[var(--neutral-200)] bg-[var(--surface)] py-8">
      <p className="sr-only">Отрасли и форматы — заглушки до согласования NDA</p>
      {reduce ? (
        <div className="flex flex-wrap justify-center gap-3 px-4">
          {CLIENTS.slice(0, 6).map((c) => (
            <div
              key={c.code}
              className="flex items-center gap-3 rounded-2xl border border-[var(--neutral-200)] bg-white px-4 py-2.5 shadow-[var(--card-shadow)]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--primary)] font-mono-nums text-[11px] font-bold text-white">
                {c.code}
              </span>
              <span className="text-xs font-semibold text-[var(--neutral-700)]">{c.label}</span>
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          className="flex gap-6 whitespace-nowrap px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 36, ease: "linear", repeat: Infinity }}
        >
          {strip.map((c, i) => (
            <div
              key={`${c.code}-${i}`}
              className="inline-flex items-center gap-3 rounded-2xl border border-[var(--neutral-200)] bg-white px-4 py-2.5 shadow-[var(--card-shadow)]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--primary)] font-mono-nums text-[11px] font-bold text-white">
                {c.code}
              </span>
              <span className="text-xs font-semibold tracking-wide text-[var(--neutral-700)]">{c.label}</span>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
