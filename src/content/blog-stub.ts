import type { BlogArticle } from "@/content/blog-published";
import { PUBLISHED_BLOG_ARTICLES } from "@/content/blog-published";

/** Карточка списка (блог-хаб); полная статья — `blog-published.ts`. */
export type BlogStub = Pick<BlogArticle, "slug" | "title" | "excerpt" | "category" | "publishedAt" | "readingTime"> & {
  titleEn?: string;
  excerptEn?: string;
};

export const BLOG_POSTS: BlogStub[] = PUBLISHED_BLOG_ARTICLES.map((a) => ({
  slug: a.slug,
  title: a.title,
  titleEn: a.titleEn,
  excerpt: a.excerpt,
  excerptEn: a.excerptEn,
  category: a.category,
  publishedAt: a.publishedAt,
  readingTime: a.readingTime,
}));

export const BLOG_PAGE_SIZE = 9;

export function blogCardFields(b: BlogStub, locale: string) {
  const en = locale === "en";
  return {
    slug: b.slug,
    title: en && b.titleEn ? b.titleEn : b.title,
    excerpt: en && b.excerptEn ? b.excerptEn : b.excerpt,
    category: b.category,
  };
}

export function paginatePosts(page: number) {
  const p = Math.max(1, page);
  const start = (p - 1) * BLOG_PAGE_SIZE;
  return {
    posts: BLOG_POSTS.slice(start, start + BLOG_PAGE_SIZE),
    totalPages: Math.ceil(BLOG_POSTS.length / BLOG_PAGE_SIZE),
    page: p,
  };
}

export function getBlogPost(slug: string) {
  return BLOG_POSTS.find((b) => b.slug === slug);
}

export function paginatePostsByCategory(category: string, page: number) {
  const filtered = BLOG_POSTS.filter((b) => b.category === category);
  const p = Math.max(1, page);
  const start = (p - 1) * BLOG_PAGE_SIZE;
  return {
    posts: filtered.slice(start, start + BLOG_PAGE_SIZE),
    totalPages: Math.max(1, Math.ceil(filtered.length / BLOG_PAGE_SIZE)),
    page: p,
    total: filtered.length,
  };
}
