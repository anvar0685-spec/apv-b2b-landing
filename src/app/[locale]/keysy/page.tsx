import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { MarketingHubShell } from "@/components/layout/marketing-hub-shell";
import { CASES } from "@/content/cases-stub";
import { ListingGridShell } from "@/components/marketing/listing-grid-shell";
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
      <MarketingHubShell
        kicker={t("kicker")}
        title={t("title")}
        description={t("lead")}
        belowLead={<p className="type-body text-[var(--neutral-600)]">{t("disclaimer")}</p>}
        heroSurface="cases"
      >
        <ListingGridShell>
          <ul className="grid gap-8 md:grid-cols-2">
            {CASES.map((c, i) => (
              <li key={c.slug}>
                <PremiumCaseCard c={c} index={i} locale={params.locale} />
              </li>
            ))}
          </ul>
        </ListingGridShell>
      </MarketingHubShell>
    </main>
  );
}
