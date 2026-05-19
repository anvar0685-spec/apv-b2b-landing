import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { HeroSection } from "@/components/home/hero-section";
import { TrustMarquee } from "@/components/home/trust-marquee";
import { HomePersonas } from "@/components/home/home-personas";
import { StatsCounters } from "@/components/home/stats-counters";
import { HomeSections } from "@/components/home/home-sections";
import { PainSolutionBento } from "@/components/home/pain-solution-bento";
import { IndustrialLogisticsBand } from "@/components/home/industrial-logistics-band";
import { FullBleedOperations } from "@/components/home/full-bleed-operations";
import { SectionDivider } from "@/components/marketing/section-divider";
import { JsonLd } from "@/components/seo/json-ld";
import { site } from "@/config/site";
import { absUrl } from "@/lib/abs-url";
import { buildPageMetadata } from "@/lib/seo";
import { getLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "home" });
  return buildPageMetadata({
    locale,
    pathname: "/",
    title: t("heroTitle"),
    description: t("metaDescription"),
  });
}

export default async function HomePage() {
  const locale = await getLocale();
  const t = await getTranslations("home");
  const homeUrl = absUrl("/", locale);
  const orgDescription =
    "Аутсорсинг персонала на склады Москвы и МО с 2023 года: смены, явка и замены, прозрачные ставки и расчёт по 11-часовой смене. Более 100 сотрудников в штате.";

  const orgId = `${homeUrl}#organization`;

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    name: site.brandName,
    legalName: site.legalEntityFullName,
    url: homeUrl,
    description: orgDescription,
    foundingDate: "2023",
    identifier: [
      { "@type": "PropertyValue", name: "INN", value: site.inn },
      { "@type": "PropertyValue", name: "OGRNIP", value: site.ogrn },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: site.legalAddress,
      addressLocality: "Люберцы",
      addressRegion: "Московская область",
      addressCountry: "RU",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: site.phone,
        email: site.emailHello,
        contactType: "sales",
      },
    ],
    sameAs: [site.telegram, site.whatsapp],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.brandName,
    url: homeUrl,
    inLanguage: "ru-RU",
    publisher: { "@id": orgId },
  };

  return (
    <main id="main">
      <JsonLd data={orgJsonLd} />
      <JsonLd data={websiteJsonLd} />
      <HeroSection />
      <TrustMarquee kicker={t("trust")} lead={t("trustLead")} />
      <HomePersonas />
      <PainSolutionBento />
      <IndustrialLogisticsBand />
      <SectionDivider className="py-6 sm:py-8" />
      <StatsCounters />
      <FullBleedOperations />
      <SectionDivider className="py-6 sm:py-8" />
      <HomeSections />
    </main>
  );
}
