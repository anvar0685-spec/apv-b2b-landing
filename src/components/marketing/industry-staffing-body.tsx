import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import type { IndustryPageContent } from "@/content/industry-page-content";

type Props = { content: IndustryPageContent };

export function IndustryStaffingBody({ content }: Props) {
  return (
    <div className="type-body max-w-3xl space-y-14 text-[var(--neutral-700)] dark:text-[var(--neutral-200)]">
      <section>
        <h2 className="type-headline text-xl md:text-2xl">Задачи на складе</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {content.tasks.map((task) => (
            <Card key={task.title} className="border-[var(--neutral-200)] bg-[var(--card)] dark:border-white/10">
              <CardTitle className="text-base">{task.title}</CardTitle>
              <CardDescription className="mt-2 text-sm leading-relaxed">{task.text}</CardDescription>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="type-headline text-xl md:text-2xl">Что уточнить перед подбором</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
          {content.clarifyBefore.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="type-headline text-xl md:text-2xl">Каких работников подбираем</h2>
        <p className="mt-3 text-sm leading-relaxed sm:text-base">{content.professionsLead}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {content.professionSlugs.map((slug) => (
            <li key={slug}>
              <Link
                href={`/personal/${slug}`}
                className="inline-flex rounded-full border border-[var(--neutral-200)] bg-[var(--surface)] px-3 py-1.5 text-sm font-medium text-[var(--accent)] transition hover:border-[var(--accent)]/40 dark:border-white/12"
              >
                {content.professionLabels[slug]}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-[var(--neutral-200)] bg-[var(--surface)] px-5 py-4 dark:border-white/10">
        <h2 className="type-headline text-lg">Стоимость</h2>
        <p className="mt-2 text-sm leading-relaxed sm:text-base">
          Для расчёта нужны профессии, количество работников, адрес склада и график. Дополнительные условия объекта
          обсудим до начала работы.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button asChild size="sm">
            <Link href="/kalkulyator">Рассчитать стоимость</Link>
          </Button>
          <Button asChild variant="secondary" size="sm">
            <Link href="/zayavka">Обсудить задачу склада</Link>
          </Button>
        </div>
      </section>

      {content.relatedLinks.length ? (
        <section className="border-t border-[var(--neutral-200)] pt-10 dark:border-white/10">
          <h2 className="type-kicker">Подходящие работники и услуги</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {content.relatedLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-xl border border-[var(--neutral-200)] bg-[var(--card)] px-4 py-3 text-sm font-medium text-[var(--primary)] transition hover:border-[var(--accent)]/35 hover:text-[var(--accent)] dark:border-white/10"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-relaxed">
            Общий порядок работы по договору — на странице{" "}
            <Link className="font-medium text-[var(--accent)] hover:underline" href="/uslugi/autsorsing">
              аутсорсинга складского персонала
            </Link>
            .
          </p>
        </section>
      ) : null}
    </div>
  );
}
