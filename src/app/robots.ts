import type { MetadataRoute } from "next";
import { site } from "@/config/site";

/**
 * Явные Allow для распространённых AI/LLM-краулеров (GEO): дублируют правило `*`,
 * чтобы в robots.txt было видно намерение не закрывать публичный контент от обхода.
 * Отдельные продукты (Алиса, нейросети без своего бота) опираются на индекс Яндекса/Google — см. правило 04.
 *
 * Источники user-agent (актуальны на 2026-05): официальные доки вендоров и каталоги ботов
 * (darkvisitors, dark-tools, robotstxt.org). При появлении новых ботов — дописывать сюда,
 * чеклист и сценарий обновления — `my-guide/GEO-AI-CHECKLIST.md`.
 */
const DISALLOW = ["/api/", "/admin"];

const AI_AND_RESEARCH_BOTS = [
  // OpenAI
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  // Anthropic
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "Claude-SearchBot",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Google (Gemini / Bard / Vertex)
  "Google-Extended",
  "GoogleOther",
  // Яндекс (отдельный бот для обучения LLM, объявлен Яндексом)
  "YandexAdditional",
  "YandexAdditionalGenerative",
  // Прочие LLM/поисковые ассистенты
  "MistralAI-User",
  "cohere-ai",
  "cohere-training-data-crawler",
  "DuckAssistBot",
  "Kagibot",
  "Bytespider",
  "CCBot",
  "Amazonbot",
  "Applebot-Extended",
  "FacebookBot",
  "meta-externalagent",
  "meta-externalfetcher",
  // Дата-агрегаторы и AI-search-tools
  "Diffbot",
  "Timpibot",
  "Omgilibot",
  "ImagesiftBot",
  "Webzio-Extended",
  "PetalBot",
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
