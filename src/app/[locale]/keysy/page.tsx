import type { Metadata } from "next";
import { StubPage } from "@/components/marketing/stub-page";

export const metadata: Metadata = {
  title: "Кейсы — цифры и результаты",
  description: "Кейсы аутстаффинга и аутсорсинга: до/после, метрики, отзывы клиентов.",
};

export default function Page() {
  return <StubPage title="Кейсы" />;
}
