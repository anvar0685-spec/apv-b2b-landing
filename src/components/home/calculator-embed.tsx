"use client";

import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { PROFESSIONS } from "@/content/professions-cities";
import { getWarehouseHourlyRateRub } from "@/content/warehouse-hourly-rates";
import { trackEvent } from "@/lib/analytics";

const STEPS = ["Профессия", "Численность", "Ориентир"] as const;

export function CalculatorEmbed() {
  const [step, setStep] = useState(0);
  const [prof, setProf] = useState("gruzchiki");
  const [n, setN] = useState(30);

  const rate = useMemo(() => getWarehouseHourlyRateRub(prof), [prof]);
  const roughMonth = useMemo(() => Math.round(rate * 40 * 4.3 * n), [rate, n]);

  const pct = ((step + 1) / STEPS.length) * 100;

  return (
    <Card className="border-[var(--neutral-200)]">
      <CardTitle>Мини-калькулятор склада</CardTitle>
      <CardDescription>
        Ставки ₽/час как на полной странице «Калькулятор». Быстрый ориентир по месячному фонду (день, 40 ч/нед).
      </CardDescription>
      <div className="mt-6 space-y-4">
        <Progress value={pct} />
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--neutral-500)]">
          Шаг {step + 1} / {STEPS.length}: {STEPS[step]}
        </p>
        {step === 0 ? (
          <div>
            <Label htmlFor="ce-prof">Профессия</Label>
            <select
              id="ce-prof"
              className="mt-2 flex h-11 w-full rounded-xl border border-[var(--neutral-200)] bg-[var(--card)] px-3 text-sm"
              value={prof}
              onChange={(e) => setProf(e.target.value)}
            >
              {PROFESSIONS.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.titleRu} — {getWarehouseHourlyRateRub(p.slug)} ₽/ч
                </option>
              ))}
            </select>
          </div>
        ) : null}
        {step === 1 ? (
          <div>
            <Label htmlFor="ce-n">Количество человек</Label>
            <Input
              id="ce-n"
              type="number"
              min={1}
              value={n}
              onChange={(e) => setN(Number(e.target.value) || 1)}
              className="mt-2"
            />
          </div>
        ) : null}
        {step === 2 ? (
          <div className="rounded-xl border border-[var(--neutral-200)] bg-[var(--surface)] p-4 text-sm">
            <p className="font-mono-nums text-lg font-bold text-[var(--primary)]">
              ~{roughMonth.toLocaleString("ru-RU")} ₽ / мес
            </p>
            <p className="mt-2 text-xs text-[var(--neutral-500)]">
              Ориентир: {rate} ₽/ч × 40 ч × 4,3 нед × {n} чел. Ночь/сутки и допы — в полном калькуляторе.
            </p>
          </div>
        ) : null}
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="secondary"
            disabled={step === 0}
            onClick={() => setStep((s) => Math.max(0, s - 1))}
          >
            Назад
          </Button>
          {step < STEPS.length - 1 ? (
            <Button type="button" onClick={() => setStep((s) => s + 1)}>
              Далее
            </Button>
          ) : (
            <Button
              type="button"
              onClick={() => {
                void trackEvent("calculator_embed_completed", {
                  service: "autsorsing",
                  profession: prof,
                  headcount: n,
                });
              }}
              asChild
            >
              <Link href={`/kalkulyator?p=${prof}&n=${n}`}>Полный расчёт</Link>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
