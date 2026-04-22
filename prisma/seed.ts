import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const tenant = await prisma.tenant.upsert({
    where: { slug: "default" },
    update: {},
    create: {
      slug: "default",
      domain: process.env.DEFAULT_TENANT_DOMAIN ?? "localhost:3000",
      name: process.env.PLACEHOLDER_BRAND_NAME ?? "PLACEHOLDER_BRAND",
      type: "OWN",
      config: {
        theme: {
          primary: "#0B1D3A",
          primaryDark: "#05101F",
          accent: "#F97316",
          accentSoft: "#FFEDD5",
          success: "#10B981",
          neutral950: "#0A0A0A",
          neutral700: "#404040",
          neutral500: "#737373",
          neutral200: "#E5E5E5",
          neutral50: "#FAFAFA",
          background: "#FFFFFF",
          surface: "#F7F8FA",
        },
      },
    },
  });

  const flagKeys = [
    "partner_portal",
    "lead_auction",
    "lead_autoassignment",
    "whitelabel_onboarding",
    "content_licensing",
    "industry_reports",
    "premium_data_api",
    "conference_booking",
    "calculator_v2",
    "hero_variant_b",
  ];

  for (const key of flagKeys) {
    await prisma.featureFlag.upsert({
      where: { tenantId_key: { tenantId: tenant.id, key } },
      update: {},
      create: { tenantId: tenant.id, key, enabled: false, rolloutPct: 0 },
    });
  }

  await prisma.partner.upsert({
    where: { tenantId_inn: { tenantId: tenant.id, inn: "7700000000" } },
    update: {},
    create: {
      tenantId: tenant.id,
      companyName: "Demo Partner LLC",
      inn: "7700000000",
      ogrn: "1027700000000",
      contactName: "Иван Тестов",
      contactPhone: "+79990000000",
      contactEmail: "partner@example.com",
      industries: ["warehouse"],
      professions: ["gruzchiki"],
      cities: ["moskva", "podolsk"],
      capacityMin: 10,
      capacityMax: 200,
      status: "ACTIVE",
      tier: "BRONZE",
    },
  });

  const passwordHash = await bcrypt.hash("devowner", 10);
  await prisma.user.upsert({
    where: {
      tenantId_email: { tenantId: tenant.id, email: "owner@example.com" },
    },
    update: { passwordHash },
    create: {
      tenantId: tenant.id,
      email: "owner@example.com",
      passwordHash,
      role: "owner",
    },
  });

  const services = [
    { slug: "autstaffing", title: "Аутстаффинг персонала" },
    { slug: "autsorsing", title: "Аутсорсинг функций" },
    { slug: "upravlyaemyy-podryad", title: "Управляемый подряд" },
    { slug: "migracionnyy-uchet", title: "Миграционный учёт" },
    { slug: "podbor-personala", title: "Подбор персонала" },
  ];

  for (const s of services) {
    await prisma.service.upsert({
      where: { tenantId_slug: { tenantId: tenant.id, slug: s.slug } },
      update: { title: s.title },
      create: {
        tenantId: tenant.id,
        slug: s.slug,
        title: s.title,
        description: "Контент будет заменён после согласования.",
      },
    });
  }

  const pkg = await prisma.contentPackage.findFirst({
    where: { name: "Стартовый пакет (stub)" },
  });
  if (!pkg) {
    await prisma.contentPackage.create({
      data: {
        name: "Стартовый пакет (stub)",
        type: "ARTICLES",
        version: "0.0.1",
        isPublic: false,
      },
    });
  }

  console.log("Seed OK. tenantId=", tenant.id);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
