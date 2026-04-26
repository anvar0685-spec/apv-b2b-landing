/** Статическая схема Московской области (SVG) — неделя 4, без геопривязки к API. */

type Props = { locale: string };

export function MoDistrictMap({ locale }: Props) {
  const en = locale === "en";
  const caption = en
    ? "Schematic map of the Moscow Oblast (approximate geometry, not for navigation)."
    : "Схематичная карта Московской области (приблизительная геометрия, не для навигации).";

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
          {en ? "Moscow (inset)" : "Москва (врезка)"}
        </text>
        <rect x="120" y="52" width="56" height="40" rx="8" className="fill-[var(--primary)]/15 stroke-[var(--accent)]" strokeWidth="1.5" />
        <text x="180" y="150" textAnchor="middle" className="fill-[var(--neutral-500)] text-[10px] dark:fill-white/60">
          {en ? "Moscow Oblast ring" : "Кольцо городов МО"}
        </text>
        <circle cx="180" cy="118" r="62" className="fill-none stroke-[var(--accent)]" strokeWidth="1.2" strokeDasharray="4 6" />
        <circle cx="260" cy="96" r="6" className="fill-[var(--accent)]" />
        <circle cx="92" cy="140" r="5" className="fill-[var(--accent)]" />
        <circle cx="220" cy="168" r="5" className="fill-[var(--accent)]" />
      </svg>
      <figcaption className="mt-2 text-xs text-[var(--neutral-500)]">{caption}</figcaption>
    </figure>
  );
}
