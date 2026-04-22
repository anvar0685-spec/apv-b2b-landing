import type { Metadata } from "next";
import { StubPage } from "@/components/marketing/stub-page";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Ответы на частые вопросы по аутстаффингу, ценам и compliance.",
};

export default function Page() {
  return <StubPage title="FAQ" description="FAQPage JSON-LD — Sprint 2." />;
}
