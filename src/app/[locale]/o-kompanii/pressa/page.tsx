import type { Metadata } from "next";
import { StubPage } from "@/components/marketing/stub-page";

export const metadata: Metadata = {
  title: "Пресса и упоминания",
  description: "VC.ru, Habr, РБК, отраслевые СМИ — список публикаций.",
};

export default function Page() {
  return <StubPage title="Пресса" />;
}
