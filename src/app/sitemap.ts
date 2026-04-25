import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/content/blog-stub";
import { CASES } from "@/content/cases-stub";
import { PROFESSIONS } from "@/content/professions-cities";
import { absUrl } from "@/lib/abs-url";
import { allMultipageSeoPaths } from "@/lib/site-structure";

const STATIC_BASE = [
  "",
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
  "/soglasie-na-obrabotku-pd",
  "/pravila-saita",
  "/sitemap",
] as const;

const STATIC = [...STATIC_BASE, ...allMultipageSeoPaths()];

function staticPriority(path: string): number {
  if (path === "") return 1;
  if (path.startsWith("/otrasli") || path.startsWith("/ploshchadki") || path.startsWith("/geografiya")) return 0.78;
  return 0.7;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const last = new Date();

  for (const locale of ["ru", "en"] as const) {
    for (const p of STATIC) {
      entries.push({
        url: absUrl(p, locale),
        lastModified: last,
        changeFrequency: "weekly",
        priority: staticPriority(p),
      });
    }
    for (const prof of PROFESSIONS) {
      entries.push({
        url: absUrl(`/personal/${prof.slug}`, locale),
        lastModified: last,
        changeFrequency: "weekly",
        priority: 0.65,
      });
    }
    for (const b of BLOG_POSTS) {
      entries.push({
        url: absUrl(`/blog/${b.slug}`, locale),
        lastModified: new Date(b.publishedAt),
        changeFrequency: "monthly",
        priority: 0.5,
      });
    }
    for (const c of CASES) {
      entries.push({
        url: absUrl(`/keysy/${c.slug}`, locale),
        lastModified: last,
        changeFrequency: "monthly",
        priority: 0.55,
      });
    }
  }

  return entries;
}
