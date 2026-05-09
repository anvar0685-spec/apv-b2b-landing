import { getWarehouseHourlyRateRub } from "@/content/warehouse-hourly-rates";

/** Упрощённый ориентир как на калькуляторе: дневная смена, ~40 ч/нед, без надбавок за ночь/пик/жильё. */
export function kpDraftMonthlyEstimate(headcount: number, professionSlug: string) {
  const hourlyBase = getWarehouseHourlyRateRub(professionSlug);
  const hoursPerWeek = 40;
  const weeksPerMonth = 4.3;
  const monthlyMid = Math.round(hourlyBase * hoursPerWeek * weeksPerMonth * headcount);
  const low = Math.round(monthlyMid * 0.9);
  const high = Math.round(monthlyMid * 1.1);
  return { hourlyBase, monthlyMid, low, high };
}
