import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { BLOG_PAGE_SIZE, paginatePostsByCategory } from "@/content/blog-stub";
import { PremiumBlogCard } from "@/components/marketing/premium-list-cards";

const VALID = new Set(["compliance", "hr", "optimizaciya", "migracionnyy-uchet"]);

type Props = { params: { category: string }; searchParams?: { page?: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Блог: ${params.category}`,
    description: `Статьи категории «${params.category}». Пагинация по ${BLOG_PAGE_SIZE} материалов.`,
  };
}

function Pagination({
  page,
  totalPages,
  path,
}: {
  page: number;
  totalPages: number;
  path: string;
}) {
  if (totalPages <= 1) return null;
  return (
    <nav className="mt-14 flex flex-wrap items-center justify-center gap-2" aria-label="Страницы категории">
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

export default function BlogCategoryPage({ params, searchParams }: Props) {
  if (!VALID.has(params.category)) notFound();

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
              ← Все статьи
            </Link>
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-balance text-3xl font-bold tracking-[-0.035em] text-[var(--primary)] md:text-[2.625rem] md:leading-[1.12]">
            Категория: {params.category.replace(/-/g, " ")}
          </h1>
          <p className="type-lead mt-4 max-w-2xl">
            В категории <strong className="text-[var(--primary)]">{total}</strong>{" "}
            {total === 1 ? "материал" : total < 5 ? "материала" : "материалов"} — те же карточки, что на главной и в
            общем списке блога.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug}>
              <PremiumBlogCard p={p} />
            </li>
          ))}
        </ul>

        <Pagination page={page} totalPages={totalPages} path={basePath} />
      </div>
    </main>
  );
}
