import type { Metadata } from "next";
import { StubPage } from "@/components/marketing/stub-page";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description: "Обработка персональных данных в соответствии с 152-ФЗ.",
};

export default function Page() {
  return <StubPage title="Политика конфиденциальности" />;
}
