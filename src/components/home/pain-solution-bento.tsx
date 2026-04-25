import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

const LAYOUT = [
  { id: "deficit" as const, span: "md:col-span-2 lg:col-span-2", tone: "light" as const },
  { id: "compliance" as const, span: "md:col-span-1 lg:col-span-1", tone: "dark" as const },
  { id: "speed" as const, span: "md:col-span-1 lg:col-span-1", tone: "dark" as const },
  { id: "outcome" as const, span: "md:col-span-2 lg:col-span-4", tone: "accent" as const },
];

export async function PainSolutionBento() {
  const t = await getTranslations("homePage.pain");

  return (
    <section id="pain" className="mx-auto max-w-[1280px] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--neutral-500)]">{t("kicker")}</p>
        <h2 className="font-display mt-3 text-3xl font-bold tracking-[-0.035em] text-[var(--primary)] md:text-[2.625rem] md:leading-[1.12]">
          {t("title")}
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-[var(--neutral-700)]">{t("lead")}</p>
      </div>

      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 lg:gap-5">
        {LAYOUT.map((c) => {
          const cell = {
            kicker: t(`cells.${c.id}.kicker`),
            title: t(`cells.${c.id}.title`),
            body: t(`cells.${c.id}.body`),
          };
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
                  {cell.kicker}
                </p>
                <h3
                  className={`font-display mt-3 text-xl font-semibold tracking-tight md:text-2xl ${
                    c.tone === "dark" ? "text-white" : ""
                  }`}
                >
                  {cell.title}
                </h3>
                <p
                  className={`mt-3 text-sm leading-relaxed md:text-base ${
                    c.tone === "dark" ? "text-white/75" : "text-[var(--neutral-700)]"
                  }`}
                >
                  {cell.body}
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
          {t("linkAllServices")}
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
