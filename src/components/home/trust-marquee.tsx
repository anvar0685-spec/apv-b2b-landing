"use client";

import { motion, useReducedMotion } from "framer-motion";

const NAMES = [
  "MARKETPLACE",
  "3PL",
  "RETAIL",
  "FMCG",
  "PHARMA",
  "HORECA",
  "DC EAST",
  "DC WEST",
  "BUILD",
  "MANUFACTURING",
];

export function TrustMarquee() {
  const reduce = useReducedMotion();
  return (
    <div className="relative overflow-hidden border-y border-[var(--neutral-200)] bg-[var(--surface)] py-6">
      <p className="sr-only">Логотипы клиентов — заглушки до согласования NDA</p>
      {reduce ? (
        <div className="flex flex-wrap justify-center gap-4">
          {NAMES.slice(0, 6).map((n) => (
            <span
              key={n}
              className="rounded-lg border border-[var(--neutral-200)] bg-white px-4 py-2 text-xs font-semibold text-[var(--neutral-500)]"
            >
              {n}
            </span>
          ))}
        </div>
      ) : (
        <motion.div
          className="flex gap-10 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        >
          {[...NAMES, ...NAMES].map((n, i) => (
            <span
              key={`${n}-${i}`}
              className="rounded-lg border border-[var(--neutral-200)] bg-white px-5 py-2 text-xs font-semibold tracking-wide text-[var(--neutral-500)]"
            >
              {n}
            </span>
          ))}
        </motion.div>
      )}
    </div>
  );
}
