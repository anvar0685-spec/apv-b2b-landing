/**
 * Full-bleed «операции на объекте» — без стока: градиент + сетка + зерно.
 */
export function FullBleedOperations() {
  return (
    <section
      className="relative overflow-hidden border-y border-[var(--neutral-200)]"
      aria-labelledby="operations-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-dark)] via-[var(--primary)] to-[var(--primary-dark)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(var(--neutral-200) 1px, transparent 1px), linear-gradient(90deg, var(--neutral-200) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="grain-dark relative">
        <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-soft)]">
                Полевой контур
              </p>
              <h2
                id="operations-heading"
                className="font-display mt-4 text-3xl font-bold tracking-tight text-white md:text-5xl"
              >
                Операции, которые видят на складе и в отчёте
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
                Смены, замены, миграционный учёт и явка — в одной плоскости данных. Блок без фото:
                после съёмки заменим на реальные кадры объекта и команду бригадира.
              </p>
            </div>
            <ul className="space-y-4 text-sm text-white/85 md:text-base">
              {[
                "Единый SLA по выходу на смену и эскалации замен",
                "Прозрачный след документов для аудита и проверок",
                "Отчётность для COO: явка, инциденты, cost per shift",
              ].map((line) => (
                <li
                  key={line}
                  className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 backdrop-blur-sm"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
