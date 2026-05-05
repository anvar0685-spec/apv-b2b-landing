import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CommercialSeoPage } from "@/components/marketing/commercial-seo-page";
import { buildPageMetadata, buildServiceJsonLd } from "@/lib/seo";
import { industryEditorialBundle } from "@/content/commercial-editorial";
import { HUB_STEPS_INDUSTRY } from "@/content/hub-visual-presets";
import { OTRASLI_SLUGS } from "@/lib/site-structure";

type Props = { params: { locale: string; slug: string } };

export function generateStaticParams() {
  return OTRASLI_SLUGS.map((o) => ({ slug: o.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const def = OTRASLI_SLUGS.find((o) => o.slug === params.slug);
  if (!def) return {};
  return buildPageMetadata({
    locale: params.locale,
    pathname: `/otrasli/${def.slug}`,
    title: def.title.ru,
    description: def.description.ru,
  });
}

export default function Page({ params }: Props) {
  const def = OTRASLI_SLUGS.find((o) => o.slug === params.slug);
  if (!def) notFound();

  const { locale } = params;
  const title = def.title.ru;
  const lead = def.description.ru;
  const hub = "Отрасли";
  const kicker = "Отраслевая посадочная";

  const editorial = industryEditorialBundle(def.slug);
  if (!editorial) notFound();

  return (
    <CommercialSeoPage
      heroVariant="ops"
      hubSteps={HUB_STEPS_INDUSTRY}
      showComparisonStrip
      editorialParagraphs={editorial.paragraphs}
      editorialCalloutParagraphIndex={editorial.calloutParagraphIndex}
      crumbs={[
        { href: "/", label: "Главная" },
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
