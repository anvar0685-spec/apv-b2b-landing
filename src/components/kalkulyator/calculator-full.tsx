"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { PROFESSIONS, CITIES } from "@/content/professions-cities";
import { getWarehouseHourlyRateRub, shiftMultiplier } from "@/content/warehouse-hourly-rates";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { ShiftPricingTable } from "@/components/marketing/shift-pricing-table";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import {
  MONTHLY_SHIFT_SCHEDULES,
  WAREHOUSE_SHIFT_HOURS,
  pricePerPersonPerMonthRub,
  pricePerShiftRub,
} from "@/content/shift-pricing";
import {
  buildZayavkaHref,
  parseCalculatorSearchParams,
  resolveCitySlug,
  resolveProfessionSlug,
} from "@/lib/staffing-url-params";

const SERVICE_SLUG = "autsorsing" as const;
/** 3 шага ввода + экран результата */
const STEPS = 4;
const STEP_LABELS = ["Команда", "График", "Срок и условия", "Результат"] as const;

type WorkFormat = "permanent" | "seasonal" | "night" | "oneoff";

const FORMATS: { id: WorkFormat; label: string; hint: string }[] = [
  { id: "permanent", label: "Постоянная работа", hint: "Регулярный график на объекте" },
  { id: "seasonal", label: "Сезонное усиление", hint: "Пиковая нагрузка и расширенные часы" },
  { id: "night", label: "Ночные смены", hint: "Надбавка к ставке по согласованному графику" },
  { id: "oneoff", label: "Разовые работы", hint: "Короткий период или отдельные смены" },
];

function professionTitle(slug: string) {
  return PROFESSIONS.find((p) => p.slug === slug)?.titleRu ?? slug;
}

function cityTitle(slug: string) {
  return CITIES.find((c) => c.slug === slug)?.nameRu ?? slug;
}

export function CalculatorFull() {
  const sp = useSearchParams();
  const initial = useMemo(() => parseCalculatorSearchParams(sp), [sp]);
  const [step, setStep] = useState(0);
  const [profession, setProfession] = useState(() => initial.profession);
  const [headcount, setHeadcount] = useState(() => initial.headcount);
  const [workFormat, setWorkFormat] = useState<WorkFormat>("permanent");
  const [shift, setShift] = useState<"day" | "night" | "24">("day");
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [city, setCity] = useState(() => initial.city);

  useEffect(() => {
    setProfession(resolveProfessionSlug(sp.get("p")));
    setCity(resolveCitySlug(sp.get("city")));
    const n = sp.get("n");
    if (n) setHeadcount(Math.max(1, Number(n) || 30));
  }, [sp]);
  const [durationMonths, setDurationMonths] = useState(3);
  const [extraHousing, setExtraHousing] = useState(false);
  const [extraTransport, setExtraTransport] = useState(false);
  const [extraPeak, setExtraPeak] = useState(false);
  const [extraCompliance, setExtraCompliance] = useState(false);

  useEffect(() => {
    if (workFormat === "permanent") {
      setShift("day");
      setHoursPerWeek(40);
      setExtraPeak(false);
    }
    if (workFormat === "seasonal") {
      setShift("day");
      setHoursPerWeek(48);
      setExtraPeak(true);
    }
    if (workFormat === "night") {
      setShift("night");
      setHoursPerWeek(40);
      setExtraPeak(false);
    }
    if (workFormat === "oneoff") {
      setShift("day");
      setHoursPerWeek(30);
      setExtraPeak(false);
    }
  }, [workFormat]);

  const hourlyBase = useMemo(() => getWarehouseHourlyRateRub(profession), [profession]);
  const hourlyEffective = useMemo(
    () => Math.round(hourlyBase * shiftMultiplier(shift)),
    [hourlyBase, shift],
  );

  const estimate = useMemo(() => {
    const hours = hoursPerWeek * 4.3;
    const subtotal = hourlyEffective * hours * headcount;
    const compliancePrem = extraCompliance ? subtotal * 0.06 : 0;
    const peakLoad =
      workFormat === "seasonal" ? subtotal * 0.08 : extraPeak ? subtotal * 0.08 : 0;
    const extras =
      (extraHousing ? headcount * 8000 : 0) +
      (extraTransport ? headcount * 3000 : 0) +
      peakLoad;
    const total = Math.round(subtotal + compliancePrem + extras);
    const low = Math.round(total * 0.9);
    const high = Math.round(total * 1.1);
    const shift11 = pricePerShiftRub(hourlyEffective) * headcount;
    const monthlyBySchedule = Object.fromEntries(
      MONTHLY_SHIFT_SCHEDULES.map((s) => [
        s.id,
        Math.round(pricePerPersonPerMonthRub(hourlyEffective, s.workDaysPerWeek) * headcount),
      ]),
    ) as Record<(typeof MONTHLY_SHIFT_SCHEDULES)[number]["id"], number>;
    const projectTotal = Math.round(total * durationMonths);
    return { low, high, total, shift11, monthlyBySchedule, projectTotal };
  }, [
    hourlyEffective,
    hoursPerWeek,
    headcount,
    extraHousing,
    extraTransport,
    extraPeak,
    extraCompliance,
    workFormat,
    durationMonths,
  ]);

  const pct = ((step + 1) / STEPS) * 100;

  const next = () => setStep((s) => Math.min(STEPS - 1, s + 1));
  const prev = () => setStep((s) => Math.max(0, s - 1));

  const panelClass =
    "rounded-xl border border-[var(--neutral-200)] bg-[var(--card)] px-4 py-6 sm:px-6 dark:border-white/12 dark:bg-[var(--primary-dark)]/55";

  const summary = (
    <aside className="rounded-xl border border-[var(--neutral-200)] bg-[var(--surface)] p-4 text-sm dark:border-white/10">
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--neutral-500)]">Сейчас в расчёте</p>
      <ul className="mt-3 space-y-2 text-[var(--neutral-700)]">
        <li>
          <span className="text-[var(--neutral-500)]">Профессия:</span> {professionTitle(profession)}
        </li>
        <li>
          <span className="text-[var(--neutral-500)]">Численность:</span> {headcount} чел.
        </li>
        <li>
          <span className="text-[var(--neutral-500)]">Город:</span> {cityTitle(city)}
        </li>
        {step >= 1 ? (
          <li>
            <span className="text-[var(--neutral-500)]">График:</span> {hoursPerWeek} ч/нед., смена{" "}
            {shift === "day" ? "день" : shift === "night" ? "ночь" : "сутки"}
          </li>
        ) : null}
        {step >= 2 ? (
          <li>
            <span className="text-[var(--neutral-500)]">Срок:</span> {durationMonths} мес.
          </li>
        ) : null}
      </ul>
      {step < STEPS - 1 ? (
        <p className="mt-4 font-mono-nums text-lg font-bold text-[var(--primary)]">
          ~{estimate.total.toLocaleString("ru-RU")} ₽ <span className="text-xs font-normal">/ мес</span>
        </p>
      ) : null}
    </aside>
  );

  return (
    <div className="mx-auto max-w-[1080px]">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className={panelClass}>
          <div className="mb-6">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold uppercase tracking-wide text-[var(--neutral-500)]">
              <span>
                Шаг {step + 1} / {STEPS}: {STEP_LABELS[step]}
              </span>
            </div>
            <Progress value={pct} className="mt-2" />
          </div>

          {step === 0 ? (
            <div className="space-y-5">
              <div>
                <Label htmlFor="prof">Профессия</Label>
                <select
                  id="prof"
                  className="mt-2 flex h-11 w-full rounded-xl border border-[var(--neutral-200)] bg-[var(--card)] px-3 text-base sm:text-sm"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                >
                  {PROFESSIONS.map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.titleRu} — от {getWarehouseHourlyRateRub(p.slug)} ₽/ч
                    </option>
                  ))}
                </select>
                <p className="mt-3 text-xs text-[var(--neutral-500)]">
                  Базовая ставка:{" "}
                  <span className="font-mono-nums font-semibold text-[var(--primary)]">{hourlyBase} ₽/ч</span>
                </p>
              </div>
              <div>
                <Label htmlFor="hc">Численность</Label>
                <Input
                  id="hc"
                  type="number"
                  min={1}
                  max={500}
                  value={headcount}
                  onChange={(e) => setHeadcount(Number(e.target.value) || 1)}
                  className="mt-2"
                />
                <input
                  type="range"
                  min={1}
                  max={500}
                  value={headcount}
                  onChange={(e) => setHeadcount(Number(e.target.value))}
                  className="mt-4 w-full accent-[var(--accent)]"
                  aria-label="Численность ползунком"
                />
              </div>
              <div>
                <Label htmlFor="city">Город склада</Label>
                <select
                  id="city"
                  className="mt-2 flex h-11 w-full rounded-xl border border-[var(--neutral-200)] bg-[var(--card)] px-3 text-base sm:text-sm"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  {CITIES.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.nameRu}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-xs leading-relaxed text-[var(--neutral-500)]">
                  Выберите город, где находится склад. Точный адрес уточним при обсуждении задачи.
                </p>
              </div>
            </div>
          ) : null}

          {step === 1 ? (
            <div className="space-y-5">
              <div>
                <Label>Формат работы</Label>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {FORMATS.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setWorkFormat(f.id)}
                      className={cn(
                        "rounded-2xl border p-3 text-left text-sm transition",
                        workFormat === f.id
                          ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                          : "border-[var(--neutral-200)] bg-[var(--card)]",
                      )}
                    >
                      <span className="font-medium text-[var(--primary)]">{f.label}</span>
                      <span className="mt-1 block text-xs text-[var(--neutral-500)]">{f.hint}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label>Тип смены</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(
                    [
                      ["day", "День"],
                      ["night", "Ночь"],
                      ["24", "Сутки"],
                    ] as const
                  ).map(([k, lab]) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setShift(k)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm font-medium",
                        shift === k
                          ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                          : "border-[var(--neutral-200)]",
                      )}
                    >
                      {lab}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-xs text-[var(--neutral-500)]">
                  С учётом смены: <span className="font-mono-nums font-semibold">{hourlyEffective} ₽/ч</span> на человека
                </p>
              </div>
              <div>
                <Label htmlFor="hw">Часов в неделю на человека</Label>
                <Input
                  id="hw"
                  type="number"
                  min={12}
                  max={60}
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(Number(e.target.value) || 40)}
                  className="mt-2"
                />
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="dur">Срок работы, мес.</Label>
                <Input
                  id="dur"
                  type="number"
                  min={1}
                  max={36}
                  value={durationMonths}
                  onChange={(e) => setDurationMonths(Math.max(1, Math.min(36, Number(e.target.value) || 1)))}
                  className="mt-2"
                />
              </div>
              <label className="flex items-center gap-3 text-sm text-[var(--neutral-700)]">
                <Checkbox checked={extraHousing} onCheckedChange={(v) => setExtraHousing(v === true)} />
                Нужно жильё
              </label>
              <label className="flex items-center gap-3 text-sm text-[var(--neutral-700)]">
                <Checkbox checked={extraTransport} onCheckedChange={(v) => setExtraTransport(v === true)} />
                Нужен транспорт
              </label>
              <label className="flex items-center gap-3 text-sm text-[var(--neutral-700)]">
                <Checkbox checked={extraPeak} onCheckedChange={(v) => setExtraPeak(v === true)} />
                Пик / разгрузка сверх плана
              </label>
              <label className="flex items-center gap-3 text-sm text-[var(--neutral-700)]">
                <Checkbox checked={extraCompliance} onCheckedChange={(v) => setExtraCompliance(v === true)} />
                Жёсткие требования площадки (маркетплейс / РЦ): допуски и документы (+6% к ориентиру)
              </label>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="space-y-6">
              <div className="border border-[var(--neutral-200)] bg-[var(--surface)] p-5 dark:border-white/10">
                <h3 className="font-display text-lg font-semibold text-[var(--primary)]">Предварительный бюджет за месяц</h3>
                <p className="mt-4 font-mono-nums text-3xl font-bold text-[var(--primary)]">
                  ~{estimate.total.toLocaleString("ru-RU")} ₽
                </p>
                <p className="mt-2 text-sm text-[var(--neutral-600)]">
                  Диапазон: {estimate.low.toLocaleString("ru-RU")}–{estimate.high.toLocaleString("ru-RU")} ₽ / мес · за{" "}
                  {durationMonths} мес.: {estimate.projectTotal.toLocaleString("ru-RU")} ₽
                </p>
                <ul className="mt-4 space-y-1 text-sm text-[var(--neutral-700)]">
                  <li>{professionTitle(profession)}, {cityTitle(city)}, {headcount} чел.</li>
                  <li>
                    {hoursPerWeek} ч/нед., ставка {hourlyEffective} ₽/ч
                  </li>
                </ul>
                <div className="mt-6">
                  <Button
                    type="button"
                    onClick={() =>
                      void trackEvent("calculator_completed", {
                        service: SERVICE_SLUG,
                        profession,
                        city,
                        headcount,
                        workFormat,
                        durationMonths,
                        estimate: estimate.total,
                      })
                    }
                    asChild
                  >
                    <Link
                      href={buildZayavkaHref({
                        service: SERVICE_SLUG,
                        profession,
                        city,
                        headcount,
                      })}
                    >
                      Обсудить задачу
                    </Link>
                  </Button>
                </div>
              </div>

              <details className="rounded-xl border border-[var(--neutral-200)] p-4">
                <summary className="cursor-pointer text-sm font-semibold text-[var(--primary)]">
                  Примеры для других графиков
                </summary>
                <p className="mt-3 text-xs text-[var(--neutral-500)]">
                  Смена {WAREHOUSE_SHIFT_HOURS} ч; суммы на всю группу ({headcount} чел.) при другом числе рабочих дней в
                  неделю. База расчёта выше — {hoursPerWeek} ч/нед. на человека; ниже — ориентиры для 11-часовых смен.
                </p>
                <ul className="mt-3 space-y-2 text-sm text-[var(--neutral-700)]">
                  <li>
                    <strong>За смену {WAREHOUSE_SHIFT_HOURS} ч:</strong> {estimate.shift11.toLocaleString("ru-RU")} ₽
                  </li>
                  {MONTHLY_SHIFT_SCHEDULES.map((s) => (
                    <li key={s.id}>
                      <strong>Месяц · {s.label}:</strong> {estimate.monthlyBySchedule[s.id].toLocaleString("ru-RU")} ₽
                    </li>
                  ))}
                </ul>
              </details>

              <details className="rounded-xl border border-[var(--neutral-200)] p-4">
                <summary className="cursor-pointer text-sm font-semibold text-[var(--primary)]">
                  Общая тарифная таблица
                </summary>
                <ShiftPricingTable className="mt-4" compact />
              </details>

              <p className="text-xs leading-relaxed text-[var(--neutral-500)]">
                Предварительный бюджет рассчитан для среднего месяца — 4,3 недели. Транспорт, проживание и дополнительные
                требования объекта согласуем отдельно.
              </p>
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap justify-between gap-3 border-t border-[var(--neutral-200)] pt-6 dark:border-white/10">
            <Button type="button" variant="secondary" disabled={step === 0} onClick={prev}>
              Назад
            </Button>
            {step < STEPS - 1 ? (
              <Button type="button" onClick={next}>
                Далее
              </Button>
            ) : null}
          </div>
        </div>

        <div className="hidden lg:block">{summary}</div>
      </div>
      <div className="mt-4 lg:hidden">{summary}</div>
    </div>
  );
}
