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
      ? "Premium line-staff contractor — Moscow & MO"
      : "Премиальный подрядчик линейного персонала — Москва и МО";
  const description =
    locale === "en"
      ? "SLA, transparent pricing, compliance infrastructure for marketplaces, logistics, retail, construction."
      : "SLA, прозрачная цена, compliance-инфраструктура для маркетплейсов, логистики, ритейла и стройки.";
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
      "Премиальный подрядчик линейного персонала с compliance-инфраструктурой.",
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
      <section className="bg-[var(--surface)] py-5">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.12em] text-[var(--neutral-500)]">
            {t("trust")}
          </p>
        </div>
        <TrustMarquee />
      </section>
      <PainSolutionBento />
      <StatsCounters />
      <FullBleedOperations />
      <HomeSections />
    </main>
  );
}
