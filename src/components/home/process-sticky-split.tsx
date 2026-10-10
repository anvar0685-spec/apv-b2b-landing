"use client";

import { useTranslations } from "next-intl";
import { WarehouseSchematic, type WarehouseSchematicVariant } from "@/components/graphics/warehouse-schematic";

const STEP_GRAPHICS: WarehouseSchematicVariant[] = [
  "process-task",
  "process-terms",
  "process-launch",
  "process-shifts",
];

type ProcessCopy = {
  title: string;
  lead: string;
  steps: { title: string; body: string }[];
};

/** Компактная горизонтальная последовательность этапов (#process). */
export function ProcessStickySplit() {
  const t = useTranslations("homePage");
  const process = t.raw("process") as ProcessCopy;
  const steps = process.steps;

  return (
    <section id="process" className="border-y border-[var(--neutral-200)] bg-[var(--background)] py-16 lg:py-20">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold tracking-[-0.035em] text-[var(--primary)] md:text-[2.625rem] md:leading-[1.12]">
          {process.title}
        </h2>
        <p className="mt-4 max-w-2xl text-[var(--neutral-700)]">{process.lead}</p>

        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="flex min-w-0 flex-col rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)] p-5 shadow-[var(--card-shadow)]"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
                {i + 1}. {s.title}
              </p>
              <div className="mt-3 text-[var(--accent)]/80">
                <WarehouseSchematic variant={STEP_GRAPHICS[i] ?? "process-task"} className="max-h-[88px]" />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[var(--neutral-700)]">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
