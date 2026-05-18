/**
 * Legacy: те же URL теперь в основном `/sitemap.xml`. В `robots.txt` не указывается.
 * Содержит только приоритетные пары (как и основной sitemap) — неприоритетные пары
 * закрыты `robots: noindex, follow`, в карту их класть нельзя.
 */
import { PRIORITY_CROSS_30 } from "@/content/cross-priority";
import { absUrl } from "@/lib/abs-url";

export const dynamic = "force-dynamic";

const REV_PROGRAMMATIC = "2026-05-18T00:00:00Z";

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function GET() {
  const urls = PRIORITY_CROSS_30.map((pair) => absUrl(`/personal/${pair.profession}/${pair.city}`));
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (loc) => `  <url>
    <loc>${esc(loc)}</loc>
    <lastmod>${REV_PROGRAMMATIC}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
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
