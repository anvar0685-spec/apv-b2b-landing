import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { CalculatorFull } from "@/components/kalkulyator/calculator-full";
import { ShiftPricingTable } from "@/components/marketing/shift-pricing-table";
import { ConversionPageShell } from "@/components/layout/conversion-page-shell";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "pagesSeo" });
  return buildPageMetadata({
    locale: params.locale,
    pathname: "/kalkulyator",
    title: t("kalkulyator.metaTitle"),
    description: t("kalkulyator.metaDescription"),
  });
}

export default async function Page({ params }: Props) {
  const t = await getTranslations({ locale: params.locale, namespace: "pagesSeo" });
  return (
    <ConversionPageShell
      variant="calc"
      header={
        <>
          <p className="type-kicker text-[var(--accent)] dark:text-[var(--accent-soft)]">{t("kalkulyator.heroKicker")}</p>
          <h1 className="font-display mt-3 text-balance text-3xl font-bold tracking-[-0.035em] text-[var(--primary)] dark:text-white md:text-[2.25rem] md:leading-[1.15]">
            {t("kalkulyator.heroTitle")}
          </h1>
          <p className="type-lead mt-5 max-w-2xl">{t("kalkulyator.heroLead")}</p>
        </>
      }
      footerNote={t("kalkulyator.footerNote")}
    >
      <Suspense
        fallback={<p className="text-center text-sm text-[var(--neutral-500)]">{t("kalkulyator.loading")}</p>}
      >
        <CalculatorFull />
      </Suspense>
      <div className="mt-16 border-t border-[var(--neutral-200)] pt-14 dark:border-white/10">
        <ShiftPricingTable />
      </div>
    </ConversionPageShell>
  );
}
