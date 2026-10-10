/**
 * Smoke POST /api/v1/leads (нужен next start + prisma seed).
 * Пустой email не блокирует; с email — kpEmailSent может быть false без SMTP.
 */
import assert from "node:assert/strict";

const base = process.env.BASE_URL ?? "http://127.0.0.1:3000";

const scenarios = [
  {
    name: "moskva gruzchiki no email",
    body: {
      contactName: "Тест Приёмка",
      companyName: "ООО Склад Тест",
      contactPhone: "+79001234567",
      serviceType: "autsorsing",
      professionLines: [{ slug: "gruzchiki", headcount: 30 }],
      city: "moskva",
      source: "acceptance_smoke",
    },
  },
  {
    name: "domodedovo after city change",
    body: {
      contactName: "Тест Домодедово",
      companyName: "ООО Склад Тест 2",
      contactPhone: "+79007654321",
      serviceType: "autsorsing",
      professionLines: [{ slug: "gruzchiki", headcount: 12 }],
      city: "domodedovo",
      source: "acceptance_smoke",
    },
  },
  {
    name: "voditeli podolsk",
    body: {
      contactName: "Тест Подольск",
      companyName: "ООО Логистика",
      contactPhone: "+79001112233",
      serviceType: "autsorsing",
      professionLines: [{ slug: "voditeli-prt", headcount: 30 }],
      city: "podolsk",
      source: "acceptance_smoke",
    },
  },
];

let failed = false;
for (const s of scenarios) {
  const res = await fetch(`${base}/api/v1/leads`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(s.body),
  });
  const json = await res.json().catch(() => ({}));
  if (res.status === 503 && json.error === "tenant_missing") {
    console.warn("SKIP lead smoke: run prisma db seed");
    process.exit(0);
  }
  if (!res.ok) {
    console.error("FAIL", s.name, res.status, json);
    failed = true;
    continue;
  }
  assert.ok(json.id, `${s.name} id`);
  assert.equal(json.status, "new");
  console.log("OK", s.name, json.id, "kpEmailSent=", json.kpEmailSent);
}

if (failed) process.exit(1);
