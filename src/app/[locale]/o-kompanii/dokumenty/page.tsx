import type { Metadata } from "next";
import { StubPage } from "@/components/marketing/stub-page";

export const metadata: Metadata = {
  title: "Документы компании",
  description: "ОГРН, устав, лицензии, образцы договора и КП (PDF + превью).",
};

export default function Page() {
  return <StubPage title="Документы" />;
}
