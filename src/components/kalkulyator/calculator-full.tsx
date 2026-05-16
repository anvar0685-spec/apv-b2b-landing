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
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const SERVICE_SLUG = "autsorsing" as const;
const HOURS_SHIFT = 12;
/** 5 шагов + экран срока/итога (нед. 7 мастер-док: профиль → численность → формат → локация → срок/доп. → результат). */
const STEPS = 6;

type WorkFormat = "permanent" | "seasonal" | "night" | "oneoff";

const FORMATS: { id: WorkFormat; label: string; hint: string }[] = [
  { id: "permanent", label: "Постоянный персонал", hint: "База ~40 ч/нед" },
  { id: "seasonal", label: "Сезон / пик", hint: "Выше часов + пиковая надбавка" },
  { id: "night", label: "Ночные смены", hint: "Надбавка к ставке по смене" },
  { id: "oneoff", label: "Разовый проект", hint: "Короткое окно, частичная занятость" },
];

export function CalculatorFull() {
  const sp = useSearchParams();
  const [step, setStep] = useState(0);
  const [profession, setProfession] = useState(() => sp.get("p") ?? "gruzchiki");
  const [headcount, setHeadcount] = useState(() => Number(sp.get("n") ?? 30) || 30);
  const [workFormat, setWorkFormat] = useState<WorkFormat>("permanent");
  const [shift, setShift] = useState<"day" | "night" | "24">("day");
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [city, setCity] = useState("moskva");
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
    const shift12 = Math.round(hourlyEffective * HOURS_SHIFT * headcount);
    const projectTotal = Math.round(total * durationMonths);
    return { low, high, total, shift12, projectTotal };
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

  return (
    <div className="mx-auto max-w-[720px]">
      <div className={panelClass}>
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-[var(--neutral-500)]">
            <span>
              Шаг {step + 1} / {STEPS}
            </span>
            <span>Прогресс</span>
          </div>
          <Progress value={pct} className="mt-2" />
        </div>
        {step === 0 ? (
          <div>
            <Label htmlFor="prof">Шаг 1. Профессия на складе</Label>
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
        ) : null}
        {step === 1 ? (
          <div>
            <Label htmlFor="hc">Шаг 2. Количество человек</Label>
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
            />
          </div>
        ) : null}
        {step === 2 ? (
          <div>
            <Label>Шаг 3. Формат работы (постоянный / сезон / ночь / разовый)</Label>
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
            <p className="mt-3 text-xs text-[var(--neutral-500)]">
              Пресечки по графику и смене можно уточнить на следующем шаге.
            </p>
          </div>
        ) : null}
        {step === 3 ? (
          <div className="space-y-4">
            <p className="text-sm font-semibold text-[var(--primary)]">Шаг 4. График (день / ночь / сутки) и часы</p>
            <div>
              <Label>Смена</Label>
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
        {step === 4 ? (
          <div>
            <Label htmlFor="city">Шаг 5. Локация (Москва / МО)</Label>
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
            <p className="mt-2 text-xs text-[var(--neutral-500)]">
              Для сравнения по городам — раздел «Персонал» и посадочные «профессия × город».
            </p>
          </div>
        ) : null}
        {step === 5 ? (
          <>
            <div className="space-y-4 border-b border-[var(--neutral-200)] pb-6">
              <p className="text-sm font-semibold text-[var(--primary)]">Шаг 6. Срок (месяцы) и доп. условия</p>
              <div>
                <Label htmlFor="dur">Длительность проекта, мес.</Label>
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
            <div className="mt-8 border border-[var(--neutral-200)] bg-[var(--surface)] p-5 dark:border-white/10 dark:bg-white/[0.04]">
              <h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-[var(--primary)] dark:text-white">
                Предварительный расчёт
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--neutral-600)] dark:text-white/65">
                Вилка к месячному фонду: от {estimate.low.toLocaleString("ru-RU")} до {estimate.high.toLocaleString("ru-RU")}{" "}
                ₽ / мес (оценка).
              </p>
              <ul className="type-body mt-4 space-y-2 text-[var(--neutral-700)]">
                <li>
                  <strong>Ставка с учётом смены:</strong> {hourlyEffective} ₽/ч
                </li>
                <li>
                  <strong>Ориентир за смену 12 ч (вся группа):</strong> {estimate.shift12.toLocaleString("ru-RU")} ₽
                </li>
                <li>
                  <strong>Оценка на месяц (вся группа, база):</strong> {estimate.total.toLocaleString("ru-RU")} ₽
                </li>
                <li>
                  <strong>Оценка на {durationMonths} мес.:</strong> {estimate.projectTotal.toLocaleString("ru-RU")} ₽
                </li>
              </ul>
              <p className="type-body mt-3 text-sm text-[var(--neutral-500)]">
                НДС, форма взаимодействия и пакет пика — в договоре. Разовый сценарий: сверяйтесь с заявкой и параметрами первых смен на объекте, а не
                только с цифрой в калькуляторе.
              </p>
              <p className="mt-4 font-mono-nums text-2xl font-bold text-[var(--primary)] dark:text-white">
                ~{estimate.total.toLocaleString("ru-RU")} ₽ <span className="text-base font-normal text-[var(--neutral-500)]">/ мес</span>
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
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
                    href={`/zayavka?service=${SERVICE_SLUG}&profession=${profession}&city=${city}&headcount=${headcount}`}
                  >
                    Получить точный расчёт и КП
                  </Link>
                </Button>
              </div>
            </div>
          </>
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
    </div>
  );
}
