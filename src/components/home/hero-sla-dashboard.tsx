/**
 * Декоративный «дашборд» SLA / compliance — только SVG, без данных.
 */
export function HeroSlaDashboard() {
  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.45)] backdrop-blur-md"
      aria-hidden
    >
      <div className="absolute inset-0 hero-ambient opacity-90" />
      <div className="relative flex flex-col gap-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
            SLA · смена
          </p>
          <span className="rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/15 px-2.5 py-0.5 text-[10px] font-semibold text-[var(--accent-soft)]">
            live
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-3">
            <p className="text-[10px] text-white/45">Явка</p>
            <p className="mt-1 font-mono-nums text-2xl font-bold tabular-nums text-white">97.2%</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-3">
            <p className="text-[10px] text-white/45">Замены</p>
            <p className="mt-1 font-mono-nums text-2xl font-bold tabular-nums text-[var(--accent-soft)]">12</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-3">
            <p className="text-[10px] text-white/45">Инциденты</p>
            <p className="mt-1 font-mono-nums text-2xl font-bold tabular-nums text-white/90">0</p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="flex items-end justify-between gap-2">
            <p className="text-[11px] font-medium text-white/60">Throughput · 14 дней</p>
            <span className="text-[10px] font-semibold text-[var(--success)]">+18%</span>
          </div>
          <svg viewBox="0 0 280 72" className="mt-3 h-[72px] w-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="heroSparkFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 52 L28 48 L56 55 L84 38 L112 42 L140 28 L168 32 L196 22 L224 26 L252 14 L280 18 L280 72 L0 72 Z"
              fill="url(#heroSparkFill)"
            />
            <path
              d="M0 52 L28 48 L56 55 L84 38 L112 42 L140 28 L168 32 L196 22 L224 26 L252 14 L280 18"
              fill="none"
              stroke="var(--accent-soft)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {["Миграционный учёт", "Документы", "SLA смены"].map((label) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[10px] font-medium text-white/70"
            >
              <span className="h-1 w-1 rounded-full bg-[var(--success)]" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
