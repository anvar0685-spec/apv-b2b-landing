"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { PROFESSIONS } from "@/content/professions-cities";
import { getWarehouseHourlyRateRub } from "@/content/warehouse-hourly-rates";
import { trackEvent } from "@/lib/analytics";

export function CalculatorEmbed() {
  const locale = useLocale();
  const t = useTranslations("homePage.calculatorEmbed");
  const stepNames = t.raw("stepNames") as string[];

  const [step, setStep] = useState(0);
  const [prof, setProf] = useState("gruzchiki");
  const [n, setN] = useState(30);

  const rate = useMemo(() => getWarehouseHourlyRateRub(prof), [prof]);
  const roughMonth = useMemo(() => Math.round(rate * 40 * 4.3 * n), [rate, n]);

  const pct = ((step + 1) / stepNames.length) * 100;
  const nf = locale === "en" ? "en-US" : "ru-RU";

  return (
    <Card className="border-[var(--neutral-200)]">
      <CardTitle>{t("title")}</CardTitle>
      <CardDescription>{t("description")}</CardDescription>
      <div className="mt-6 space-y-4">
        <Progress value={pct} />
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--neutral-500)]">
          {t("stepLine", {
            current: step + 1,
            total: stepNames.length,
            name: stepNames[step] ?? "",
          })}
        </p>
        {step === 0 ? (
          <div>
            <Label htmlFor="ce-prof">{t("labelProfession")}</Label>
            <select
              id="ce-prof"
              className="mt-2 flex h-11 w-full rounded-xl border border-[var(--neutral-200)] bg-[var(--card)] px-3 text-sm"
              value={prof}
              onChange={(e) => setProf(e.target.value)}
            >
              {PROFESSIONS.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {locale === "en" ? p.titleEn : p.titleRu} — {getWarehouseHourlyRateRub(p.slug)} ₽/ч
                </option>
              ))}
            </select>
          </div>
        ) : null}
        {step === 1 ? (
          <div>
            <Label htmlFor="ce-n">{t("labelHeadcount")}</Label>
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
              ~{roughMonth.toLocaleString(nf)} {t("monthSuffix")}
            </p>
            <p className="mt-2 text-xs text-[var(--neutral-500)]">
              {t("monthHint", { rate, n })}
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
            {t("back")}
          </Button>
          {step < stepNames.length - 1 ? (
            <Button type="button" onClick={() => setStep((s) => s + 1)}>
              {t("next")}
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
              <Link href={`/kalkulyator?p=${prof}&n=${n}`}>{t("fullCalc")}</Link>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
