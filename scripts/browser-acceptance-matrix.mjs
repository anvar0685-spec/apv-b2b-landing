/**
 * Лог браузерной матрицы: для каждой пары URL × ширина — HTTP 200 и базовые маркеры в HTML.
 * Полный визуальный прогон — в Cursor Browser MCP; этот скрипт даёт воспроизводимый лог.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const base = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const widths = [360, 390, 430, 1366, 1440];

const paths = [
  "/ru",
  "/ru/kalkulyator",
  "/ru/zayavka",
  "/ru/o-kompanii",
  "/ru/o-kompanii/dokumenty",
  "/ru/uslugi/autsorsing",
  "/ru/uslugi/podbor-personala",
  "/ru/uslugi/postoyannyy-personal",
  "/ru/uslugi/nochnye-smeny",
  "/ru/otrasli/sklady-e-commerce",
  "/ru/otrasli/farmatsevticheskie-sklady",
  "/ru/personal/gruzchiki/domodedovo",
  "/ru/personal/komplektovschiki/moskva",
  "/ru/personal/voditeli-prt/podolsk",
  "/ru/keysy/stroitelnye-materialy-sklad-obrabotka",
  "/ru/keysy/sklady-tehniki-mo",
  "/ru/blog",
  "/ru/blog/otsenka-podryadchika-posle-pervyh-30-dney-metriki-i-retrospektiva",
  "/ru/kontakty",
  "/ru/garantii",
  "/ru/faq",
];

const rows = [];

for (const path of paths) {
  for (const w of widths) {
    const url = `${base}${path}`;
    let status = 0;
    let ok = false;
    let note = "";
    try {
      const res = await fetch(url, { headers: { "User-Agent": `apv-acceptance/${w}` } });
      status = res.status;
      const html = await res.text();
      ok = res.ok && html.includes('id="main"');
      if (path.includes("dokumenty") && ok && !html.includes("Документы и реквизиты")) {
        ok = false;
        note = "missing hero title";
      }
      if (path.includes("kalkulyator") && ok && html.includes("Шаг 4")) {
        ok = false;
        note = "still 4 calculator steps";
      }
      if (path.includes("zayavka") && ok && !html.includes("Добавить профессию")) {
        ok = false;
        note = "lead form copy";
      }
      if (path === "/ru" && ok && html.includes("операционном пуле")) {
        ok = false;
        note = "home stats jargon";
      }
      if (path.includes("garantii") && ok && html.includes("Нормативка")) {
        ok = false;
        note = "garantii kicker";
      }
    } catch (e) {
      note = String(e);
    }
    rows.push({ path, width: w, status, ok, note });
  }
}

const outDir = join(root, "docs/screenshots/editorial-design-2026-10-10");
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "browser-acceptance-log.json");
const summary = {
  at: new Date().toISOString(),
  base,
  widths,
  paths: paths.length,
  checks: rows.length,
  passed: rows.filter((r) => r.ok).length,
  failed: rows.filter((r) => !r.ok),
};
writeFileSync(outPath, JSON.stringify({ summary, rows }, null, 2));
console.log(JSON.stringify(summary, null, 2));
if (summary.failed.length) process.exit(1);
