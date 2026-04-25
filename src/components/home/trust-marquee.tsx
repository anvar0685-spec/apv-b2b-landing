"use client";

import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  Factory,
  HardHat,
  Package,
  Pill,
  ShoppingBag,
  Store,
  Truck,
  UtensilsCrossed,
  Warehouse,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

type Sector = { Icon: LucideIcon; title: string; hint: string };

const ICONS: LucideIcon[] = [
  Truck,
  Warehouse,
  Factory,
  Store,
  ShoppingBag,
  Package,
  Pill,
  UtensilsCrossed,
  HardHat,
  Boxes,
];

function TrustPill({ Icon, title, hint }: Sector) {
  return (
    <div className="group inline-flex items-center gap-3 rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)] px-3.5 py-2.5 shadow-[var(--card-shadow)] ring-1 ring-black/[0.03] transition duration-300 hover:border-[var(--accent)]/35 hover:shadow-[var(--card-shadow-hover)] dark:border-[var(--neutral-200)]/80 dark:ring-white/[0.06]">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent-soft)] to-[var(--card)] shadow-inner ring-1 ring-[var(--accent)]/25 dark:from-[var(--accent-soft)]/30 dark:to-[var(--surface)]">
        <Icon className="h-[22px] w-[22px] text-[var(--accent)]" strokeWidth={2} aria-hidden />
      </span>
      <span className="min-w-0 border-l border-[var(--neutral-200)] pl-3.5 dark:border-[var(--neutral-200)]/80">
        <span className="block text-sm font-bold leading-tight tracking-tight text-[var(--primary)]">{title}</span>
        <span className="mt-0.5 block text-[11px] font-medium leading-snug text-[var(--neutral-500)]">{hint}</span>
      </span>
    </div>
  );
}

type TrustMarqueeProps = {
  kicker: string;
  lead: string;
};

export function TrustMarquee({ kicker, lead }: TrustMarqueeProps) {
  const reduce = useReducedMotion();
  const t = useTranslations("homePage");
  const rawSectors = t.raw("trustSectors") as { title: string; hint: string }[];
  const SECTORS: Sector[] = rawSectors.map((s, i) => ({
    ...s,
    Icon: ICONS[i] ?? Truck,
  }));
  const strip = [...SECTORS, ...SECTORS];

  return (
    <div className="trust-marquee-fade relative overflow-hidden border-y border-[var(--neutral-200)] bg-[var(--surface)] py-10 md:py-12">
      <div className="relative z-[1] mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <p className="type-kicker text-center">{kicker}</p>
        <p className="mx-auto mt-3 max-w-3xl text-center text-sm font-medium leading-relaxed text-[var(--neutral-700)] md:text-base">
          {lead}
        </p>
      </div>

      <p className="sr-only">{t("trustSrOnly")}</p>

      <div className="relative z-[1] mt-8 md:mt-10">
        {reduce ? (
          <div className="flex flex-wrap justify-center gap-3 px-4">
            {SECTORS.slice(0, 6).map((s) => (
              <TrustPill key={s.title} {...s} />
            ))}
          </div>
        ) : (
          <motion.div
            className="flex gap-5 whitespace-nowrap px-4 md:gap-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 52, ease: "linear", repeat: Infinity }}
          >
            {strip.map((s, i) => (
              <TrustPill key={`${s.title}-${i}`} {...s} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
