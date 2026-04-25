import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CommercialSeoPage } from "@/components/marketing/commercial-seo-page";
import { buildPageMetadata, buildServiceJsonLd } from "@/lib/seo";
import { OTRASLI_SLUGS } from "@/lib/site-structure";

type Props = { params: { locale: string; slug: string } };

export function generateStaticParams() {
  return OTRASLI_SLUGS.map((o) => ({ slug: o.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const def = OTRASLI_SLUGS.find((o) => o.slug === params.slug);
  if (!def) return {};
  const title = params.locale === "en" ? def.title.en : def.title.ru;
  const description = params.locale === "en" ? def.description.en : def.description.ru;
  return buildPageMetadata({
    locale: params.locale,
    pathname: `/otrasli/${def.slug}`,
    title,
    description,
  });
}

export default function Page({ params }: Props) {
  const def = OTRASLI_SLUGS.find((o) => o.slug === params.slug);
  if (!def) notFound();

  const { locale } = params;
  const title = locale === "en" ? def.title.en : def.title.ru;
  const lead = locale === "en" ? def.description.en : def.description.ru;
  const hub = locale === "en" ? "Industries" : "Отрасли";
  const kicker = locale === "en" ? "Industry page" : "Отраслевая посадочная";

  return (
    <CommercialSeoPage
      locale={locale}
      crumbs={[
        { href: "/", label: locale === "en" ? "Home" : "Главная" },
        { href: "/otrasli", label: hub },
        { href: `/otrasli/${def.slug}`, label: title },
      ]}
      kicker={kicker}
      title={title}
      lead={lead}
      showPriorityTeasers
      jsonLd={buildServiceJsonLd({
        locale,
        pathname: `/otrasli/${def.slug}`,
        name: title,
        description: lead,
      })}
    />
  );
}
