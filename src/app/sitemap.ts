import type { MetadataRoute } from "next";
import { CITIES, PROFESSIONS } from "@/content/professions-cities";

const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
  /\/$/,
  "",
);

const STATIC = [
  "",
  "/uslugi",
  "/uslugi/autstaffing",
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

function localized(path: string, locale: "ru" | "en") {
  if (locale === "ru") return `${base}${path}`;
  return `${base}/en${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of ["ru", "en"] as const) {
    for (const p of STATIC) {
      entries.push({
        url: localized(p, locale),
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: p === "" ? 1 : 0.7,
      });
    }
    for (const prof of PROFESSIONS) {
      entries.push({
        url: localized(`/personal/${prof.slug}`, locale),
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.65,
      });
      for (const city of CITIES) {
        entries.push({
          url: localized(`/personal/${prof.slug}/${city.slug}`, locale),
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.55,
        });
      }
    }
  }

  return entries;
}
