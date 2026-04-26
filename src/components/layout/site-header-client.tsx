"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { BrandMark } from "@/components/brand/brand-mark";
import { cn } from "@/lib/utils";
import { toggleTheme } from "@/components/layout/theme-provider";

export type SiteHeaderLink = { href: string; label: string };

type SiteHeaderClientProps = {
  brandName: string;
  monogram: string;
  links: readonly SiteHeaderLink[];
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
  links,
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
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    const sync = () => setDark(document.documentElement.classList.contains("dark"));
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

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
      <div
        className={cn(
          "relative mx-auto flex min-w-0 max-w-[1280px] items-center justify-between gap-2 px-4 transition-[height] duration-300 sm:gap-3 sm:px-6 lg:px-8",
          "xl:grid xl:grid-cols-[auto_minmax(0,1fr)_auto] xl:items-center xl:justify-normal xl:gap-x-3",
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

        <nav
          className={cn(
            "hidden min-h-0 min-w-0 overflow-x-auto overscroll-x-contain xl:block",
            "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          )}
          aria-label={menuNavLabel}
        >
          <div className="flex w-max min-w-0 items-center justify-start gap-0.5 py-1 sm:gap-1">
            {links.map((l) => {
              const active = pathMatches(pathname, l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "interactive-hover-ring relative shrink-0 whitespace-nowrap rounded-lg px-2 py-2 text-xs font-medium text-[var(--neutral-700)] transition-colors hover:text-[var(--primary)] sm:px-2.5 sm:text-[13px] lg:px-3 lg:text-sm",
                    active &&
                      "bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] text-[var(--primary)] mix-blend-multiply ring-1 ring-[color-mix(in_srgb,var(--accent)_22%,transparent)]",
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2 xl:ml-0 xl:justify-self-end">
          <button
            type="button"
            className="interactive-hover-ring inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--neutral-200)] bg-[var(--surface)] text-[var(--primary)] xl:hidden dark:border-white/15 dark:bg-white/5 dark:text-white"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? menuCloseLabel : menuOpenLabel}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
          <button
            type="button"
            onClick={() => {
              toggleTheme();
              setDark(document.documentElement.classList.contains("dark"));
            }}
            className="interactive-hover-ring inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--neutral-200)] bg-[var(--surface)] text-sm text-[var(--primary)] transition hover:bg-[var(--card)] dark:border-white/15 dark:bg-white/5 dark:text-white"
            aria-label={dark ? "Светлая тема" : "Тёмная тема"}
            title={dark ? "Светлая тема" : "Тёмная тема"}
          >
            {dark ? "☀" : "☾"}
          </button>
          <Button asChild variant="secondary" size="sm" className="hidden sm:inline-flex">
            <Link href="/zayavka">{ctaProposal}</Link>
          </Button>
          <Button asChild size="sm" className="hidden text-xs sm:inline-flex sm:text-sm">
            <Link href="/kalkulyator">{ctaCalc}</Link>
          </Button>
        </div>
      </div>

      {menuOpen ? (
        <div className="fixed inset-0 z-[80] xl:hidden" role="presentation">
          <button
            type="button"
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            aria-label={menuCloseLabel}
            onClick={() => setMenuOpen(false)}
          />
          <div
            id={menuId}
            className="absolute right-0 top-0 flex h-full w-[min(100%,20rem)] flex-col border-l border-[var(--neutral-200)] bg-[var(--surface)] shadow-2xl dark:border-white/10 dark:bg-[var(--primary-dark)]"
            style={{ paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            <div className="flex items-center justify-between border-b border-[var(--neutral-200)] px-4 py-3 dark:border-white/10">
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
            <nav className="flex-1 overflow-y-auto px-2 py-3" aria-label={menuNavLabel}>
              <ul className="space-y-0.5">
                {links.map((l) => {
                  const active = pathMatches(pathname, l.href);
                  return (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        onClick={() => setMenuOpen(false)}
                        className={cn(
                          "block rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--neutral-800)] dark:text-white/90",
                          active && "bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-[var(--primary)] dark:text-white",
                        )}
                      >
                        {l.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="mt-auto flex flex-col gap-2 border-t border-[var(--neutral-200)] p-4 dark:border-white/10">
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
        </div>
      ) : null}
    </header>
  );
}
