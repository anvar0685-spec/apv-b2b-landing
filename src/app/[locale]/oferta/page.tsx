import type { Metadata } from "next";
import { StubPage } from "@/components/marketing/stub-page";

export const metadata: Metadata = {
  title: "Оферта на услуги",
  description: "Публичная оферта на оказание услуг аутстаффинга и смежных сервисов.",
};

export default function Page() {
  return <StubPage title="Оферта" />;
}
