import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { HeroSection } from "@/components/home/hero-section";
import { TrustMarquee } from "@/components/home/trust-marquee";
import { HomePersonas } from "@/components/home/home-personas";
import { StatsCounters } from "@/components/home/stats-counters";
import { HomeSections } from "@/components/home/home-sections";
import { PainSolutionBento } from "@/components/home/pain-solution-bento";
import { FullBleedOperations } from "@/components/home/full-bleed-operations";
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
  const ogPath = locale === "en" ? "/en/opengraph-image" : "/opengraph-image";
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
  const locale = await getLocale();
  const base = site.url.replace(/\/$/, "");
  const orgDescription =
    locale === "en"
      ? "Warehouse staffing outsourcing in Moscow and the Moscow Oblast: shifts, SLA, transparent rates, compliance."
      : "Аутсорсинг персонала на склады Москвы и МО: смены, SLA, прозрачные ставки, compliance.";

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.brandName,
    url: base,
    description: orgDescription,
    identifier: [
      { "@type": "PropertyValue", name: "INN", value: site.inn },
      { "@type": "PropertyValue", name: "OGRN", value: site.ogrn },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: site.legalAddress,
      addressLocality: "Москва",
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
  };

  return (
    <main id="main">
      <JsonLd data={orgJsonLd} />
      <JsonLd data={websiteJsonLd} />
      <HeroSection />
      <TrustMarquee kicker={t("trust")} lead={t("trustLead")} />
      <HomePersonas />
      <PainSolutionBento />
      <StatsCounters />
      <FullBleedOperations />
      <HomeSections />
    </main>
  );
}
