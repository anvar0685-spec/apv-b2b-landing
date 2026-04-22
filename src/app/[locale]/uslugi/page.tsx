import type { Metadata } from "next";
import { StubPage } from "@/components/marketing/stub-page";

export const metadata: Metadata = {
  title: "Услуги — аутстаффинг и аутсорсинг персонала",
  description:
    "Аутстаффинг, аутсорсинг, управляемый подряд, миграционный учёт и подбор персонала для Москвы и МО.",
};

export default function Page() {
  return <StubPage title="Услуги" description="Концентратор услуг: выберите направление ниже (заглушка навигации)." />;
}
