import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import { COMPANY_DOCUMENTS } from "@/content/company-documents";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "pagesSeo" });
  return buildPageMetadata({
    locale: params.locale,
    pathname: "/o-kompanii/dokumenty",
    title: t("dokumenty.metaTitle"),
    description: t("dokumenty.metaDescription"),
  });
}

export default function Page() {
  return (
    <main id="main" className="pb-24">
      <MarketingPageHero
        kicker="Компания"
        title="Документы и реквизиты"
        description="Здесь можно посмотреть реквизиты исполнителя и уточнить документы для начала работы. Перечень документов согласуем с учётом требований вашего объекта."
      />

      <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {COMPANY_DOCUMENTS.map((doc) => (
            <li key={doc.id}>
              <Card className="h-full border-[var(--neutral-200)]/90 transition hover:border-[var(--accent)]/25">
                <CardTitle>{doc.title}</CardTitle>
                <CardDescription className="mt-2">{doc.description}</CardDescription>
                <div className="mt-5">
                  <Button asChild variant="secondary" size="sm">
                    <Link href={doc.href}>Открыть</Link>
                  </Button>
                </div>
              </Card>
            </li>
          ))}
        </ul>

        <div className="mt-16 rounded-2xl border border-[var(--neutral-200)] bg-[var(--surface)] p-8 md:p-10">
          <h2 className="font-display text-xl font-semibold tracking-tight text-[var(--primary)]">
            Нужен другой пакет документов?
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--neutral-700)]">
            Опишите требования вашего объекта или закупки — согласуем перечень и формат передачи с менеджером.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/zayavka">Обсудить задачу</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/kontakty">Контакты</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
