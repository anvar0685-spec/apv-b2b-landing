#!/usr/bin/env node
/**
 * Яндекс.Метрика — Management API (список счётчиков, цели).
 * Токен: OAuth с правом **metrika:read** (добавь в то же приложение oauth.yandex.ru или отдельное).
 *
 * Env (не в git): deploy/.metrica-oauth.local.env — см. deploy/metrica-oauth.env.example
 * Либо в deploy/.yandex-oauth.local.env: YANDEX_METRICA_ACCESS_TOKEN (приоритет) или fallback на YANDEX_WEBMASTER_ACCESS_TOKEN, если в токене уже есть metrika:read.
 *
 * Счётчик: YANDEX_METRICA_COUNTER_ID или NEXT_PUBLIC_YANDEX_METRICA_ID из .env.production / .env.local
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

const API = "https://api-metrika.yandex.net";

/** Идентификаторы целей из src/lib/analytics-yandex.ts + my-guide/YANDEX-METRIKA-GOALS.md */
const EXPECTED_JS_GOALS = ["lead_form_submit", "phone_click", "calculator_embed_done", "calculator_full_done"];

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

async function cmdCounters(env) {
  const token = resolveToken(env);
  if (!token) throw new Error("Нет токена: YANDEX_METRICA_ACCESS_TOKEN или YANDEX_WEBMASTER_ACCESS_TOKEN в deploy/.metrica-oauth.local.env / deploy/.yandex-oauth.local.env");
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
  const data = await apiGet(`/management/v1/counter/${id}?field=goals,mirrors,site2`, token);
  console.log(JSON.stringify(data, null, 2));
}

async function cmdGoalsCheck(env) {
  const token = resolveToken(env);
  if (!token) throw new Error("Нет OAuth-токена");
  const id = resolveCounterId(env);
  if (!id) throw new Error("Задай NEXT_PUBLIC_YANDEX_METRICA_ID или YANDEX_METRICA_COUNTER_ID");
  const data = await apiGet(`/management/v1/counter/${id}?field=goals`, token);
  const goals = data.goals || [];
  const byName = new Set(goals.map((g) => g.name).filter(Boolean));
  console.log("Цели на счётчике (name):", [...byName].sort().join(", ") || "(нет)");
  const missing = EXPECTED_JS_GOALS.filter((n) => !byName.has(n));
  if (missing.length) {
    console.warn("Не найдены в Метрике (создай JS-цели с этими id):", missing.join(", "));
    process.exitCode = 2;
  } else {
    console.log("Ок: все ожидаемые JS-цели из кода присутствуют в счётчике.");
  }
}

const cmd = process.argv[2] || "help";
const env = loadEnv();

try {
  if (cmd === "counters") await cmdCounters(env);
  else if (cmd === "counter") await cmdCounter(env, process.argv[3]);
  else if (cmd === "goals-check") await cmdGoalsCheck(env);
  else {
    console.log(`Команды:
  counters              — список счётчиков (нужен OAuth с metrika:read)
  counter [id]          — карточка счётчика + цели (id из counters или из env)
  goals-check           — сверка целей со списком из analytics-yandex.ts`);
    process.exit(cmd === "help" ? 0 : 1);
  }
} catch (e) {
  console.error(e.message || e);
  process.exit(1);
}
