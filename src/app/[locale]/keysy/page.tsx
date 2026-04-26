import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CASES } from "@/content/cases-stub";
import { PremiumCaseCard } from "@/components/marketing/premium-list-cards";
import { buildPageMetadata } from "@/lib/seo";

type PageProps = { params: { locale: string } };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "caseHub" });
  return buildPageMetadata({
    locale: params.locale,
    pathname: "/keysy",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function Page({ params }: PageProps) {
  const t = await getTranslations({ locale: params.locale, namespace: "caseHub" });
  return (
    <main id="main" className="pb-24">
      <section className="border-b border-[var(--neutral-200)] bg-[var(--surface)] py-10 lg:py-14">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <p className="type-kicker">{t("kicker")}</p>
          <h1 className="font-display mt-3 max-w-3xl text-balance text-3xl font-bold tracking-[-0.035em] text-[var(--primary)] md:text-[2.625rem] md:leading-[1.12]">
            {t("title")}
          </h1>
          <p className="type-lead mt-5 max-w-2xl">{t("lead")}</p>
        </div>
      </section>

      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <ul className="grid gap-8 md:grid-cols-2">
          {CASES.map((c, i) => (
            <li key={c.slug}>
              <PremiumCaseCard c={c} index={i} locale={params.locale} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
