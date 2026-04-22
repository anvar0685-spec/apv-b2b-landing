import type { Metadata } from "next";
import { Suspense } from "react";
import { LeadMultistepForm } from "@/components/forms/lead-multistep-form";

export const metadata: Metadata = {
  title: "Заявка на расчёт и коммерческое предложение",
  description:
    "Мультистеп-форма: контакты, параметры проекта, комментарий и согласие на обработку ПД.",
  alternates: { canonical: "/zayavka" },
};

export default function Page() {
  return (
    <main id="main" className="mx-auto max-w-[720px] px-4 py-12 sm:px-6 lg:py-16">
      <h1 className="font-display text-3xl font-bold text-[var(--primary)] md:text-4xl">
        Заявка
      </h1>
      <p className="mt-3 text-[var(--neutral-700)]">
        Три шага по брифу. Данные уходят в API <code className="text-xs">/api/v1/leads</code> и событие
        аналитики.
      </p>
      <div className="mt-10">
        <Suspense fallback={<p className="text-sm text-[var(--neutral-500)]">Загрузка формы…</p>}>
          <LeadMultistepForm />
        </Suspense>
      </div>
    </main>
  );
}
