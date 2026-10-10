import type { BlogArticle } from "@/content/blog-published";

const WORDS_PER_MINUTE = 200;

function countWords(text: string): number {
  const cleaned = text
    .replace(/\*\*/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[^\wа-яёА-ЯЁ0-9\s]/gi, " ")
    .trim();
  if (!cleaned) return 0;
  return cleaned.split(/\s+/).filter(Boolean).length;
}

/** Время чтения только по основному телу статьи (секции), без excerpt и bio. */
export function computeArticleReadingMinutes(article: Pick<BlogArticle, "sections">): number {
  const words = article.sections.reduce(
    (sum, s) => sum + countWords(s.heading) + s.paragraphs.reduce((pSum, p) => pSum + countWords(p), 0),
    0,
  );
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

/** Убирает markdown-разметку для карточек списка. */
export function stripBlogMarkdown(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}
