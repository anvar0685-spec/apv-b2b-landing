import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import { TEAM_MEMBERS } from "@/content/team-members";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "pagesSeo" });
  return buildPageMetadata({
    locale: params.locale,
    pathname: "/o-kompanii/komanda",
    title: t("komanda.metaTitle"),
    description: t("komanda.metaDescription"),
  });
}

export default function Page() {
  return (
    <main id="main" className="pb-24">
      <MarketingPageHero
        kicker="Люди"
        title="Команда"
        description="Структура отражает полный цикл поставки персонала: от коммерции до закрытия смен на объекте. Фамилии и фото добавляются после согласования с GDPR/152-ФЗ и корпоративной политикой."
      />

      <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM_MEMBERS.map((m, i) => (
            <article
              key={m.id}
              className="group relative overflow-hidden rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)] p-6 shadow-[var(--card-shadow)] transition-[box-shadow,transform,border-color] duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/25 hover:shadow-[var(--card-shadow-hover)] motion-reduce:transform-none"
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent)]/90 to-[var(--primary)] text-lg font-bold text-white shadow-inner"
                style={{ transform: `rotate(${(i % 3) * 2 - 2}deg)` }}
              >
                {m.initials}
              </div>
              <h2 className="font-display mt-5 text-xl font-semibold tracking-tight text-[var(--primary)]">{m.name}</h2>
              <p className="mt-1 text-sm font-medium text-[var(--accent)]">{m.role}</p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--neutral-700)]">{m.focus}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap justify-between gap-6 rounded-2xl border border-[var(--neutral-200)] bg-[var(--surface)] px-6 py-8 md:items-center md:px-10">
          <p className="max-w-xl text-sm leading-relaxed text-[var(--neutral-700)]">
            Нужна организационная схема или контакты ответственных по направлению — запросите в коммерческой службе, мы
            направим актуальную версию под ваш NDA.
          </p>
          <Button asChild>
            <Link href="/kontakty">Запросить контакты</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
