import { renderToBuffer } from "@react-pdf/renderer";
import { site } from "@/config/site";
import { getCity, getProfession } from "@/content/professions-cities";
import { kpDraftMonthlyEstimate } from "@/lib/kp-draft/estimate";
import { KpDraftDocument } from "@/lib/kp-draft/kp-draft-document";
import { registerKpDraftFonts } from "@/lib/kp-draft/register-fonts";

export type LeadLikeForKp = {
  id: string;
  companyName: string;
  contactName: string;
  contactPhone: string;
  contactEmail?: string | null;
  serviceType: string;
  profession: string;
  city: string;
  headcount: number;
  comment?: string | null;
  createdAt: Date;
};

function serviceLabelRu(slug: string): string {
  if (slug === "managed") return "Управляемый подряд";
  return "Аутсорсинг смен";
}

export async function renderKpDraftPdfBuffer(lead: LeadLikeForKp): Promise<Buffer> {
  registerKpDraftFonts();
  const brand = site.brandName.replace(/_/g, " ");
  const legalLine = `${site.legalEntityFullName}, ИНН ${site.inn}, ${site.phone}`;
  const prof = getProfession(lead.profession);
  const city = getCity(lead.city);
  const est = kpDraftMonthlyEstimate(lead.headcount, lead.profession);

  const doc = (
    <KpDraftDocument
      brandName={brand}
      legalLine={legalLine}
      issuedAt={lead.createdAt}
      leadIdShort={lead.id.slice(0, 12)}
      companyName={lead.companyName}
      contactName={lead.contactName}
      contactPhone={lead.contactPhone}
      contactEmail={lead.contactEmail ?? undefined}
      professionRu={prof?.titleRu ?? lead.profession}
      cityRu={city?.nameRu ?? lead.city}
      headcount={lead.headcount}
      serviceRu={serviceLabelRu(lead.serviceType)}
      comment={lead.comment?.trim() || undefined}
      hourlyBase={est.hourlyBase}
      monthlyMid={est.monthlyMid}
      low={est.low}
      high={est.high}
    />
  );

  const buf = await renderToBuffer(doc);
  return Buffer.from(buf);
}
