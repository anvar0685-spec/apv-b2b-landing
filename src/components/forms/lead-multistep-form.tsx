"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { CITIES, PROFESSIONS } from "@/content/professions-cities";
import { trackEvent } from "@/lib/analytics";
import { Link } from "@/i18n/navigation";

export function LeadMultistepForm() {
  const sp = useSearchParams();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceType, setServiceType] = useState(() => sp.get("service") ?? "autstaffing");
  const [profession, setProfession] = useState(() => sp.get("profession") ?? "gruzchiki");
  const [city, setCity] = useState(() => sp.get("city") ?? "moskva");
  const [headcount, setHeadcount] = useState(() => Number(sp.get("headcount") ?? 20) || 20);
  const [comment, setComment] = useState("");
  const [consent, setConsent] = useState(false);
  const [doneId, setDoneId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pct = useMemo(() => ((step + 1) / 3) * 100, [step]);

  const submit = async () => {
    setError(null);
    if (!consent) {
      setError("Нужно согласие на обработку персональных данных.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/v1/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: company,
          contactName: name,
          contactPhone: phone,
          serviceType,
          profession,
          city,
          headcount,
          comment,
          source: "multistep_form",
        }),
      });
      const data = (await res.json()) as { id?: string; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Ошибка отправки");
      setDoneId(data.id ?? "—");
      void trackEvent("form_submit_main", { form: "zayavka", id: data.id });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка");
    } finally {
      setLoading(false);
    }
  };

  if (doneId) {
    return (
      <div className="rounded-2xl border border-[var(--neutral-200)] bg-white p-8 text-center shadow-sm">
        <p className="font-display text-xl font-semibold text-[var(--primary)]">
          Заявка получена
        </p>
        <p className="mt-3 text-sm text-[var(--neutral-700)]">
          Номер заявки: <span className="font-mono-nums font-semibold">{doneId}</span>. Менеджер
          свяжется в течение 15 минут в рабочее время (заглушка SLA).
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[var(--neutral-200)] bg-white p-6 shadow-sm md:p-10">
      <Progress value={pct} />
      <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[var(--neutral-500)]">
        Шаг {step + 1} из 3
      </p>
      {error ? (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
          {error}
        </p>
      ) : null}
      {step === 0 ? (
        <div className="mt-6 space-y-4">
          <div>
            <Label htmlFor="nm">Имя</Label>
            <Input id="nm" value={name} onChange={(e) => setName(e.target.value)} className="mt-2" required />
          </div>
          <div>
            <Label htmlFor="co">Компания</Label>
            <Input id="co" value={company} onChange={(e) => setCompany(e.target.value)} className="mt-2" required />
          </div>
          <div>
            <Label htmlFor="ph">Телефон</Label>
            <Input id="ph" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-2" required />
          </div>
        </div>
      ) : null}
      {step === 1 ? (
        <div className="mt-6 space-y-4">
          <div>
            <Label htmlFor="svc">Тип услуги</Label>
            <select
              id="svc"
              className="mt-2 flex h-11 w-full rounded-xl border border-[var(--neutral-200)] bg-white px-3 text-sm"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
            >
              <option value="autstaffing">Аутстаффинг</option>
              <option value="autsorsing">Аутсорсинг</option>
              <option value="managed">Managed service</option>
            </select>
          </div>
          <div>
            <Label htmlFor="pr">Профессия</Label>
            <select
              id="pr"
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
          <div>
            <Label htmlFor="hc">Количество человек</Label>
            <Input
              id="hc"
              type="number"
              min={1}
              value={headcount}
              onChange={(e) => setHeadcount(Number(e.target.value) || 1)}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="ci">Город</Label>
            <select
              id="ci"
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
        </div>
      ) : null}
      {step === 2 ? (
        <div className="mt-6 space-y-4">
          <div>
            <Label htmlFor="cm">Комментарий</Label>
            <Textarea id="cm" value={comment} onChange={(e) => setComment(e.target.value)} className="mt-2" rows={4} />
          </div>
          <label className="flex items-start gap-3 text-sm text-[var(--neutral-700)]">
            <Checkbox checked={consent} onCheckedChange={(v) => setConsent(v === true)} className="mt-1" />
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
              if (step === 0 && (!name || !company || !phone)) {
                setError("Заполните имя, компанию и телефон.");
                return;
              }
              setError(null);
              setStep((s) => s + 1);
            }}
          >
            Далее
          </Button>
        ) : (
          <Button type="button" disabled={loading} onClick={() => void submit()}>
            {loading ? "Отправка…" : "Отправить"}
          </Button>
        )}
      </div>
    </div>
  );
}
