import type { Metadata } from "next";
import { StubPage } from "@/components/marketing/stub-page";

export const metadata: Metadata = {
  title: "Гарантии и SLA",
  description: "Условия закрытия смен, комплаенс-гарантии и прозрачная цена в КП.",
};

export default function Page() {
  return <StubPage title="Гарантии и SLA" />;
}
