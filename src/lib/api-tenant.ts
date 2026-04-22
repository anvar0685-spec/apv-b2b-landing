import { prisma } from "./prisma";

export async function getTenantForApi() {
  if (!process.env.DATABASE_URL) return null;
  const slug = process.env.DEFAULT_TENANT_SLUG ?? "default";
  return prisma.tenant.findUnique({ where: { slug } });
}
