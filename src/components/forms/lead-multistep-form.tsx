"use client";

import { useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, type FieldPath } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";
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
  createLeadMultistepStep0Schema,
  createLeadMultistepStep1Schema,
  createLeadMultistepStep2Schema,
  leadCreateSchema,
} from "@/lib/validations/lead";
import { Urgency } from "@prisma/client";
import type { ZodError } from "zod";

type FormValues = {
  contactName: string;
  companyName: string;
  contactPhone: string;
  contactEmail: string;
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
  const t = useTranslations("leadForm");
  const locale = useLocale();
  const sp = useSearchParams();
  const [step, setStep] = useState(0);
  const [doneMeta, setDoneMeta] = useState<{ id: string; kpEmailSent?: boolean } | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitErr, setSubmitErr] = useState<string | null>(null);

  const step0Schema = useMemo(
    () =>
      createLeadMultistepStep0Schema({
        nameMin: t("errors.nameMin"),
        companyMin: t("errors.companyMin"),
        phone: t("errors.phone"),
        emailInvalid: t("errors.emailInvalid"),
      }),
    [t],
  );

  const step1Schema = useMemo(
    () =>
      createLeadMultistepStep1Schema({
        headcountMin: t("errors.headcountMin"),
      }),
    [t],
  );
  const step2Schema = useMemo(
    () =>
      createLeadMultistepStep2Schema({
        consent: t("errors.consent"),
      }),
    [t],
  );

  const defaults = useMemo<FormValues>(() => {
    const svc = sp.get("service");
    const serviceType = svc === "autstaffing" || !svc ? "autsorsing" : svc.length >= 2 ? svc : "autsorsing";
    const topic = sp.get("topic");
    const commentPrefix = topic ? `Тема: ${topic}\n` : "";
    return {
      contactName: "",
      companyName: "",
      contactPhone: "",
      contactEmail: "",
      serviceType,
      profession: sp.get("profession") ?? "gruzchiki",
      city: sp.get("city") ?? "moskva",
      headcount: Number(sp.get("headcount") ?? 20) || 20,
      comment: commentPrefix,
      consent: false,
    };
  }, [sp]);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    setFocus,
    watch,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: defaults,
  });

  const formRef = useRef<HTMLFormElement>(null);

  const consent = watch("consent");
  const pct = ((step + 1) / 3) * 100;

  const firstFieldError = (err: ZodError): FieldPath<FormValues> | null => {
    const f = err.flatten().fieldErrors as Partial<
      Record<keyof FormValues, string[] | undefined>
    >;
    const order: FieldPath<FormValues>[] = [
      "contactName",
      "companyName",
      "contactPhone",
      "contactEmail",
      "serviceType",
      "profession",
      "headcount",
      "city",
      "comment",
      "consent",
    ];
    for (const k of order) {
      if (f[k]?.[0]) return k;
    }
    return null;
  };

  const validateStep0 = () => {
    clearErrors();
    const r = step0Schema.safeParse(getValues());
    if (!r.success) {
      applyFieldErrors(r.error, setError);
      const k = firstFieldError(r.error);
      if (k) setFocus(k);
      return false;
    }
    return true;
  };

  const validateStep1 = () => {
    clearErrors();
    const r = step1Schema.safeParse(getValues());
    if (!r.success) {
      applyFieldErrors(r.error, setError);
      const k = firstFieldError(r.error);
      if (k) setFocus(k);
      return false;
    }
    return true;
  };

  const onFinalSubmit = async (data: FormValues) => {
    clearErrors();
    const step2 = step2Schema.safeParse({
      comment: data.comment,
      consent: data.consent,
    });
    if (!step2.success) {
      applyFieldErrors(step2.error, setError);
      if (step2.error.flatten().fieldErrors.consent) setFocus("consent");
      else if (step2.error.flatten().fieldErrors.comment) setFocus("comment");
      return;
    }

    const payload = {
      companyName: data.companyName,
      contactName: data.contactName,
      contactPhone: data.contactPhone,
      contactEmail: data.contactEmail.trim() || undefined,
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
      const json = (await res.json()) as { id?: string; error?: string; kpEmailSent?: boolean };
      if (!res.ok) throw new Error(json.error ?? t("errors.submit"));
      setDoneMeta({ id: json.id ?? "—", kpEmailSent: json.kpEmailSent });
      void trackEvent("form_submit_main", { form: "zayavka", id: json.id });
    } catch (e) {
      setSubmitErr(e instanceof Error ? e.message : t("errors.submit"));
    } finally {
      setLoading(false);
    }
  };

  const profLabel = (p: (typeof PROFESSIONS)[number]) => p.titleRu;
  const cityLabel = (c: (typeof CITIES)[number]) => c.nameRu;

  if (doneMeta) {
    const thanksJson = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: t("thanksJsonLdName"),
      description: t("thanksJsonLdDesc"),
      url: absUrl("/zayavka", locale),
      isPartOf: { "@type": "WebSite", name: site.brandName, url: absUrl("/", locale) },
    };

    return (
      <div
        className="rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)] p-8 text-center shadow-[var(--card-shadow)]"
        role="status"
        aria-live="polite"
        tabIndex={-1}
      >
        <JsonLd data={thanksJson} />
        <p className="font-display text-xl font-semibold text-[var(--primary)]">{t("successTitle")}</p>
        <p className="mt-3 text-sm text-[var(--neutral-700)]">{t("successBody", { id: doneMeta.id })}</p>
        {doneMeta.kpEmailSent ? (
          <p className="mt-3 text-sm font-medium text-[var(--accent)]">{t("successKpLine")}</p>
        ) : null}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button asChild variant="secondary" size="sm">
            <Link href="/kalkulyator">Калькулятор</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/">На главную</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      className="rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)] p-6 shadow-[var(--card-shadow)] md:p-10"
      onSubmit={(e) => {
        e.preventDefault();
        if (step < 2) return;
        void handleSubmit(onFinalSubmit)(e);
      }}
      noValidate
    >
      <Progress value={pct} aria-label={t("stepLine", { current: step + 1, total: 3 })} />
      <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[var(--neutral-500)]">
        {t("stepLine", { current: step + 1, total: 3 })}
      </p>
      {submitErr ? (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800 dark:bg-red-950/40 dark:text-red-200" role="alert">
          {submitErr}
        </p>
      ) : null}
      {loading ? (
        <p className="mt-4 text-sm text-[var(--neutral-500)]" role="status" aria-live="polite">
          {t("submitting")}
        </p>
      ) : null}
      {step === 0 ? (
        <div className="mt-6 space-y-4">
          <div>
            <Label htmlFor="nm">{t("name")}</Label>
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
            <Label htmlFor="co">{t("company")}</Label>
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
            <Label htmlFor="ph">{t("phone")}</Label>
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
          <div>
            <Label htmlFor="em">{t("email")}</Label>
            <Input
              id="em"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder={t("emailPlaceholder")}
              aria-invalid={errors.contactEmail ? true : undefined}
              className="mt-2"
              {...register("contactEmail")}
            />
            <p className="mt-1 text-xs text-[var(--neutral-500)]">{t("emailHint")}</p>
            {errors.contactEmail ? (
              <p className="mt-1 text-xs text-red-600" role="alert">
                {errors.contactEmail.message}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
      {step === 1 ? (
        <div className="mt-6 space-y-4">
          <div>
            <Label htmlFor="svc">{t("serviceType")}</Label>
            <select
              id="svc"
              className="mt-2 flex h-11 w-full rounded-xl border border-[var(--neutral-200)] bg-white px-3 text-sm dark:bg-[var(--card)]"
              {...register("serviceType")}
            >
              <option value="autsorsing">{t("serviceAutsorsing")}</option>
              <option value="managed">{t("serviceManaged")}</option>
            </select>
            {errors.serviceType ? (
              <p className="mt-1 text-xs text-red-600" role="alert">
                {errors.serviceType.message}
              </p>
            ) : null}
          </div>
          <div>
            <Label htmlFor="pr">{t("profession")}</Label>
            <select
              id="pr"
              className="mt-2 flex h-11 w-full rounded-xl border border-[var(--neutral-200)] bg-white px-3 text-sm dark:bg-[var(--card)]"
              {...register("profession")}
            >
              {PROFESSIONS.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {profLabel(p)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="hc">{t("headcount")}</Label>
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
            <Label htmlFor="ci">{t("city")}</Label>
            <select
              id="ci"
              className="mt-2 flex h-11 w-full rounded-xl border border-[var(--neutral-200)] bg-white px-3 text-sm dark:bg-[var(--card)]"
              {...register("city")}
            >
              {CITIES.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {cityLabel(c)}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : null}
      {step === 2 ? (
        <div className="mt-6 space-y-4">
          <div>
            <Label htmlFor="cm">{t("comment")}</Label>
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
                {t("consentBefore")}{" "}
                <Link className="text-[var(--accent)] underline" href="/politika-konfidencialnosti">
                  {t("consentPrivacy")}
                </Link>{" "}
                {t("consentAnd")}{" "}
                <Link className="text-[var(--accent)] underline" href="/soglasie-na-obrabotku-pd">
                  {t("consentPd")}
                </Link>
                {t("consentAfter")}
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
          {t("back")}
        </Button>
        {step < 2 ? (
          <Button
            type="button"
            disabled={loading}
            onClick={() => {
              if (step === 0) {
                if (!validateStep0()) return;
              } else if (step === 1) {
                if (!validateStep1()) return;
              }
              setStep((s) => s + 1);
            }}
          >
            {t("next")}
          </Button>
        ) : (
          <Button type="submit" disabled={loading} aria-busy={loading}>
            {loading ? t("submitting") : t("submit")}
          </Button>
        )}
      </div>
    </form>
  );
}
