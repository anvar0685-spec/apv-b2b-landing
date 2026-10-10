/**
 * HTTP-проверка всех programmatic URL (нужен `next start` на BASE_URL).
 * Покрытие: статус, H1, ставка, canonical, CTA, запрет старых фраз и /komanda.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const base = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const locale = "ru";

const profSrc = readFileSync(join(root, "src/content/professions-cities.ts"), "utf8");
const professionSlugs = [];
for (const m of profSrc.matchAll(/slug:\s*"([^"]+)"/g)) {
  if (profSrc.indexOf(m[0]) < profSrc.indexOf("export const CITIES")) professionSlugs.push(m[1]);
}
const citiesBlock = profSrc.split("export const CITIES")[1] ?? "";
const cities = [...citiesBlock.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
const cityNames = [...citiesBlock.matchAll(/nameRu:\s*"([^"]+)"/g)].map((m) => m[1]);
const cityPrep = [...citiesBlock.matchAll(/namePrepositionalRu:\s*"([^"]+)"/g)].map((m) => m[1]);

const cityBySlug = Object.fromEntries(cities.map((slug, i) => [slug, cityNames[i] ?? slug]));
const cityPrepBySlug = Object.fromEntries(cities.map((slug, i) => [slug, cityPrep[i] ?? cityNames[i] ?? slug]));

function mainHtml(html) {
  const m = html.match(/<main[^>]*id="main"[^>]*>([\s\S]*?)<\/main>/i);
  return m?.[1] ?? html;
}

const banned = [
  "операционный пул",
  "Получить расчёт",
  "профиль уже подставлен",
  "Параметры профессии и города",
  "/komanda",
  "/pressa",
];

const routes = [];
for (const p of professionSlugs) {
  for (const c of cities) routes.push({ p, c });
}

const errors = [];
const coverage = {
  statusOk: 0,
  h1City: 0,
  hasRate: 0,
  canonical: 0,
  calcCta: 0,
  zayavkaCta: 0,
  noBanned: 0,
};

const concurrency = 12;
let idx = 0;

async function checkOne({ p, c }) {
  const url = `${base}/${locale}/personal/${p}/${c}`;
  const cityName = cityBySlug[c];
  let html;
  try {
    const res = await fetch(url, { redirect: "follow" });
    if (!res.ok) {
      errors.push({ url, check: "status", detail: res.status });
      return;
    }
    coverage.statusOk++;
    html = await res.text();
  } catch (e) {
    errors.push({ url, check: "fetch", detail: String(e) });
    return;
  }

  const body = mainHtml(html);
  const h1 = body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, "") ?? "";
  const prep = cityPrepBySlug[c];
  if (prep && h1.includes(prep)) coverage.h1City++;
  else errors.push({ url, check: "h1-city", detail: h1.slice(0, 120) });

  if (/₽\/ч|₽\/час|от \d+ ₽/.test(body)) coverage.hasRate++;
  else errors.push({ url, check: "rate", detail: "no rate hint" });

  if (html.includes('rel="canonical"')) coverage.canonical++;
  else errors.push({ url, check: "canonical", detail: "missing" });

  if (body.includes("Рассчитать стоимость")) coverage.calcCta++;
  else errors.push({ url, check: "calc-cta", detail: "missing" });

  if (body.includes("Обсудить задачу")) coverage.zayavkaCta++;
  else errors.push({ url, check: "zayavka-cta", detail: "missing" });

  const hit = banned.find((b) => body.includes(b));
  if (!hit) coverage.noBanned++;
  else errors.push({ url, check: "banned", detail: hit });
}

async function worker() {
  while (idx < routes.length) {
    const i = idx++;
    await checkOne(routes[i]);
  }
}

await Promise.all(Array.from({ length: concurrency }, () => worker()));

const report = {
  at: new Date().toISOString(),
  base,
  totalRoutes: routes.length,
  coverage,
  errorCount: errors.length,
  sampleErrors: errors.slice(0, 30),
};

const outDir = join(root, "docs/screenshots/editorial-design-2026-10-10");
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "programmatic-html-verify.json");
writeFileSync(outPath, JSON.stringify(report, null, 2));

console.log(JSON.stringify({ totalRoutes: routes.length, coverage, errorCount: errors.length, log: outPath }));

if (errors.length) process.exit(1);
