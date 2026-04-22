import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { BLOG_PAGE_SIZE, paginatePostsByCategory } from "@/content/blog-stub";

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
    <nav className="mt-12 flex flex-wrap items-center justify-center gap-2" aria-label="Страницы категории">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <Link
          key={n}
          href={n === 1 ? path : `${path}?page=${n}`}
          className={`min-w-[2.25rem] rounded-md border px-3 py-1.5 text-sm ${
            n === page
              ? "border-[var(--primary)] bg-[var(--primary)] text-white"
              : "border-[var(--neutral-200)] text-[var(--neutral-700)] hover:border-[var(--accent)]"
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
    <main id="main" className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="max-w-3xl">
        <p className="text-sm text-[var(--neutral-500)]">
          <Link className="text-[var(--accent)] hover:underline" href="/blog">
            ← Все статьи
          </Link>
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-[var(--primary)] md:text-5xl">
          Категория: {params.category}
        </h1>
        <p className="mt-4 text-[var(--neutral-700)]">
          Найдено записей (заглушки): <strong>{total}</strong>
        </p>
      </div>

      <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <li key={p.slug}>
            <article className="flex h-full flex-col rounded-xl border border-[var(--neutral-200)] bg-white p-6 shadow-sm">
              <h2 className="font-display text-lg font-semibold text-[var(--primary)]">
                <Link className="hover:text-[var(--accent)]" href={`/blog/${p.slug}`}>
                  {p.title}
                </Link>
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--neutral-700)]">{p.excerpt}</p>
              <div className="mt-4 text-xs text-[var(--neutral-500)]">
                <time dateTime={p.publishedAt}>{new Date(p.publishedAt).toLocaleDateString("ru-RU")}</time>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <Pagination page={page} totalPages={totalPages} path={basePath} />
    </main>
  );
}
