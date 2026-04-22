import type { Metadata } from "next";
import { StubPage } from "@/components/marketing/stub-page";

export const metadata: Metadata = {
  title: "Управляемый подряд (managed service)",
  description: "KPI-based managed service: операционная ответственность и измеримые результаты.",
};

export default function Page() {
  return <StubPage title="Управляемый подряд" />;
}
