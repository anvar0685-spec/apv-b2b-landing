"use client";

import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { BrandMark } from "@/components/brand/brand-mark";
import { cn } from "@/lib/utils";

export type SiteHeaderLink = { href: string; label: string };

type SiteHeaderClientProps = {
  brandName: string;
  monogram: string;
  links: readonly SiteHeaderLink[];
  ctaProposal: string;
  ctaCalc: string;
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
}: SiteHeaderClientProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

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

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-[var(--neutral-200)] bg-white/90 backdrop-blur-md transition-[box-shadow,height] duration-300",
        scrolled ? "shadow-[0_1px_0_rgba(0,0,0,0.06)]" : "shadow-none",
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
        К основному содержимому
      </a>
      <div
        className={cn(
          "relative mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 transition-[height] duration-300 sm:px-6 lg:gap-6 lg:px-8",
          scrolled ? "h-14" : "h-16",
        )}
      >
        <Link
          href="/"
          className="interactive-hover-ring group flex min-w-0 items-center gap-3 rounded-lg text-[var(--primary)]"
          aria-label={brandName}
        >
          <BrandMark letters={monogram} sizeClassName={scrolled ? "h-9 w-9" : "h-10 w-10"} />
          <span className="font-display truncate text-base font-bold tracking-tight sm:text-lg">
            {brandName.replace(/_/g, " ")}
          </span>
        </Link>
        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
          {links.map((l) => {
            const active = pathMatches(pathname, l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "interactive-hover-ring relative rounded-lg px-3 py-2 text-sm font-medium text-[var(--neutral-700)] transition-colors hover:text-[var(--primary)]",
                  active &&
                    "bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] text-[var(--primary)] mix-blend-multiply ring-1 ring-[color-mix(in_srgb,var(--accent)_22%,transparent)]",
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <Button asChild variant="secondary" size="sm">
            <Link href="/zayavka">{ctaProposal}</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/kalkulyator">{ctaCalc}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
