"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { HeroSlaDashboard } from "@/components/home/hero-sla-dashboard";

export function HeroSection() {
  const reduce = useReducedMotion();
  const t = useTranslations("home");
  const tc = useTranslations("cta");

  const sub = [
    { href: "#services-preview", label: "Услуги" },
    { href: "#calc", label: "Калькулятор" },
    { href: "#cases", label: "Кейсы" },
    { href: "#process", label: "Процесс" },
    { href: "#tech", label: "Compliance" },
    { href: "#faq", label: "FAQ" },
  ] as const;

  return (
    <section
      id="hero"
      className="grain-dark relative overflow-hidden bg-[var(--primary-dark)] text-white"
    >
      <div className="hero-ambient pointer-events-none absolute inset-0 opacity-80" />
      <div className="relative mx-auto max-w-[1440px] px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <motion.div
            className="lg:col-span-7"
            initial={reduce ? undefined : { opacity: 0, y: 28 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-soft)]">
              Moscow · MO · compliance-first
            </p>
            <h1 className="font-display mt-5 max-w-[18ch] text-balance text-4xl font-bold leading-[0.98] tracking-[-0.035em] sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem]">
              {t("heroTitle")}
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/78 md:text-xl md:leading-[1.55]">
              {t("heroSubtitle")}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/kalkulyator">{tc("calc")}</Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                className="border-white/25 bg-white/10 text-white hover:bg-white/15"
              >
                <Link href="/zayavka">{tc("proposal")}</Link>
              </Button>
            </div>
            <nav
              aria-label="Разделы страницы"
              className="mt-12 flex flex-wrap gap-2 border-t border-white/[0.08] pt-8"
            >
              {sub.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-white/88 backdrop-blur-sm transition hover:border-[var(--accent)]/50 hover:bg-white/[0.08] hover:text-white"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </motion.div>

          <motion.div
            className="lg:col-span-5"
            initial={reduce ? undefined : { opacity: 0, y: 20, scale: 0.98 }}
            animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroSlaDashboard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
