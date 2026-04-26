import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import { site } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo";

type PageProps = { params: { locale: string } };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "aboutPage" });
  return buildPageMetadata({
    locale: params.locale,
    pathname: "/o-kompanii",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function Page({ params }: PageProps) {
  const t = await getTranslations({ locale: params.locale, namespace: "aboutPage" });
  const tn = await getTranslations({ locale: params.locale, namespace: "nav" });

  const STATS = [
    { label: t("statsFocusLabel"), value: t("statsFocusValue") },
    { label: t("statsModelsLabel"), value: t("statsModelsValue") },
    { label: t("statsGeoLabel"), value: t("statsGeoValue") },
    { label: t("statsComplianceLabel"), value: t("statsComplianceValue") },
  ] as const;

  const PILLARS = [
    {
      href: "/o-kompanii/komanda",
      title: t("pillarTeamTitle"),
      body: t("pillarTeamBody"),
    },
    {
      href: "/o-kompanii/dokumenty",
      title: t("pillarDocsTitle"),
      body: t("pillarDocsBody"),
    },
    {
      href: "/o-kompanii/pressa",
      title: t("pillarPressTitle"),
      body: t("pillarPressBody"),
    },
  ] as const;

  const VALUES = [t("valuesV1"), t("valuesV2"), t("valuesV3")];

  return (
    <main id="main" className="pb-24">
      <MarketingPageHero kicker={t("heroKicker")} title={site.brandName} description={t("heroDescription")} />

      <section className="border-b border-[var(--neutral-200)] bg-[var(--background)] py-12 lg:py-16">
        <div className="mx-auto grid max-w-[1280px] gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)] px-5 py-6 shadow-[var(--card-shadow)]"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--neutral-500)]">{s.label}</p>
              <p className="font-display mt-2 text-lg font-semibold tracking-tight text-[var(--primary)]">{s.value}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="type-headline">{t("howTitle")}</h2>
            <div className="type-editorial-dropcap mt-6 space-y-5 text-base leading-relaxed text-[var(--neutral-700)]">
              <p>{t("howP1")}</p>
              <p>{t("howP2")}</p>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/zayavka">{t("ctaDiscuss")}</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/keysy">{tn("cases")}</Link>
              </Button>
            </div>
          </div>

          <div className="space-y-5 lg:col-span-7">
            {PILLARS.map((p) => (
              <Card key={p.href} className="border-[var(--neutral-200)]/90">
                <CardTitle>
                  <Link className="transition hover:text-[var(--accent)]" href={p.href}>
                    {p.title}
                  </Link>
                </CardTitle>
                <CardDescription>{p.body}</CardDescription>
                <div className="mt-4">
                  <Link className="text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline" href={p.href}>
                    {t("pillarLinkGo")}
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <section className="mt-20 rounded-3xl border border-[var(--neutral-200)] bg-gradient-to-br from-[var(--surface)] via-[var(--card)] to-[var(--surface)] p-8 md:p-12">
          <h2 className="type-headline max-w-2xl">{t("valuesTitle")}</h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {VALUES.map((text) => (
              <li
                key={text}
                className="rounded-2xl border border-[var(--neutral-200)]/80 bg-[var(--card)]/80 px-5 py-6 text-sm leading-relaxed text-[var(--neutral-700)] shadow-sm backdrop-blur-sm"
              >
                {text}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
