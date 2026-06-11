#!/usr/bin/env node
/**
 * Замена SLA на понятный русский (и нейтральный EN) во всём src/.
 * Slug URL и id секций в коде не трогаем.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src");

const RU_PAIRS = [
  ["приложениях SLA", "приложении к договору"],
  ["приложения к SLA", "приложение к договору"],
  ["приложение SLA", "приложение к договору"],
  ["приложении SLA", "приложении к договору"],
  ["приложению SLA", "приложению к договору"],
  ["договорной SLA", "договорные гарантии"],
  ["договорные SLA", "договорные гарантии"],
  ["Единый SLA", "Единый регламент"],
  ["единый SLA", "единый регламент"],
  ["единым SLA", "единым регламентом"],
  ["Один SLA", "Один регламент"],
  ["отдельным SLA", "отдельным регламентом"],
  ["отдельный SLA", "отдельный регламент"],
  ["ночной SLA", "ночной регламент"],
  ["ночные SLA", "ночные регламенты"],
  ["Заявка и SLA", "Заявка и гарантии"],
  ["Сводки по SLA", "Сводки по сменам"],
  ["Гарантии и SLA", "Гарантии по сменам"],
  ["Есть ли SLA", "Есть ли гарантии"],
  ["Запросить SLA", "Запросить гарантии"],
  ["согласованным SLA", "согласованным регламентом"],
  ["согласованный SLA", "согласованный регламент"],
  ["согласованные SLA", "согласованные гарантии"],
  ["фактические SLA", "фактические гарантии"],
  ["клиентских SLA", "клиентских гарантий"],
  ["нарушение SLA", "срыв по договору"],
  ["срыва SLA", "срыва по договору"],
  ["без срыва SLA", "без срыва по договору"],
  ["breaching SLA", "breaching contract terms"],
  ["по SLA", "по договору"],
  ["в SLA", "в договоре"],
  ["к SLA", "к договору"],
  ["и SLA", "и гарантии"],
  [", SLA", ", гарантии"],
  ["SLA, ", "гарантии, "],
  ["SLA.", "гарантии."],
  ["SLA:", "гарантии:"],
  ["SLA?", "гарантии?"],
  ["SLA ·", "Гарантии ·"],
  ["SLA смены", "регламент смены"],
  ["SLA явка", "гарантии по явке"],
  ["SLA по", "гарантии по"],
  ["SLA под", "гарантии на"],
  ["SLA на", "гарантии на"],
  ["SLA без", "гарантии без"],
  ["SLA в", "гарантии в"],
  ["«SLA»", "«гарантия на бумаге»"],
  ["не «SLA»", "не «гарантия на бумаге»"],
  ["в SLA —", "в договоре —"],
  ["SLA —", "гарантии —"],
  ["SLA и", "гарантии и"],
  ["SLA с", "гарантии с"],
  ["SLA (", "гарантии ("],
  ['sec("sla", "SLA"', 'sec("sla", "Гарантии"'],
  ['kicker="SLA"', 'kicker="Гарантии"'],
  ['"SLA"', '"Гарантии"'],
  ["SLA", "гарантии"],
];

const EN_PAIRS = [
  ["SLAs", "contract guarantees"],
  ["an SLA", "contract guarantees"],
  ["the SLA", "the contract guarantees"],
  ["within SLA", "within the contract"],
  ["agreed SLA", "agreed contract terms"],
  ["separate SLA", "separate shift rules"],
  ["Attendance SLA", "Attendance guarantees"],
  ["warehouse SLA", "warehouse contract terms"],
  ["order-line SLA", "order-line guarantees"],
  ["SLA annexes", "contract annexes"],
  ["SLA and", "contract terms and"],
  ["SLA,", "contract terms,"],
  ["SLA.", "contract terms."],
  ["SLA ", "contract terms "],
  [" SLA", " contract terms"],
  ["SLA", "contract guarantees"],
];

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (/\.(ts|tsx|json)$/.test(name)) out.push(p);
  }
  return out;
}

function applyPairs(text, pairs) {
  let s = text;
  for (const [a, b] of pairs) {
    s = s.split(a).join(b);
  }
  return s;
}

let changed = 0;
for (const file of walk(ROOT)) {
  const raw = fs.readFileSync(file, "utf8");
  if (!raw.includes("SLA") && !raw.includes("SLAs")) continue;
  let next = applyPairs(raw, RU_PAIRS);
  next = applyPairs(next, EN_PAIRS);
  if (next !== raw) {
    fs.writeFileSync(file, next, "utf8");
    changed++;
    console.log("updated:", path.relative(ROOT, file));
  }
}

console.log(`Done. Files changed: ${changed}`);
