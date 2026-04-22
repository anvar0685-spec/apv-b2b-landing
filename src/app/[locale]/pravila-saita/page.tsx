import type { Metadata } from "next";
import { StubPage } from "@/components/marketing/stub-page";

export const metadata: Metadata = {
  title: "Правила сайта",
  description: "Пользовательское соглашение и правила использования сервисов сайта.",
};

export default function Page() {
  return <StubPage title="Правила сайта" />;
}
