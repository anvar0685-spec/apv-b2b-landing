#!/usr/bin/env node
/**
 * Яндекс.Вебмастер API v4: OAuth, sitemap, переобход URL (квота API).
 *
 * Env: deploy/.yandex-oauth.local.env (см. deploy/yandex-oauth.env.example)
 *
 * Опционально:
 *   WEBMASTER_SITEMAP_URL, WEBMASTER_HOST_MATCH
 *   WEBMASTER_RECRAWL_FILE — список URL (по умолчанию deploy/webmaster-recrawl-priority.txt)
 *   WEBMASTER_RECRAWL_LIMIT — макс. URL за один запуск recrawl (по умолчанию = длина списка)
 */
import { readFileSync, writeFileSync, existsSync, unlinkSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OAUTH_ENV = join(ROOT, "deploy", ".yandex-oauth.local.env");
const OAUTH_CODE_FILE = join(ROOT, "deploy", ".yandex-oauth-code.local");
const DOT_ENV = join(ROOT, ".env.production");
const DOT_ENV_LOCAL = join(ROOT, ".env.local");

const OAUTH_TOKEN_URL = "https://oauth.yandex.ru/token";
const REDIRECT_URI = "https://oauth.yandex.ru/verification_code";
const API = "https://api.webmaster.yandex.net/v4";

const DEFAULT_HOST_MATCH = "xn----7sbbgqr3atubl";
const DEFAULT_SITEMAP = "https://xn----7sbbgqr3atubl.xn--p1ai/sitemap.xml";
const DEFAULT_RECRAWL_FILE = join(ROOT, "deploy", "webmaster-recrawl-priority.txt");
const DEFAULT_RECRAWL_FILES = [
  join(ROOT, "deploy", "webmaster-recrawl-priority.txt"),
  join(ROOT, "deploy", "webmaster-recrawl-batch2.txt"),
];
const AUTOMATION_STATE_FILE = join(ROOT, "deploy", ".seo-automation-state.json");

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
    ...process.env,
  };
}

/** Дописать/заменить ключи в .local.env (значения без кавычек; не логируем). */
function upsertEnvFile(envPath, pairs) {
  const keys = Object.keys(pairs);
  let lines = [];
  if (existsSync(envPath)) lines = readFileSync(envPath, "utf8").split("\n");
  const seen = new Set();
  const out = [];
  for (const line of lines) {
    const t = line.trim();
    if (!t || t.startsWith("#")) {
      out.push(line);
      continue;
    }
    const eq = t.indexOf("=");
    if (eq === -1) {
      out.push(line);
      continue;
    }
    const k = t.slice(0, eq).trim();
    if (Object.prototype.hasOwnProperty.call(pairs, k)) {
      seen.add(k);
      out.push(`${k}=${pairs[k]}`);
    } else {
      out.push(line);
    }
  }
  for (const k of keys) {
    if (!seen.has(k)) out.push(`${k}=${pairs[k]}`);
  }
  writeFileSync(envPath, `${out.join("\n").replace(/\n+$/, "")}\n`, "utf8");
}

function basicAuth(id, secret) {
  return Buffer.from(`${id}:${secret}`, "utf8").toString("base64");
}

async function oauthToken(bodyParams, clientId, clientSecret) {
  const body = new URLSearchParams(bodyParams);
  const res = await fetch(OAUTH_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      Authorization: `Basic ${basicAuth(clientId, clientSecret)}`,
    },
    body,
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`OAuth token: HTTP ${res.status} — ${text.slice(0, 500)}`);
  }
  if (!res.ok) {
    throw new Error(`OAuth token: HTTP ${res.status} — ${JSON.stringify(json)}`);
  }
  return json;
}

async function refreshAccessToken(env) {
  const { YANDEX_OAUTH_CLIENT_ID, YANDEX_OAUTH_CLIENT_SECRET, YANDEX_OAUTH_REFRESH_TOKEN } = env;
  if (!YANDEX_OAUTH_REFRESH_TOKEN) return null;
  const data = await oauthToken(
    {
      grant_type: "refresh_token",
      refresh_token: YANDEX_OAUTH_REFRESH_TOKEN,
    },
    YANDEX_OAUTH_CLIENT_ID,
    YANDEX_OAUTH_CLIENT_SECRET,
  );
  return data.access_token;
}

async function exchangeCode(env, code) {
  const { YANDEX_OAUTH_CLIENT_ID, YANDEX_OAUTH_CLIENT_SECRET } = env;
  return oauthToken(
    {
      grant_type: "authorization_code",
      code: code.trim(),
      redirect_uri: REDIRECT_URI,
    },
    YANDEX_OAUTH_CLIENT_ID,
    YANDEX_OAUTH_CLIENT_SECRET,
  );
}

async function apiGet(path, accessToken) {
  const res = await fetch(`${API}${path}`, {
    headers: {
      Authorization: `OAuth ${accessToken}`,
      Accept: "application/json",
    },
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`API GET ${path}: HTTP ${res.status} — ${text.slice(0, 400)}`);
  }
  if (!res.ok) throw new Error(`API GET ${path}: HTTP ${res.status} — ${JSON.stringify(json)}`);
  return json;
}

async function apiPost(path, accessToken, jsonBody) {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: {
      Authorization: `OAuth ${accessToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonBody),
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`API POST ${path}: HTTP ${res.status} — ${text.slice(0, 400)}`);
  }
  if (res.status === 409) return { _conflict: true, ...json };
  if (!res.ok) throw new Error(`API POST ${path}: HTTP ${res.status} — ${JSON.stringify(json)}`);
  return json;
}

/** POST переобхода: 202 Accepted, 409 уже в очереди, 429 квота. */
async function apiPostRecrawl(path, accessToken, jsonBody) {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: {
      Authorization: `OAuth ${accessToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonBody),
  });
  const text = await res.text();
  let json = {};
  if (text) {
    try {
      json = JSON.parse(text);
    } catch {
      json = { raw: text.slice(0, 200) };
    }
  }
  return { status: res.status, json };
}

async function getWebmasterContext(env) {
  const cid = env.YANDEX_OAUTH_CLIENT_ID;
  const sec = env.YANDEX_OAUTH_CLIENT_SECRET;
  if (!cid || !sec) {
    throw new Error("Нужны YANDEX_OAUTH_CLIENT_ID и YANDEX_OAUTH_CLIENT_SECRET в deploy/.yandex-oauth.local.env");
  }
  let access = env.YANDEX_WEBMASTER_ACCESS_TOKEN?.trim();
  if (!access) {
    access = await refreshAccessToken(env);
  }
  if (!access) {
    throw new Error(
      "Нет токена: node scripts/yandex-webmaster.mjs auth-open → код в deploy/.yandex-oauth-code.local → node scripts/yandex-webmaster.mjs exchange-file\n",
    );
  }
  const user = await apiGet("/user", access);
  const userId = user.user_id ?? user.userId;
  if (userId == null) throw new Error(`Неожиданный ответ /user: ${JSON.stringify(user)}`);
  const hosts = await apiGet(`/user/${userId}/hosts`, access);
  const host = pickHost(hosts, env.WEBMASTER_HOST_MATCH);
  if (!host) {
    throw new Error(
      `Не нашёл host. Список: ${JSON.stringify((hosts.hosts || []).map((h) => ({ host_id: h.host_id, ascii: h.ascii_host_url })))}`,
    );
  }
  const hid = encodeURIComponent(host.host_id);
  return { access, userId, host, hid };
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function parseUrlListFromText(raw, label) {
  const seen = new Set();
  const out = [];
  for (const line of raw.split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    if (!t.startsWith("http")) {
      throw new Error(`Некорректная строка (нужен https://): ${t.slice(0, 80)}`);
    }
    if (seen.has(t)) continue;
    seen.add(t);
    out.push(t);
  }
  if (!out.length) throw new Error(`Пустой список URL в ${label}`);
  return out;
}

function readRecrawlUrlList(env) {
  let filePath = (env.WEBMASTER_RECRAWL_FILE || "").trim();
  if (!filePath) filePath = DEFAULT_RECRAWL_FILE;
  else if (!filePath.startsWith("/")) filePath = join(ROOT, filePath);
  if (!existsSync(filePath)) {
    throw new Error(`Нет файла со списком URL: ${filePath}`);
  }
  const urls = parseUrlListFromText(readFileSync(filePath, "utf8"), filePath);
  return { filePath, urls };
}

function readRecrawlUrlLists(env) {
  const rawList = (env.WEBMASTER_RECRAWL_FILES || "").trim();
  const paths = rawList
    ? rawList.split(",").map((p) => (p.trim().startsWith("/") ? p.trim() : join(ROOT, p.trim())))
    : DEFAULT_RECRAWL_FILES.filter((p) => existsSync(p));
  const seen = new Set();
  const urls = [];
  for (const filePath of paths) {
    if (!existsSync(filePath)) continue;
    for (const u of parseUrlListFromText(readFileSync(filePath, "utf8"), filePath)) {
      if (!seen.has(u)) {
        seen.add(u);
        urls.push(u);
      }
    }
  }
  if (!urls.length) throw new Error("Нет URL для переобхода (проверь WEBMASTER_RECRAWL_FILES)");
  return { filePaths: paths.filter((p) => existsSync(p)), urls };
}

function loadAutomationState() {
  if (!existsSync(AUTOMATION_STATE_FILE)) {
    return { yandex_done: [], gsc_inspected: [], seeded: false };
  }
  try {
    return JSON.parse(readFileSync(AUTOMATION_STATE_FILE, "utf8"));
  } catch {
    return { yandex_done: [], gsc_inspected: [], seeded: false };
  }
}

function saveAutomationState(state) {
  writeFileSync(AUTOMATION_STATE_FILE, `${JSON.stringify(state, null, 2)}\n`, "utf8");
}

/** Первый запуск: не слать повторно URL из priority-листа (уже уходили вручную). */
function seedAutomationStateIfNeeded(state, env) {
  if (state.seeded) return state;
  const done = new Set(state.yandex_done || []);
  for (const p of DEFAULT_RECRAWL_FILES) {
    if (!existsSync(p)) continue;
    for (const u of parseUrlListFromText(readFileSync(p, "utf8"), p)) {
      if (p.includes("priority")) done.add(u);
    }
  }
  state.yandex_done = [...done];
  state.seeded = true;
  state.seeded_at = new Date().toISOString();
  saveAutomationState(state);
  console.log(`State seed: ${state.yandex_done.length} URL помечены как уже отправленные (priority).`);
  return state;
}

function pickHost(hosts, matchSubstr) {
  const m = (matchSubstr || DEFAULT_HOST_MATCH).toLowerCase();
  const list = hosts.hosts || [];
  const hit = list.find((h) => {
    const a = (h.ascii_host_url || "").toLowerCase();
    const u = (h.unicode_host_url || "").toLowerCase();
    return a.includes(m) || u.includes(m);
  });
  if (hit) return hit;
  const verified = list.filter((h) => h.verified);
  if (verified.length === 1) return verified[0];
  return null;
}

function resolveSitemapUrl(env) {
  if (env.WEBMASTER_SITEMAP_URL) return env.WEBMASTER_SITEMAP_URL.trim();
  const base = (env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
  if (base.startsWith("http")) return `${base}/sitemap.xml`;
  return DEFAULT_SITEMAP;
}

function buildAuthUrl(env) {
  const id = env.YANDEX_OAUTH_CLIENT_ID;
  if (!id) throw new Error("Нет YANDEX_OAUTH_CLIENT_ID в deploy/.yandex-oauth.local.env");
  const u = new URL("https://oauth.yandex.ru/authorize");
  u.searchParams.set("response_type", "code");
  u.searchParams.set("client_id", id);
  u.searchParams.set("redirect_uri", REDIRECT_URI);
  return u.toString();
}

function printAuthUrl(env) {
  const url = buildAuthUrl(env);
  console.log("Открой в браузере (аккаунт с доступом к Вебмастеру):\n");
  console.log(url);
  console.log(
    `\nВставь код подтверждения одной строкой в файл:\n  ${OAUTH_CODE_FILE}\nзатем: node scripts/yandex-webmaster.mjs exchange-file\n`,
  );
}

function cmdAuthOpen(env) {
  const url = buildAuthUrl(env);
  if (process.platform === "darwin") {
    const r = spawnSync("open", [url], { stdio: "inherit" });
    if (r.error) throw r.error;
    if (r.status !== 0) throw new Error(`open exited ${r.status}`);
    console.log("Браузер открыт. Код со страницы → одной строкой в deploy/.yandex-oauth-code.local → node scripts/yandex-webmaster.mjs exchange-file");
  } else {
    console.log(url);
    console.log(`(open только на macOS) Код → ${OAUTH_CODE_FILE} → node scripts/yandex-webmaster.mjs exchange-file`);
  }
}

async function cmdExchangeFile(env) {
  if (!existsSync(OAUTH_CODE_FILE)) {
    throw new Error(`Нет ${OAUTH_CODE_FILE} — создай файл, одна строка = код со страницы Яндекса`);
  }
  const code = readFileSync(OAUTH_CODE_FILE, "utf8").trim();
  if (!code) throw new Error("Файл с кодом пустой");
  const data = await exchangeCode(env, code);
  upsertEnvFile(OAUTH_ENV, {
    YANDEX_WEBMASTER_ACCESS_TOKEN: data.access_token,
    ...(data.refresh_token ? { YANDEX_OAUTH_REFRESH_TOKEN: data.refresh_token } : {}),
  });
  unlinkSync(OAUTH_CODE_FILE);
  console.log("Токены записаны в deploy/.yandex-oauth.local.env, файл с кодом удалён.");
}

async function cmdExchange(env, code) {
  if (!code) {
    console.error("Укажи код: npm run webmaster:exchange -- <код>");
    process.exit(1);
  }
  const data = await exchangeCode(env, code);
  console.log("Ок. Добавь в deploy/.yandex-oauth.local.env (одна строка = одна переменная):\n");
  console.log(`YANDEX_WEBMASTER_ACCESS_TOKEN=${data.access_token}`);
  if (data.refresh_token) console.log(`YANDEX_OAUTH_REFRESH_TOKEN=${data.refresh_token}`);
  console.log("\nЗатем: npm run webmaster:sync");
}

async function cmdSync(env) {
  const { access, userId, host, hid } = await getWebmasterContext(env);
  console.log("user_id:", userId);
  console.log("host_id:", host.host_id);
  console.log("ascii_host_url:", host.ascii_host_url);
  if (!host.verified) console.warn("Внимание: verified=false — API может отказать.");

  const sitemapUrl = resolveSitemapUrl(env);
  console.log("sitemap:", sitemapUrl);

  const list = await apiGet(`/user/${userId}/hosts/${hid}/user-added-sitemaps`, access);
  const existing = (list.sitemaps || []).map((s) => s.sitemap_url);
  if (existing.some((u) => u === sitemapUrl || u.replace(/\/$/, "") === sitemapUrl.replace(/\/$/, ""))) {
    console.log("Sitemap уже зарегистрирован в Вебмастере:", sitemapUrl);
    return;
  }

  const created = await apiPost(`/user/${userId}/hosts/${hid}/user-added-sitemaps`, access, {
    url: sitemapUrl,
  });
  if (created._conflict) {
    console.log("Уже есть (409):", JSON.stringify(created));
    return;
  }
  console.log("Добавлен user-added sitemap:", JSON.stringify(created));
}

async function cmdRecrawlQuota(env) {
  const { access, userId, hid } = await getWebmasterContext(env);
  const q = await apiGet(`/user/${userId}/hosts/${hid}/recrawl/quota`, access);
  console.log("recrawl quota:", JSON.stringify(q, null, 2));
}

/** Максимум данных из API без UI: хост, верификация, диагностика, sitemap, квота переобхода. */
async function cmdAudit(env) {
  const { access, userId, host, hid } = await getWebmasterContext(env);
  const out = {
    generated_at: new Date().toISOString(),
    user_id: userId,
    host: {
      host_id: host.host_id,
      verified: host.verified,
      ascii_host_url: host.ascii_host_url,
      unicode_host_url: host.unicode_host_url,
    },
  };

  const hostFull = await apiGet(`/user/${userId}/hosts/${hid}`, access);
  out.host_details = hostFull;

  const diag = await apiGet(`/user/${userId}/hosts/${hid}/diagnostics`, access);
  out.diagnostics = diag;

  if (diag.problems) {
    out.problems_present = Object.entries(diag.problems)
      .filter(([, v]) => v && v.state === "PRESENT")
      .map(([k, v]) => ({ code: k, severity: v.severity, last_state_update: v.last_state_update }));
  }

  const smUser = await apiGet(`/user/${userId}/hosts/${hid}/user-added-sitemaps`, access);
  out.user_added_sitemaps = smUser;

  const smAll = await apiGet(`/user/${userId}/hosts/${hid}/sitemaps`, access);
  out.crawled_sitemaps = smAll;

  const q = await apiGet(`/user/${userId}/hosts/${hid}/recrawl/quota`, access);
  out.recrawl_quota = q;

  try {
    out.summary = await apiGet(`/user/${userId}/hosts/${hid}/summary`, access);
  } catch (e) {
    out.summary = { unavailable: true, message: e.message };
  }

  const sitemapUrl = resolveSitemapUrl(env);
  out.resolved_sitemap_url_for_sync = sitemapUrl;

  console.log(JSON.stringify(out, null, 2));
}

async function cmdRecrawl(env) {
  const { access, userId, hid, host } = await getWebmasterContext(env);
  const { filePath, urls } = readRecrawlUrlList(env);
  const asciiBase = (host.ascii_host_url || "").replace(/\/$/, "").toLowerCase();

  const q0 = await apiGet(`/user/${userId}/hosts/${hid}/recrawl/quota`, access);
  let remainder = q0.quota_remainder ?? 0;
  const daily = q0.daily_quota ?? "?";
  console.log(`Квота на старт: remainder=${remainder}, daily_quota=${daily}`);
  console.log(`Файл: ${filePath} (${urls.length} URL)`);

  const maxFromEnv = parseInt(String(env.WEBMASTER_RECRAWL_LIMIT || "").trim(), 10);
  const hardCap = Number.isFinite(maxFromEnv) && maxFromEnv > 0 ? maxFromEnv : urls.length;

  let sent = 0;
  let skipped = 0;
  let failed = 0;

  for (const url of urls) {
    if (remainder <= 0) {
      console.log("Квота на сегодня исчерпана — остановка.");
      break;
    }
    if (sent >= hardCap) {
      console.log(`Достигнут лимит отправок за этот запуск (WEBMASTER_RECRAWL_LIMIT=${hardCap}).`);
      break;
    }
    if (!url.toLowerCase().startsWith(asciiBase)) {
      console.warn(`Пропуск (не тот хост): ${url}`);
      skipped++;
      continue;
    }

    const path = `/user/${userId}/hosts/${hid}/recrawl/queue`;
    const { status, json } = await apiPostRecrawl(path, access, { url });

    if (status === 202) {
      remainder = json.quota_remainder ?? remainder - 1;
      console.log(`202 ${url} | quota_remainder=${remainder}`);
      sent++;
    } else if (status === 409) {
      console.log(`409 уже в очереди: ${url}`);
      skipped++;
    } else if (status === 429) {
      console.error(`429 квота: ${JSON.stringify(json)}`);
      break;
    } else if (status === 400) {
      console.error(`400 ${url}: ${JSON.stringify(json)}`);
      failed++;
    } else {
      console.error(`HTTP ${status} ${url}: ${JSON.stringify(json)}`);
      failed++;
    }

    await sleep(400);
  }

  console.log(`Итого: отправлено=${sent}, пропуск/дубль=${skipped}, ошибки=${failed}`);
}

/**
 * Ежедневный переобход: только новые URL, жёсткий потолок за запуск, остановка на 429.
 * Лимиты: min(quota_remainder, SEO_YANDEX_RECRAWL_MAX, default 40), пауза SEO_RECRAWL_DELAY_MS (default 500).
 */
async function cmdRecrawlDaily(env) {
  let state = loadAutomationState();
  state = seedAutomationStateIfNeeded(state, env);
  const doneSet = new Set(state.yandex_done || []);
  const { filePaths, urls } = readRecrawlUrlLists(env);
  const pending = urls.filter((u) => !doneSet.has(u));

  const { access, userId, hid, host } = await getWebmasterContext(env);
  const asciiBase = (host.ascii_host_url || "").replace(/\/$/, "").toLowerCase();

  const q0 = await apiGet(`/user/${userId}/hosts/${hid}/recrawl/quota`, access);
  let remainder = q0.quota_remainder ?? 0;
  const daily = q0.daily_quota ?? "?";
  const maxPerRun = parseInt(String(env.SEO_YANDEX_RECRAWL_MAX || "40").trim(), 10) || 40;
  const delayMs = parseInt(String(env.SEO_RECRAWL_DELAY_MS || "500").trim(), 10) || 500;
  const hardCap = Math.min(remainder, maxPerRun, pending.length);

  console.log(`recrawl-daily: quota remainder=${remainder}/${daily}, pending=${pending.length}, cap=${hardCap}`);
  console.log(`Файлы: ${filePaths.join(", ")}`);

  if (hardCap <= 0) {
    console.log(pending.length ? "Квота исчерпана или лимит 0 — выход без запросов." : "Все URL из списков уже отправлены.");
    state.yandex_last_run = new Date().toISOString();
    saveAutomationState(state);
    return;
  }

  let sent = 0;
  let skipped = 0;
  let failed = 0;

  for (const url of pending) {
    if (remainder <= 0 || sent >= hardCap) break;
    if (!url.toLowerCase().startsWith(asciiBase)) {
      console.warn(`Пропуск (не тот хост): ${url}`);
      skipped++;
      continue;
    }

    const path = `/user/${userId}/hosts/${hid}/recrawl/queue`;
    const { status, json } = await apiPostRecrawl(path, access, { url });

    if (status === 202) {
      remainder = json.quota_remainder ?? remainder - 1;
      doneSet.add(url);
      console.log(`202 ${url} | quota_remainder=${remainder}`);
      sent++;
    } else if (status === 409) {
      doneSet.add(url);
      console.log(`409 уже в очереди: ${url}`);
      skipped++;
    } else if (status === 429) {
      console.error(`429 квота: ${JSON.stringify(json)}`);
      break;
    } else if (status === 400) {
      console.error(`400 ${url}: ${JSON.stringify(json)}`);
      failed++;
    } else {
      console.error(`HTTP ${status} ${url}: ${JSON.stringify(json)}`);
      failed++;
    }

    state.yandex_done = [...doneSet];
    saveAutomationState(state);
    await sleep(delayMs);
  }

  state.yandex_last_run = new Date().toISOString();
  state.yandex_pending_count = urls.length - doneSet.size;
  saveAutomationState(state);
  console.log(`Итого daily: отправлено=${sent}, пропуск/дубль=${skipped}, ошибки=${failed}, осталось pending=${state.yandex_pending_count}`);
}

const cmd = process.argv[2] || "sync";
const env = loadEnv();

try {
  if (cmd === "auth-url") printAuthUrl(env);
  else if (cmd === "auth-open") cmdAuthOpen(env);
  else if (cmd === "exchange") await cmdExchange(env, process.argv[3]);
  else if (cmd === "exchange-file") await cmdExchangeFile(env);
  else if (cmd === "sync") await cmdSync(env);
  else if (cmd === "recrawl-quota") await cmdRecrawlQuota(env);
  else if (cmd === "recrawl") await cmdRecrawl(env);
  else if (cmd === "recrawl-daily") await cmdRecrawlDaily(env);
  else if (cmd === "audit") await cmdAudit(env);
  else {
    console.error(
      "Команды: auth-url | auth-open | exchange <code> | exchange-file | sync | recrawl-quota | recrawl | recrawl-daily | audit",
    );
    process.exit(1);
  }
} catch (e) {
  console.error(e.message || e);
  process.exit(1);
}
