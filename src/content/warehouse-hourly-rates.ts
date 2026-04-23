/**
 * Ориентировочные ставки ₽/час для складского аутсорсинга (Москва и МО).
 * Используются в калькуляторе; итог в КП может отличаться.
 */
export const WAREHOUSE_HOURLY_RATE_RUB: Record<string, number> = {
  gruzchiki: 600,
  komplektovschiki: 620,
  kladovschiki: 650,
  "voditeli-prt": 750,
  razdorabochie: 600,
  klinery: 600,
  /** Не в отдельном прайсе — ориентир рядом с линейкой склада */
  "operatory-pogruzchika": 680,
  upakovschiki: 620,
  "voditeli-kategorii-b": 700,
  "sborschiki-upakovschiki": 620,
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
