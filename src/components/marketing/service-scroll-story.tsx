"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  steps: readonly string[];
  title: string;
  lead?: string;
};

/** Горизонтальный scroll-story (snap) — усиление «операционной» подачи без тяжёлого scroll-jacking */
export function ServiceScrollStory({ steps, title, lead }: Props) {
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="service-scroll-story-heading" className="relative scroll-mt-28">
      <div className="mb-5">
        <h2 id="service-scroll-story-heading" className="type-headline">
          {title}
        </h2>
        {lead ? <p className="type-body mt-3 max-w-2xl text-[var(--neutral-700)]">{lead}</p> : null}
      </div>

      <div
        className={cn(
          "-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-4 pt-2 sm:-mx-6 sm:gap-5 lg:-mx-8 lg:gap-6",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        )}
      >
        {steps.map((step, i) => (
          <motion.article
            key={i}
            className={cn(
              "snap-center shrink-0 rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)] p-6 shadow-[var(--card-shadow)] dark:border-white/10",
              "w-[min(calc(100vw-2.5rem),22rem)] sm:w-[23rem]",
            )}
            initial={reduce ? false : { opacity: 0.75, y: 14 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.32, delay: reduce ? 0 : Math.min(i * 0.05, 0.35) }}
          >
            <p className="font-mono-nums text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
              Шаг {String(i + 1).padStart(2, "0")}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--neutral-700)]">{step}</p>
          </motion.article>
        ))}
      </div>

      <p className="mt-3 text-xs text-[var(--neutral-500)] md:hidden">Листайте карточки горизонтально ↔</p>
    </section>
  );
}
