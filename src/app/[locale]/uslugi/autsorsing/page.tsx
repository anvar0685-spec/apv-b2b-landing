import type { Metadata } from "next";
import { StubPage } from "@/components/marketing/stub-page";

export const metadata: Metadata = {
  title: "Аутсорсинг функций — склад и производство",
  description: "Аутсорсинг функций для логистики и производства: процессы, KPI, ответственность подрядчика.",
};

export default function Page() {
  return <StubPage title="Аутсорсинг функций" />;
}
