/**
 * Ориентировочные ставки ₽/час для складского аутсорсинга (Москва и МО).
 * Используются в калькуляторе и черновике КП (`kpDraftMonthlyEstimate`).
 */
/** Прайс заказчика (₽/ч, день; Москва/МО). */
export const WAREHOUSE_HOURLY_RATE_RUB: Record<string, number> = {
  gruzchiki: 600,
  razdorabochie: 600,
  klinery: 600,
  komplektovschiki: 650,
  upakovschiki: 650,
  "sborschiki-upakovschiki": 650,
  kladovschiki: 680,
  /** Водители ПРТ + операторы погрузчика — одна линейка на витрине. */
  "voditeli-prt": 800,
};

/** Старые slug → канонический ключ ставки (заявки/КП до смены каталога). */
const WAREHOUSE_HOURLY_RATE_CANONICAL: Record<string, keyof typeof WAREHOUSE_HOURLY_RATE_RUB> = {
  "operatory-pogruzchika": "voditeli-prt",
};

export function getWarehouseHourlyRateRub(professionSlug: string): number {
  const key = WAREHOUSE_HOURLY_RATE_CANONICAL[professionSlug] ?? professionSlug;
  return WAREHOUSE_HOURLY_RATE_RUB[key] ?? 600;
}

/** Надбавка к часовой ставке за ночь / сутки (ориентир). */
export function shiftMultiplier(shift: "day" | "night" | "24"): number {
  if (shift === "night") return 1.08;
  if (shift === "24") return 1.12;
  return 1;
}
