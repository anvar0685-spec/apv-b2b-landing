/**
 * Контрольные суммы полного калькулятора (логика как в calculator-full.tsx).
 */
import assert from "node:assert/strict";
import test from "node:test";

const RATES = {
  gruzchiki: 600,
  komplektovschiki: 650,
  "voditeli-prt": 800,
};
const SHIFT_HOURS = 11;
const WEEKS = 4.3;

function shiftMult(shift) {
  if (shift === "night") return 1.08;
  if (shift === "24") return 1.12;
  return 1;
}

function estimate({
  profession,
  headcount,
  hoursPerWeek = 40,
  shift = "day",
  extraHousing = false,
  extraTransport = false,
  extraPeak = false,
  extraCompliance = false,
  workFormat = "permanent",
  durationMonths = 3,
}) {
  const hourlyBase = RATES[profession] ?? 600;
  const hourlyEffective = Math.round(hourlyBase * shiftMult(shift));
  const hours = hoursPerWeek * WEEKS;
  const subtotal = hourlyEffective * hours * headcount;
  const compliancePrem = extraCompliance ? subtotal * 0.06 : 0;
  const peakLoad =
    workFormat === "seasonal" ? subtotal * 0.08 : extraPeak ? subtotal * 0.08 : 0;
  const extras =
    (extraHousing ? headcount * 8000 : 0) +
    (extraTransport ? headcount * 3000 : 0) +
    peakLoad;
  const total = Math.round(subtotal + compliancePrem + extras);
  const low = Math.round(total * 0.9);
  const high = Math.round(total * 1.1);
  const shift11 = Math.round(hourlyEffective * SHIFT_HOURS) * headcount;
  const monthly = (days) =>
    Math.round(hourlyEffective * SHIFT_HOURS * days * WEEKS * headcount);
  return {
    total,
    low,
    high,
    projectTotal: Math.round(total * durationMonths),
    shift11,
    m7: monthly(7),
    m6: monthly(6),
    m5: monthly(5),
    hourlyEffective,
  };
}

function embedMonth(profession, n) {
  const rate = RATES[profession] ?? 600;
  return Math.round(rate * 40 * WEEKS * n);
}

test("Moscow gruzchiki 30 permanent day 40h 3mo no extras", () => {
  const e = estimate({ profession: "gruzchiki", headcount: 30 });
  assert.equal(e.hourlyEffective, 600);
  assert.equal(e.total, 3_096_000);
  assert.equal(e.low, 2_786_400);
  assert.equal(e.high, 3_405_600);
  assert.equal(e.projectTotal, 9_288_000);
  assert.equal(e.shift11, 198_000);
  assert.equal(e.m7, 5_959_800);
  assert.equal(e.m6, 5_108_400);
  assert.equal(e.m5, 4_257_000);
});

test("voditeli-prt podolsk 30 same baseline", () => {
  const e = estimate({ profession: "voditeli-prt", headcount: 30 });
  assert.equal(e.total, 4_128_000);
});

test("mini embed komplektovschiki 17", () => {
  assert.equal(embedMonth("komplektovschiki", 17), 1_900_600);
});
