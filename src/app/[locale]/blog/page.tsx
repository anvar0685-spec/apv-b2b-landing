import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { BLOG_PAGE_SIZE, paginatePosts } from "@/content/blog-stub";
import { PremiumBlogCard } from "@/components/marketing/premium-list-cards";

export const metadata: Metadata = {
  title: "Блог — compliance, HR, аутстаффинг",
  description: "Материалы для HR, операционных директоров и compliance: сменность, миграционный учёт, пики сезона.",
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
    <nav className="mt-14 flex flex-wrap items-center justify-center gap-2" aria-label="Страницы блога">
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

type PageProps = { searchParams?: { page?: string } };

export default function BlogIndexPage({ searchParams }: PageProps) {
  const raw = searchParams?.page;
  const parsed = raw ? Number.parseInt(raw, 10) : 1;
  const page = Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
  const { posts, totalPages, page: current } = paginatePosts(page);

  return (
    <main id="main" className="pb-24">
      <section className="border-b border-[var(--neutral-200)] bg-[var(--surface)] py-10 lg:py-14">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <p className="type-kicker">Редакция</p>
          <h1 className="font-display mt-3 max-w-3xl text-balance text-3xl font-bold tracking-[-0.035em] text-[var(--primary)] md:text-[2.625rem] md:leading-[1.12]">
            Блог
          </h1>
          <p className="type-lead mt-5 max-w-2xl">
            Гайды и разборы процессов: {BLOG_PAGE_SIZE} материалов на страницу, аккуратная пагинация и единая сетка
            карточек с главной.
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

        <Pagination page={current} totalPages={totalPages} path="/blog" />
      </div>
    </main>
  );
}
