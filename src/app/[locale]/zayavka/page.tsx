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
      <p className="type-kicker">КП и расчёт</p>
      <h1 className="font-display mt-2 text-3xl font-bold tracking-[-0.03em] text-[var(--primary)] md:text-4xl">
        Заявка
      </h1>
      <p className="type-lead mt-4">
        Три шага: контакты, параметры проекта, согласие на обработку персональных данных. Заявка сохраняется в CRM, в
        аналитику уходит событие отправки.
      </p>
      <div className="mt-10">
        <Suspense fallback={<p className="text-sm text-[var(--neutral-500)]">Загрузка формы…</p>}>
          <LeadMultistepForm />
        </Suspense>
      </div>
    </main>
  );
}
