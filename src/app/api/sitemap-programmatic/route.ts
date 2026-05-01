/**
 * Legacy: те же URL теперь в основном `/sitemap.xml`.
 * Оставлено для обратной совместимости; в `robots.txt` не указывается.
 */
import { CITIES, PROFESSIONS } from "@/content/professions-cities";
import { absUrl } from "@/lib/abs-url";

export const dynamic = "force-dynamic";

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function GET() {
  const now = new Date().toISOString();
  const urls: string[] = [];
  for (const p of PROFESSIONS) {
    for (const c of CITIES) {
      urls.push(absUrl(`/personal/${p.slug}/${c.slug}`));
    }
  }
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (loc) => `  <url>
    <loc>${esc(loc)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.55</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
