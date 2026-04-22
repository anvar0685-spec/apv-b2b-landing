import { Link } from "@/i18n/navigation";

const CELLS = [
  {
    id: "deficit",
    span: "md:col-span-2 lg:col-span-2",
    kicker: "Операционный риск",
    title: "Дефицит персонала",
    body: "Пики сезона, текучка линейки и простои смен без предсказуемого пула и онбординга.",
    tone: "light" as const,
  },
  {
    id: "compliance",
    span: "md:col-span-1 lg:col-span-1",
    kicker: "152-ФЗ · миграция",
    title: "Compliance",
    body: "Документальный контур без переноса риска на заказчика.",
    tone: "dark" as const,
  },
  {
    id: "speed",
    span: "md:col-span-1 lg:col-span-1",
    kicker: "SLA",
    title: "Скорость",
    body: "Выход на смену и отчётность для COO/HRD в одном контуре.",
    tone: "dark" as const,
  },
  {
    id: "outcome",
    span: "md:col-span-2 lg:col-span-4",
    kicker: "Итог",
    title: "Подрядчик как операционная система",
    body: "Сменность, замены, контроль явки и прозрачные KPI — с первого пилота.",
    tone: "accent" as const,
  },
];

export function PainSolutionBento() {
  return (
    <section
      id="pain"
      className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--neutral-500)]">
          Диагностика → решение
        </p>
        <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-[var(--primary)] md:text-5xl">
          Проблема → решение
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-[var(--neutral-700)]">
          Bento-сетка подчёркивает приоритеты: дефицит кадров и compliance — отдельные «тяжёлые» блоки,
          скорость и итог — визуально связаны с KPI.
        </p>
      </div>

      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 lg:gap-5">
        {CELLS.map((c) => {
          const base =
            "group relative flex min-h-[180px] flex-col justify-between overflow-hidden rounded-3xl border p-6 transition duration-500 md:min-h-[200px]";
          const styles =
            c.tone === "light"
              ? "border-[var(--neutral-200)] bg-white shadow-[0_20px_60px_-28px_rgba(7,21,37,0.18)] hover:-translate-y-0.5 hover:shadow-[0_28px_70px_-24px_rgba(7,21,37,0.22)] motion-reduce:transform-none motion-reduce:transition-none"
              : c.tone === "dark"
                ? "grain-dark border-white/10 bg-[var(--primary)] text-white hover:border-[var(--accent)]/35"
                : "border-[var(--accent)]/25 bg-gradient-to-br from-[var(--accent)]/12 via-white to-[var(--surface)] text-[var(--primary)] hover:border-[var(--accent)]/40";

          return (
            <article key={c.id} className={`${c.span} ${base} ${styles}`}>
              <div>
                <p
                  className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${
                    c.tone === "dark" ? "text-white/50" : "text-[var(--neutral-500)]"
                  }`}
                >
                  {c.kicker}
                </p>
                <h3
                  className={`font-display mt-3 text-xl font-semibold tracking-tight md:text-2xl ${
                    c.tone === "dark" ? "text-white" : ""
                  }`}
                >
                  {c.title}
                </h3>
                <p
                  className={`mt-3 text-sm leading-relaxed md:text-base ${
                    c.tone === "dark" ? "text-white/75" : "text-[var(--neutral-700)]"
                  }`}
                >
                  {c.body}
                </p>
              </div>
              <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-[var(--accent)]/35 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
            </article>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/uslugi"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
        >
          Все услуги
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
