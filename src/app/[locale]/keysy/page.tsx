import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { CASES } from "@/content/cases-stub";

export const metadata: Metadata = {
  title: "Кейсы — цифры и результаты",
  description: "Кейсы аутстаффинга и аутсорсинга: до/после, метрики, отзывы клиентов (заглушки).",
};

export default function Page() {
  return (
    <main id="main" className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="max-w-3xl">
        <h1 className="font-display text-3xl font-bold tracking-tight text-[var(--primary)] md:text-5xl">
          Кейсы
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-[var(--neutral-700)]">
          Карточки с цифрами и отраслью — заглушки до NDA и согласованных формулировок с клиентами.
        </p>
      </div>

      <ul className="mt-14 grid gap-8 md:grid-cols-2">
        {CASES.map((c) => (
          <li key={c.slug}>
            <article className="flex h-full flex-col rounded-xl border border-[var(--neutral-200)] bg-white p-8 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">{c.industry}</p>
              <h2 className="mt-3 font-display text-xl font-semibold text-[var(--primary)]">
                <Link className="hover:text-[var(--accent)]" href={`/keysy/${c.slug}`}>
                  {c.title}
                </Link>
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--neutral-700)]">{c.summary}</p>
              <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-[var(--neutral-200)] pt-6 text-sm">
                <div>
                  <dt className="text-[var(--neutral-500)]">Персонал</dt>
                  <dd className="font-semibold text-[var(--primary)]">{c.staff}</dd>
                </div>
                <div>
                  <dt className="text-[var(--neutral-500)]">Месяцев</dt>
                  <dd className="font-semibold text-[var(--primary)]">{c.durationMonths}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-[var(--neutral-500)]">Метрика</dt>
                  <dd className="font-medium text-[var(--neutral-800)]">{c.metricUp}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-[var(--neutral-500)]">Город</dt>
                  <dd>{c.city}</dd>
                </div>
              </dl>
            </article>
          </li>
        ))}
      </ul>
    </main>
  );
}
