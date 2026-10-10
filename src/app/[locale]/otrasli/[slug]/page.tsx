import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WarehouseSchematic } from "@/components/graphics/warehouse-schematic";
import { CommercialSeoPage } from "@/components/marketing/commercial-seo-page";
import { industrySchematicVariant } from "@/lib/industry-schematic";
import { IndustryStaffingBody } from "@/components/marketing/industry-staffing-body";
import { getIndustryPageContent } from "@/content/industry-page-content";
import { buildNotFoundPageMetadata, buildPageMetadata, buildServiceJsonLd } from "@/lib/seo";
import { OTRASLI_SLUGS } from "@/lib/site-structure";

type Props = { params: { locale: string; slug: string } };

export function generateStaticParams() {
  return OTRASLI_SLUGS.map((o) => ({ slug: o.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const def = OTRASLI_SLUGS.find((o) => o.slug === params.slug);
  if (!def) return buildNotFoundPageMetadata(params.locale, `/otrasli/${params.slug}`);
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

  const body = getIndustryPageContent(def.slug);
  if (!body) notFound();

  const { locale } = params;
  const title = def.title.ru;
  const lead = def.description.ru;
  const hub = "Отрасли";

  return (
    <CommercialSeoPage
      heroVariant="vertical"
      showComparisonStrip={false}
      showProductionVisualStrip={false}
      showSectionDivider
      showPriorityTeasers={false}
      crumbs={[
        { href: "/", label: "Главная" },
        { href: "/otrasli", label: hub },
        { href: `/otrasli/${def.slug}`, label: title },
      ]}
      kicker="Отрасль"
      title={title}
      lead={lead}
      heroAside={
        <WarehouseSchematic
          variant={industrySchematicVariant(def.slug)}
          className="text-[var(--accent)]"
          title={title}
        />
      }
      jsonLd={buildServiceJsonLd({
        locale,
        pathname: `/otrasli/${def.slug}`,
        name: title,
        description: lead,
      })}
    >
      <IndustryStaffingBody content={body} />
    </CommercialSeoPage>
  );
}
