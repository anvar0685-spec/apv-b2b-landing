import type { Metadata } from "next";
import { StubPage } from "@/components/marketing/stub-page";

export const metadata: Metadata = {
  title: "Правовая информация",
  description: "Реквизиты, режим обработки ПД и ссылки на ключевые документы.",
};

export default function Page() {
  return <StubPage title="Правовая информация" />;
}
