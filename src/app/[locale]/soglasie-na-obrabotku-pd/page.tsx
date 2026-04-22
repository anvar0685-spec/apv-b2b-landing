import type { Metadata } from "next";
import { StubPage } from "@/components/marketing/stub-page";

export const metadata: Metadata = {
  title: "Согласие на обработку персональных данных",
  description: "Текст согласия для форм и чекбоксов на сайте.",
};

export default function Page() {
  return <StubPage title="Согласие на обработку ПД" />;
}
