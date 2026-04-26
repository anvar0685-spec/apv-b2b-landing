import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CITIES, PROFESSIONS } from "@/content/professions-cities";
import { allMultipageSeoPaths } from "@/lib/site-structure";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "pagesSeo" });
  return buildPageMetadata({
    locale: params.locale,
    pathname: "/sitemap",
    title: t("htmlSitemap.metaTitle"),
    description: t("htmlSitemap.metaDescription"),
  });
}

const CORE = [
  "/",
  "/uslugi",
  "/uslugi/autsorsing",
  "/uslugi/upravlyaemyy-podryad",
  "/uslugi/migracionnyy-uchet",
  "/uslugi/podbor-personala",
  "/personal",
  "/keysy",
  "/blog",
  "/kalkulyator",
  "/zayavka",
  "/kontakty",
  "/o-kompanii",
  "/o-kompanii/komanda",
  "/o-kompanii/dokumenty",
  "/o-kompanii/pressa",
  "/faq",
  "/garantii",
  "/dlya-postavschikov",
  "/pravovaya-informaciya",
  "/politika-konfidencialnosti",
  "/oferta",
  ...allMultipageSeoPaths(),
] as const;

export default function HtmlSitemapPage() {
  return (
    <main id="main" className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-bold text-[var(--primary)]">Карта сайта</h1>
      <section className="mt-10">
        <h2 className="text-lg font-semibold text-[var(--primary)]">Основные разделы</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {CORE.map((href) => (
            <li key={href}>
              <Link className="text-sm text-[var(--accent)] hover:underline" href={href}>
                {href}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-12">
        <h2 className="text-lg font-semibold text-[var(--primary)]">Программатика (фрагмент)</h2>
        <ul className="mt-4 max-h-96 overflow-auto text-sm text-[var(--neutral-700)]">
          {PROFESSIONS.slice(0, 2).flatMap((p) =>
            CITIES.slice(0, 5).map((c) => (
              <li key={`${p.slug}-${c.slug}`}>
                <Link href={`/personal/${p.slug}/${c.slug}`}>
                  /personal/{p.slug}/{c.slug}
                </Link>
              </li>
            )),
          )}
        </ul>
        <p className="mt-2 text-xs text-[var(--neutral-500)]">Полный список 300 URL в sitemap.xml.</p>
      </section>
    </main>
  );
}
