/** Короткий блок «мы / штат / агентство» для длинных редакционных страниц */
export function CommercialVsStrip() {
  const cols = [
    {
      k: "С нами",
      v: "Единый SLA по сменам, предсказуемые замены и отчётность без размывания ответственности.",
    },
    {
      k: "Штат",
      v: "Полный контроль найма, но пиковые окна и резерв часто дороже по совокупности и времени вывода.",
    },
    {
      k: "Класс. агентство",
      v: "Гибкость найма, но размытый операционный контур и разные интерпретации KPI между объектами.",
    },
  ] as const;

  return (
    <div className="mt-10 rounded-2xl border border-[var(--neutral-200)] bg-[var(--surface)] p-5 dark:border-white/10 dark:bg-[var(--card)]">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--neutral-500)]">Быстрое сравнение подходов</p>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {cols.map((c) => (
          <div key={c.k} className="rounded-xl border border-[var(--neutral-200)]/80 bg-[var(--card)] px-4 py-3 dark:border-white/10 dark:bg-[var(--primary-dark)]/25">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">{c.k}</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--neutral-700)] dark:text-white/75">{c.v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
