import type { Metadata } from "next";
import { StubPage } from "@/components/marketing/stub-page";

export const metadata: Metadata = {
  title: "Подбор персонала под ключ",
  description: "Рекрутинг линейного персонала под ваши воронки и графики смен.",
};

export default function Page() {
  return <StubPage title="Подбор персонала" />;
}
