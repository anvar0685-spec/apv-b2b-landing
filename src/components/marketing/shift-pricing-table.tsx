import {
  MONTHLY_SHIFT_SCHEDULES,
  WAREHOUSE_SHIFT_HOURS,
  getShiftPricingRows,
} from "@/content/shift-pricing";
import { cn } from "@/lib/utils";

function formatRub(n: number): string {
  return n.toLocaleString("ru-RU");
}

type Props = {
  className?: string;
  /** Компактнее на вложенных страницах */
  compact?: boolean;
};

export function ShiftPricingTable({ className, compact }: Props) {
  const rows = getShiftPricingRows();

  return (
    <section className={cn("min-w-0", className)} aria-labelledby="shift-pricing-title">
      <h2 id="shift-pricing-title" className="type-headline">
        Ориентир по ценам для коммерческого предложения
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--neutral-600)] dark:text-[var(--neutral-400)]">
        Считаем только <strong className="font-semibold text-[var(--primary)]">11-часовую смену</strong>{" "}
        (день, Москва и МО). В таблице — ориентир на{" "}
        <strong className="font-semibold text-[var(--primary)]">одного человека</strong> при трёх графиках на
        месяц. Итог по объекту = сумма по профилям × численность; ночь, пик и особые условия площадки — в
        согласованном КП.
      </p>

      <p className="mt-2 text-xs text-[var(--neutral-500)]">
        Не публичная оферта. Цифры для закупки и сравнения подрядчиков; обязательства — в договоре и КП после
        диагностики объекта.
      </p>

      <div
        className={cn(
          "mt-6 overflow-x-auto overscroll-x-contain rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)] [-webkit-overflow-scrolling:touch] dark:border-white/12",
          compact && "text-sm",
        )}
      >
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-[var(--surface)] text-xs uppercase tracking-wide text-[var(--neutral-500)]">
            <tr>
              <th className="px-4 py-3 font-semibold normal-case">Профиль</th>
              <th className="px-4 py-3">₽/час</th>
              <th className="px-4 py-3">
                ₽/смена
                <span className="mt-0.5 block font-normal normal-case text-[var(--neutral-400)]">
                  {WAREHOUSE_SHIFT_HOURS} ч
                </span>
              </th>
              {MONTHLY_SHIFT_SCHEDULES.map((s) => (
                <th key={s.id} className="px-4 py-3">
                  <span className="block normal-case">{s.label}</span>
                  <span className="mt-0.5 block font-normal normal-case text-[var(--neutral-400)]">
                    {s.hint}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.slug} className="border-t border-[var(--neutral-200)] dark:border-white/10">
                <td className="px-4 py-3 font-medium text-[var(--primary)]">{row.titleRu}</td>
                <td className="px-4 py-3 font-mono-nums tabular-nums">{formatRub(row.hourlyRub)}</td>
                <td className="px-4 py-3 font-mono-nums tabular-nums">{formatRub(row.perShiftRub)}</td>
                {MONTHLY_SHIFT_SCHEDULES.map((s) => (
                  <td key={s.id} className="px-4 py-3 font-mono-nums font-semibold tabular-nums text-[var(--primary)]">
                    {formatRub(row.monthlyBySchedule[s.id])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-[var(--neutral-500)]">
        Пример: 10 комплектовщиков при графике «воскресенье выходной» — ориентир{" "}
        <span className="font-mono-nums font-semibold text-[var(--primary)]">
          {formatRub(rows.find((r) => r.slug === "komplektovschiki")!.monthlyBySchedule["6d-sun"] * 10)}
        </span>{" "}
        ₽/мес по строке профиля (без НДС и без резерва).
      </p>
    </section>
  );
}
