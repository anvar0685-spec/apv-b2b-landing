/**
 * Считает ожидаемое число programmatic URL и проверяет отсутствие устаревших фраз в longread.
 */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const profPath = join(root, "src/content/professions-cities.ts");
const longreadPath = join(root, "src/content/programmatic-longread.ts");

const profSrc = readFileSync(profPath, "utf8");
const professionSlugs = [...profSrc.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
const citySlugs = [...profSrc.matchAll(/slug:\s*"([^"]+)"/g)]
  .map((m) => m[1])
  .filter((s) => !professionSlugs.includes(s) || true);

// Cities block: after export const CITIES
const citiesBlock = profSrc.split("export const CITIES")[1] ?? "";
const cities = [...citiesBlock.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);

const professions = professionSlugs.filter((s) => {
  const idx = profSrc.indexOf(`slug: "${s}"`);
  return idx < profSrc.indexOf("export const CITIES");
});

const expected = professions.length * cities.length;
console.log(`Professions: ${professions.length}, cities: ${cities.length}, routes: ${expected}`);

const longread = readFileSync(longreadPath, "utf8");
const banned = ["эскалац", "KPI", "WMS", "экономика смены", "хвост вывода"];
const hits = banned.filter((w) => longread.toLowerCase().includes(w.toLowerCase()));
if (hits.length) {
  console.error("Banned fragments in programmatic-longread.ts:", hits.join(", "));
  process.exit(1);
}
console.log("programmatic-longread.ts: no banned jargon in source");
