"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { PROFESSIONS, CITIES } from "@/content/professions-cities";
import { getWarehouseHourlyRateRub, shiftMultiplier } from "@/content/warehouse-hourly-rates";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { trackEvent } from "@/lib/analytics";

const SERVICE_SLUG = "autsorsing" as const;

/** Профиль → численность → график → город → дополнения и итог */
const STEPS = 5;

export function CalculatorFull() {
  const sp = useSearchParams();
  const [step, setStep] = useState(0);
  const [profession, setProfession] = useState(() => sp.get("p") ?? "gruzchiki");
  const [headcount, setHeadcount] = useState(() => Number(sp.get("n") ?? 30) || 30);
  const [shift, setShift] = useState<"day" | "night" | "24">("day");
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [city, setCity] = useState("moskva");
  const [extraHousing, setExtraHousing] = useState(false);
  const [extraTransport, setExtraTransport] = useState(false);
  const [extraPeak, setExtraPeak] = useState(false);
  const [extraCompliance, setExtraCompliance] = useState(false);

  const hourlyBase = useMemo(() => getWarehouseHourlyRateRub(profession), [profession]);
  const hourlyEffective = useMemo(
    () => Math.round(hourlyBase * shiftMultiplier(shift)),
    [hourlyBase, shift],
  );

  const estimate = useMemo(() => {
    const hours = hoursPerWeek * 4.3;
    const subtotal = hourlyEffective * hours * headcount;
    const compliancePrem = extraCompliance ? subtotal * 0.06 : 0;
    const extras =
      (extraHousing ? headcount * 8000 : 0) +
      (extraTransport ? headcount * 3000 : 0) +
      (extraPeak ? subtotal * 0.08 : 0);
    const total = Math.round(subtotal + compliancePrem + extras);
    const low = Math.round(total * 0.9);
    const high = Math.round(total * 1.1);
    return { low, high, total };
  }, [
    hourlyEffective,
    hoursPerWeek,
    headcount,
    extraHousing,
    extraTransport,
    extraPeak,
    extraCompliance,
  ]);

  const pct = ((step + 1) / STEPS) * 100;

  const next = () => setStep((s) => Math.min(STEPS - 1, s + 1));
  const prev = () => setStep((s) => Math.max(0, s - 1));

  return (
    <div className="mx-auto max-w-[720px] px-4 py-12 sm:px-6 lg:py-16">
      <h1 className="font-display text-3xl font-bold text-[var(--primary)] md:text-4xl">
        Калькулятор складского аутсорсинга
      </h1>
      <p className="mt-3 text-[var(--neutral-700)]">
        Ориентир по ставкам <strong>₽/час</strong> для Москвы и МО: грузчики 600, комплектовщики 620, кладовщики 650,
        водители ПРТ 750, разнорабочие и уборщики 600. Ночь и сутки дают надбавку к ставке; итог — вилка ±10% к
        месячному фонду, финальные цифры — в КП и договоре.
      </p>
      <Card className="mt-10">
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
            <Label htmlFor="prof">Профессия на складе</Label>
            <select
              id="prof"
              className="mt-2 flex h-11 w-full rounded-xl border border-[var(--neutral-200)] bg-[var(--card)] px-3 text-sm"
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
              Для выбранной роли базовая ставка:{" "}
              <span className="font-mono-nums font-semibold text-[var(--primary)]">{hourlyBase} ₽/ч</span>
            </p>
          </div>
        ) : null}
        {step === 1 ? (
          <div>
            <Label htmlFor="hc">Количество человек</Label>
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
          <div className="space-y-4">
            <div>
              <Label>График</Label>
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
                    className={`rounded-full border px-4 py-2 text-sm font-medium ${
                      shift === k
                        ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                        : "border-[var(--neutral-200)]"
                    }`}
                  >
                    {lab}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-[var(--neutral-500)]">
                С учётом графика: <span className="font-mono-nums font-semibold">{hourlyEffective} ₽/ч</span> на
                человека
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
        {step === 3 ? (
          <div>
            <Label htmlFor="city">Город (МО)</Label>
            <select
              id="city"
              className="mt-2 flex h-11 w-full rounded-xl border border-[var(--neutral-200)] bg-[var(--card)] px-3 text-sm"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              {CITIES.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.nameRu}
                </option>
              ))}
            </select>
          </div>
        ) : null}
        {step === 4 ? (
          <>
            <div className="space-y-4 border-b border-[var(--neutral-200)] pb-6">
              <p className="text-sm font-semibold text-[var(--primary)]">Дополнительно</p>
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
                Высокий сезон
              </label>
              <label className="flex items-center gap-3 text-sm text-[var(--neutral-700)]">
                <Checkbox checked={extraCompliance} onCheckedChange={(v) => setExtraCompliance(v === true)} />
                Расширенный compliance (маркетплейс / DC)
              </label>
            </div>
            <div className="mt-8 rounded-2xl bg-[var(--surface)] p-6">
              <CardTitle>Предварительный расчёт</CardTitle>
              <CardDescription className="mt-2">
                Вилка ±10% к месячному фонду: от {estimate.low.toLocaleString("ru-RU")} до{" "}
                {estimate.high.toLocaleString("ru-RU")} ₽ / мес (оценка).
              </CardDescription>
              <p className="mt-4 font-mono-nums text-2xl font-bold text-[var(--primary)]">
                ~{estimate.total.toLocaleString("ru-RU")} ₽
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

        <div className="mt-8 flex flex-wrap justify-between gap-3">
          <Button type="button" variant="secondary" disabled={step === 0} onClick={prev}>
            Назад
          </Button>
          {step < STEPS - 1 ? (
            <Button type="button" onClick={next}>
              Далее
            </Button>
          ) : null}
        </div>
      </Card>
    </div>
  );
}
