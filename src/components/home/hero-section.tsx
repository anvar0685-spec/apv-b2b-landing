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
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-soft)]">{th("kicker")}</p>
            <h1 className="font-display mt-5 max-w-[18ch] text-balance text-4xl font-extrabold leading-[0.95] tracking-[-0.04em] sm:text-5xl sm:tracking-[-0.045em] md:text-6xl md:tracking-[-0.048em] lg:text-[4.25rem] lg:tracking-[-0.05em] xl:text-[4.75rem]">
              <HeroWordsReveal text={t("heroTitle")} />
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/78 md:text-xl md:leading-[1.55]">
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
            <nav
              aria-label={th("sectionsNavAria")}
              className="mt-12 flex flex-wrap gap-2 border-t border-white/[0.08] pt-8"
            >
              {sub.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="interactive-hover-ring rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-white/88 backdrop-blur-sm transition hover:border-[var(--accent)]/50 hover:bg-white/[0.08] hover:text-white"
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
