/**
 * Плейсхолдеры бренда/реквизитов/контактов.
 * После финализации — только env + правка копирайта при необходимости.
 */
const url = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const site = {
  url,
  brandName: process.env.NEXT_PUBLIC_BRAND_NAME ?? "PLACEHOLDER_BRAND",
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN ?? "example.com",
  inn: process.env.NEXT_PUBLIC_INN ?? "0000000000",
  ogrn: process.env.NEXT_PUBLIC_OGRN ?? "0000000000000",
  legalAddress:
    process.env.NEXT_PUBLIC_LEGAL_ADDRESS ??
    "Юридический адрес будет указан после регистрации компании",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "+7 (000) 000-00-00",
  emailHello: process.env.NEXT_PUBLIC_EMAIL_HELLO ?? "hello@example.com",
  emailSales: process.env.NEXT_PUBLIC_EMAIL_SALES ?? "sales@example.com",
  telegram: process.env.NEXT_PUBLIC_TELEGRAM ?? "https://t.me/your_company",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "https://wa.me/70000000000",
  /** ERID / маркировка рекламы — заглушка */
  erid: process.env.NEXT_PUBLIC_AD_ERID ?? "ERID-TBD",
} as const;
