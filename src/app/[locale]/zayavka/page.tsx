import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { LeadMultistepForm } from "@/components/forms/lead-multistep-form";
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
    <main id="main" className="mx-auto max-w-[720px] px-4 py-12 sm:px-6 lg:py-16">
      <p className="type-kicker">{t("kicker")}</p>
      <h1 className="font-display mt-2 text-3xl font-bold tracking-[-0.03em] text-[var(--primary)] md:text-4xl">
        {t("title")}
      </h1>
      <p className="type-lead mt-4">{t("lead")}</p>
      <div className="mt-10">
        <Suspense fallback={<p className="text-sm text-[var(--neutral-500)]">{t("formLoading")}</p>}>
          <LeadMultistepForm />
        </Suspense>
      </div>
    </main>
  );
}
