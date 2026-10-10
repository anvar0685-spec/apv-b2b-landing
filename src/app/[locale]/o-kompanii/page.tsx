import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import { MANAGER_OFFICE_HOURS_LABEL } from "@/config/manager-contact";
import { site } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo";

type PageProps = { params: { locale: string } };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "aboutPage" });
  return buildPageMetadata({
    locale: params.locale,
    pathname: "/o-kompanii",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

const BLOCKS = ["before", "during", "manager"] as const;

export default async function Page({ params }: PageProps) {
  const t = await getTranslations({ locale: params.locale, namespace: "aboutPage" });
  const tn = await getTranslations({ locale: params.locale, namespace: "nav" });

  return (
    <main id="main" className="pb-24">
      <MarketingPageHero kicker={t("heroKicker")} title={site.brandName} description={t("intro")} surface="about" />

      <div className="mx-auto max-w-[760px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="type-editorial space-y-10 text-base leading-relaxed text-[var(--neutral-700)]">
          {BLOCKS.map((key) => (
            <section key={key}>
              <h2 className="font-display text-xl font-semibold text-[var(--primary)]">{t(`${key}Title`)}</h2>
              <p className="mt-4">{t(`${key}Body`)}</p>
              {key === "manager" ? (
                <ul className="mt-4 list-disc space-y-2 pl-5">
                  <li>{t("managerDuty1")}</li>
                  <li>{t("managerDuty2")}</li>
                  <li>{t("managerDuty3")}</li>
                </ul>
              ) : null}
            </section>
          ))}

          <section className="rounded-2xl border border-[var(--neutral-200)] bg-[var(--surface)] p-6">
            <p className="text-sm text-[var(--neutral-600)]">{MANAGER_OFFICE_HOURS_LABEL}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/zayavka">{t("ctaDiscuss")}</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/o-kompanii/dokumenty">{t("linkDocs")}</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/keysy">{tn("cases")}</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/kontakty">{tn("contacts")}</Link>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
