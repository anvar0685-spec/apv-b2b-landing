import { getTranslations } from "next-intl/server";
import { HeroSection } from "@/components/home/hero-section";
import { TrustMarquee } from "@/components/home/trust-marquee";
import { StatsCounters } from "@/components/home/stats-counters";
import { HomeSections } from "@/components/home/home-sections";
import { PainSolutionBento } from "@/components/home/pain-solution-bento";
import { FullBleedOperations } from "@/components/home/full-bleed-operations";
import { JsonLd } from "@/components/seo/json-ld";
import { site } from "@/config/site";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const title =
    locale === "en"
      ? "Warehouse staffing outsourcing — Moscow & Moscow Oblast"
      : "Аутсорсинг персонала на склады — Москва и Московская область";
  const description =
    locale === "en"
      ? "Shift outsourcing for warehouses and DCs: SLA, hourly rates, compliance. Moscow & MO. No outstaffing."
      : "Аутсорсинг смен на склады и DC: SLA, ставки ₽/час, compliance. Москва и МО. Аутстаффинг не оказываем.";
  const base = site.url.replace(/\/$/, "");
  return {
    title,
    description,
    alternates: {
      canonical: "/",
      languages: {
        "ru-RU": `${base}/`,
        "en-US": `${base}/en`,
      },
    },
    openGraph: { title, description, type: "website", locale },
  };
}

export default async function HomePage() {
  const t = await getTranslations("home");
  const base = site.url.replace(/\/$/, "");

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.brandName,
    url: base,
    description:
      "Аутсорсинг персонала на склады Москвы и МО: смены, SLA, прозрачные ставки, compliance.",
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
      <PainSolutionBento />
      <StatsCounters />
      <FullBleedOperations />
      <HomeSections />
    </main>
  );
}
