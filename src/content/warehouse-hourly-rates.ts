/**
 * Ориентировочные ставки ₽/час для складского аутсорсинга (Москва и МО).
 * Используются в калькуляторе; итог в КП может отличаться.
 */
/** Прайс заказчика (₽/ч, ориентир на витрине; в КП может отличаться). */
export const WAREHOUSE_HOURLY_RATE_RUB: Record<string, number> = {
  gruzchiki: 600,
  razdorabochie: 600,
  komplektovschiki: 650,
  kladovschiki: 680,
  "voditeli-prt": 800,
  klinery: 600,
  /** В прайсе отдельно не названы — ориентир между комплектовщиком и кладовщиком */
  upakovschiki: 650,
  "sborschiki-upakovschiki": 650,
  "operatory-pogruzchika": 700,
  "voditeli-kategorii-b": 750,
  promoutery: 600,
};

export function getWarehouseHourlyRateRub(professionSlug: string): number {
  return WAREHOUSE_HOURLY_RATE_RUB[professionSlug] ?? 600;
}

/** Надбавка к часовой ставке за ночь / сутки (ориентир). */
export function shiftMultiplier(shift: "day" | "night" | "24"): number {
  if (shift === "night") return 1.08;
  if (shift === "24") return 1.12;
  return 1;
}
