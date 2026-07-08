import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import {
  adjacentArticles,
  getBlogArticle,
  PUBLISHED_BLOG_ARTICLES,
  relatedArticles,
  type BlogArticle,
} from "@/content/blog-published";
import { Button } from "@/components/ui/button";
import { MarketingHeroChrome } from "@/components/marketing/marketing-hero-chrome";
import { SectionDivider } from "@/components/marketing/section-divider";
import { JsonLd } from "@/components/seo/json-ld";
import { site } from "@/config/site";
import { absUrl } from "@/lib/abs-url";
import { buildNotFoundPageMetadata, buildPageMetadata } from "@/lib/seo";

type Props = { params: { locale: string; slug: string } };

function RichParagraph({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <p>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-[var(--primary)]">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </p>
  );
}

function authorCard(post: BlogArticle) {
  return (
    <div className="mt-16 rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)] p-6 dark:border-white/10">
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--neutral-500)]">Автор</p>
      <p className="mt-2 font-medium text-[var(--primary)]">{post.authorRu}</p>
      <p className="type-body mt-3 text-[var(--neutral-700)]">{post.authorBioRu}</p>
    </div>
  );
}

export function generateStaticParams() {
  return PUBLISHED_BLOG_ARTICLES.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogArticle(params.slug);
  if (!post) {
    return buildNotFoundPageMetadata(params.locale, `/blog/${params.slug}`);
  }
  return buildPageMetadata({
    locale: params.locale,
    pathname: `/blog/${post.slug}`,
    title: post.title,
    description: post.excerpt,
  });
}

export default function BlogArticlePage({ params }: Props) {
  if (params.slug === "category") notFound();
  const post = getBlogArticle(params.slug);
  if (!post) notFound();

  const title = post.title;
  const excerpt = post.excerpt;
  const author = post.authorRu;
  const brand = site.brandName.replace(/_/g, " ");
  const canonical = absUrl(`/blog/${post.slug}`, params.locale);

  const articleJson = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: excerpt,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: brand, url: absUrl("/", params.locale) },
    publisher: { "@type": "Organization", name: brand, url: absUrl("/", params.locale) },
    inLanguage: "ru-RU",
    mainEntityOfPage: canonical,
  };

  const related = relatedArticles(post.slug, post.category, 5);
  const { prev, next } = adjacentArticles(post.slug);
  const back = "Блог";
  const catLabel = post.category.replace(/-/g, " ");

  return (
    <main id="main" className="pb-24">
      <JsonLd data={articleJson} />
      <MarketingHeroChrome innerClassName="mx-auto max-w-[800px] px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-[var(--neutral-500)]">
          <Link className="font-medium text-[var(--accent)] hover:underline" href="/blog">
            ← {back}
          </Link>
          {" · "}
          <Link className="font-medium text-[var(--accent)] hover:underline" href={`/blog/category/${post.category}`}>
            {catLabel}
          </Link>
        </p>
        <h1 className="font-display mt-6 text-balance text-3xl font-bold tracking-[-0.035em] text-[var(--primary)] md:text-5xl md:leading-[1.08]">
          {title}
        </h1>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-[var(--neutral-500)]">
          <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString("ru-RU")}</time>
          <span>{post.readingTime} мин чтения</span>
          <span>{author}</span>
        </div>
        <p className="type-lead mt-8">{excerpt}</p>
      </MarketingHeroChrome>
      <SectionDivider className="py-5 sm:py-6" />

      <div className="relative mx-auto max-w-[800px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="ux-page-body-subtle pointer-events-none absolute inset-x-0 top-0 -z-10 h-[min(120vh,52rem)] opacity-45 dark:opacity-35" aria-hidden />
        <nav
          aria-label="Содержание"
          className="rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)] p-5 text-sm dark:border-white/10"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--neutral-500)]">Содержание</p>
          <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-[var(--accent)]">
            {post.sections.map((s) => (
              <li key={s.id}>
                <a className="font-medium hover:underline" href={`#${s.id}`}>
                  {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <article className="mx-auto max-w-[800px] px-4 pb-14 sm:px-6 lg:px-8 lg:pb-20">
        {post.sections.map((s) => (
          <section key={s.id} id={s.id} className="mt-12 scroll-mt-28">
            <h2 className="type-headline text-2xl">{s.heading}</h2>
            <div className="type-body mt-4 space-y-4 text-[var(--neutral-700)]">
              {s.paragraphs.map((p, i) => (
                <RichParagraph key={i} text={p} />
              ))}
            </div>
          </section>
        ))}

        {authorCard(post)}

        {(prev || next) ? (
          <nav
            aria-label="Навигация по блогу"
            className="mt-16 grid gap-4 border-t border-[var(--neutral-200)] pt-10 dark:border-white/10 md:grid-cols-2"
          >
            {prev ? (
              <Link
                href={`/blog/${prev.slug}`}
                className="group rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)] p-5 transition-colors hover:border-[var(--accent)] dark:border-white/10"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--neutral-500)]">
                  ← Предыдущая статья
                </p>
                <p className="mt-2 line-clamp-2 font-medium text-[var(--primary)] group-hover:text-[var(--accent)] dark:text-white">
                  {prev.title}
                </p>
              </Link>
            ) : (
              <span aria-hidden className="hidden md:block" />
            )}
            {next ? (
              <Link
                href={`/blog/${next.slug}`}
                className="group rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)] p-5 text-right transition-colors hover:border-[var(--accent)] dark:border-white/10"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--neutral-500)]">
                  Следующая статья →
                </p>
                <p className="mt-2 line-clamp-2 font-medium text-[var(--primary)] group-hover:text-[var(--accent)] dark:text-white">
                  {next.title}
                </p>
              </Link>
            ) : null}
          </nav>
        ) : null}

        {related.length ? (
          <aside className="mt-16 border-t border-[var(--neutral-200)] pt-10 dark:border-white/10">
            <h2 className="type-kicker">Ещё материалы по теме</h2>
            <ul className="mt-4 space-y-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link className="font-medium text-[var(--accent)] hover:underline" href={`/blog/${r.slug}`}>
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}

        <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--neutral-200)] pt-10 dark:border-white/10">
          <Link
            href="/blog"
            className="text-sm font-medium text-[var(--accent)] hover:underline"
          >
            ← Все статьи блога
          </Link>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/zayavka">Обсудить внедрение</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/kalkulyator">Рассчитать вилку</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/uslugi/autsorsing">Услуги</Link>
            </Button>
          </div>
        </div>
      </article>
    </main>
  );
}
