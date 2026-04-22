type Props = { chartId: string; variant?: "up" | "flat" };

/** Мини-sparkline для карточки кейса (декоративно). chartId — уникальный суффикд для defs. */
export function CaseSparkline({ chartId, variant = "up" }: Props) {
  const stroke = "var(--accent)";
  const fillId = `${chartId}-${variant === "up" ? "up" : "flat"}`;

  if (variant === "flat") {
    return (
      <svg viewBox="0 0 200 48" className="mt-4 h-12 w-full" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={stroke} stopOpacity="0.2" />
            <stop offset="100%" stopColor={stroke} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 30 L25 28 L50 31 L75 29 L100 30 L125 28 L150 29 L175 27 L200 30 L200 48 L0 48 Z"
          fill={`url(#${fillId})`}
        />
        <path
          d="M0 30 L25 28 L50 31 L75 29 L100 30 L125 28 L150 29 L175 27 L200 30"
          fill="none"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 200 48" className="mt-4 h-12 w-full" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.35" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 38 L25 34 L50 36 L75 22 L100 26 L125 14 L150 18 L175 10 L200 12 L200 48 L0 48 Z"
        fill={`url(#${fillId})`}
      />
      <path
        d="M0 38 L25 34 L50 36 L75 22 L100 26 L125 14 L150 18 L175 10 L200 12"
        fill="none"
        stroke={stroke}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
