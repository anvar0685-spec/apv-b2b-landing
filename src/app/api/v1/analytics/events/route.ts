import { NextResponse } from "next/server";
import { z } from "zod";
import { getTenantForApi } from "@/lib/api-tenant";
import { recordAnalyticsEvent } from "@/lib/analytics-server";
import { rateLimitOrThrow } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const bodySchema = z.object({
  type: z.string().min(1).max(120),
  payload: z.record(z.string(), z.unknown()).optional(),
  sessionId: z.string().max(120).optional(),
});

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
      route: "analytics:event",
      limit: 200,
      windowSec: 3600,
    });

    const tenant = await getTenantForApi();
    if (!tenant) {
      return NextResponse.json({ error: "tenant_missing" }, { status: 503 });
    }

    const json = await req.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "validation_error" }, { status: 400 });
    }

    await recordAnalyticsEvent({
      tenantId: tenant.id,
      type: parsed.data.type,
      category: "traffic",
      payload: parsed.data.payload ?? {},
      sessionId: parsed.data.sessionId,
      url: req.headers.get("referer"),
      referrer: req.headers.get("referer"),
      userAgent: req.headers.get("user-agent"),
      ip,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof Error && e.message === "RATE_LIMITED") {
      return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    }
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
