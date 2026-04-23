import type { Metadata } from "next";
import { ServicesHub } from "@/components/marketing/services-hub";

export const metadata: Metadata = {
  title: "Услуги — аутстаффинг, аутсорсинг, managed service",
  description:
    "Концентратор направлений: аутстаффинг, аутсорсинг, управляемый подряд, миграционный учёт и подбор линейного персонала.",
};

export default function Page() {
  return <ServicesHub />;
}
