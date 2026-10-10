import type { Metadata } from "next";
import { ServicesHub } from "@/components/marketing/services-hub";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return buildPageMetadata({
    locale: params.locale,
    pathname: "/uslugi",
    title: "Услуги для складов Москвы и МО | АПВ — СИСТЕМА",
    description:
      "Постоянная команда, сезонное усиление и ночные смены. Согласуем состав работников, стоимость и сопровождение до начала работы.",
  });
}

export default function Page() {
  return <ServicesHub />;
}
