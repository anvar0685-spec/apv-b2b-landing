import { getProfession } from "@/content/professions-cities";
import {
  MONTHLY_SHIFT_SCHEDULES,
  monthlyFundFromLines,
  pricePerPersonPerMonthRub,
  type MonthlyShiftScheduleId,
} from "@/content/shift-pricing";
import { getWarehouseHourlyRateRub } from "@/content/warehouse-hourly-rates";

/** График по умолчанию в черновике КП — воскресенье выходной (середина между 7/7 и 5/7). */
const DEFAULT_KP_SCHEDULE_ID: MonthlyShiftScheduleId = "6d-sun";

function scheduleById(id: MonthlyShiftScheduleId = DEFAULT_KP_SCHEDULE_ID) {
  return MONTHLY_SHIFT_SCHEDULES.find((s) => s.id === id) ?? MONTHLY_SHIFT_SCHEDULES[1];
}

export type KpFundLine = {
  slug: string;
  titleRu: string;
  hourlyBase: number;
  headcount: number;
  monthlyMid: number;
};

export type KpDraftEstimateResult = {
  fundLines: KpFundLine[];
  /** Средневзвешенная ставка ₽/ч по выбранным профилям (по численности). */
  weightedHourly: number;
  totalHeadcount: number;
  /** Основной ориентир в КП — график «воскресенье выходной». */
  monthlyMid: number;
  monthlyBySchedule: Record<MonthlyShiftScheduleId, number>;
  defaultScheduleLabel: string;
  low: number;
  high: number;
};

/** Несколько профилей: фонд — сумма помесячных ориентиров по строкам; вилка ±10% от итога. */
export function kpDraftMonthlyEstimateFromLines(lines: { slug: string; headcount: number }[]): KpDraftEstimateResult {
  const fundLines: KpFundLine[] = [];
  let sumHc = 0;
  let sumRateHc = 0;

  const schedule = scheduleById();

  for (const { slug, headcount } of lines) {
    const hourlyBase = getWarehouseHourlyRateRub(slug);
    sumHc += headcount;
    sumRateHc += hourlyBase * headcount;
    const perPerson = pricePerPersonPerMonthRub(hourlyBase, schedule.workDaysPerWeek);
    const monthlyMid = Math.round(perPerson * headcount);
    const prof = getProfession(slug);
    fundLines.push({
      slug,
      titleRu: prof?.titleRu ?? slug,
      hourlyBase,
      headcount,
      monthlyMid,
    });
  }

  const monthlyTotal = fundLines.reduce((s, l) => s + l.monthlyMid, 0);
  const weightedHourly = sumHc > 0 ? Math.round(sumRateHc / sumHc) : 0;
  const monthlyBySchedule = Object.fromEntries(
    MONTHLY_SHIFT_SCHEDULES.map((s) => [s.id, monthlyFundFromLines(lines, s.id)]),
  ) as Record<MonthlyShiftScheduleId, number>;

  return {
    fundLines,
    weightedHourly,
    totalHeadcount: sumHc,
    monthlyMid: monthlyTotal,
    monthlyBySchedule,
    defaultScheduleLabel: schedule.label,
    low: Math.round(monthlyTotal * 0.9),
    high: Math.round(monthlyTotal * 1.1),
  };
}

/** Одна профессия — обёртка для обратной совместимости. */
export function kpDraftMonthlyEstimate(headcount: number, professionSlug: string): KpDraftEstimateResult {
  return kpDraftMonthlyEstimateFromLines([{ slug: professionSlug, headcount }]);
}
