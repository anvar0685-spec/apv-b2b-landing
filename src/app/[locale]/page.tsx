import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { HeroSection } from "@/components/home/hero-section";
import { TrustMarquee } from "@/components/home/trust-marquee";
import { HomePersonas } from "@/components/home/home-personas";
import { StatsCounters } from "@/components/home/stats-counters";
import { HomeSections } from "@/components/home/home-sections";
import { PainSolutionBento } from "@/components/home/pain-solution-bento";
import { FullBleedOperations } from "@/components/home/full-bleed-operations";
import { SectionDivider } from "@/components/marketing/section-divider";
import { JsonLd } from "@/components/seo/json-ld";
import { site } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "home" });
  const base = buildPageMetadata({
    locale,
    pathname: "/",
    title: t("heroTitle"),
    description: t("heroSubtitle"),
  });
  const siteBase = site.url.replace(/\/$/, "");
  const ogPath = "/opengraph-image";
  const ogTitle = typeof base.openGraph?.title === "string" ? base.openGraph.title : t("heroTitle");
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      images: [{ url: `${siteBase}${ogPath}`, width: 1200, height: 630, alt: ogTitle }],
    },
    twitter: {
      ...base.twitter,
      images: [`${siteBase}${ogPath}`],
    },
  };
}

export default async function HomePage() {
  const t = await getTranslations("home");
  const base = site.url.replace(/\/$/, "");
  const orgDescription =
    "Аутсорсинг персонала на склады Москвы и МО с 2023 года: смены, SLA, прозрачные ставки, документы и требования площадки. Более 100 сотрудников в штате.";

  const orgId = `${base}#organization`;

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    name: site.brandName,
    legalName: site.legalEntityFullName,
    url: base,
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
    url: base,
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
      <SectionDivider className="py-6 sm:py-8" />
      <StatsCounters />
      <FullBleedOperations />
      <SectionDivider className="py-6 sm:py-8" />
      <HomeSections />
    </main>
  );
}
