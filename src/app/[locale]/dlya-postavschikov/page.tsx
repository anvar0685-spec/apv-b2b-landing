import type { Metadata } from "next";
import { StubPage } from "@/components/marketing/stub-page";

export const metadata: Metadata = {
  title: "Для поставщиков и партнёров",
  description: "Воронка для partner-сети и будущего Tier 2 marketplace.",
};

export default function Page() {
  return <StubPage title="Для поставщиков" />;
}
