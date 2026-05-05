"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { HeroSlaDashboard } from "@/components/home/hero-sla-dashboard";
import { HeroWordsReveal } from "@/components/home/hero-words-reveal";
import { MagneticButtonWrap } from "@/components/home/magnetic-button-wrap";

export function HeroSection() {
  const reduce = useReducedMotion();
  const t = useTranslations("home");
  const tc = useTranslations("cta");
  const th = useTranslations("homePage.hero");
  const ta = useTranslations("homePage.hero.anchors");

  const sub = [
    { href: "#personas", label: ta("personas") },
    { href: "#services-preview", label: ta("services") },
    { href: "#professions-home", label: ta("professions") },
    { href: "#calc", label: ta("calc") },
    { href: "#cases", label: ta("cases") },
    { href: "#process", label: ta("process") },
    { href: "#why-us", label: ta("whyUs") },
    { href: "#faq", label: ta("faq") },
  ] as const;

  return (
    <section
      id="hero"
      className="grain-dark relative overflow-hidden bg-gradient-to-b from-[var(--hero-operational-top)] to-[var(--hero-operational-bottom)] text-white"
    >
      <div className="hero-ambient pointer-events-none absolute inset-0 opacity-80" />
      <div className="ux-pattern-hero pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-[1440px] px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="grid min-w-0 items-center gap-10 lg:grid-cols-12 lg:gap-10">
          <motion.div
            className="lg:col-span-7"
            initial={reduce ? undefined : { opacity: 0, y: 28 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-soft)]">{th("kicker")}</p>
            <h1 className="font-display mt-5 max-w-[min(100%,18ch)] text-balance text-4xl font-extrabold leading-[0.95] tracking-[-0.04em] sm:max-w-[18ch] sm:text-5xl sm:tracking-[-0.045em] md:text-6xl md:tracking-[-0.048em] lg:text-[4.25rem] lg:tracking-[-0.05em] xl:text-[4.75rem]">
              <HeroWordsReveal text={t("heroTitle")} />
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/78 sm:mt-7 sm:text-lg md:text-xl md:leading-[1.55]">
              {t("heroSubtitle")}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <MagneticButtonWrap>
                <Button
                  asChild
                  className="focus-visible:ring-2 focus-visible:ring-white/90 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--primary-dark)]"
                >
                  <Link href="/kalkulyator">{tc("calc")}</Link>
                </Button>
              </MagneticButtonWrap>
              <Button
                asChild
                variant="secondary"
                className="border-white/25 bg-white/10 text-white hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-white/90 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--primary-dark)]"
              >
                <Link href="/zayavka">{tc("proposal")}</Link>
              </Button>
            </div>
            <nav aria-label={th("sectionsNavAria")} className="mt-12 border-t border-white/[0.08] pt-8">
              <div className="-mx-1 flex gap-2 overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden">
                {sub.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="interactive-hover-ring shrink-0 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-white/88 backdrop-blur-sm transition hover:border-[var(--accent)]/50 hover:bg-white/[0.08] hover:text-white"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
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
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-1 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent shadow-[0_0_24px_-2px_var(--accent)]"
        aria-hidden
      />
    </section>
  );
}
