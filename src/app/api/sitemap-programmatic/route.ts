/**
 * Legacy: дублирует programmatic URL из основного `/sitemap.xml`.
 * В `robots.txt` не указывается — единая точка обхода: `sitemap.xml`.
 */
import { getAllProgrammaticPairs } from "@/content/professions-cities";
import { absUrl } from "@/lib/abs-url";
import { isPriorityCross } from "@/content/cross-priority";

export const dynamic = "force-dynamic";

const REV_PROGRAMMATIC = "2026-09-30T00:00:00Z";

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function GET() {
  const pairs = getAllProgrammaticPairs();
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pairs
  .map((pair) => {
    const loc = absUrl(`/personal/${pair.profession}/${pair.city}`);
    const priority = isPriorityCross(pair.profession, pair.city) ? "0.6" : "0.55";
    return `  <url>
    <loc>${esc(loc)}</loc>
    <lastmod>${REV_PROGRAMMATIC}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
