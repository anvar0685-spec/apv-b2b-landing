import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { LeadMultistepForm } from "@/components/forms/lead-multistep-form";
import { ConversionPageShell } from "@/components/layout/conversion-page-shell";
import { buildPageMetadata } from "@/lib/seo";

type PageProps = { params: { locale: string } };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "leadPage" });
  return buildPageMetadata({
    locale: params.locale,
    pathname: "/zayavka",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function Page({ params }: PageProps) {
  const t = await getTranslations({ locale: params.locale, namespace: "leadPage" });
  return (
    <ConversionPageShell
      variant="lead"
      header={
        <>
          <p className="type-kicker text-[var(--accent)] dark:text-[var(--accent-soft)]">{t("kicker")}</p>
          <h1 className="font-display mt-3 text-balance text-3xl font-bold tracking-[-0.03em] text-[var(--primary)] dark:text-white md:text-4xl">
            {t("title")}
          </h1>
          <p className="type-lead mt-5 max-w-2xl">{t("lead")}</p>
        </>
      }
      footerNote={t("footerNote")}
    >
      <Suspense fallback={<p className="text-sm text-[var(--neutral-500)]">{t("formLoading")}</p>}>
        <LeadMultistepForm />
      </Suspense>
    </ConversionPageShell>
  );
}
