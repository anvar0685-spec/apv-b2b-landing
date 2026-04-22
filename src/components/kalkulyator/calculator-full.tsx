"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { PROFESSIONS, CITIES } from "@/content/professions-cities";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { trackEvent } from "@/lib/analytics";

const SERVICES = [
  { id: "autstaffing", label: "Аутстаффинг" },
  { id: "autsorsing", label: "Аутсорсинг" },
  { id: "managed", label: "Managed service" },
] as const;

/** 5 основных шагов + шаг дополнений и результата (как в брифе). */
const STEPS = 6;

export function CalculatorFull() {
  const sp = useSearchParams();
  const [step, setStep] = useState(0);
  const [service, setService] = useState(() => sp.get("s") ?? "autstaffing");
  const [profession, setProfession] = useState(() => sp.get("p") ?? "gruzchiki");
  const [headcount, setHeadcount] = useState(() => Number(sp.get("n") ?? 30) || 30);
  const [shift, setShift] = useState<"day" | "night" | "24">("day");
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [city, setCity] = useState("moskva");
  const [extraHousing, setExtraHousing] = useState(false);
  const [extraTransport, setExtraTransport] = useState(false);
  const [extraPeak, setExtraPeak] = useState(false);
  const [extraCompliance, setExtraCompliance] = useState(false);

  const estimate = useMemo(() => {
    const baseRate = shift === "night" ? 520 : shift === "24" ? 680 : 450;
    const hours = hoursPerWeek * 4.3;
    const subtotal = baseRate * hours * headcount;
    const compliancePrem = extraCompliance ? subtotal * 0.06 : 0;
    const extras =
      (extraHousing ? headcount * 8000 : 0) +
      (extraTransport ? headcount * 3000 : 0) +
      (extraPeak ? subtotal * 0.08 : 0);
    const total = Math.round(subtotal + compliancePrem + extras);
    const low = Math.round(total * 0.85);
    const high = Math.round(total * 1.15);
    return { low, high, total };
  }, [
    shift,
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
        Калькулятор стоимости
      </h1>
      <p className="mt-3 text-[var(--neutral-700)]">
        Пять шагов по брифу + опциональный блок дополнений. Итог — вилка ±15% (демо-формула,
        не оферта).
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
          <div className="grid gap-3 sm:grid-cols-3">
            {SERVICES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setService(s.id)}
                className={`rounded-2xl border px-4 py-4 text-left text-sm font-semibold transition ${
                  service === s.id
                    ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--primary)]"
                    : "border-[var(--neutral-200)] bg-white text-[var(--neutral-700)] hover:border-[var(--accent)]"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        ) : null}
        {step === 1 ? (
          <div>
            <Label htmlFor="prof">Профессия</Label>
            <select
              id="prof"
              className="mt-2 flex h-11 w-full rounded-xl border border-[var(--neutral-200)] bg-white px-3 text-sm"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
            >
              {PROFESSIONS.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.titleRu}
                </option>
              ))}
            </select>
          </div>
        ) : null}
        {step === 2 ? (
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
        {step === 3 ? (
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
            <Label htmlFor="city">Город (МО)</Label>
            <select
              id="city"
              className="mt-2 flex h-11 w-full rounded-xl border border-[var(--neutral-200)] bg-white px-3 text-sm"
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
        {step === 5 ? (
          <div className="space-y-4 border-t border-[var(--neutral-200)] pt-6">
            <p className="text-sm font-semibold text-[var(--primary)]">Дополнительно</p>
            <label className="flex items-center gap-3 text-sm text-[var(--neutral-700)]">
              <Checkbox checked={extraHousing} onCheckedChange={(v) => setExtraHousing(v === true)} />
              Нужно жильё
            </label>
            <label className="flex items-center gap-3 text-sm text-[var(--neutral-700)]">
              <Checkbox
                checked={extraTransport}
                onCheckedChange={(v) => setExtraTransport(v === true)}
              />
              Нужен транспорт
            </label>
            <label className="flex items-center gap-3 text-sm text-[var(--neutral-700)]">
              <Checkbox checked={extraPeak} onCheckedChange={(v) => setExtraPeak(v === true)} />
              Высокий сезон
            </label>
            <label className="flex items-center gap-3 text-sm text-[var(--neutral-700)]">
              <Checkbox
                checked={extraCompliance}
                onCheckedChange={(v) => setExtraCompliance(v === true)}
              />
              Compliance под маркетплейс
            </label>
          </div>
        ) : null}

        {step === 5 ? (
          <div className="mt-8 rounded-2xl bg-[var(--surface)] p-6">
            <CardTitle>Предварительный расчёт</CardTitle>
            <CardDescription className="mt-2">
              Вилка ±15%: от {estimate.low.toLocaleString("ru-RU")} до{" "}
              {estimate.high.toLocaleString("ru-RU")} ₽ / мес (демо).
            </CardDescription>
            <p className="mt-4 font-mono-nums text-2xl font-bold text-[var(--primary)]">
              ~{estimate.total.toLocaleString("ru-RU")} ₽
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button
                type="button"
                onClick={() =>
                  void trackEvent("calculator_completed", {
                    service,
                    profession,
                    city,
                    headcount,
                    estimate: estimate.total,
                  })
                }
                asChild
              >
                <Link
                  href={`/zayavka?service=${service}&profession=${profession}&city=${city}&headcount=${headcount}`}
                >
                  Получить точный расчёт и КП
                </Link>
              </Button>
            </div>
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap justify-between gap-3">
          <Button type="button" variant="secondary" disabled={step === 0} onClick={prev}>
            Назад
          </Button>
          {step < 5 ? (
            <Button type="button" onClick={next}>
              Далее
            </Button>
          ) : null}
        </div>
      </Card>
    </div>
  );
}
