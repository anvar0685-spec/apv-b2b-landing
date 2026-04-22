import type { Metadata } from "next";
import { StubPage } from "@/components/marketing/stub-page";

export const metadata: Metadata = {
  title: "Заявка на расчёт и КП",
  description: "Мультистеп форма: контакты, параметры проекта, согласие на обработку ПД.",
};

export default function Page() {
  return <StubPage title="Заявка" description="Форма + CRM + Telegram — Sprint 2." />;
}
