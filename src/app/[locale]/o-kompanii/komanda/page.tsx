import type { Metadata } from "next";
import { StubPage } from "@/components/marketing/stub-page";

export const metadata: Metadata = {
  title: "Команда",
  description: "CEO, COO, HRD — фото, био, ссылки на LinkedIn/Habr/VC.ru.",
};

export default function Page() {
  return <StubPage title="Команда" />;
}
