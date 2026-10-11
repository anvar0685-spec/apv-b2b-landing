import type { BlogArticle } from "@/content/blog-published";

/** Дата для sitemap и сигналов свежести: фактическое обновление или публикация. */
export function blogArticleLastModified(
  article: Pick<BlogArticle, "publishedAt" | "updatedAt">,
): Date {
  const published = new Date(article.publishedAt);
  if (!article.updatedAt) return published;
  const updated = new Date(article.updatedAt);
  return updated > published ? updated : published;
}
