import type { Metadata } from "next";
import { StubPage } from "@/components/marketing/stub-page";

type Props = { params: { category: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Блог: ${params.category}`,
    description: "Список статей категории (пагинация и Schema — в Sprint 2).",
  };
}

export default function BlogCategoryPage({ params }: Props) {
  return <StubPage title={`Категория: ${params.category}`} />;
}
