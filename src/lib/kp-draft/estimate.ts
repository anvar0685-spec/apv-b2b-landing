import { getProfession } from "@/content/professions-cities";
import { getWarehouseHourlyRateRub } from "@/content/warehouse-hourly-rates";

const HOURS_PER_WEEK = 40;
const WEEKS_PER_MONTH = 4.3;

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
  monthlyMid: number;
  low: number;
  high: number;
};

/** Несколько профилей: фонд — сумма помесячных ориентиров по строкам; вилка ±10% от итога. */
export function kpDraftMonthlyEstimateFromLines(lines: { slug: string; headcount: number }[]): KpDraftEstimateResult {
  const fundLines: KpFundLine[] = [];
  let sumHc = 0;
  let sumRateHc = 0;

  for (const { slug, headcount } of lines) {
    const hourlyBase = getWarehouseHourlyRateRub(slug);
    sumHc += headcount;
    sumRateHc += hourlyBase * headcount;
    const monthlyMid = Math.round(hourlyBase * HOURS_PER_WEEK * WEEKS_PER_MONTH * headcount);
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

  return {
    fundLines,
    weightedHourly,
    totalHeadcount: sumHc,
    monthlyMid: monthlyTotal,
    low: Math.round(monthlyTotal * 0.9),
    high: Math.round(monthlyTotal * 1.1),
  };
}

/** Одна профессия — обёртка для обратной совместимости. */
export function kpDraftMonthlyEstimate(headcount: number, professionSlug: string): KpDraftEstimateResult {
  return kpDraftMonthlyEstimateFromLines([{ slug: professionSlug, headcount }]);
}
