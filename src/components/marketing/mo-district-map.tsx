/** Статическая схема Московской области (SVG) — неделя 4, без геопривязки к API. */

export function MoDistrictMap() {
  const caption =
    "Схематичная карта Московской области (приблизительная геометрия, не для навигации).";

  return (
    <figure className="rounded-2xl border border-[var(--neutral-200)] bg-[var(--surface)] p-4 dark:border-white/10 dark:bg-[var(--card)]">
      <svg
        viewBox="0 0 360 220"
        className="h-auto w-full max-w-xl text-[var(--accent)]"
        aria-label={caption}
        role="img"
      >
        <title>{caption}</title>
        <rect x="8" y="8" width="344" height="204" rx="16" className="fill-[color-mix(in_srgb,var(--accent)_6%,transparent)] stroke-[var(--neutral-200)] dark:stroke-white/15" strokeWidth="1" />
        <text x="24" y="36" className="fill-[var(--primary)] text-[11px] font-semibold dark:fill-white">
          Москва (врезка)
        </text>
        <rect x="120" y="52" width="56" height="40" rx="8" className="fill-[var(--primary)]/15 stroke-[var(--accent)]" strokeWidth="1.5" />
        <text x="180" y="150" textAnchor="middle" className="fill-[var(--neutral-500)] text-[10px] dark:fill-white/60">
          Кольцо городов МО
        </text>
        <circle cx="180" cy="118" r="62" className="fill-none stroke-[var(--accent)]" strokeWidth="1.2" strokeDasharray="4 6" />
        <g>
          <circle cx="260" cy="96" r="6" className="fill-[var(--accent)]" />
          <text x="268" y="99" className="fill-[var(--neutral-600)] text-[9px] dark:fill-white/70">
            Химки
          </text>
        </g>
        <g>
          <circle cx="92" cy="140" r="5" className="fill-[var(--accent)]" />
          <text x="100" y="143" className="fill-[var(--neutral-600)] text-[9px] dark:fill-white/70">
            Зеленоград
          </text>
        </g>
        <g>
          <circle cx="220" cy="168" r="5" className="fill-[var(--accent)]" />
          <text x="228" y="171" className="fill-[var(--neutral-600)] text-[9px] dark:fill-white/70">
            Подольск
          </text>
        </g>
      </svg>
      <figcaption className="mt-2 text-xs text-[var(--neutral-500)]">{caption}</figcaption>
    </figure>
  );
}
