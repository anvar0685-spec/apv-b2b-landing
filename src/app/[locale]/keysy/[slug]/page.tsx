import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { CASES, getCase } from "@/content/cases-stub";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCase(params.slug);
  if (!c) return { title: "Кейс" };
  return {
    title: `${c.title} — кейс`,
    description: c.summary,
  };
}

export default function CasePage({ params }: Props) {
  const c = getCase(params.slug);
  if (!c) notFound();

  return (
    <main id="main" className="mx-auto max-w-[880px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <p className="text-sm text-[var(--neutral-500)]">
        <Link className="text-[var(--accent)] hover:underline" href="/keysy">
          ← Все кейсы
        </Link>
      </p>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">{c.industry}</p>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-[var(--primary)] md:text-5xl">
        {c.title}
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-[var(--neutral-700)]">{c.summary}</p>

      <section className="mt-12 rounded-xl border border-[var(--neutral-200)] bg-[var(--neutral-50)] p-8">
        <h2 className="font-display text-xl font-semibold text-[var(--primary)]">Ключевые параметры</h2>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-[var(--neutral-500)]">Штат / проект</dt>
            <dd className="text-lg font-semibold text-[var(--primary)]">{c.staff} чел.</dd>
          </div>
          <div>
            <dt className="text-sm text-[var(--neutral-500)]">Длительность</dt>
            <dd className="text-lg font-semibold text-[var(--primary)]">{c.durationMonths} мес.</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm text-[var(--neutral-500)]">Результат</dt>
            <dd className="text-lg font-medium text-[var(--neutral-800)]">{c.metricUp}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm text-[var(--neutral-500)]">Локация</dt>
            <dd>{c.city}</dd>
          </div>
        </dl>
      </section>

      <section className="mt-12 space-y-4 text-base leading-relaxed text-[var(--neutral-700)]">
        <h2 className="font-display text-xl font-semibold text-[var(--primary)]">Контекст и задача</h2>
        <p>
          Здесь появится описание ситуации «до», ограничения по срокам, требования к compliance и операционные KPI.
          Сейчас — только каркас страницы для SEO и внутренних ссылок с главной.
        </p>
        <h2 className="pt-4 font-display text-xl font-semibold text-[var(--primary)]">Решение</h2>
        <p>
          Блок про модель аутстаффинга/аутсорсинга, миграционный учёт, сменность и управление подрядом — после сбора
          фактов от команды.
        </p>
        <h2 className="pt-4 font-display text-xl font-semibold text-[var(--primary)]">Цитата клиента</h2>
        <blockquote className="border-l-4 border-[var(--accent)] pl-4 italic text-[var(--neutral-600)]">
          «Цитата появится после согласования PR-текста.»
        </blockquote>
      </section>

      <div className="mt-14 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/zayavka">Обсудить похожий проект</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/kalkulyator">Калькулятор</Link>
        </Button>
      </div>
    </main>
  );
}
