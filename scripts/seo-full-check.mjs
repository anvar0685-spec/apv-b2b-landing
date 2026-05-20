#!/usr/bin/env node
/**
 * Полная SEO-проверка: Яндекс Вебмастер + Метрика + Google GSC.
 * Отчёт: my-guide/SEO-CHECK-latest.md
 */
import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const REPORT = join(ROOT, "my-guide", "SEO-CHECK-latest.md");

const SITE = process.env.SEO_CHECK_SITE || "https://xn----7sbbgqr3atubl.xn--p1ai";

function runNpm(script) {
  const r = spawnSync("npm", ["run", script], {
    cwd: ROOT,
    encoding: "utf8",
    env: process.env,
  });
  return {
    script,
    ok: r.status === 0,
    status: r.status ?? 1,
    stdout: (r.stdout || "").trim(),
    stderr: (r.stderr || "").trim(),
  };
}

function curlHead(path) {
  const url = `${SITE.replace(/\/$/, "")}${path}`;
  const r = spawnSync("curl", ["-sI", "--max-time", "15", url], { encoding: "utf8" });
  const first = (r.stdout || "").split("\n")[0] || `curl exit ${r.status}`;
  return { url, line: first.trim() };
}

function section(title, body) {
  return `## ${title}\n\n${body}\n\n`;
}

function main() {
  const started = new Date().toISOString();
  const steps = [];
  const errors = [];

  const curls = ["/robots.txt", "/sitemap.xml", "/ru", "/google02fa6fed6cc610e6.html"].map(curlHead);

  const jobs = [
    ["webmaster:audit", "Яндекс Вебмастер — audit"],
    ["webmaster:recrawl-quota", "Яндекс — квота переобхода"],
    ["webmaster:sync", "Яндекс — sitemap sync"],
    ["webmaster:recrawl", "Яндекс — recrawl (priority list)"],
    ["metrica:counters", "Метрика — счётчики"],
    ["metrica:goals-check", "Метрика — цели"],
    ["metrica:counter", "Метрика — карточка счётчика"],
    ["gsc:routine", "Google GSC — routine"],
  ];

  for (const [script] of jobs) {
    const res = runNpm(script);
    steps.push(res);
    if (!res.ok) errors.push(`${script}: exit ${res.status}`);
  }

  let md = `# SEO — полная проверка\n\n`;
  md += `**Сгенерировано:** ${started}\n`;
  md += `**Команда:** \`npm run seo:check\`\n\n`;

  md += section(
    "Прод — HTTP",
    curls.map((c) => `- \`${c.url}\` → ${c.line}`).join("\n"),
  );

  for (const res of steps) {
    const label = jobs.find((j) => j[0] === res.script)?.[1] || res.script;
    md += `## ${label}\n\n`;
    md += res.ok ? "Статус: **OK**\n\n" : `Статус: **ОШИБКА** (exit ${res.status})\n\n`;
    if (res.stdout) md += "```\n" + res.stdout.slice(0, 12000) + "\n```\n\n";
    if (res.stderr && !res.ok) md += `_stderr:_ \`${res.stderr.slice(0, 500)}\`\n\n`;
  }

  md += `## Сводка для агента\n\n`;
  md += `- GSC (человекочитаемо): \`my-guide/GSC-REPORT-latest.md\`\n`;
  md += `- GSC JSON: \`deploy/gsc-routine-latest.json\`\n`;
  md += `- При ошибках OAuth: \`npm run gsc:auth-serve\` / \`npm run webmaster:exchange-file\`\n`;
  if (errors.length) {
    md += `\n**Ошибки:**\n${errors.map((e) => `- ${e}`).join("\n")}\n`;
  } else {
    md += `\nВсе шаги завершились без ошибок exit code.\n`;
  }

  writeFileSync(REPORT, md, "utf8");
  console.log(`OK → ${REPORT}`);
  if (errors.length) {
    console.warn("Есть ошибки:", errors.join("; "));
    process.exit(1);
  }
}

main();
