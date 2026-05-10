/**
 * Бренд, домен и реквизиты: в продакшене часть полей можно переопределить через env.
 * Юрлицо по умолчанию — ИП Махмадов (реквизиты от заказчика, 2026-04).
 */
const url = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const defaultLegalEntity =
  "ИНДИВИДУАЛЬНЫЙ ПРЕДПРИНИМАТЕЛЬ МАХМАДОВ ШАРИФХОН ТАГАЙМУРОДОВИЧ";

const defaultLegalAddress =
  "140125, Россия, Московская обл., г. Люберцы, мкр. Новые Островцы (д. Островцы), ул. Лётчика Волчкова, д. 2, кв. 155";

const defaultPhone = process.env.NEXT_PUBLIC_PHONE ?? "+7 (925) 437-12-11";

/** Российский номер → E.164 вида +7XXXXXXXXXX для deep-link MAX. */
function ruPhoneToE164Plus(displayOrDigits: string): string {
  const digits = displayOrDigits.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("8")) return `+7${digits.slice(1)}`;
  if (digits.length === 11 && digits.startsWith("7")) return `+${digits}`;
  if (digits.length === 10) return `+7${digits}`;
  return digits.length > 0 ? `+${digits}` : "+79254371211";
}

const maxFromEnv = (process.env.NEXT_PUBLIC_MAX ?? "").trim();
/**
 * Ссылка на чат/профиль в MAX.
 * 1) NEXT_PUBLIC_MAX — лучший вариант: «Поделиться» из профиля в приложении (max.ru/u/…).
 * 2) Иначе max.ru/chat?phone= — открывается сценарий «чат по номеру» (кнопка max://), не веб-вход web.max.ru
 *    (тот уводит в загрузку/QR).
 */
const maxResolved =
  maxFromEnv ||
  `https://max.ru/chat?phone=${encodeURIComponent(ruPhoneToE164Plus(defaultPhone))}`;

export const site = {
  url,
  brandName: process.env.NEXT_PUBLIC_BRAND_NAME ?? "АПВ - СИСТЕМА",
  /** Полное наименование ИП / юрлица для оферты, футера и JSON-LD */
  legalEntityFullName: process.env.NEXT_PUBLIC_LEGAL_ENTITY_NAME ?? defaultLegalEntity,
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN ?? "example.com",
  inn: process.env.NEXT_PUBLIC_INN ?? "773424696359",
  /** ОГРНИП (для ИП) */
  ogrn: process.env.NEXT_PUBLIC_OGRN ?? "325508100185182",
  legalAddress: process.env.NEXT_PUBLIC_LEGAL_ADDRESS ?? defaultLegalAddress,
  phone: defaultPhone,
  emailHello: process.env.NEXT_PUBLIC_EMAIL_HELLO ?? "mahmadov.personal@yandex.ru",
  emailSales: process.env.NEXT_PUBLIC_EMAIL_SALES ?? "mahmadov.personal@yandex.ru",
  telegram: process.env.NEXT_PUBLIC_TELEGRAM ?? "https://t.me/LVHanter",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "https://wa.me/79254371211",
  max: maxResolved,
  /** ERID / маркировка рекламы (значение по умолчанию до выдачи в ОРД) */
  erid: process.env.NEXT_PUBLIC_AD_ERID ?? "ERID-TBD",
  /** Расчётный счёт */
  checkingAccount: process.env.NEXT_PUBLIC_CHECKING_ACCOUNT ?? "40802810200008139336",
  bankName: process.env.NEXT_PUBLIC_BANK_NAME ?? 'АО «ТБанк»',
  bankInn: process.env.NEXT_PUBLIC_BANK_INN ?? "7710140679",
  bik: process.env.NEXT_PUBLIC_BIK ?? "044525974",
  correspondentAccount: process.env.NEXT_PUBLIC_CORRESPONDENT_ACCOUNT ?? "30101810145250000974",
  bankLegalAddress:
    process.env.NEXT_PUBLIC_BANK_LEGAL_ADDRESS ??
    "127287, г. Москва, ул. Хуторская 2-я, д. 38А, стр. 26",
} as const;

/** Для футера: маркировка рекламы в ЕРИР выводится только после подстановки реального erid из ОРД (не плейсхолдер). */
export function siteHasValidAdErid(): boolean {
  const e = site.erid.trim();
  return e.length > 0 && !e.toUpperCase().includes("TBD");
}
