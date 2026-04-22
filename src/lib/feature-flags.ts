import { createHash } from "crypto";
import { prisma } from "./prisma";

function hashUserId(id: string) {
  const hex = createHash("sha256").update(id).digest("hex").slice(0, 8);
  return parseInt(hex, 16);
}

export async function isFeatureEnabled(
  key: string,
  ctx: { tenantId: string; userId?: string },
) {
  const flag = await prisma.featureFlag.findUnique({
    where: { tenantId_key: { tenantId: ctx.tenantId, key } },
  });
  if (!flag?.enabled) return false;
  if (flag.rolloutPct >= 100) return true;
  const basis = ctx.userId ?? ctx.tenantId;
  return hashUserId(basis) % 100 < flag.rolloutPct;
}
