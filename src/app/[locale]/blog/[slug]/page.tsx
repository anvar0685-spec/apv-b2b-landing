import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StubPage } from "@/components/marketing/stub-page";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Статья: ${params.slug}`,
    description: "Long-read с оглавлением, FAQPage и внутренними ссылками — в контент-плане.",
  };
}

export default function BlogArticlePage({ params }: Props) {
  if (params.slug === "category") notFound();
  return <StubPage title={`Статья: ${params.slug}`} />;
}
