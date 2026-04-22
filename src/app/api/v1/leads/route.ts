import { NextResponse } from "next/server";
import { leadCreateSchema } from "@/lib/validations/lead";
import { getTenantForApi } from "@/lib/api-tenant";
import { prisma } from "@/lib/prisma";
import { rateLimitOrThrow } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

export const dynamic = "force-dynamic";

function clientIp(req: Request) {
  const xf = req.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0]?.trim() ?? "unknown";
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: Request) {
  try {
    const ip = clientIp(req);
    await rateLimitOrThrow({
      ip,
      route: "leads:create",
      limit: 30,
      windowSec: 3600,
    });

    const tenant = await getTenantForApi();
    if (!tenant) {
      return NextResponse.json(
        { error: "tenant_missing", hint: "Run prisma db seed" },
        { status: 503 },
      );
    }

    const json = await req.json();
    const parsed = leadCreateSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "validation_error", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const data = parsed.data;

    const lead = await prisma.lead.create({
      data: {
        tenantId: tenant.id,
        companyName: data.companyName,
        contactName: data.contactName,
        contactPhone: data.contactPhone,
        contactEmail: data.contactEmail?.trim() || undefined,
        serviceType: data.serviceType,
        profession: data.profession,
        city: data.city,
        headcount: data.headcount,
        budgetMonthly: data.budgetMonthly,
        urgency: data.urgency,
        comment: data.comment,
        source: data.source,
        sourceUrl: data.sourceUrl || undefined,
        utmSource: data.utmSource,
        utmMedium: data.utmMedium,
        utmCampaign: data.utmCampaign,
      },
    });

    await prisma.leadEvent.create({
      data: {
        leadId: lead.id,
        type: "created",
        payload: { source: data.source },
        actorType: "system",
      },
    });

    return NextResponse.json({ id: lead.id, status: lead.status });
  } catch (e) {
    if (e instanceof Error && e.message === "RATE_LIMITED") {
      return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    }
    logger.error({ err: e, msg: "lead_create_failed" });
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
