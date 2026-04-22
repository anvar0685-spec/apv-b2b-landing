export type BlogStub = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readingTime: number;
};

/** Заглушки для пагинации и вёрстки (позже — Prisma `Article`). */
export const BLOG_POSTS: BlogStub[] = Array.from({ length: 24 }).map((_, i) => {
  const n = i + 1;
  const cat = ["compliance", "hr", "optimizaciya", "migracionnyy-uchet"][i % 4]!;
  return {
    slug: `blog-stub-${n}`,
    title: `Статья-заглушка №${n}: аутстаффинг, склады и compliance`,
    excerpt:
      "Черновой абзац для проверки сетки блога, пагинации и внутренних ссылок. Текст будет заменён редакцией.",
    category: cat,
    publishedAt: new Date(2026, 3, n).toISOString(),
    readingTime: 8 + (i % 5),
  };
});

export const BLOG_PAGE_SIZE = 9;

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
