import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { buildPageMetadata, buildWebPageJsonLd } from "@/lib/seo";
import { site } from "@/config/site";
import { absUrl } from "@/lib/abs-url";

type Props = { params: { locale: string } };

const PATH = "/razrabotka-saytov-dlya-autsorsinga";

type FeatureBlock = { title: string; body: string };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "pagesSeo" });
  return buildPageMetadata({
    locale: params.locale,
    pathname: PATH,
    title: t("razrabotkaSaytovDlyaAutsorsinga.metaTitle"),
    description: t("razrabotkaSaytovDlyaAutsorsinga.metaDescription"),
    keywords: t.raw("razrabotkaSaytovDlyaAutsorsinga.metaKeywords") as string[],
  });
}

export default async function Page({ params }: Props) {
  const t = await getTranslations({ locale: params.locale, namespace: "pagesSeo" });
  const brand = site.brandName.replace(/_/g, " ");
  const featureBlocks = t.raw("razrabotkaSaytovDlyaAutsorsinga.featureBlocks") as FeatureBlock[];

  const webPageLd = buildWebPageJsonLd({
    locale: params.locale,
    pathname: PATH,
    name: t("razrabotkaSaytovDlyaAutsorsinga.metaTitle"),
    description: t("razrabotkaSaytovDlyaAutsorsinga.metaDescription"),
  });

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t("razrabotkaSaytovDlyaAutsorsinga.serviceSchemaName"),
    description: t("razrabotkaSaytovDlyaAutsorsinga.serviceSchemaDescription"),
    serviceType: t("razrabotkaSaytovDlyaAutsorsinga.serviceSchemaType"),
    url: absUrl(PATH, params.locale),
    provider: {
      "@type": "Organization",
      name: brand,
      url: absUrl("/", params.locale),
    },
    areaServed: { "@type": "Country", name: "Россия" },
  };

  return (
    <main id="main" className="pb-24">
      <JsonLd data={webPageLd} />
      <JsonLd data={serviceLd} />

      <MarketingPageHero
        kicker={t("razrabotkaSaytovDlyaAutsorsinga.heroKicker")}
        title={t("razrabotkaSaytovDlyaAutsorsinga.heroTitle")}
        description={t("razrabotkaSaytovDlyaAutsorsinga.heroLead")}
      />

      <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <aside className="rounded-2xl border border-[var(--accent)]/25 bg-[color-mix(in_srgb,var(--accent)_6%,var(--card))] px-5 py-4 text-sm leading-relaxed text-[var(--neutral-800)] shadow-[var(--card-shadow)] dark:border-white/12 dark:bg-[var(--primary-dark)]/35 dark:text-white/88">
          <strong className="text-[var(--primary)] dark:text-white">{t("razrabotkaSaytovDlyaAutsorsinga.disclosureTitle")}</strong>
          <p className="mt-2">{t("razrabotkaSaytovDlyaAutsorsinga.disclosureBody")}</p>
        </aside>

        <section className="mt-14">
          <h2 className="type-headline">{t("razrabotkaSaytovDlyaAutsorsinga.priceTitle")}</h2>
          <p className="type-body mt-4 max-w-3xl text-[var(--neutral-700)] dark:text-[var(--neutral-200)]">
            {t("razrabotkaSaytovDlyaAutsorsinga.priceLead")}
          </p>
          <Card className="mt-8 max-w-xl border-[var(--accent)]/30 bg-[var(--card)]">
            <CardTitle className="text-2xl tabular-nums">{t("razrabotkaSaytovDlyaAutsorsinga.priceAmount")}</CardTitle>
            <CardDescription className="mt-3 text-base leading-relaxed">{t("razrabotkaSaytovDlyaAutsorsinga.priceNote")}</CardDescription>
          </Card>
        </section>

        <section className="mt-16">
          <h2 className="type-headline">{t("razrabotkaSaytovDlyaAutsorsinga.credTitle")}</h2>
          <p className="type-body mt-4 max-w-3xl text-[var(--neutral-700)] dark:text-[var(--neutral-200)]">{t("razrabotkaSaytovDlyaAutsorsinga.credLead")}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {(t.raw("razrabotkaSaytovDlyaAutsorsinga.credBullets") as string[]).map((line) => (
              <li
                key={line}
                className="rounded-2xl border border-[var(--neutral-200)] bg-[var(--surface)] px-4 py-3 text-sm leading-relaxed text-[var(--neutral-700)] dark:border-white/10 dark:bg-[var(--card)] dark:text-[var(--neutral-200)]"
              >
                {line}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16">
          <h2 className="type-headline">{t("razrabotkaSaytovDlyaAutsorsinga.featuresTitle")}</h2>
          <p className="type-body mt-4 max-w-3xl text-[var(--neutral-700)] dark:text-[var(--neutral-200)]">{t("razrabotkaSaytovDlyaAutsorsinga.featuresLead")}</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featureBlocks.map((f) => (
              <Card key={f.title} className="border-[var(--neutral-200)] bg-[var(--card)] dark:border-white/10">
                <CardTitle className="text-base">{f.title}</CardTitle>
                <CardDescription className="mt-2 text-sm leading-relaxed">{f.body}</CardDescription>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="type-headline">{t("razrabotkaSaytovDlyaAutsorsinga.seoArticlesTitle")}</h2>
          <p className="type-body mt-4 max-w-3xl text-[var(--neutral-700)] dark:text-[var(--neutral-200)]">{t("razrabotkaSaytovDlyaAutsorsinga.seoArticlesLead")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/blog/category/veb-dlya-autsorsinga">{t("razrabotkaSaytovDlyaAutsorsinga.ctaBlogCategory")}</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/blog">{t("razrabotkaSaytovDlyaAutsorsinga.ctaBlogAll")}</Link>
            </Button>
          </div>
        </section>

        <section className="mt-16 rounded-2xl border border-[var(--neutral-200)] bg-[var(--surface)] px-6 py-8 dark:border-white/10 dark:bg-[var(--card)]">
          <h2 className="type-headline">{t("razrabotkaSaytovDlyaAutsorsinga.ctaTitle")}</h2>
          <p className="type-body mt-4 max-w-3xl text-[var(--neutral-700)] dark:text-[var(--neutral-200)]">{t("razrabotkaSaytovDlyaAutsorsinga.ctaLead")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/zayavka">{t("razrabotkaSaytovDlyaAutsorsinga.ctaProposal")}</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/kontakty">{t("razrabotkaSaytovDlyaAutsorsinga.ctaContacts")}</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/">{t("razrabotkaSaytovDlyaAutsorsinga.ctaHome")}</Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
