import { renderToBuffer } from "@react-pdf/renderer";
import { Prisma } from "@prisma/client";
import { site } from "@/config/site";
import { getCity } from "@/content/professions-cities";
import { kpDraftMonthlyEstimateFromLines } from "@/lib/kp-draft/estimate";
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
  professionLines?: Prisma.JsonValue | null;
  comment?: string | null;
  createdAt: Date;
};

const KP_SERVICE_MODEL_RU = "Аутсорсинг линейного персонала склада";

function normalizeProfessionLines(lead: LeadLikeForKp): { slug: string; headcount: number }[] {
  const raw = lead.professionLines;
  if (raw !== null && raw !== undefined && Array.isArray(raw)) {
    const out: { slug: string; headcount: number }[] = [];
    for (const item of raw) {
      if (item && typeof item === "object" && "slug" in item && "headcount" in item) {
        const slug = String((item as { slug: unknown }).slug).trim();
        const headcount = Number((item as { headcount: unknown }).headcount);
        if (slug.length > 0 && Number.isFinite(headcount) && headcount >= 1) {
          out.push({ slug, headcount: Math.floor(headcount) });
        }
      }
    }
    if (out.length > 0) return out;
  }
  return [{ slug: lead.profession, headcount: lead.headcount }];
}

export async function renderKpDraftPdfBuffer(lead: LeadLikeForKp): Promise<Buffer> {
  registerKpDraftFonts();
  const brand = site.brandName.replace(/_/g, " ");
  const legalLine = `${site.legalEntityFullName}, ИНН ${site.inn}, ${site.phone}`;
  const city = getCity(lead.city);
  const lines = normalizeProfessionLines(lead);
  const est = kpDraftMonthlyEstimateFromLines(lines);

  const professionSummaryRu = est.fundLines.map((l) => `${l.titleRu} — ${l.headcount} чел.`).join("\n");

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
      professionSummaryRu={professionSummaryRu}
      cityRu={city?.nameRu ?? lead.city}
      headcountTotal={est.totalHeadcount}
      serviceRu={KP_SERVICE_MODEL_RU}
      comment={lead.comment?.trim() || undefined}
      fundLines={est.fundLines}
      weightedHourly={est.weightedHourly}
      monthlyMid={est.monthlyMid}
      monthlyBySchedule={est.monthlyBySchedule}
      defaultScheduleLabel={est.defaultScheduleLabel}
      low={est.low}
      high={est.high}
    />
  );

  const buf = await renderToBuffer(doc);
  return Buffer.from(buf);
}
