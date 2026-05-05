import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { BLOG_PAGE_SIZE, blogListingItemListJsonLd, paginatePosts } from "@/content/blog-stub";
import { MarketingHubShell } from "@/components/layout/marketing-hub-shell";
import { ListingGridShell } from "@/components/marketing/listing-grid-shell";
import { PremiumBlogCard } from "@/components/marketing/premium-list-cards";
import { JsonLd } from "@/components/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo";

type PageProps = {
  params: { locale: string };
  searchParams?: { page?: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "blogIndex" });
  return buildPageMetadata({
    locale: params.locale,
    pathname: "/blog",
    title: t("metaTitle"),
    description: t("metaDescription"),
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
              : "border-[var(--neutral-200)] bg-[var(--card)] text-[var(--neutral-700)] hover:border-[var(--accent)]/40 hover:text-[var(--primary)]"
          }`}
        >
          {n}
        </Link>
      ))}
    </nav>
  );
}

export default async function BlogIndexPage({ params, searchParams }: PageProps) {
  const t = await getTranslations({ locale: params.locale, namespace: "blogIndex" });
  const raw = searchParams?.page;
  const parsed = raw ? Number.parseInt(raw, 10) : 1;
  const page = Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
  const { posts, totalPages, page: current } = paginatePosts(page);
  const listLd = blogListingItemListJsonLd(posts);

  return (
    <main id="main" className="pb-24">
      <JsonLd data={listLd} />
      <MarketingHubShell
        kicker={t("kicker")}
        title={t("title")}
        description={t("lead", { pageSize: BLOG_PAGE_SIZE })}
        heroSurface="blog"
      >
        <ListingGridShell>
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <li key={p.slug}>
                <PremiumBlogCard p={p} locale={params.locale} />
              </li>
            ))}
          </ul>

          <Pagination page={current} totalPages={totalPages} path="/blog" ariaLabel={t("paginationAria")} />
        </ListingGridShell>
      </MarketingHubShell>
    </main>
  );
}
