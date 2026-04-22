"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { trackEvent } from "@/lib/analytics";

const STEPS = ["Услуга", "Профиль", "Численность"] as const;

export function CalculatorEmbed() {
  const [step, setStep] = useState(0);
  const [service, setService] = useState("autstaffing");
  const [prof, setProf] = useState("gruzchiki");
  const [n, setN] = useState(30);

  const pct = ((step + 1) / STEPS.length) * 100;

  return (
    <Card className="border-[var(--neutral-200)]">
      <CardTitle>Мини-калькулятор (3 шага)</CardTitle>
      <CardDescription>
        Полная версия — на странице «Калькулятор». Здесь — быстрый прогрев лида.
      </CardDescription>
      <div className="mt-6 space-y-4">
        <Progress value={pct} />
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--neutral-500)]">
          Шаг {step + 1} / {STEPS.length}: {STEPS[step]}
        </p>
        {step === 0 ? (
          <div className="grid gap-2 sm:grid-cols-3">
            {[
              { id: "autstaffing", t: "Аутстаффинг" },
              { id: "autsorsing", t: "Аутсорсинг" },
              { id: "managed", t: "Managed" },
            ].map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => setService(o.id)}
                className={`rounded-xl border px-3 py-3 text-left text-sm font-medium transition ${
                  service === o.id
                    ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--primary)]"
                    : "border-[var(--neutral-200)] bg-white text-[var(--neutral-700)] hover:border-[var(--accent)]"
                }`}
              >
                {o.t}
              </button>
            ))}
          </div>
        ) : null}
        {step === 1 ? (
          <div>
            <Label htmlFor="ce-prof">Профессия (slug)</Label>
            <Input
              id="ce-prof"
              value={prof}
              onChange={(e) => setProf(e.target.value)}
              className="mt-2"
            />
          </div>
        ) : null}
        {step === 2 ? (
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
                  service,
                  profession: prof,
                  headcount: n,
                });
              }}
              asChild
            >
              <Link href={`/kalkulyator?s=${service}&p=${prof}&n=${n}`}>
                Полный расчёт
              </Link>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
