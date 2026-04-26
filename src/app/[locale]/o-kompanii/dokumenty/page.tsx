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
        kicker="Раскрытие"
        title="Документы"
        description="Юридические и корпоративные материалы передаются контролируемым способом: с отметкой о цели использования и сроке хранения. Публичная часть сайта дублирует ключевые реквизиты."
      />

      <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {COMPANY_DOCUMENTS.map((doc, index) => (
            <Card key={doc.id} className="relative overflow-hidden border-[var(--neutral-200)]/90">
              <span className="font-mono-nums absolute right-5 top-5 text-4xl font-bold tabular-nums text-[var(--neutral-200)] dark:text-[var(--neutral-700)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <CardTitle className="relative pr-16">{doc.title}</CardTitle>
              <CardDescription className="relative">{doc.description}</CardDescription>
            </Card>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-[var(--neutral-200)] bg-gradient-to-br from-[var(--surface)] to-[var(--card)] p-8 md:flex md:items-center md:justify-between md:gap-10 md:p-10">
          <div>
            <h2 className="font-display text-xl font-semibold tracking-tight text-[var(--primary)]">Запросить пакет</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--neutral-700)]">
              Укажите состав документов и формат (PDF с ЭП, скан, EDI). Для тендеров приложим сопроводительное письмо с
              перечнем приложений.
            </p>
          </div>
          <div className="mt-6 flex shrink-0 flex-wrap gap-3 md:mt-0">
            <Button asChild>
              <Link href="/zayavka">Заявка на документы</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/politika-konfidencialnosti">Политика ПДн</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
