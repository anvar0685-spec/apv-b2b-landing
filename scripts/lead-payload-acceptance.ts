/**
 * Проверка payload заявки (без БД): схема API + пустой email.
 */
import assert from "node:assert/strict";
import { leadCreateSchema } from "../src/lib/validations/lead";

const cases = [
  {
    label: "moskva gruzchiki",
    data: {
      companyName: "ООО Тест",
      contactName: "Иван Тест",
      contactPhone: "+79001234567",
      serviceType: "autsorsing",
      professionLines: [{ slug: "gruzchiki", headcount: 30 }],
      city: "moskva",
      source: "acceptance",
    },
  },
  {
    label: "domodedovo manual city",
    data: {
      companyName: "ООО Тест 2",
      contactName: "Пётр Тест",
      contactPhone: "+79007654321",
      serviceType: "autsorsing",
      professionLines: [{ slug: "gruzchiki", headcount: 12 }],
      city: "domodedovo",
      source: "acceptance",
    },
  },
  {
    label: "voditeli podolsk no email",
    data: {
      companyName: "ООО Логистика",
      contactName: "Сергей",
      contactPhone: "+79001112233",
      serviceType: "autsorsing",
      professionLines: [{ slug: "voditeli-prt", headcount: 30 }],
      city: "podolsk",
      contactEmail: "",
      source: "acceptance",
    },
  },
];

for (const c of cases) {
  const parsed = leadCreateSchema.safeParse(c.data);
  assert.ok(parsed.success, `${c.label}: ${parsed.success ? "" : JSON.stringify(parsed.error.flatten())}`);
  const sum = parsed.data!.professionLines.reduce((s, l) => s + l.headcount, 0);
  assert.ok(sum >= 1);
  console.log("OK payload", c.label, "headcount=", sum, "city=", parsed.data!.city);
}
