import { headers } from "next/headers";
import { cache } from "react";
import { prisma } from "./prisma";

export const getTenantBySlug = cache(async (slug: string) => {
  return prisma.tenant.findUnique({ where: { slug } });
});

export async function getTenantFromHeaders() {
  const slug = headers().get("x-tenant-slug") ?? "default";
  const tenant = await getTenantBySlug(slug);
  if (!tenant) {
    throw new Error(`Tenant not found for slug=${slug}. Run prisma db seed.`);
  }
  return tenant;
}
