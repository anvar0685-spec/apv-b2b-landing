import type { Metadata } from "next";
import { ServicesHub } from "@/components/marketing/services-hub";

export const metadata: Metadata = {
  title: "Складской аутсорсинг — Москва и МО",
  description:
    "Аутсорсинг персонала на склады и DC: смены, явка, SLA. Миграционный учёт и подбор — в контракте поставки.",
};

export default function Page() {
  return <ServicesHub />;
}
