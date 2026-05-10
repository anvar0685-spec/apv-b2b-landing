"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { BrandMark } from "@/components/brand/brand-mark";
import { cn } from "@/lib/utils";

export type SiteHeaderLink = { href: string; label: string };

export type MegaNavGroup = { title: string; links: readonly SiteHeaderLink[] };

type SiteHeaderClientProps = {
  brandName: string;
  monogram: string;
  groups: readonly MegaNavGroup[];
  megaMenuTrigger: string;
  ctaProposal: string;
  ctaCalc: string;
  skipToMain: string;
  menuOpenLabel: string;
  menuCloseLabel: string;
  menuNavLabel: string;
};

function pathMatches(pathname: string, href: string) {
  if (pathname === href) return true;
  if (href === "/") return false;
  return pathname.startsWith(`${href}/`);
}

export function SiteHeaderClient({
  brandName,
  monogram,
  groups,
  megaMenuTrigger,
  ctaProposal,
  ctaCalc,
  skipToMain,
  menuOpenLabel,
  menuCloseLabel,
  menuNavLabel,
}: SiteHeaderClientProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const megaBtnRef = useRef<HTMLButtonElement>(null);
  const megaPanelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMegaOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 0);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMegaOpen(false);
    };
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;
      if (megaBtnRef.current?.contains(t)) return;
      if (megaPanelRef.current?.contains(t)) return;
      setMegaOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDoc);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDoc);
    };
  }, [megaOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-[var(--neutral-200)] bg-white/90 backdrop-blur-md transition-[box-shadow,height] duration-300 dark:border-white/10 dark:bg-[var(--primary-dark)]/92 dark:shadow-[0_1px_0_rgba(255,255,255,0.06)]",
        scrolled ? "shadow-[0_1px_0_rgba(0,0,0,0.06)] dark:shadow-[0_1px_0_rgba(255,255,255,0.06)]" : "shadow-none",
      )}
    >
      <div
        className="pointer-events-none absolute left-0 top-0 z-[60] h-[2px] bg-[var(--accent)] transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
        aria-hidden
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[var(--accent)] focus:px-3 focus:py-2 focus:text-white"
      >
        {skipToMain}
      </a>

      <div className="relative">
        <div
          className={cn(
            "relative mx-auto flex min-w-0 max-w-[1280px] items-center justify-between gap-2 px-4 transition-[height] duration-300 sm:gap-3 sm:px-6 lg:px-8",
            "lg:grid lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center lg:justify-normal lg:gap-x-3",
            scrolled ? "h-14" : "h-16",
          )}
        >
          <Link
            href="/"
            className="interactive-hover-ring group flex min-w-0 max-w-[min(100%,11rem)] shrink-0 items-center gap-2 rounded-lg text-[var(--primary)] sm:max-w-[min(100%,15rem)] sm:gap-3 md:max-w-[min(100%,18rem)]"
            aria-label={brandName}
          >
            <BrandMark letters={monogram} sizeClassName={scrolled ? "h-9 w-9" : "h-10 w-10"} />
            <span className="font-display min-w-0 truncate text-sm font-bold tracking-tight sm:text-base lg:text-lg">
              {brandName.replace(/_/g, " ")}
            </span>
          </Link>

          <div className="hidden min-h-0 min-w-0 justify-center lg:flex">
            <button
              ref={megaBtnRef}
              type="button"
              className={cn(
                "interactive-hover-ring inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold tracking-tight transition",
                megaOpen
                  ? "border-[color-mix(in_srgb,var(--accent)_42%,var(--neutral-200))] bg-[color-mix(in_srgb,var(--accent)_12%,var(--card))] text-[var(--primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] dark:border-[color-mix(in_srgb,var(--accent)_48%,transparent)] dark:bg-[color-mix(in_srgb,var(--accent)_18%,transparent)] dark:text-white"
                  : "border-[var(--neutral-200)] bg-[var(--surface)] text-[var(--neutral-700)] hover:border-[color-mix(in_srgb,var(--accent)_35%,var(--neutral-200))] hover:text-[var(--primary)] dark:border-white/15 dark:bg-white/5 dark:text-white/85 dark:hover:border-[var(--accent)]/45",
              )}
              aria-expanded={megaOpen}
              aria-controls="site-mega-panel"
              onClick={() => setMegaOpen((o) => !o)}
            >
              {megaMenuTrigger}
              <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform duration-200", megaOpen && "rotate-180")} aria-hidden />
            </button>
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2 lg:ml-0 lg:justify-self-end">
            <button
              type="button"
              className="interactive-hover-ring inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--neutral-200)] bg-[var(--surface)] text-[var(--primary)] lg:hidden dark:border-white/15 dark:bg-white/5 dark:text-white"
              aria-expanded={menuOpen}
              aria-controls={menuId}
              aria-label={menuOpen ? menuCloseLabel : menuOpenLabel}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            </button>
            <Button asChild variant="secondary" size="sm" className="hidden sm:inline-flex">
              <Link href="/zayavka">{ctaProposal}</Link>
            </Button>
            <Button asChild size="sm" className="hidden text-xs sm:inline-flex sm:text-sm">
              <Link href="/kalkulyator">{ctaCalc}</Link>
            </Button>
          </div>
        </div>

        {megaOpen ? (
          <div
            ref={megaPanelRef}
            id="site-mega-panel"
            className="absolute left-0 right-0 top-full z-[55] border-b border-[var(--neutral-200)] bg-white shadow-[0_24px_48px_-24px_rgba(7,21,37,0.22)] dark:border-white/10 dark:bg-[var(--primary-dark)] dark:shadow-[0_28px_56px_-28px_rgba(0,0,0,0.65)]"
          >
            <nav className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 px-4 py-8 sm:grid-cols-3 sm:px-6 lg:px-8" aria-label={menuNavLabel}>
              {groups.map((g) => (
                <div key={g.title}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--neutral-500)] dark:text-white/45">{g.title}</p>
                  <ul className="mt-4 space-y-1">
                    {g.links.map((l) => {
                      const active = pathMatches(pathname, l.href);
                      return (
                        <li key={l.href}>
                          <Link
                            href={l.href}
                            onClick={() => setMegaOpen(false)}
                            className={cn(
                              "block rounded-xl px-3 py-2.5 text-sm font-semibold leading-snug transition-colors",
                              active
                                ? "bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-[var(--primary)] shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--accent)_30%,transparent)] dark:bg-[color-mix(in_srgb,var(--accent)_18%,transparent)] dark:text-white"
                                : "text-[var(--neutral-700)] hover:bg-[color-mix(in_srgb,var(--neutral-500)_08%,transparent)] hover:text-[var(--primary)] dark:text-white/78 dark:hover:bg-white/10 dark:hover:text-white",
                            )}
                          >
                            {l.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        ) : null}
      </div>

      {menuOpen && mounted
        ? createPortal(
            <div className="fixed inset-0 z-[200] lg:hidden" role="presentation">
              <button
                type="button"
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
                aria-label={menuCloseLabel}
                onClick={() => setMenuOpen(false)}
              />
              <div
                id={menuId}
                role="dialog"
                aria-modal="true"
                className="absolute right-0 top-0 flex h-[100dvh] max-h-[100dvh] min-h-0 w-full max-w-sm flex-col border-l border-[var(--neutral-200)] bg-[var(--surface)] shadow-2xl dark:border-white/10 dark:bg-[var(--primary-dark)]"
                style={{
                  paddingTop: "max(0px, env(safe-area-inset-top))",
                  paddingBottom: "max(0px, env(safe-area-inset-bottom))",
                }}
              >
                <div className="flex shrink-0 items-center justify-between border-b border-[var(--neutral-200)] px-4 py-3 dark:border-white/10">
                  <span className="font-display text-sm font-semibold text-[var(--primary)] dark:text-white">
                    {brandName.replace(/_/g, " ")}
                  </span>
                  <button
                    ref={closeBtnRef}
                    type="button"
                    className="interactive-hover-ring inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--neutral-200)] dark:border-white/15"
                    aria-label={menuCloseLabel}
                    onClick={() => setMenuOpen(false)}
                  >
                    <X className="h-5 w-5" aria-hidden />
                  </button>
                </div>
                <nav
                  className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-3 py-3 [-webkit-overflow-scrolling:touch]"
                  aria-label={menuNavLabel}
                >
                  <p className="px-3 pb-2 text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--neutral-500)] dark:text-white/45">
                    {menuNavLabel}
                  </p>
                  <div className="space-y-6">
                    {groups.map((g) => (
                      <div key={g.title}>
                        <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--neutral-500)] dark:text-white/40">
                          {g.title}
                        </p>
                        <ul className="mt-2 space-y-1">
                          {g.links.map((l) => {
                            const active = pathMatches(pathname, l.href);
                            return (
                              <li key={l.href}>
                                <Link
                                  href={l.href}
                                  onClick={() => setMenuOpen(false)}
                                  className={cn(
                                    "block min-h-[44px] rounded-full px-3 py-3 text-sm font-semibold leading-snug tracking-tight text-[var(--neutral-800)] transition-colors dark:text-white/90",
                                    active &&
                                      "bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-[var(--primary)] shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--accent)_30%,transparent)] dark:bg-[color-mix(in_srgb,var(--accent)_18%,transparent)] dark:text-white dark:shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--accent)_38%,transparent)]",
                                  )}
                                >
                                  {l.label}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                </nav>
                <div className="mt-auto flex shrink-0 flex-col gap-2 border-t border-[var(--neutral-200)] p-4 dark:border-white/10">
                  <Button asChild variant="secondary" className="w-full">
                    <Link href="/zayavka" onClick={() => setMenuOpen(false)}>
                      {ctaProposal}
                    </Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href="/kalkulyator" onClick={() => setMenuOpen(false)}>
                      {ctaCalc}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </header>
  );
}
