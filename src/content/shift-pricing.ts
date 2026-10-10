/**
 * Публичный прайс: только 11-часовая смена, три графика на месяц (ориентир).
 * Итог в КП и договоре может отличаться — ночь, пик, объект, резерв.
 */
import { PROFESSIONS } from "@/content/professions-cities";
import { getWarehouseHourlyRateRub } from "@/content/warehouse-hourly-rates";

/** Длительность одной рабочей смены для расчёта на витрине и в черновике КП. */
export const WAREHOUSE_SHIFT_HOURS = 11;

/** Среднее число недель в календарном месяце для ориентира фонда. */
export const SHIFTS_PER_MONTH_WEEKS = 4.3;

export type MonthlyShiftScheduleId = "7d" | "6d-sun" | "5d";

export type MonthlyShiftSchedule = {
  id: MonthlyShiftScheduleId;
  /** Заголовок колонки в таблице */
  label: string;
  /** Пояснение под заголовком */
  hint: string;
  workDaysPerWeek: number;
};

/** Три сценария графика — как в брифе заказчика. */
export const MONTHLY_SHIFT_SCHEDULES: MonthlyShiftSchedule[] = [
  {
    id: "7d",
    label: "Без выходных",
    hint: "График склада: 7 дней в неделю · около 30 смен в месяц",
    workDaysPerWeek: 7,
  },
  {
    id: "6d-sun",
    label: "Воскресенье выходной",
    hint: "График склада: 6 дней в неделю · около 26 смен в месяц",
    workDaysPerWeek: 6,
  },
  {
    id: "5d",
    label: "Два выходных в неделю",
    hint: "График склада: 5 дней в неделю · около 22 смен в месяц",
    workDaysPerWeek: 5,
  },
];

export function shiftsPerMonthForSchedule(workDaysPerWeek: number): number {
  return workDaysPerWeek * SHIFTS_PER_MONTH_WEEKS;
}

export function pricePerShiftRub(hourlyRub: number): number {
  return Math.round(hourlyRub * WAREHOUSE_SHIFT_HOURS);
}

/** Ориентир ₽/мес на одного человека при выбранном графике (день, без ночи и пика). */
export function pricePerPersonPerMonthRub(hourlyRub: number, workDaysPerWeek: number): number {
  const shifts = shiftsPerMonthForSchedule(workDaysPerWeek);
  return Math.round(hourlyRub * WAREHOUSE_SHIFT_HOURS * shifts);
}

export type ShiftPricingRow = {
  slug: string;
  titleRu: string;
  hourlyRub: number;
  perShiftRub: number;
  monthlyBySchedule: Record<MonthlyShiftScheduleId, number>;
};

const PRICING_PROFESSION_SLUGS = [
  "gruzchiki",
  "razdorabochie",
  "komplektovschiki",
  "kladovschiki",
  "voditeli-prt",
  "klinery",
] as const;

export function getShiftPricingRows(): ShiftPricingRow[] {
  return PRICING_PROFESSION_SLUGS.map((slug) => {
    const hourlyRub = getWarehouseHourlyRateRub(slug);
    const prof = PROFESSIONS.find((p) => p.slug === slug);
    const monthlyBySchedule = Object.fromEntries(
      MONTHLY_SHIFT_SCHEDULES.map((s) => [s.id, pricePerPersonPerMonthRub(hourlyRub, s.workDaysPerWeek)]),
    ) as Record<MonthlyShiftScheduleId, number>;

    return {
      slug,
      titleRu: prof?.titleRu ?? slug,
      hourlyRub,
      perShiftRub: pricePerShiftRub(hourlyRub),
      monthlyBySchedule,
    };
  });
}

/** Средневзвешенный фонд по строкам (для КП). */
export function monthlyFundFromLines(
  lines: { slug: string; headcount: number }[],
  scheduleId: MonthlyShiftScheduleId = "6d-sun",
): number {
  const schedule = MONTHLY_SHIFT_SCHEDULES.find((s) => s.id === scheduleId) ?? MONTHLY_SHIFT_SCHEDULES[1];
  return lines.reduce((sum, ln) => {
    const hourly = getWarehouseHourlyRateRub(ln.slug);
    return sum + pricePerPersonPerMonthRub(hourly, schedule.workDaysPerWeek) * ln.headcount;
  }, 0);
}
