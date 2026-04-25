"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, type FieldPath } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { CITIES, PROFESSIONS } from "@/content/professions-cities";
import { trackEvent } from "@/lib/analytics";
import { Link } from "@/i18n/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { site } from "@/config/site";
import { absUrl } from "@/lib/abs-url";
import {
  leadCreateSchema,
  leadMultistepStep0Schema,
  leadMultistepStep1Schema,
  leadMultistepStep2Schema,
} from "@/lib/validations/lead";
import { Urgency } from "@prisma/client";
import { useLocale } from "next-intl";
import type { ZodError } from "zod";

type FormValues = {
  contactName: string;
  companyName: string;
  contactPhone: string;
  serviceType: string;
  profession: string;
  city: string;
  headcount: number;
  comment: string;
  consent: boolean;
};

function applyFieldErrors(
  err: ZodError,
  setError: (name: FieldPath<FormValues>, error: { message: string }) => void,
) {
  const flat = err.flatten().fieldErrors;
  for (const key of Object.keys(flat) as (keyof typeof flat)[]) {
    const msg = flat[key]?.[0];
    if (msg) setError(key as FieldPath<FormValues>, { message: msg });
  }
}

export function LeadMultistepForm() {
  const locale = useLocale();
  const sp = useSearchParams();
  const [step, setStep] = useState(0);
  const [doneId, setDoneId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitErr, setSubmitErr] = useState<string | null>(null);

  const defaults = useMemo<FormValues>(() => {
    const svc = sp.get("service");
    const serviceType = svc === "autstaffing" || !svc ? "autsorsing" : svc.length >= 2 ? svc : "autsorsing";
    return {
      contactName: "",
      companyName: "",
      contactPhone: "",
      serviceType,
      profession: sp.get("profession") ?? "gruzchiki",
      city: sp.get("city") ?? "moskva",
      headcount: Number(sp.get("headcount") ?? 20) || 20,
      comment: "",
      consent: false,
    };
  }, [sp]);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: defaults,
  });

  const consent = watch("consent");
  const pct = ((step + 1) / 3) * 100;

  const validateStep0 = () => {
    clearErrors();
    const r = leadMultistepStep0Schema.safeParse(getValues());
    if (!r.success) {
      applyFieldErrors(r.error, setError);
      return false;
    }
    return true;
  };

  const validateStep1 = () => {
    clearErrors();
    const r = leadMultistepStep1Schema.safeParse(getValues());
    if (!r.success) {
      applyFieldErrors(r.error, setError);
      return false;
    }
    return true;
  };

  const onFinalSubmit = async (data: FormValues) => {
    clearErrors();
    const step2 = leadMultistepStep2Schema.safeParse({
      comment: data.comment,
      consent: data.consent,
    });
    if (!step2.success) {
      applyFieldErrors(step2.error, setError);
      return;
    }

    const payload = {
      companyName: data.companyName,
      contactName: data.contactName,
      contactPhone: data.contactPhone,
      serviceType: data.serviceType,
      profession: data.profession,
      city: data.city,
      headcount: data.headcount,
      comment: data.comment.trim() || undefined,
      source: "multistep_form",
      urgency: Urgency.NORMAL,
    };

    const parsed = leadCreateSchema.safeParse(payload);
    if (!parsed.success) {
      applyFieldErrors(parsed.error, setError);
      return;
    }

    setSubmitErr(null);
    setLoading(true);
    try {
      const res = await fetch("/api/v1/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const json = (await res.json()) as { id?: string; error?: string };
      if (!res.ok) throw new Error(json.error ?? "Ошибка отправки");
      setDoneId(json.id ?? "—");
      void trackEvent("form_submit_main", { form: "zayavka", id: json.id });
    } catch (e) {
      setSubmitErr(e instanceof Error ? e.message : "Ошибка отправки");
    } finally {
      setLoading(false);
    }
  };

  if (doneId) {
    const thanksJson = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Заявка отправлена",
      description: "Подтверждение получения коммерческой заявки на расчёт.",
      url: absUrl("/zayavka", locale),
      isPartOf: { "@type": "WebSite", name: site.brandName, url: site.url.replace(/\/$/, "") },
    };

    return (
      <div className="rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)] p-8 text-center shadow-[var(--card-shadow)]">
        <JsonLd data={thanksJson} />
        <p className="font-display text-xl font-semibold text-[var(--primary)]">Заявка получена</p>
        <p className="mt-3 text-sm text-[var(--neutral-700)]">
          Номер заявки: <span className="font-mono-nums font-semibold">{doneId}</span>. Менеджер свяжется в течение 15
          минут в рабочее время — срок подтверждается в регламенте обслуживания клиентов.
        </p>
      </div>
    );
  }

  return (
    <form
      className="rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)] p-6 shadow-[var(--card-shadow)] md:p-10"
      onSubmit={(e) => {
        e.preventDefault();
        if (step < 2) return;
        void handleSubmit(onFinalSubmit)(e);
      }}
      noValidate
    >
      <Progress value={pct} />
      <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[var(--neutral-500)]">
        Шаг {step + 1} из 3
      </p>
      {submitErr ? (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
          {submitErr}
        </p>
      ) : null}
      {step === 0 ? (
        <div className="mt-6 space-y-4">
          <div>
            <Label htmlFor="nm">Имя</Label>
            <Input
              id="nm"
              aria-invalid={errors.contactName ? true : undefined}
              className="mt-2"
              {...register("contactName")}
            />
            {errors.contactName ? (
              <p className="mt-1 text-xs text-red-600" role="alert">
                {errors.contactName.message}
              </p>
            ) : null}
          </div>
          <div>
            <Label htmlFor="co">Компания</Label>
            <Input
              id="co"
              aria-invalid={errors.companyName ? true : undefined}
              className="mt-2"
              {...register("companyName")}
            />
            {errors.companyName ? (
              <p className="mt-1 text-xs text-red-600" role="alert">
                {errors.companyName.message}
              </p>
            ) : null}
          </div>
          <div>
            <Label htmlFor="ph">Телефон</Label>
            <Input
              id="ph"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              aria-invalid={errors.contactPhone ? true : undefined}
              className="mt-2"
              {...register("contactPhone")}
            />
            {errors.contactPhone ? (
              <p className="mt-1 text-xs text-red-600" role="alert">
                {errors.contactPhone.message}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
      {step === 1 ? (
        <div className="mt-6 space-y-4">
          <div>
            <Label htmlFor="svc">Тип услуги</Label>
            <select
              id="svc"
              className="mt-2 flex h-11 w-full rounded-xl border border-[var(--neutral-200)] bg-white px-3 text-sm dark:bg-[var(--card)]"
              {...register("serviceType")}
            >
              <option value="autsorsing">Складской аутсорсинг (Москва и МО)</option>
              <option value="managed">Управляемый подряд (по запросу)</option>
            </select>
            {errors.serviceType ? (
              <p className="mt-1 text-xs text-red-600" role="alert">
                {errors.serviceType.message}
              </p>
            ) : null}
          </div>
          <div>
            <Label htmlFor="pr">Профессия</Label>
            <select
              id="pr"
              className="mt-2 flex h-11 w-full rounded-xl border border-[var(--neutral-200)] bg-white px-3 text-sm dark:bg-[var(--card)]"
              {...register("profession")}
            >
              {PROFESSIONS.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.titleRu}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="hc">Количество человек</Label>
            <Input
              id="hc"
              type="number"
              min={1}
              className="mt-2"
              {...register("headcount", { valueAsNumber: true })}
            />
            {errors.headcount ? (
              <p className="mt-1 text-xs text-red-600" role="alert">
                {errors.headcount.message}
              </p>
            ) : null}
          </div>
          <div>
            <Label htmlFor="ci">Город</Label>
            <select
              id="ci"
              className="mt-2 flex h-11 w-full rounded-xl border border-[var(--neutral-200)] bg-white px-3 text-sm dark:bg-[var(--card)]"
              {...register("city")}
            >
              {CITIES.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.nameRu}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : null}
      {step === 2 ? (
        <div className="mt-6 space-y-4">
          <div>
            <Label htmlFor="cm">Комментарий</Label>
            <Textarea id="cm" className="mt-2" rows={4} {...register("comment")} />
            {errors.comment ? (
              <p className="mt-1 text-xs text-red-600" role="alert">
                {errors.comment.message}
              </p>
            ) : null}
          </div>
          <div>
            <label className="flex items-start gap-3 text-sm text-[var(--neutral-700)]">
              <Checkbox
                checked={consent}
                className="mt-1"
                onCheckedChange={(v) => setValue("consent", v === true, { shouldValidate: true })}
              />
              <span>
                Согласен(на) на обработку персональных данных в соответствии с{" "}
                <Link className="text-[var(--accent)] underline" href="/politika-konfidencialnosti">
                  политикой конфиденциальности
                </Link>{" "}
                и{" "}
                <Link className="text-[var(--accent)] underline" href="/soglasie-na-obrabotku-pd">
                  согласием
                </Link>
                .
              </span>
            </label>
            {errors.consent ? (
              <p className="mt-2 text-xs text-red-600" role="alert">
                {errors.consent.message}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
      <div className="mt-8 flex flex-wrap justify-between gap-3">
        <Button type="button" variant="secondary" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
          Назад
        </Button>
        {step < 2 ? (
          <Button
            type="button"
            onClick={() => {
              if (step === 0) {
                if (!validateStep0()) return;
              } else if (step === 1) {
                if (!validateStep1()) return;
              }
              setStep((s) => s + 1);
            }}
          >
            Далее
          </Button>
        ) : (
          <Button type="submit" disabled={loading}>
            {loading ? "Отправка…" : "Отправить"}
          </Button>
        )}
      </div>
    </form>
  );
}
