import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { CalculatorFull } from "@/components/kalkulyator/calculator-full";
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
    <main id="main" className="pb-24">
      <Suspense
        fallback={<p className="p-8 text-center text-sm text-[var(--neutral-500)]">{t("kalkulyator.loading")}</p>}
      >
        <CalculatorFull />
      </Suspense>
    </main>
  );
}
