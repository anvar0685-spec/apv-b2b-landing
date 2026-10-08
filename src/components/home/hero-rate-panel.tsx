"use client";

import { WAREHOUSE_HOURLY_RATE_RUB } from "@/content/warehouse-hourly-rates";

const ROWS = [
  {
    label: "Грузчики, разнорабочие, уборщики",
    rate: WAREHOUSE_HOURLY_RATE_RUB.gruzchiki,
  },
  {
    label: "Комплектовщики, упаковщики, сборщики",
    rate: WAREHOUSE_HOURLY_RATE_RUB.komplektovschiki,
  },
  {
    label: "Кладовщики",
    rate: WAREHOUSE_HOURLY_RATE_RUB.kladovschiki,
  },
  {
    label: "Водители ПРТ и погрузчиков",
    rate: WAREHOUSE_HOURLY_RATE_RUB["voditeli-prt"],
  },
] as const;

export function HeroRatePanel() {
  return (
    <figure className="relative w-full min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md sm:p-6">
      <figcaption className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-on-dark-muted)]">
        Ориентир ставки · день · Москва и МО
      </figcaption>
      <p className="mt-3 font-display text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
        600–800 ₽/час
      </p>
      <ul className="mt-5 divide-y divide-white/10">
        {ROWS.map((row) => (
          <li key={row.label} className="flex items-baseline justify-between gap-4 py-2.5">
            <span className="text-sm text-[var(--text-on-dark-base)]">{row.label}</span>
            <span className="shrink-0 font-mono-nums text-sm font-semibold tabular-nums text-white">
              {row.rate} ₽
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs leading-relaxed text-[var(--text-on-dark-muted)]">
        Цифры — витринный ориентир до КП. Ночная смена +8%. Срок замены невыхода фиксируется в КП и
        договоре, не на баннере.
      </p>
    </figure>
  );
}
