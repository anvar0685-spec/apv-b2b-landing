import type { Metadata } from "next";
import { StubPage } from "@/components/marketing/stub-page";

export const metadata: Metadata = {
  title: "Контакты — офис и карта",
  description: "Телефон, email, Telegram, WhatsApp Business и виджет Яндекс.Карт.",
};

export default function Page() {
  return <StubPage title="Контакты" description="LocalBusiness JSON-LD + карта — после реквизитов." />;
}
