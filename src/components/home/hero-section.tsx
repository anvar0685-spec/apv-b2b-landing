"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const reduce = useReducedMotion();
  const t = useTranslations("home");
  const tc = useTranslations("cta");

  return (
    <section className="relative overflow-hidden bg-[var(--primary-dark)] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.15),_transparent_55%)]" />
      <div className="relative mx-auto max-w-[1440px] px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={reduce ? false : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--accent-soft)]">
            Moscow · MO · compliance-first
          </p>
          <h1 className="font-display mt-4 max-w-4xl text-balance text-4xl font-bold leading-[1.05] tracking-[-0.03em] md:text-6xl lg:text-[72px]">
            {t("heroTitle")}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
            {t("heroSubtitle")}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/kalkulyator">{tc("calc")}</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/zayavka">{tc("proposal")}</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
