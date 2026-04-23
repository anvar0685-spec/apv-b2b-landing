"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Монохромные марки (SVG в `public/trust/marks/`) + подпись отрасли — единый визуальный ряд.
 * Реальные логотипы клиентов подключаются тем же компонентом при появлении согласованных файлов.
 */
const CLIENTS = [
  { mark: "/trust/marks/mark-logistics.svg", label: "Логистика · МО" },
  { mark: "/trust/marks/mark-warehouse.svg", label: "Склад · пики сезона" },
  { mark: "/trust/marks/mark-production.svg", label: "Производство · смены" },
  { mark: "/trust/marks/mark-retail.svg", label: "Ритейл · явка" },
  { mark: "/trust/marks/mark-marketplace.svg", label: "Маркетплейс · DC" },
  { mark: "/trust/marks/mark-fmcg.svg", label: "FMCG · подряд" },
  { mark: "/trust/marks/mark-pharma.svg", label: "Фарма · compliance" },
  { mark: "/trust/marks/mark-horeca.svg", label: "HoReCa · линейка" },
  { mark: "/trust/marks/mark-build.svg", label: "Стройка · бригады" },
  { mark: "/trust/marks/mark-3pl.svg", label: "3PL · хабы" },
] as const;

function TrustMark({ src, label }: { src: string; label: string }) {
  return (
    <div className="group inline-flex items-center gap-3.5 rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)] px-4 py-2.5 shadow-[var(--card-shadow)] transition-shadow duration-300 hover:shadow-[var(--card-shadow-hover)]">
      <Image
        src={src}
        width={104}
        height={28}
        alt=""
        unoptimized
        className="h-7 w-[104px] shrink-0 object-contain object-left opacity-[0.78] contrast-[1.05] grayscale transition duration-300 group-hover:opacity-95"
      />
      <span className="border-l border-[var(--neutral-200)] pl-3.5 text-xs font-semibold tracking-wide text-[var(--neutral-700)]">
        {label}
      </span>
    </div>
  );
}

export function TrustMarquee() {
  const reduce = useReducedMotion();
  const strip = [...CLIENTS, ...CLIENTS];

  return (
    <div className="trust-marquee-fade relative overflow-hidden border-y border-[var(--neutral-200)] bg-[var(--surface)] py-8">
      <p className="sr-only">
        Отраслевые форматы сотрудничества; визуальные марки — нейтральный стиль без раскрытия
        коммерческих имён.
      </p>
      {reduce ? (
        <div className="relative z-[1] flex flex-wrap justify-center gap-3 px-4">
          {CLIENTS.slice(0, 6).map((c) => (
            <TrustMark key={c.mark} src={c.mark} label={c.label} />
          ))}
        </div>
      ) : (
        <motion.div
          className="relative z-[1] flex gap-6 whitespace-nowrap px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 48, ease: "linear", repeat: Infinity }}
        >
          {strip.map((c, i) => (
            <TrustMark key={`${c.mark}-${i}`} src={c.mark} label={c.label} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
