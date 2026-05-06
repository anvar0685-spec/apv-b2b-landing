type Props = { title: string; caption: string };

/** Условная схема операционного цикла — инженерная графика без имитации реальных KPI. */
export function ShiftCycleSchematic({ title, caption }: Props) {
  const steps = [
    { id: "01", label: "Заявка и профиль смены" },
    { id: "02", label: "Вывод и инструктаж" },
    { id: "03", label: "Смена и контроль явки" },
    { id: "04", label: "Отчёт и замены" },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--accent)_22%,var(--neutral-200))] bg-[color-mix(in_srgb,var(--accent)_5%,var(--card))] p-6 shadow-[var(--card-shadow)] dark:border-white/12 dark:bg-[color-mix(in_srgb,var(--accent)_12%,var(--primary-dark))]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14] dark:opacity-[0.12]"
        aria-hidden
        style={{
          backgroundImage: `
            linear-gradient(-18deg, transparent 49%, color-mix(in srgb, var(--accent) 25%, transparent) 50%, transparent 51%),
            linear-gradient(12deg, transparent 49%, color-mix(in srgb, var(--accent) 18%, transparent) 50%, transparent 51%)`,
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">{title}</p>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-[var(--neutral-700)] dark:text-[var(--neutral-200)]">{caption}</p>
        <ol className="mt-8 grid gap-3 sm:grid-cols-2">
          {steps.map((s) => (
            <li
              key={s.id}
              className="flex gap-3 rounded-xl border border-[var(--neutral-200)] bg-[var(--card)]/90 px-4 py-3 dark:border-white/10 dark:bg-[var(--primary-dark)]/40"
            >
              <span className="font-mono-nums text-xs font-bold tabular-nums text-[var(--accent)]">{s.id}</span>
              <span className="text-sm font-medium leading-snug text-[var(--primary)] dark:text-white">{s.label}</span>
            </li>
          ))}
        </ol>
        <svg className="mt-6 h-12 w-full text-[color-mix(in_srgb,var(--accent)_55%,var(--neutral-500))]" viewBox="0 0 400 48" fill="none" aria-hidden>
          <path
            d="M8 28h72l16-12 16 24 16-24 16 24 16-18 16 18 16-24 16 24 16-18 72 18"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="4 6"
            opacity="0.85"
          />
          <circle cx="8" cy="28" r="3" className="fill-[var(--accent)]" />
          <circle cx="392" cy="28" r="3" className="fill-[var(--accent)]" />
        </svg>
      </div>
    </div>
  );
}
