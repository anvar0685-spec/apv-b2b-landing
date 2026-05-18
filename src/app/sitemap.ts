import type { MetadataRoute } from "next";
import { BLOG_CATEGORY_SLUGS, BLOG_POSTS } from "@/content/blog-stub";
import { CASES } from "@/content/cases-stub";
import { PRIORITY_CROSS_30 } from "@/content/cross-priority";
import { PROFESSIONS } from "@/content/professions-cities";
import { absUrl } from "@/lib/abs-url";
import { allMultipageSeoPaths } from "@/lib/site-structure";

const STATIC_BASE = [
  "",
  "/uslugi",
  "/uslugi/autsorsing",
  "/uslugi/podbor-personala",
  "/uslugi/postoyannyy-personal",
  "/uslugi/nochnye-smeny",
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
  "/soglasie-na-obrabotku-pd",
  "/pravila-saita",
  "/sitemap",
] as const;

const STATIC = [...STATIC_BASE, ...allMultipageSeoPaths()];

function staticPriority(path: string): number {
  if (path === "") return 1;
  if (path.startsWith("/otrasli") || path.startsWith("/ploshchadki")) return 0.78;
  return 0.7;
}

/**
 * Стабильные даты «по поколениям» контента. Меняем точечно при существенной правке
 * соответствующего раздела (а не «штамп билда»), чтобы lastmod был осмысленным сигналом
 * для Яндекс/Google, а не «всё обновилось сегодня».
 */
const REV_STATIC = new Date("2026-05-18T00:00:00Z");
const REV_HUBS = new Date("2026-05-18T00:00:00Z");
const REV_PROGRAMMATIC = new Date("2026-05-18T00:00:00Z");
const REV_CATEGORIES = new Date("2026-04-30T00:00:00Z");
const REV_CASES = new Date("2026-04-15T00:00:00Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const p of STATIC) {
    entries.push({
      url: absUrl(p),
      lastModified: REV_STATIC,
      changeFrequency: "weekly",
      priority: staticPriority(p),
    });
  }
  for (const prof of PROFESSIONS) {
    entries.push({
      url: absUrl(`/personal/${prof.slug}`),
      lastModified: REV_HUBS,
      changeFrequency: "weekly",
      priority: 0.65,
    });
  }
  // Programmatic «профессия × город»: только приоритетные 30 пар попадают в sitemap.
  // Остальные ~210 пар закрыты `robots: noindex, follow` в `generateMetadata` и доступны
  // через внутренние ссылки в разделе «Персонал», но в карте сайта их нет.
  for (const pair of PRIORITY_CROSS_30) {
    entries.push({
      url: absUrl(`/personal/${pair.profession}/${pair.city}`),
      lastModified: REV_PROGRAMMATIC,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }
  for (const cat of BLOG_CATEGORY_SLUGS) {
    entries.push({
      url: absUrl(`/blog/category/${cat}`),
      lastModified: REV_CATEGORIES,
      changeFrequency: "weekly",
      priority: 0.52,
    });
  }
  for (const b of BLOG_POSTS) {
    entries.push({
      url: absUrl(`/blog/${b.slug}`),
      lastModified: new Date(b.publishedAt),
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }
  for (const c of CASES) {
    entries.push({
      url: absUrl(`/keysy/${c.slug}`),
      lastModified: REV_CASES,
      changeFrequency: "monthly",
      priority: 0.55,
    });
  }

  return entries;
}
