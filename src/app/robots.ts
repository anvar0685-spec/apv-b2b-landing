import type { MetadataRoute } from "next";
import { site } from "@/config/site";

/**
 * Явные Allow для распространённых AI/LLM-краулеров (GEO): дублируют правило `*`,
 * чтобы в robots.txt было видно намерение не закрывать публичный контент от обхода.
 * Отдельные продукты (Алиса, нейросети без своего бота) опираются на индекс Яндекса/Google — см. правило 04.
 */
const DISALLOW = ["/api/", "/admin"];

const AI_AND_RESEARCH_BOTS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Bytespider",
  "CCBot",
  "Amazonbot",
  "Applebot-Extended",
  "FacebookBot",
  "meta-externalagent",
  "cohere-ai",
  "DuckAssistBot",
];

export default function robots(): MetadataRoute.Robots {
  const base = site.url.replace(/\/$/, "");
  const common = { allow: "/", disallow: DISALLOW };
  const rules: MetadataRoute.Robots["rules"] = [
    ...AI_AND_RESEARCH_BOTS.map((userAgent) => ({ userAgent, ...common })),
    { userAgent: "*", ...common },
  ];
  return {
    rules,
    /** Программатика включена в основной `sitemap.xml` (единая точка для обхода). */
    sitemap: `${base}/sitemap.xml`,
  };
}
