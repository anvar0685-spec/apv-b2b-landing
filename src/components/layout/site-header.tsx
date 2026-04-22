import { getTranslations } from "next-intl/server";
import { site } from "@/config/site";
import { getBrandMonogram } from "@/lib/brand-monogram";
import { SiteHeaderClient } from "@/components/layout/site-header-client";

export async function SiteHeader() {
  const t = await getTranslations("nav");
  const tc = await getTranslations("cta");

  const links = [
    { href: "/uslugi", label: t("services") },
    { href: "/personal", label: t("personal") },
    { href: "/keysy", label: t("cases") },
    { href: "/blog", label: t("blog") },
    { href: "/kalkulyator", label: t("calculator") },
    { href: "/o-kompanii", label: t("about") },
    { href: "/kontakty", label: t("contacts") },
  ] as const;

  return (
    <SiteHeaderClient
      brandName={site.brandName}
      monogram={getBrandMonogram(site.brandName)}
      links={links}
      ctaProposal={tc("proposal")}
      ctaCalc={tc("calc")}
    />
  );
}
