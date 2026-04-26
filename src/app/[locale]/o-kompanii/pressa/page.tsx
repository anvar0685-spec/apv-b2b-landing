import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import { PRESS_ITEMS } from "@/content/press-items";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "pagesSeo" });
  return buildPageMetadata({
    locale: params.locale,
    pathname: "/o-kompanii/pressa",
    title: t("pressa.metaTitle"),
    description: t("pressa.metaDescription"),
  });
}

export default function Page() {
  return (
    <main id="main" className="pb-24">
      <MarketingPageHero
        kicker="Медиа"
        title="Пресса"
        description="Публикуем только проверяемые факты и согласованные цитаты. Для запросов журналистов и спикерских форматов используйте официальный контакт."
      />

      <div className="mx-auto max-w-[880px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <ol className="space-y-6">
          {PRESS_ITEMS.map((item) => (
            <li
              key={item.id}
              className="rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)] p-6 shadow-[var(--card-shadow)] transition hover:border-[var(--accent)]/25 hover:shadow-[var(--card-shadow-hover)] md:p-8"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <time className="font-mono-nums text-xs font-semibold tabular-nums uppercase tracking-wider text-[var(--neutral-500)]">
                  {item.year}
                </time>
                <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
              </div>
              <h2 className="font-display mt-4 text-xl font-semibold tracking-tight text-[var(--primary)]">{item.title}</h2>
              <p className="mt-3 text-base leading-relaxed text-[var(--neutral-700)]">{item.excerpt}</p>
              {item.href ? (
                <a
                  className="mt-4 inline-block text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
                  href={item.href}
                  rel="noopener noreferrer"
                >
                  Источник
                </a>
              ) : null}
            </li>
          ))}
        </ol>

        <div className="mt-8 rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)] p-8 shadow-[var(--card-shadow)]">
          <p className="text-sm leading-relaxed text-[var(--neutral-700)]">
            Для пресс-релизов и комментариев по отраслевым событиям — напишите на корпоративный email или оставьте заявку
            с темой «Пресса».
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/kontakty">Контакты</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/o-kompanii">О компании</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
