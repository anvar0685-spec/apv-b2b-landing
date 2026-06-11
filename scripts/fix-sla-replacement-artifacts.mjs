#!/usr/bin/env node
/** Починка артефактов после replace-sla-site-copy: EN-поля и русская грамматика. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SRC = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src");

const GLOBAL_EN = [
  ["гарантииs", "guarantees"],
  ["Attendance as an гарантии", "Attendance as contract guarantees"],
  ["Attendance гарантии on", "Attendance guarantees on"],
  ["measurable гарантии rules", "measurable guarantee rules"],
  ["weak гарантии legal review", "weak contract guarantee legal review"],
  ["marketplace гарантииs", "marketplace guarantees"],
  ["breaching client гарантииs", "breaching client guarantees"],
  ["One гарантии across", "One guarantee framework across"],
  ["order-line гарантии", "order-line guarantees"],
  ["one гарантии and", "one guarantee framework and"],
  ["agreed гарантии", "agreed contract terms"],
  ["replacement гарантии and", "replacement guarantees and"],
  ["replacement гарантии", "replacement guarantees"],
  ["within гарантии", "within the contract"],
  ["separate гарантииs per", "separate guarantees per"],
  ["separate гарантии:", "separate shift rules:"],
  ["Dedicated night гарантии", "Dedicated night shift rules"],
  ["night гарантии", "night shift rules"],
  ["гарантии annexes", "contract annexes"],
  ["funnel гарантии", "funnel guarantees"],
  ["Fees and гарантии are", "Fees and guarantees are"],
  ["warehouse гарантии attendance", "warehouse attendance guarantees"],
  ["Moscow & Moscow Oblast, гарантии", "Moscow & Moscow Oblast, contract terms"],
  [", гарантии, reporting", ", guarantees, reporting"],
  ["rates and гарантии", "rates and guarantees"],
  ["pool travel and гарантииs", "pool travel and contract guarantees"],
  ["shift supply, гарантии and", "shift supply, guarantees and"],
  ["Warehouse shift outsourcing for Moscow & MO: гарантии,", "Warehouse shift outsourcing for Moscow & MO: guarantees,"],
];

const RU_GRAMMAR = [
  ['"гарантии согласуется индивидуально', '"Гарантии согласуются индивидуально'],
  ["Условная панель гарантии:", "Условная панель гарантий:"],
  ['"регламент смены"', '"Регламент смены"'],
  ['title: "гарантии по явке', 'title: "Гарантии по явке'],
  ["договоры об оказании услуг с гарантии;", "договоры об оказании услуг с гарантиями;"],
  ["если гарантии не «бумажный»", "если гарантии не «бумажные»"],
  ["при нормальном гарантии.", "при нормальных гарантиях."],
  ["по ставкам и гарантии.", "по ставкам и гарантиям."],
  ["понятным гарантии по этапам", "понятными гарантиями по этапам"],
  ["раздельными гарантии по окнам", "раздельными гарантиями по окнам"],
  ["точечные изменения гарантии при", "точечные изменения гарантий при"],
  ["в рамках гарантии", "в рамках договорных гарантий"],
  ["коэффициентов и гарантии.", "коэффициентов и гарантий."],
  ["соблюдение гарантии по явке", "соблюдение гарантий по явке"],
  ["это часть гарантии.", "это часть гарантий по договору."],
  ["слабый legal review гарантии —", "слабая проработка гарантий в договоре —"],
  ["ежеквартальные** ревью гарантии.", "ежеквартальные** ревью гарантий."],
];

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else if (/\.(ts|tsx|json)$/.test(name)) out.push(p);
  }
  return out;
}

let n = 0;
for (const file of walk(SRC)) {
  let s = fs.readFileSync(file, "utf8");
  const orig = s;
  for (const [a, b] of [...GLOBAL_EN, ...RU_GRAMMAR]) s = s.split(a).join(b);
  if (s !== orig) {
    fs.writeFileSync(file, s);
    n++;
    console.log(path.relative(SRC, file));
  }
}
console.log(`Fixed ${n} files`);
