import type { Metadata } from "next";
import { StubPage } from "@/components/marketing/stub-page";

export const metadata: Metadata = {
  title: "Миграционный учёт и compliance для работодателя",
  description: "109-ФЗ, уведомления МВД, снижение штрафных рисков — отдельная compliance-линия.",
};

export default function Page() {
  return <StubPage title="Миграционный учёт" />;
}
