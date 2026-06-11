import { Activity, ClipboardList, FileBarChart, ShieldCheck, type LucideIcon } from "lucide-react";

export type SchematicStep = { n: string; title: string; hint: string };

type Props = { title: string; caption: string; steps: readonly SchematicStep[] };

const STEP_ICONS: LucideIcon[] = [ClipboardList, ShieldCheck, Activity, FileBarChart];

/** Операционный цикл смены: таймлайн с иконками — без имитации реальных KPI. */
export function ShiftCycleSchematic({ title, caption, steps }: Props) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--accent)_22%,var(--neutral-200))] bg-[color-mix(in_srgb,var(--accent)_5%,var(--card))] p-6 shadow-[var(--card-shadow)] sm:p-8 dark:border-white/12 dark:bg-[color-mix(in_srgb,var(--accent)_12%,var(--primary-dark))]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14] dark:opacity-[0.12]"
        aria-hidden
        style={{
          backgroundImage: `
            linear-gradient(-18deg, transparent 49%, color-mix(in srgb, var(--accent) 22%, transparent) 50%, transparent 51%),
            linear-gradient(12deg, transparent 49%, color-mix(in srgb, var(--accent) 15%, transparent) 50%, transparent 51%)`,
          backgroundSize: "32px 32px",
        }}
      />
      <div className="relative">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">{title}</p>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--neutral-700)] dark:text-[var(--neutral-200)]">{caption}</p>

        {/* Desktop / tablet: горизонтальный ряд с линией */}
        <div className="mt-10 hidden md:block">
          <div className="relative grid grid-cols-4 gap-4 lg:gap-6">
            <div
              className="shift-cycle-line-track pointer-events-none absolute left-[10%] right-[10%] top-[30px] z-0 h-[2px]"
              aria-hidden
            />
            {steps.map((s, i) => {
              const Icon = STEP_ICONS[i] ?? ClipboardList;
              return (
                <div key={s.n} className="relative z-[1] flex flex-col items-center text-center">
                  <div className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl border border-[color-mix(in_srgb,var(--accent)_40%,var(--neutral-200))] bg-[var(--card)] shadow-[0_14px_36px_-18px_rgba(0,0,0,0.35),0_0_0_1px_color-mix(in_srgb,var(--accent)_25%,transparent)] transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transform-none dark:border-white/15 dark:bg-[color-mix(in_srgb,var(--primary-dark)_85%,var(--accent))]">
                    <Icon className="h-[26px] w-[26px] text-[var(--accent)]" strokeWidth={1.65} aria-hidden />
                  </div>
                  <span className="mt-4 font-mono-nums text-[11px] font-bold tabular-nums tracking-[0.14em] text-[var(--accent)]">{s.n}</span>
                  <p className="mt-2 min-h-[2.5rem] text-sm font-semibold leading-snug text-[var(--primary)] dark:text-white">{s.title}</p>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--neutral-600)] dark:text-[var(--neutral-300)]">{s.hint}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: вертикальный таймлайн */}
        <ol className="relative mt-10 space-y-0 md:hidden">
          {steps.map((s, i) => {
            const Icon = STEP_ICONS[i] ?? ClipboardList;
            const isLast = i === steps.length - 1;
            return (
              <li key={s.n} className="relative flex gap-4 pb-10 last:pb-0">
                {!isLast ? (
                  <div
                    className="shift-cycle-line-vertical absolute left-[23px] top-[52px] h-[calc(100%-12px)] w-[2px]"
                    aria-hidden
                  />
                ) : null}
                <div className="relative z-[1] flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl border border-[color-mix(in_srgb,var(--accent)_35%,var(--neutral-200))] bg-[var(--card)] shadow-[0_10px_28px_-14px_rgba(0,0,0,0.35)] dark:border-white/12 dark:bg-[var(--primary-dark)]">
                  <Icon className="h-[22px] w-[22px] text-[var(--accent)]" strokeWidth={1.65} aria-hidden />
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <span className="font-mono-nums text-[11px] font-bold tabular-nums tracking-[0.14em] text-[var(--accent)]">{s.n}</span>
                  <p className="mt-1 text-sm font-semibold leading-snug text-[var(--primary)] dark:text-white">{s.title}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-[var(--neutral-600)] dark:text-[var(--neutral-300)]">{s.hint}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-8 flex items-center justify-center gap-3 md:mt-10" aria-hidden>
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-[var(--accent)]/50" />
          <span className="inline-flex h-2 w-2 rounded-full bg-[var(--accent)] opacity-80 shadow-[0_0_12px_color-mix(in_srgb,var(--accent)_80%,transparent)]" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--neutral-500)] dark:text-[var(--neutral-400)]">
            Гарантии · одна зона ответственности
          </span>
          <span className="inline-flex h-2 w-2 rounded-full bg-[var(--accent)] opacity-80 shadow-[0_0_12px_color-mix(in_srgb,var(--accent)_80%,transparent)]" />
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-[var(--accent)]/50" />
        </div>
      </div>
    </div>
  );
}
