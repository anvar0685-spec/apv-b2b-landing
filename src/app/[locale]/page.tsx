import { getTranslations } from "next-intl/server";
import { HeroSection } from "@/components/home/hero-section";
import { JsonLd } from "@/components/seo/json-ld";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";

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
  return {
    title,
    description,
    alternates: {
      canonical: "/",
      languages: { ru: "/", en: "/en" },
    },
    openGraph: { title, description, type: "website", locale },
  };
}

export default async function HomePage() {
  const t = await getTranslations("home");

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PLACEHOLDER_BRAND",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    description:
      "Премиальный подрядчик линейного персонала с compliance-инфраструктурой.",
    identifier: [
      { "@type": "PropertyValue", name: "INN", value: "TBD" },
      { "@type": "PropertyValue", name: "OGRN", value: "TBD" },
    ],
  };

  return (
    <>
      <JsonLd data={orgJsonLd} />
      <HeroSection />
      <section className="border-y border-[var(--neutral-200)] bg-[var(--surface)] py-10">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.08em] text-[var(--neutral-500)]">
            {t("trust")}
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4 opacity-60 sm:grid-cols-3 md:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex h-12 items-center justify-center rounded-lg border border-dashed border-[var(--neutral-200)] bg-white text-xs font-medium text-[var(--neutral-500)]"
              >
                LOGO {i + 1}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardTitle>Дефицит персонала</CardTitle>
            <CardDescription>
              Закрываем пики и текучку за счёт пула и предсказуемого онбординга.
            </CardDescription>
          </Card>
          <Card>
            <CardTitle>Compliance</CardTitle>
            <CardDescription>
              Миграционный учёт и контроль документов без передачи риска заказчику.
            </CardDescription>
          </Card>
          <Card>
            <CardTitle>Скорость</CardTitle>
            <CardDescription>
              SLA по выходу на смену и отчётность для COO/HRD в одном контуре.
            </CardDescription>
          </Card>
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/uslugi"
            className="text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
          >
            Все услуги →
          </Link>
        </div>
      </section>
    </>
  );
}
