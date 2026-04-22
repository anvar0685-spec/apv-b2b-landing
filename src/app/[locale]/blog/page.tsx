import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { BLOG_PAGE_SIZE, paginatePosts } from "@/content/blog-stub";

export const metadata: Metadata = {
  title: "Блог — compliance, HR, аутстаффинг",
  description: "Гайды по миграционному учёту, оптимизации смен и подготовке к высокому сезону.",
};

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
    <nav className="mt-12 flex flex-wrap items-center justify-center gap-2" aria-label="Страницы блога">
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

type PageProps = { searchParams?: { page?: string } };

export default function BlogIndexPage({ searchParams }: PageProps) {
  const raw = searchParams?.page;
  const parsed = raw ? Number.parseInt(raw, 10) : 1;
  const page = Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
  const { posts, totalPages, page: current } = paginatePosts(page);

  return (
    <main id="main" className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="max-w-3xl">
        <h1 className="font-display text-3xl font-bold tracking-tight text-[var(--primary)] md:text-5xl">
          Блог
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-[var(--neutral-700)]">
          Материалы для HR, операционных директоров и compliance: пока заглушки для проверки сетки и пагинации (
          {BLOG_PAGE_SIZE} записей на страницу).
        </p>
      </div>

      <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <li key={p.slug}>
            <article className="flex h-full flex-col rounded-xl border border-[var(--neutral-200)] bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
                {p.category.replace(/-/g, " ")}
              </p>
              <h2 className="mt-3 font-display text-lg font-semibold text-[var(--primary)]">
                <Link className="hover:text-[var(--accent)]" href={`/blog/${p.slug}`}>
                  {p.title}
                </Link>
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--neutral-700)]">{p.excerpt}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-[var(--neutral-500)]">
                <time dateTime={p.publishedAt}>
                  {new Date(p.publishedAt).toLocaleDateString("ru-RU")}
                </time>
                <span>{p.readingTime} мин</span>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <Pagination page={current} totalPages={totalPages} path="/blog" />
    </main>
  );
}
