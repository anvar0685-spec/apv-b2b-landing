#!/usr/bin/env node
/**
 * Ежедневная SEO-рутина в рамках официальных API-лимитов Яндекс.Вебмастер и Google GSC.
 *
 * npm run seo:daily
 *
 * Лимиты по умолчанию (переопределяются в deploy/.seo-automation.env.local):
 *   SEO_YANDEX_RECRAWL_MAX=40   — не больше N переобходов за запуск (квота Яндекса 150/сутки)
 *   SEO_GSC_INSPECT_MAX=15      — URL Inspection за запуск (официальный API, не спам)
 *   SEO_GSC_ANALYTICS_INTERVAL_DAYS=7
 */
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const ENV_LOCAL = join(ROOT, "deploy", ".seo-automation.env.local");
const STATE_FILE = join(ROOT, "deploy", ".seo-automation-state.json");
const LOG_MD = join(ROOT, "my-guide", "SEO-DAILY-latest.md");

function parseEnvFile(path) {
  if (!existsSync(path)) return {};
  const out = {};
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq === -1) continue;
    out[t.slice(0, eq).trim()] = t.slice(eq + 1).trim();
  }
  return out;
}

function runNode(script, cmd) {
  const r = spawnSync("node", [join(ROOT, "scripts", script), cmd], {
    cwd: ROOT,
    encoding: "utf8",
    env: { ...process.env, ...parseEnvFile(ENV_LOCAL) },
  });
  const out = `${r.stdout || ""}${r.stderr || ""}`.trim();
  return { ok: r.status === 0, status: r.status ?? 1, out };
}

function main() {
  const started = new Date().toISOString();
  const steps = [];

  steps.push({ name: "yandex:sync", ...runNode("yandex-webmaster.mjs", "sync") });
  steps.push({ name: "yandex:recrawl-daily", ...runNode("yandex-webmaster.mjs", "recrawl-daily") });
  steps.push({ name: "gsc:routine-daily", ...runNode("google-search-console.mjs", "routine-daily") });

  let state = {};
  if (existsSync(STATE_FILE)) {
    try {
      state = JSON.parse(readFileSync(STATE_FILE, "utf8"));
    } catch {
      state = {};
    }
  }

  const failed = steps.filter((s) => !s.ok);
  const md = [
    `# SEO — ежедневная автоматизация`,
    ``,
    `**Запуск:** ${started}`,
    `**Команда:** \`npm run seo:daily\``,
    ``,
    `## Статус`,
    ``,
    failed.length ? `**Есть ошибки:** ${failed.map((f) => f.name).join(", ")}` : `**OK** — все шаги без exit error`,
    ``,
    `## Очередь (state)`,
    ``,
    `- Яндекс переобход: осталось **${state.yandex_pending_count ?? "—"}** URL`,
    `- GSC inspect: осталось **${state.gsc_inspect_pending_count ?? "—"}** URL`,
    `- Последний Яндекс: ${state.yandex_last_run || "—"}`,
    `- Последний GSC: ${state.gsc_last_run || "—"}`,
    ``,
    `## Шаги`,
    ``,
    ...steps.flatMap((s) => [
      `### ${s.name}`,
      ``,
      s.ok ? "Статус: **OK**" : `Статус: **ОШИБКА** (exit ${s.status})`,
      ``,
      "```",
      (s.out || "—").slice(0, 8000),
      "```",
      ``,
    ]),
    `---`,
    `Лимиты и правила: \`my-guide/SEO-DAILY-AUTOMATION.md\``,
    ``,
  ].join("\n");

  writeFileSync(LOG_MD, md, "utf8");
  console.log(`OK → ${LOG_MD}`);
  if (failed.length) {
    console.error("Ошибки:", failed.map((f) => f.name).join(", "));
    process.exit(1);
  }
}

main();
