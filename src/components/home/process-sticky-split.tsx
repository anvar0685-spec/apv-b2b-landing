"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const PANELS = [
  "from-teal-400 via-teal-600 to-slate-950 dark:from-teal-500 dark:via-teal-800 dark:to-slate-950 ring-1 ring-white/25",
  "from-violet-400 via-fuchsia-700 to-slate-950 dark:from-violet-500 dark:via-purple-900 dark:to-slate-950 ring-1 ring-white/20",
  "from-emerald-400 via-teal-800 to-slate-950 dark:from-emerald-500 dark:via-emerald-900 dark:to-slate-950 ring-1 ring-white/20",
  "from-amber-400 via-orange-700 to-slate-950 dark:from-amber-500 dark:via-orange-900 dark:to-slate-950 ring-1 ring-white/20",
  "from-sky-400 via-blue-800 to-slate-950 dark:from-sky-500 dark:via-blue-900 dark:to-slate-950 ring-1 ring-white/20",
] as const;

type ProcessCopy = {
  title: string;
  lead: string;
  stepWord: string;
  steps: { title: string; body: string }[];
};

export function ProcessStickySplit() {
  const t = useTranslations("homePage");
  const process = t.raw("process") as ProcessCopy;
  const steps = process.steps.map((s, i) => ({
    id: `proc-${i}`,
    title: s.title,
    body: s.body,
    panel: PANELS[i] ?? PANELS[0],
  }));

  const [active, setActive] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollTo = useCallback((index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const nodes = sectionRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!nodes.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const idx = Number((en.target as HTMLElement).dataset.index);
          if (!Number.isNaN(idx)) setActive(idx);
        });
      },
      { root: null, rootMargin: "-42% 0px -42% 0px", threshold: 0 },
    );

    nodes.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="process" className="border-y border-[var(--neutral-200)] bg-[var(--background)] py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold tracking-[-0.035em] text-[var(--primary)] md:text-[2.625rem] md:leading-[1.12]">
          {process.title}
        </h2>
        <p className="mt-4 max-w-2xl text-[var(--neutral-700)]">{process.lead}</p>

        <div className="mt-14 lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <ol className="lg:sticky lg:top-28 lg:space-y-2">
              {steps.map((s, i) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(i)}
                    className={cn(
                      "flex w-full items-start gap-4 rounded-2xl border px-4 py-4 text-left transition md:px-5 md:py-4",
                      active === i
                        ? "border-[var(--accent)]/50 bg-[var(--accent-soft)]/90 shadow-md ring-2 ring-[var(--accent)]/25 dark:bg-[var(--accent-soft)]/15"
                        : "border-transparent bg-transparent hover:border-[var(--neutral-200)] hover:bg-[var(--surface)]",
                    )}
                  >
                    <span className="font-mono-nums mt-0.5 text-xs font-bold tabular-nums text-[var(--accent)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block font-semibold text-[var(--primary)]">{s.title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-[var(--neutral-700)]">{s.body}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-10 space-y-6 lg:col-span-7 lg:mt-0">
            {steps.map((s, i) => (
              <div
                key={s.id}
                id={s.id}
                ref={(el) => {
                  sectionRefs.current[i] = el;
                }}
                data-index={i}
                className="min-h-[52vh] scroll-mt-28 rounded-2xl border border-[var(--neutral-200)] bg-[var(--surface)] p-1 shadow-[var(--card-shadow)] lg:min-h-[60vh]"
              >
                <div
                  className={cn(
                    "relative flex h-full min-h-[48vh] flex-col justify-end overflow-hidden rounded-[1.125rem] bg-gradient-to-br p-8 text-white shadow-inner lg:min-h-[56vh]",
                    s.panel,
                  )}
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage:
                        "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
                      backgroundSize: "28px 28px",
                    }}
                  />
                  <div className="relative">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/95 drop-shadow-sm">
                      {process.stepWord} {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="font-display mt-3 text-2xl font-bold tracking-tight drop-shadow-md md:text-4xl md:leading-[1.08]">
                      {s.title}
                    </p>
                    <p className="mt-4 max-w-lg text-sm font-medium leading-relaxed text-white/95 drop-shadow md:text-base">
                      {s.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
