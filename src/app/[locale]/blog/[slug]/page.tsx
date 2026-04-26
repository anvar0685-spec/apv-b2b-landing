import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { getBlogArticle, PUBLISHED_BLOG_ARTICLES, relatedArticles } from "@/content/blog-published";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { site } from "@/config/site";
import { absUrl } from "@/lib/abs-url";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: { locale: string; slug: string } };

export function generateStaticParams() {
  return PUBLISHED_BLOG_ARTICLES.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogArticle(params.slug);
  if (!post) return { title: "Блог" };
  const en = params.locale === "en";
  const title = en ? post.titleEn : post.title;
  const description = en ? post.excerptEn : post.excerpt;
  return buildPageMetadata({
    locale: params.locale,
    pathname: `/blog/${post.slug}`,
    title,
    description,
  });
}

export default function BlogArticlePage({ params }: Props) {
  if (params.slug === "category") notFound();
  const post = getBlogArticle(params.slug);
  if (!post) notFound();

  const en = params.locale === "en";
  const title = en ? post.titleEn : post.title;
  const excerpt = en ? post.excerptEn : post.excerpt;
  const author = en ? post.authorEn : post.authorRu;
  const brand = site.brandName.replace(/_/g, " ");
  const canonical = absUrl(`/blog/${post.slug}`, params.locale);

  const articleJson = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: excerpt,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: brand, url: site.url.replace(/\/$/, "") },
    publisher: { "@type": "Organization", name: brand, url: site.url.replace(/\/$/, "") },
    inLanguage: en ? "en-RU" : "ru-RU",
    mainEntityOfPage: canonical,
  };

  const related = relatedArticles(post.slug, post.category, 2);
  const back = en ? "Blog" : "Блог";
  const catLabel = post.category.replace(/-/g, " ");

  return (
    <main id="main" className="pb-24">
      <JsonLd data={articleJson} />
      <section className="border-b border-[var(--neutral-200)] bg-[var(--surface)] py-10 lg:py-14">
        <div className="mx-auto max-w-[800px] px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-[var(--neutral-500)]">
            <Link className="font-medium text-[var(--accent)] hover:underline" href="/blog">
              ← {back}
            </Link>
            {" · "}
            <Link
              className="font-medium text-[var(--accent)] hover:underline"
              href={`/blog/category/${post.category}`}
            >
              {catLabel}
            </Link>
          </p>
          <h1 className="font-display mt-6 text-balance text-3xl font-bold tracking-[-0.035em] text-[var(--primary)] md:text-5xl md:leading-[1.08]">
            {title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-[var(--neutral-500)]">
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString(en ? "en-US" : "ru-RU")}
            </time>
            <span>
              {post.readingTime} {en ? "min read" : "мин чтения"}
            </span>
            <span>{author}</span>
          </div>
          <p className="type-lead mt-8">{excerpt}</p>
        </div>
      </section>

      <div className="mx-auto max-w-[800px] px-4 py-10 sm:px-6 lg:px-8">
        <nav
          aria-label={en ? "On this page" : "Содержание"}
          className="rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)] p-5 text-sm dark:border-white/10"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--neutral-500)]">
            {en ? "Contents" : "Содержание"}
          </p>
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
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        ))}

        {related.length ? (
          <aside className="mt-16 border-t border-[var(--neutral-200)] pt-10 dark:border-white/10">
            <h2 className="type-kicker">{en ? "Related" : "Ещё материалы"}</h2>
            <ul className="mt-4 space-y-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link className="font-medium text-[var(--accent)] hover:underline" href={`/blog/${r.slug}`}>
                    {en ? r.titleEn : r.title}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}

        <div className="mt-14 flex flex-wrap gap-3 border-t border-[var(--neutral-200)] pt-10 dark:border-white/10">
          <Button asChild>
            <Link href="/zayavka">{en ? "Talk to us" : "Обсудить внедрение"}</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/kalkulyator">{en ? "Calculator" : "Рассчитать вилку"}</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/uslugi/autsorsing">{en ? "Services" : "Услуги"}</Link>
          </Button>
        </div>
      </article>
    </main>
  );
}
