import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { FaqPremium } from "@/components/marketing/faq-premium";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import { FAQ_ITEMS } from "@/content/faq-items";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "pagesSeo" });
  return buildPageMetadata({
    locale: params.locale,
    pathname: "/faq",
    title: t("faq.metaTitle"),
    description: t("faq.metaDescription"),
  });
}

export default function Page() {
  return (
    <main id="main" className="pb-24">
      <MarketingPageHero
        kicker="Поддержка"
        title="Частые вопросы"
        description="Сжатые ответы по модели поставки, срокам, замене персонала и прозрачности цены. Детали фиксируются в договоре и КП под ваш объект."
      />

      <div className="mx-auto max-w-[880px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <FaqPremium items={FAQ_ITEMS} />

        <div className="mt-16 rounded-2xl border border-[var(--neutral-200)] bg-gradient-to-br from-[var(--surface)] to-[var(--card)] p-8 shadow-[var(--card-shadow)] md:flex md:items-center md:justify-between md:gap-10">
          <div>
            <h2 className="font-display text-xl font-semibold tracking-tight text-[var(--primary)]">
              Не нашли ответ?
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--neutral-700)]">
              Отправьте заявку — подготовим разбор под ваш профиль персонала, регион и требования по допускам.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 md:mt-0 md:shrink-0">
            <Button asChild>
              <Link href="/zayavka">Заявка</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/kalkulyator">Калькулятор</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
