import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { BLOG_POSTS, getBlogPost } from "@/content/blog-stub";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return BLOG_POSTS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  if (!post) {
    return { title: "Статья" };
  }
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function BlogArticlePage({ params }: Props) {
  if (params.slug === "category") notFound();
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  return (
    <main id="main" className="mx-auto max-w-[800px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <p className="text-sm text-[var(--neutral-500)]">
        <Link className="text-[var(--accent)] hover:underline" href="/blog">
          ← Блог
        </Link>
        {" · "}
        <Link className="text-[var(--accent)] hover:underline" href={`/blog/category/${post.category}`}>
          {post.category}
        </Link>
      </p>
      <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-[var(--primary)] md:text-5xl">
        {post.title}
      </h1>
      <div className="mt-4 flex flex-wrap gap-4 text-sm text-[var(--neutral-500)]">
        <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString("ru-RU")}</time>
        <span>{post.readingTime} мин чтения</span>
      </div>
      <p className="mt-8 text-lg leading-relaxed text-[var(--neutral-700)]">{post.excerpt}</p>
      <div className="mt-10 space-y-4 text-base leading-relaxed text-[var(--neutral-700)]">
        <p>
          Тело статьи (long-read, оглавление, FAQPage JSON-LD) подключится из CMS или статического контента после
          редакции. Здесь несколько абзацев-заглушек для проверки типографики.
        </p>
        <p>
          Внутренние ссылки на услуги, калькулятор и программатику добавятся в контент-плане; сейчас важна только
          маршрутизация и уникальные мета-теги.
        </p>
      </div>
    </main>
  );
}
