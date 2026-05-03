type VsCol = { label: string; body: string };

type Props = {
  title: string;
  cols: readonly VsCol[];
};

/** Короткий блок «мы / штат / агентство» для длинных редакционных страниц */
export function CommercialVsStrip({ title, cols }: Props) {
  return (
    <div className="mt-10 rounded-2xl border border-[var(--neutral-200)] bg-[var(--surface)] p-5 dark:border-white/10 dark:bg-[var(--card)]">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--neutral-500)] dark:text-white/55">{title}</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cols.map((c) => (
          <div
            key={c.label}
            className="rounded-xl border border-[var(--neutral-200)]/80 bg-[var(--card)] px-4 py-3 dark:border-white/10 dark:bg-[var(--primary-dark)]/25"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">{c.label}</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--neutral-700)] dark:text-white/75">{c.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
