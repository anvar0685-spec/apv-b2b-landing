#!/usr/bin/env node
/**
 * Яндекс.Метрика — Management API (счётчики, цели, создание JS-целей).
 * Чтение: OAuth с **metrika:read**. Создание целей: **metrika:write** + повторный exchange токена.
 *
 * Env (не в git): deploy/.metrica-oauth.local.env — см. deploy/metrica-oauth.env.example
 * Либо deploy/.yandex-oauth.local.env: YANDEX_METRICA_ACCESS_TOKEN (приоритет) или YANDEX_WEBMASTER_ACCESS_TOKEN.
 *
 * Счётчик: YANDEX_METRICA_COUNTER_ID или NEXT_PUBLIC_YANDEX_METRICA_ID из .env.production / .env.local
 *
 * Список JS-целей: src/config/yandex-metrica-js-goals.json (тот же набор, что reachGoal в analytics-yandex.ts).
 */
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const METRICA_ENV = join(ROOT, "deploy", ".metrica-oauth.local.env");
const OAUTH_ENV = join(ROOT, "deploy", ".yandex-oauth.local.env");
const DOT_ENV = join(ROOT, ".env.production");
const DOT_ENV_LOCAL = join(ROOT, ".env.local");
const GOALS_JSON = join(ROOT, "src", "config", "yandex-metrica-js-goals.json");

const API = "https://api-metrika.yandex.net";

function loadExpectedGoals() {
  if (!existsSync(GOALS_JSON)) throw new Error(`Нет файла целей: ${GOALS_JSON}`);
  const rows = JSON.parse(readFileSync(GOALS_JSON, "utf8"));
  if (!Array.isArray(rows)) throw new Error("yandex-metrica-js-goals.json: ожидается массив");
  return rows.map((r) => {
    if (!r || typeof r.id !== "string" || !r.id.trim()) throw new Error("Каждая цель должна иметь строковое поле id");
    return { id: r.id.trim(), title: typeof r.title === "string" ? r.title : r.id };
  });
}

function parseEnvFile(path) {
  if (!existsSync(path)) return {};
  const raw = readFileSync(path, "utf8");
  const out = {};
  for (const line of raw.split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq === -1) continue;
    const k = t.slice(0, eq).trim();
    let v = t.slice(eq + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'")))
      v = v.slice(1, -1);
    out[k] = v;
  }
  return out;
}

function loadEnv() {
  return {
    ...parseEnvFile(OAUTH_ENV),
    ...parseEnvFile(DOT_ENV),
    ...parseEnvFile(DOT_ENV_LOCAL),
    ...parseEnvFile(METRICA_ENV),
    ...process.env,
  };
}

function resolveToken(env) {
  return (
    env.YANDEX_METRICA_ACCESS_TOKEN?.trim() ||
    env.YANDEX_WEBMASTER_ACCESS_TOKEN?.trim() ||
    ""
  );
}

function resolveCounterId(env) {
  const id = env.YANDEX_METRICA_COUNTER_ID?.trim() || env.NEXT_PUBLIC_YANDEX_METRICA_ID?.trim() || "";
  if (!id) return null;
  const n = Number(id);
  return Number.isFinite(n) ? String(n) : null;
}

/** Идентификаторы reachGoal: name цели и/или url в conditions (exact) у type action */
function collectJsIdentifiersFromGoals(goals) {
  const ids = new Set();
  for (const g of goals) {
    if (g?.name && String(g.name).trim()) ids.add(String(g.name).trim());
    if (g?.type === "action" && Array.isArray(g.conditions)) {
      for (const c of g.conditions) {
        if (c?.url != null && String(c.url).trim() && (c.type === "exact" || c.type === "action")) {
          ids.add(String(c.url).trim());
        }
      }
    }
  }
  return ids;
}

async function apiGet(path, token) {
  const res = await fetch(`${API}${path}`, {
    headers: {
      Authorization: `OAuth ${token}`,
      Accept: "application/json",
    },
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`Metrica API GET ${path}: HTTP ${res.status} — ${text.slice(0, 400)}`);
  }
  if (!res.ok) {
    const hint =
      res.status === 403 && String(json?.message || "").toLowerCase().includes("access")
        ? " Добавь в oauth.yandex.ru у приложения право «Яндекс.Метрика», затем снова auth-open → exchange-file."
        : "";
    throw new Error(`Metrica API GET ${path}: HTTP ${res.status} — ${JSON.stringify(json)}${hint}`);
  }
  return json;
}

async function apiPost(path, token, body) {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: {
      Authorization: `OAuth ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`Metrica API POST ${path}: HTTP ${res.status} — ${text.slice(0, 400)}`);
  }
  if (!res.ok) {
    const hint =
      res.status === 403
        ? " Для создания целей нужен scope **metrika:write** у того же OAuth-приложения и новый access_token (exchange-file)."
        : "";
    throw new Error(`Metrica API POST ${path}: HTTP ${res.status} — ${JSON.stringify(json)}${hint}`);
  }
  return json;
}

async function fetchGoals(token, counterId) {
  const data = await apiGet(`/management/v1/counter/${counterId}/goals`, token);
  return data.goals || [];
}

async function cmdCounters(env) {
  const token = resolveToken(env);
  if (!token) throw new Error("Нет токена: YANDEX_METRICA_ACCESS_TOKEN или YANDEX_WEBMASTER_ACCESS_TOKEN в deploy/.yandex-oauth.local.env / deploy/.metrica-oauth.local.env");
  const data = await apiGet("/management/v1/counters", token);
  const rows = (data.counters || []).map((c) => ({
    id: c.id,
    name: c.name,
    site: c.site2?.site || c.site,
    status: c.status,
  }));
  console.log(JSON.stringify(rows, null, 2));
}

async function cmdCounter(env, counterIdArg) {
  const token = resolveToken(env);
  if (!token) throw new Error("Нет OAuth-токена (см. deploy/metrica-oauth.env.example)");
  const id = counterIdArg || resolveCounterId(env);
  if (!id) throw new Error("Укажи counter_id аргументом или YANDEX_METRICA_COUNTER_ID / NEXT_PUBLIC_YANDEX_METRICA_ID");
  const data = await apiGet(`/management/v1/counter/${id}?field=mirrors`, token);
  const goals = await fetchGoals(token, id);
  console.log(JSON.stringify({ counter: data.counter, goals }, null, 2));
}

async function cmdGoalsCheck(env) {
  const token = resolveToken(env);
  if (!token) throw new Error("Нет OAuth-токена");
  const id = resolveCounterId(env);
  if (!id) throw new Error("Задай NEXT_PUBLIC_YANDEX_METRICA_ID или YANDEX_METRICA_COUNTER_ID");
  const expected = loadExpectedGoals();
  const expectedIds = expected.map((g) => g.id);
  const goals = await fetchGoals(token, id);
  const present = collectJsIdentifiersFromGoals(goals);
  console.log("Идентификаторы JS-целей на счётчике (name + action/exact url):", [...present].sort().join(", ") || "(нет)");
  const missing = expectedIds.filter((n) => !present.has(n));
  if (missing.length) {
    console.warn("Не найдены в Метрике (создай вручную или npm run metrica:goals-install):", missing.join(", "));
    process.exitCode = 2;
  } else {
    console.log("Ок: все ожидаемые JS-цели из yandex-metrica-js-goals.json присутствуют на счётчике.");
  }
}

async function cmdGoalsInstall(env) {
  const token = resolveToken(env);
  if (!token) throw new Error("Нет OAuth-токена");
  const id = resolveCounterId(env);
  if (!id) throw new Error("Задай NEXT_PUBLIC_YANDEX_METRICA_ID или YANDEX_METRICA_COUNTER_ID");
  const expected = loadExpectedGoals();
  const goals = await fetchGoals(token, id);
  const present = collectJsIdentifiersFromGoals(goals);

  for (const g of expected) {
    if (present.has(g.id)) {
      console.log("уже есть:", g.id);
      continue;
    }
    const body = {
      goal: {
        name: g.title,
        type: "action",
        conditions: [{ type: "exact", url: g.id }],
      },
    };
    await apiPost(`/management/v1/counter/${id}/goals`, token, body);
    present.add(g.id);
    console.log("создана:", g.id);
  }
  console.log("Готово. Проверка: npm run metrica:goals-check");
}

const cmd = process.argv[2] || "help";
const env = loadEnv();

try {
  if (cmd === "counters") await cmdCounters(env);
  else if (cmd === "counter") await cmdCounter(env, process.argv[3]);
  else if (cmd === "goals-check") await cmdGoalsCheck(env);
  else if (cmd === "goals-install") await cmdGoalsInstall(env);
  else {
    console.log(`Команды:
  counters              — список счётчиков (нужен OAuth с metrika:read)
  counter [id]          — карточка счётчика + цели (id из counters или из env)
  goals-check           — сверка целей с src/config/yandex-metrica-js-goals.json
  goals-install         — создать недостающие JS-цели (нужен OAuth с metrika:write)`);
    process.exit(cmd === "help" ? 0 : 1);
  }
} catch (e) {
  console.error(e.message || e);
  process.exit(1);
}
