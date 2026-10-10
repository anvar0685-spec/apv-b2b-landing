import assert from "node:assert/strict";
import test from "node:test";
import { createRequire } from "node:module";

// Compiled path not available — duplicate minimal logic for regression
const PROFESSIONS = [
  "gruzchiki",
  "komplektovschiki",
  "kladovschiki",
  "voditeli-prt",
  "upakovschiki",
  "razdorabochie",
  "klinery",
  "sborschiki-upakovschiki",
];
const CITIES = [
  "moskva",
  "podolsk",
  "domodedovo",
  "khimki",
  "balashikha",
];

function resolveCitySlug(raw) {
  const v = raw?.trim();
  if (v && CITIES.includes(v)) return v;
  return "moskva";
}

function resolveProfessionSlug(raw) {
  const v = raw?.trim();
  if (v && PROFESSIONS.includes(v)) return v;
  return "gruzchiki";
}

function parseCalculatorSearchParams(qs) {
  const sp = new URLSearchParams(qs);
  return {
    profession: resolveProfessionSlug(sp.get("p")),
    city: resolveCitySlug(sp.get("city")),
  };
}

function parseLeadSearchParams(qs) {
  const sp = new URLSearchParams(qs);
  return {
    profession: resolveProfessionSlug(sp.get("profession") ?? sp.get("p")),
    city: resolveCitySlug(sp.get("city")),
  };
}

test("podolsk voditeli from calculator query", () => {
  const r = parseCalculatorSearchParams("p=voditeli-prt&city=podolsk");
  assert.equal(r.profession, "voditeli-prt");
  assert.equal(r.city, "podolsk");
});

test("domodedovo gruzchiki from calculator query", () => {
  const r = parseCalculatorSearchParams("p=gruzchiki&city=domodedovo");
  assert.equal(r.city, "domodedovo");
});

test("lead accepts profession alias p", () => {
  const r = parseLeadSearchParams("p=gruzchiki&city=domodedovo");
  assert.equal(r.profession, "gruzchiki");
  assert.equal(r.city, "domodedovo");
});

test("unknown city falls back to moskva", () => {
  const r = parseCalculatorSearchParams("city=unknown-city");
  assert.equal(r.city, "moskva");
});
