"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    id: "proc-0",
    title: "Заявка и SLA",
    body: "Фиксируем объём, график, KPI явки и эскалации. Черновой контур договора и приложения по SLA.",
    panel: "from-[var(--accent)]/25 via-[var(--primary)]/40 to-[var(--primary-dark)]",
  },
  {
    id: "proc-1",
    title: "Подбор",
    body: "Воронка квалификации, проверка профиля и выход на пилотную смену без «пустых» кандидатов.",
    panel: "from-violet-500/20 via-[var(--primary)]/35 to-[var(--primary-dark)]",
  },
  {
    id: "proc-2",
    title: "Compliance-check",
    body: "Миграционный контур, документы, сроки уведомлений — до выхода на объект.",
    panel: "from-emerald-500/20 via-[var(--primary)]/35 to-[var(--primary-dark)]",
  },
  {
    id: "proc-3",
    title: "Онбординг",
    body: "Инструктаж, доступы, ментор на первых сменах, контрольные точки с бригадиром.",
    panel: "from-amber-500/20 via-[var(--primary)]/35 to-[var(--primary-dark)]",
  },
  {
    id: "proc-4",
    title: "Операция",
    body: "Смены под отчётность: явка, замены, инциденты и отчёты для COO в одном контуре.",
    panel: "from-sky-500/20 via-[var(--primary)]/35 to-[var(--primary-dark)]",
  },
] as const;

export function ProcessStickySplit() {
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
    <section id="process" className="border-y border-[var(--neutral-200)] bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--primary)] md:text-5xl">
          Процесс работы
        </h2>
        <p className="mt-4 max-w-2xl text-[var(--neutral-700)]">
          Слева — этапы, справа — визуальный якорь при скролле. Клик по этапу прокручивает к блоку.
        </p>

        <div className="mt-14 lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <ol className="lg:sticky lg:top-28 lg:space-y-2">
              {STEPS.map((s, i) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(i)}
                    className={cn(
                      "flex w-full items-start gap-4 rounded-2xl border px-4 py-4 text-left transition md:px-5 md:py-4",
                      active === i
                        ? "border-[var(--accent)]/40 bg-[var(--surface)] shadow-md ring-1 ring-[var(--accent)]/15"
                        : "border-transparent bg-transparent hover:border-[var(--neutral-200)] hover:bg-[var(--surface)]/80",
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
            {STEPS.map((s, i) => (
              <div
                key={s.id}
                id={s.id}
                ref={(el) => {
                  sectionRefs.current[i] = el;
                }}
                data-index={i}
                className="min-h-[52vh] scroll-mt-28 rounded-3xl border border-[var(--neutral-200)] bg-[var(--surface)] p-1 shadow-sm lg:min-h-[60vh]"
              >
                <div
                  className={cn(
                    "relative flex h-full min-h-[48vh] flex-col justify-end overflow-hidden rounded-[1.35rem] bg-gradient-to-br p-8 text-white lg:min-h-[56vh]",
                    s.panel,
                  )}
                >
                  <div className="pointer-events-none absolute inset-0 bg-[var(--primary-dark)]/55" />
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.12]"
                    style={{
                      backgroundImage:
                        "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
                      backgroundSize: "32px 32px",
                    }}
                  />
                  <div className="relative">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
                      Этап {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="font-display mt-2 text-2xl font-bold tracking-tight md:text-3xl">{s.title}</p>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-white/85 md:text-base">{s.body}</p>
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
