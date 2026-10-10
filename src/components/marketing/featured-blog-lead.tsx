import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { BlogStub } from "@/content/blog-stub";
import { blogCardFields } from "@/content/blog-stub";
import { Button } from "@/components/ui/button";

export async function FeaturedBlogLead({ post, locale }: { post: BlogStub; locale: string }) {
  const tHome = await getTranslations({ locale, namespace: "homePage" });
  const ts = await getTranslations({ locale, namespace: "homePage.sections" });
  const tCard = await getTranslations({ locale, namespace: "blogCard" });
  const blogCategories = tHome.raw("blogCategories") as Record<string, string>;
  const fields = blogCardFields(post);
  const catLabel = blogCategories[post.category] ?? post.category.replace(/-/g, " ");

  return (
    <article
      className="mb-12 rounded-3xl border border-[var(--neutral-200)] bg-gradient-to-br from-[var(--card)] via-[var(--surface)] to-[var(--card)] p-8 shadow-[var(--card-shadow)] md:p-10"
      lang="ru"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">{catLabel}</p>
      <h2 className="font-display mt-3 max-w-3xl text-2xl font-bold tracking-tight text-[var(--primary)] md:text-3xl">
        <Link className="transition hover:text-[var(--accent)]" href={`/blog/${post.slug}`}>{fields.title}</Link>
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--neutral-700)]">{fields.excerpt}</p>
      <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-[var(--neutral-600)]">
        <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString("ru-RU")}</time>
        <span>{post.readingTime} {tCard("min")}</span>
      </div>
      <div className="mt-6">
        <Button asChild size="sm">
          <Link href={`/blog/${post.slug}`}>{ts("readMore")}</Link>
        </Button>
      </div>
    </article>
  );
}
