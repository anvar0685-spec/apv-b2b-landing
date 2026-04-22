import { createHash } from "crypto";
import type { Prisma } from "@prisma/client";
import { prisma } from "./prisma";
import { logger } from "./logger";

function hashIp(ip: string | null) {
  if (!ip) return null;
  return createHash("sha256").update(ip).digest("hex").slice(0, 40);
}

export async function recordAnalyticsEvent(input: {
  tenantId: string;
  type: string;
  category: string;
  payload?: Record<string, unknown>;
  sessionId?: string | null;
  url?: string | null;
  referrer?: string | null;
  userAgent?: string | null;
  ip?: string | null;
  utm?: Partial<{
    utmSource: string;
    utmMedium: string;
    utmCampaign: string;
    utmTerm: string;
    utmContent: string;
  }>;
}) {
  try {
    await prisma.analyticsEvent.create({
      data: {
        tenantId: input.tenantId,
        type: input.type,
        category: input.category,
        payload: (input.payload ?? {}) as Prisma.InputJsonValue,
        sessionId: input.sessionId ?? undefined,
        url: input.url ?? undefined,
        referrer: input.referrer ?? undefined,
        userAgent: input.userAgent ?? undefined,
        ipHash: hashIp(input.ip ?? null) ?? undefined,
        utmSource: input.utm?.utmSource,
        utmMedium: input.utm?.utmMedium,
        utmCampaign: input.utm?.utmCampaign,
        utmTerm: input.utm?.utmTerm,
        utmContent: input.utm?.utmContent,
      },
    });
  } catch (e) {
    logger.error({ err: e, msg: "analytics_insert_failed" });
  }
}
