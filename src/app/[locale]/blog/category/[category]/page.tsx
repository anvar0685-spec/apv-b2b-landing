import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { BLOG_PAGE_SIZE, paginatePostsByCategory } from "@/content/blog-stub";
import { PremiumBlogCard } from "@/components/marketing/premium-list-cards";
import { buildPageMetadata } from "@/lib/seo";

const VALID = new Set(["compliance", "hr", "optimizaciya", "migracionnyy-uchet"]);

type Props = {
  params: { locale: string; category: string };
  searchParams?: { page?: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!VALID.has(params.category)) return { title: "Blog" };
  const t = await getTranslations({ locale: params.locale, namespace: "blogCategory" });
  const tHome = await getTranslations({ locale: params.locale, namespace: "homePage" });
  const blogCategories = tHome.raw("blogCategories") as Record<string, string>;
  const label = blogCategories[params.category] ?? params.category.replace(/-/g, " ");
  return buildPageMetadata({
    locale: params.locale,
    pathname: `/blog/category/${params.category}`,
    title: t("metaTitle", { label }),
    description: t("metaDescription", { label, pageSize: BLOG_PAGE_SIZE }),
  });
}

function Pagination({
  page,
  totalPages,
  path,
  ariaLabel,
}: {
  page: number;
  totalPages: number;
  path: string;
  ariaLabel: string;
}) {
  if (totalPages <= 1) return null;
  return (
    <nav className="mt-14 flex flex-wrap items-center justify-center gap-2" aria-label={ariaLabel}>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <Link
          key={n}
          href={n === 1 ? path : `${path}?page=${n}`}
          className={`min-w-[2.25rem] rounded-xl border px-3 py-2 text-sm font-medium transition ${
            n === page
              ? "border-[var(--accent)] bg-[var(--accent)] text-white shadow-[0_4px_14px_rgba(0,0,0,0.12)]"
              : "border-[var(--neutral-200)] bg-[var(--card)] text-[var(--neutral-700)] hover:border-[var(--accent)]/40"
          }`}
        >
          {n}
        </Link>
      ))}
    </nav>
  );
}

export default async function BlogCategoryPage({ params, searchParams }: Props) {
  if (!VALID.has(params.category)) notFound();

  const t = await getTranslations({ locale: params.locale, namespace: "blogCategory" });
  const tHome = await getTranslations({ locale: params.locale, namespace: "homePage" });
  const blogCategories = tHome.raw("blogCategories") as Record<string, string>;
  const categoryLabel = blogCategories[params.category] ?? params.category.replace(/-/g, " ");

  const raw = searchParams?.page;
  const parsed = raw ? Number.parseInt(raw, 10) : 1;
  const pageNum = Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
  const { posts, totalPages, page, total } = paginatePostsByCategory(params.category, pageNum);

  const basePath = `/blog/category/${params.category}`;

  return (
    <main id="main" className="pb-24">
      <section className="border-b border-[var(--neutral-200)] bg-[var(--surface)] py-10 lg:py-14">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-[var(--neutral-500)]">
            <Link className="font-medium text-[var(--accent)] hover:underline" href="/blog">
              {t("backToBlog")}
            </Link>
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-balance text-3xl font-bold tracking-[-0.035em] text-[var(--primary)] md:text-[2.625rem] md:leading-[1.12]">
            {t("headingPrefix")} {categoryLabel}
          </h1>
          <p className="type-lead mt-4 max-w-2xl">{t("lead", { count: total })}</p>
        </div>
      </section>

      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug}>
              <PremiumBlogCard p={p} locale={params.locale} />
            </li>
          ))}
        </ul>

        <Pagination page={page} totalPages={totalPages} path={basePath} ariaLabel={t("paginationAria")} />
      </div>
    </main>
  );
}
