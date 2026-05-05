import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CommercialSeoPage } from "@/components/marketing/commercial-seo-page";
import { buildPageMetadata, buildServiceJsonLd } from "@/lib/seo";
import { platformEditorialBundle } from "@/content/commercial-editorial";
import { PLOSHCHADKI_SLUGS } from "@/lib/site-structure";

type Props = { params: { locale: string; slug: string } };

export function generateStaticParams() {
  return PLOSHCHADKI_SLUGS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const def = PLOSHCHADKI_SLUGS.find((p) => p.slug === params.slug);
  if (!def) return {};
  return buildPageMetadata({
    locale: params.locale,
    pathname: `/ploshchadki/${def.slug}`,
    title: def.title.ru,
    description: def.description.ru,
  });
}

export default function Page({ params }: Props) {
  const def = PLOSHCHADKI_SLUGS.find((p) => p.slug === params.slug);
  if (!def) notFound();

  const { locale } = params;
  const title = def.title.ru;
  const lead = def.description.ru;
  const hub = "Площадки";
  const kicker = "Площадка";

  const editorial = platformEditorialBundle(def.slug);
  if (!editorial) notFound();

  return (
    <CommercialSeoPage
      heroVariant="atlas"
      showComparisonStrip
      editorialParagraphs={editorial.paragraphs}
      editorialCalloutParagraphIndex={editorial.calloutParagraphIndex}
      crumbs={[
        { href: "/", label: "Главная" },
        { href: "/ploshchadki", label: hub },
        { href: `/ploshchadki/${def.slug}`, label: title },
      ]}
      kicker={kicker}
      title={title}
      lead={lead}
      showPriorityTeasers
      jsonLd={buildServiceJsonLd({
        locale,
        pathname: `/ploshchadki/${def.slug}`,
        name: title,
        description: lead,
      })}
    />
  );
}
