import type { Metadata } from "next";
import { StubPage } from "@/components/marketing/stub-page";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Кейс: ${params.slug}`,
    description: "Детальный кейс с метриками и цитатой клиента (контент позже).",
  };
}

export default function CasePage({ params }: Props) {
  return <StubPage title={`Кейс: ${params.slug}`} />;
}
