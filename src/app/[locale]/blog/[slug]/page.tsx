import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { BLOG_POSTS, getBlogPost } from "@/content/blog-stub";
import { Button } from "@/components/ui/button";

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
    <main id="main" className="pb-24">
      <section className="border-b border-[var(--neutral-200)] bg-[var(--surface)] py-10 lg:py-14">
        <div className="mx-auto max-w-[800px] px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-[var(--neutral-500)]">
            <Link className="font-medium text-[var(--accent)] hover:underline" href="/blog">
              ← Блог
            </Link>
            {" · "}
            <Link className="font-medium text-[var(--accent)] hover:underline" href={`/blog/category/${post.category}`}>
              {post.category.replace(/-/g, " ")}
            </Link>
          </p>
          <h1 className="font-display mt-6 text-balance text-3xl font-bold tracking-[-0.035em] text-[var(--primary)] md:text-5xl md:leading-[1.08]">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-[var(--neutral-500)]">
            <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString("ru-RU")}</time>
            <span>{post.readingTime} мин чтения</span>
          </div>
          <p className="type-lead mt-8">{post.excerpt}</p>
        </div>
      </section>

      <article className="mx-auto max-w-[800px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="type-editorial-dropcap space-y-5 text-base leading-relaxed text-[var(--neutral-700)]">
          <p>
            Материал подготовлен редакцией: ниже — развёрнутая версия с подзаголовками, перекрёстными ссылками на услуги
            и калькулятор, а также блоком FAQ с микроразметкой (подключится на этапе CMS).
          </p>
          <p>
            Если тема релевантна вашему объекту — отправьте заявку: команда уточнит контекст и предложит формат пилота
            под ваши KPI по явке и документам.
          </p>
          <p>
            Для операционных директоров полезно заранее согласовать единицу измерения успеха (throughput, cost per
            shift, доля переработок) — так отчётность стыкуется с финансовой моделью без споров о методике.
          </p>
        </div>

        <div className="mt-14 flex flex-wrap gap-3 border-t border-[var(--neutral-200)] pt-10">
          <Button asChild>
            <Link href="/zayavka">Обсудить внедрение</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/kalkulyator">Рассчитать вилку</Link>
          </Button>
        </div>
      </article>
    </main>
  );
}
