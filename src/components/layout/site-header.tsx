import { getTranslations } from "next-intl/server";
import { site } from "@/config/site";
import { getBrandMonogram } from "@/lib/brand-monogram";
import { SiteHeaderClient } from "@/components/layout/site-header-client";

export async function SiteHeader() {
  const t = await getTranslations("nav");
  const tc = await getTranslations("cta");

  const groups = [
    {
      title: t("megaProduct"),
      links: [
        { href: "/uslugi", label: t("services") },
        { href: "/personal", label: t("personal") },
        { href: "/otrasli", label: t("industries") },
        { href: "/ploshchadki", label: t("platforms") },
        { href: "/geografiya", label: t("geo") },
      ],
    },
    {
      title: t("megaCompany"),
      links: [
        { href: "/o-kompanii", label: t("about") },
        { href: "/keysy", label: t("cases") },
        { href: "/blog", label: t("blog") },
        { href: "/faq", label: t("faq") },
        { href: "/garantii", label: t("garantii") },
      ],
    },
    {
      title: t("megaTools"),
      links: [
        { href: "/kalkulyator", label: t("calculator") },
        { href: "/zayavka", label: tc("proposal") },
        { href: "/kontakty", label: t("contacts") },
      ],
    },
  ] as const;

  return (
    <SiteHeaderClient
      brandName={site.brandName}
      monogram={getBrandMonogram(site.brandName)}
      groups={groups}
      megaMenuTrigger={t("megaMenuTrigger")}
      ctaProposal={tc("proposal")}
      ctaCalc={tc("calc")}
      skipToMain={t("skipToMain")}
      menuOpenLabel={t("menuOpen")}
      menuCloseLabel={t("menuClose")}
      menuNavLabel={t("menuNav")}
      themeLightLabel={t("themeLight")}
      themeDarkLabel={t("themeDark")}
    />
  );
}
