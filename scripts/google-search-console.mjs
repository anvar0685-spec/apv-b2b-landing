#!/usr/bin/env node
/**
 * Google Search Console API: OAuth, список свойств, sitemap, URL Inspection.
 *
 * Env: deploy/.google-oauth.local.env (см. deploy/google-oauth.env.example)
 */
import { readFileSync, writeFileSync, existsSync, unlinkSync } from "node:fs";
import { createServer } from "node:http";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OAUTH_ENV = join(ROOT, "deploy", ".google-oauth.local.env");
const OAUTH_CODE_FILE = join(ROOT, "deploy", ".google-oauth-code.local");
const DOT_ENV = join(ROOT, ".env.production");
const DOT_ENV_LOCAL = join(ROOT, ".env.local");

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const REDIRECT_URI = "http://localhost:8765/oauth2/callback";
const SCOPE = "https://www.googleapis.com/auth/webmasters";
const WEBMASTERS_API = "https://www.googleapis.com/webmasters/v3";
const INSPECT_API = "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect";

const DEFAULT_SITE_MATCH = "xn----7sbbgqr3atubl";
const DEFAULT_INSPECT_FILE = join(ROOT, "deploy", "webmaster-recrawl-priority.txt");
const REPORT_MD = join(ROOT, "my-guide", "GSC-REPORT-latest.md");
const REPORT_JSON = join(ROOT, "deploy", "gsc-routine-latest.json");

function parseEnvFile(path) {
  if (!existsSync(path)) return {};
  const out = {};
  for (const line of readFileSync(path, "utf8").split("\n")) {
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

async function oauthToken(bodyParams, clientId, clientSecret) {
  const body = new URLSearchParams(bodyParams);
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
    body,
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`OAuth token: HTTP ${res.status} — ${text.slice(0, 500)}`);
  }
  if (!res.ok) throw new Error(`OAuth token: HTTP ${res.status} — ${JSON.stringify(json)}`);
  return json;
}

async function refreshAccessToken(env) {
  const { GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET, GOOGLE_OAUTH_REFRESH_TOKEN } = env;
  if (!GOOGLE_OAUTH_REFRESH_TOKEN) return null;
  const data = await oauthToken(
    {
      grant_type: "refresh_token",
      refresh_token: GOOGLE_OAUTH_REFRESH_TOKEN,
      client_id: GOOGLE_OAUTH_CLIENT_ID,
      client_secret: GOOGLE_OAUTH_CLIENT_SECRET,
    },
    GOOGLE_OAUTH_CLIENT_ID,
    GOOGLE_OAUTH_CLIENT_SECRET,
  );
  return data.access_token;
}

async function exchangeCode(env, code) {
  const { GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET } = env;
  return oauthToken(
    {
      grant_type: "authorization_code",
      code: code.trim(),
      redirect_uri: REDIRECT_URI,
      client_id: GOOGLE_OAUTH_CLIENT_ID,
      client_secret: GOOGLE_OAUTH_CLIENT_SECRET,
    },
    GOOGLE_OAUTH_CLIENT_ID,
    GOOGLE_OAUTH_CLIENT_SECRET,
  );
}

async function apiGet(url, accessToken) {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}`, Accept: "application/json" },
  });
  const text = await res.text();
  let json;
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(`GET ${url}: HTTP ${res.status} — ${text.slice(0, 400)}`);
  }
  if (!res.ok) throw new Error(`GET ${url}: HTTP ${res.status} — ${JSON.stringify(json)}`);
  return json;
}

async function apiPut(url, accessToken) {
  const res = await fetch(url, {
    method: "PUT",
    headers: { Authorization: `Bearer ${accessToken}`, Accept: "application/json" },
  });
  const text = await res.text();
  if (res.status === 204) return { ok: true };
  let json = {};
  if (text) {
    try {
      json = JSON.parse(text);
    } catch {
      json = { raw: text.slice(0, 200) };
    }
  }
  if (!res.ok) throw new Error(`PUT ${url}: HTTP ${res.status} — ${JSON.stringify(json)}`);
  return json;
}

async function apiPostJson(url, accessToken, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
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
  if (!res.ok) throw new Error(`POST ${url}: HTTP ${res.status} — ${JSON.stringify(json)}`);
  return json;
}

async function getAccessToken(env, { persistRefresh = true } = {}) {
  const cid = env.GOOGLE_OAUTH_CLIENT_ID;
  const sec = env.GOOGLE_OAUTH_CLIENT_SECRET;
  if (!cid || !sec) {
    throw new Error("Нужны GOOGLE_OAUTH_CLIENT_ID и GOOGLE_OAUTH_CLIENT_SECRET в deploy/.google-oauth.local.env");
  }
  // Google access_token живёт ~1 час → если есть refresh_token, всегда освежаем,
  // чтобы рутинные команды (gsc:routine, seo:check) не падали на HTTP 401 после простоя.
  const refresh = (env.GOOGLE_OAUTH_REFRESH_TOKEN || "").trim();
  let access = "";
  if (refresh) {
    access = (await refreshAccessToken(env)) || "";
  }
  if (!access) access = (env.GOOGLE_GSC_ACCESS_TOKEN || "").trim();
  if (!access) {
    throw new Error("Нет токена: npm run gsc:auth-serve (Test users в Google Cloud)");
  }
  if (persistRefresh && access && access !== (env.GOOGLE_GSC_ACCESS_TOKEN || "").trim()) {
    upsertEnvFile(OAUTH_ENV, { GOOGLE_GSC_ACCESS_TOKEN: access });
    env.GOOGLE_GSC_ACCESS_TOKEN = access;
  }
  return access;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function isoDateDaysAgo(days) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 10);
}

function encodeSiteUrl(siteUrl) {
  return encodeURIComponent(siteUrl);
}

function pickSite(sites, env) {
  const explicit = (env.GSC_SITE_URL || "").trim();
  if (explicit) {
    const hit = sites.find((s) => s.siteUrl === explicit);
    if (hit) return hit;
    throw new Error(`GSC_SITE_URL не найден среди свойств: ${explicit}`);
  }
  const m = (env.GSC_SITE_MATCH || DEFAULT_SITE_MATCH).toLowerCase();
  const hit = sites.find((s) => (s.siteUrl || "").toLowerCase().includes(m));
  if (hit) return hit;
  const urlPrefix = sites.filter((s) => s.permissionLevel && s.permissionLevel !== "siteUnverifiedUser");
  if (urlPrefix.length === 1) return urlPrefix[0];
  return null;
}

async function listSiteEntries(access) {
  const data = await apiGet(`${WEBMASTERS_API}/sites`, access);
  return data.siteEntry || [];
}

async function getSiteContext(env) {
  const access = await getAccessToken(env);
  const sites = await listSiteEntries(access);
  const site = pickSite(sites, env);
  if (!site) {
    throw new Error(
      `Не нашёл свойство GSC. Добавь GSC_SITE_URL или GSC_SITE_MATCH. Список:\n${sites.map((s) => `  ${s.siteUrl} (${s.permissionLevel})`).join("\n")}`,
    );
  }
  return { access, sites, site };
}

function resolveSiteUrl(env, site) {
  if ((env.GSC_SITE_URL || "").trim()) return env.GSC_SITE_URL.trim();
  return site.siteUrl;
}

/** Полный URL sitemap — так требует feedpath в Webmasters API v3. */
function resolveSitemapFeedUrl(env, siteUrl) {
  if ((env.GSC_SITEMAP_URL || "").trim()) return env.GSC_SITEMAP_URL.trim();
  const base = (env.GSC_SITE_URL || siteUrl || env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
  const path = (env.GSC_SITEMAP_PATH || "sitemap.xml").replace(/^\//, "");
  if (base.startsWith("http")) return `${base}/${path}`;
  return `https://xn----7sbbgqr3atubl.xn--p1ai/${path}`;
}

function readUrlList(env) {
  let filePath = (env.GSC_INSPECT_FILE || "").trim();
  if (!filePath) filePath = DEFAULT_INSPECT_FILE;
  else if (!filePath.startsWith("/")) filePath = join(ROOT, filePath);
  if (!existsSync(filePath)) throw new Error(`Нет файла URL: ${filePath}`);
  const urls = [];
  const seen = new Set();
  for (const line of readFileSync(filePath, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    if (!t.startsWith("http")) throw new Error(`Некорректный URL: ${t.slice(0, 80)}`);
    if (!seen.has(t)) {
      seen.add(t);
      urls.push(t);
    }
  }
  if (!urls.length) throw new Error(`Пустой список в ${filePath}`);
  return { filePath, urls };
}

function buildAuthUrl(env) {
  const id = env.GOOGLE_OAUTH_CLIENT_ID;
  if (!id) throw new Error("Нет GOOGLE_OAUTH_CLIENT_ID");
  const u = new URL(AUTH_URL);
  u.searchParams.set("client_id", id);
  u.searchParams.set("redirect_uri", REDIRECT_URI);
  u.searchParams.set("response_type", "code");
  u.searchParams.set("scope", SCOPE);
  u.searchParams.set("access_type", "offline");
  u.searchParams.set("prompt", "consent");
  return u.toString();
}

function printAuthUrl(env) {
  console.log("Открой в браузере (Gmail с доступом к Search Console):\n");
  console.log(buildAuthUrl(env));
  console.log(
    `\nПосле входа браузер уйдёт на localhost (страница может не открыться) — скопируй параметр code= из адресной строки.\nОдна строка → ${OAUTH_CODE_FILE}\nЗатем: npm run gsc:exchange-file\n`,
  );
}

function cmdAuthOpen(env) {
  const url = buildAuthUrl(env);
  if (process.platform === "darwin") {
    spawnSync("open", [url], { stdio: "inherit" });
    console.log(`Браузер открыт. code → ${OAUTH_CODE_FILE} → npm run gsc:exchange-file`);
    console.log("Или автоматически: npm run gsc:auth-serve");
  } else {
    console.log(url);
  }
}

/** Локальный callback :8765 — code подхватывается сам, без копирования из URL. */
async function cmdAuthServe(env) {
  const url = buildAuthUrl(env);
  await new Promise((resolve, reject) => {
    const server = createServer(async (req, res) => {
      try {
        const u = new URL(req.url || "/", REDIRECT_URI);
        if (u.pathname !== "/oauth2/callback") {
          res.writeHead(404);
          res.end("Not found");
          return;
        }
        const err = u.searchParams.get("error");
        if (err) {
          res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
          res.end(`OAuth error: ${err}`);
          server.close();
          reject(new Error(`OAuth error: ${err}`));
          return;
        }
        const code = u.searchParams.get("code");
        if (!code) {
          res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
          res.end("No code in callback");
          return;
        }
        const data = await exchangeCode(env, code);
        upsertEnvFile(OAUTH_ENV, {
          GOOGLE_GSC_ACCESS_TOKEN: data.access_token,
          ...(data.refresh_token ? { GOOGLE_OAUTH_REFRESH_TOKEN: data.refresh_token } : {}),
        });
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(
          "<h1>Готово</h1><p>Токены сохранены в deploy/.google-oauth.local.env. Закрой вкладку.</p>",
        );
        server.close();
        console.log("Токены записаны в deploy/.google-oauth.local.env");
        resolve();
      } catch (e) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Exchange failed — см. терминал");
        server.close();
        reject(e);
      }
    });
    server.on("error", reject);
    server.listen(8765, "127.0.0.1", () => {
      console.log("Слушаю http://127.0.0.1:8765/oauth2/callback (до 3 мин)");
      if (process.platform === "darwin") spawnSync("open", [url], { stdio: "inherit" });
      else console.log(url);
      console.log("Подтверди доступ в браузере (тот же Gmail, что в GSC)…");
    });
    setTimeout(() => {
      server.close();
      reject(new Error("Timeout 3 min — callback не пришёл"));
    }, 180000);
  });
}

async function cmdExchangeFile(env) {
  if (!existsSync(OAUTH_CODE_FILE)) throw new Error(`Нет ${OAUTH_CODE_FILE}`);
  const code = readFileSync(OAUTH_CODE_FILE, "utf8").trim();
  if (!code) throw new Error("Файл с кодом пустой");
  const data = await exchangeCode(env, code);
  upsertEnvFile(OAUTH_ENV, {
    GOOGLE_GSC_ACCESS_TOKEN: data.access_token,
    ...(data.refresh_token ? { GOOGLE_OAUTH_REFRESH_TOKEN: data.refresh_token } : {}),
  });
  unlinkSync(OAUTH_CODE_FILE);
  console.log("Токены записаны в deploy/.google-oauth.local.env");
}

async function cmdExchange(env, code) {
  if (!code) {
    console.error("npm run gsc:exchange -- <code>");
    process.exit(1);
  }
  const data = await exchangeCode(env, code);
  console.log(`GOOGLE_GSC_ACCESS_TOKEN=${data.access_token}`);
  if (data.refresh_token) console.log(`GOOGLE_OAUTH_REFRESH_TOKEN=${data.refresh_token}`);
}

async function cmdSites(env) {
  const access = await getAccessToken(env);
  const sites = await listSiteEntries(access);
  console.log(JSON.stringify({ count: sites.length, sites }, null, 2));
}

async function cmdSync(env) {
  const { access, site } = await getSiteContext(env);
  const siteUrl = resolveSiteUrl(env, site);
  const feedUrl = resolveSitemapFeedUrl(env, siteUrl);
  const encSite = encodeSiteUrl(siteUrl);
  const encFeed = encodeURIComponent(feedUrl);
  console.log("property:", siteUrl, `(${site.permissionLevel})`);
  console.log("submit sitemap:", feedUrl);

  await apiPut(`${WEBMASTERS_API}/sites/${encSite}/sitemaps/${encFeed}`, access);
  console.log("OK — sitemap отправлен (PUT). Проверка статуса: npm run gsc:sitemaps");
}

async function cmdSitemaps(env) {
  const { access, site } = await getSiteContext(env);
  const siteUrl = resolveSiteUrl(env, site);
  const encSite = encodeSiteUrl(siteUrl);
  const data = await apiGet(`${WEBMASTERS_API}/sites/${encSite}/sitemaps`, access);
  console.log(JSON.stringify({ siteUrl, sitemaps: data.sitemap || [] }, null, 2));
}

async function cmdAudit(env) {
  const { access, sites, site } = await getSiteContext(env);
  const siteUrl = resolveSiteUrl(env, site);
  const encSite = encodeSiteUrl(siteUrl);
  const sm = await apiGet(`${WEBMASTERS_API}/sites/${encSite}/sitemaps`, access);
  const out = {
    generated_at: new Date().toISOString(),
    siteUrl,
    permissionLevel: site.permissionLevel,
    all_properties: sites.map((s) => ({ siteUrl: s.siteUrl, permissionLevel: s.permissionLevel })),
    sitemaps: sm.sitemap || [],
    sitemap_url_for_sync: resolveSitemapFeedUrl(env, siteUrl),
    note: "Покрытие/клики — в UI GSC; API не отдаёт полный отчёт «Эффективность».",
  };
  console.log(JSON.stringify(out, null, 2));
}

async function inspectUrls(access, siteUrl, urls, { log = true } = {}) {
  const results = [];
  for (const inspectionUrl of urls) {
    try {
      const r = await apiPostJson(INSPECT_API, access, {
        inspectionUrl,
        siteUrl,
        languageCode: "ru",
      });
      const idx = r.inspectionResult?.indexStatusResult;
      const row = {
        url: inspectionUrl,
        verdict: idx?.verdict ?? null,
        coverageState: idx?.coverageState ?? null,
        indexingState: idx?.indexingState ?? null,
        lastCrawlTime: idx?.lastCrawlTime ?? null,
        googleCanonical: idx?.googleCanonical ?? null,
      };
      results.push(row);
      if (log) console.log(JSON.stringify(row));
    } catch (e) {
      const row = { url: inspectionUrl, error: e.message || String(e) };
      results.push(row);
      if (log) console.error(inspectionUrl, row.error);
    }
    await sleep(parseInt(String(process.env.GSC_INSPECT_DELAY_MS || "500"), 10) || 500);
  }
  return results;
}

function resolveInspectUrls(env, singleUrl) {
  if (singleUrl) return { filePath: null, urls: [singleUrl] };
  const { filePath, urls: list } = readUrlList(env);
  const raw = String(env.GSC_INSPECT_LIMIT ?? env.GSC_ROUTINE_INSPECT_LIMIT ?? "0").trim();
  const limit = parseInt(raw, 10);
  const urls =
    Number.isFinite(limit) && limit > 0 ? list.slice(0, limit) : list;
  return { filePath, urls };
}

async function cmdInspect(env, singleUrl) {
  const { access, site } = await getSiteContext(env);
  const siteUrl = resolveSiteUrl(env, site);
  const { filePath, urls } = resolveInspectUrls(env, singleUrl);
  if (filePath) {
    console.log(`Файл: ${filePath}, inspect ${urls.length} URL`);
  }
  await inspectUrls(access, siteUrl, urls);
}

async function fetchSearchAnalytics(access, siteUrl, env) {
  const encSite = encodeSiteUrl(siteUrl);
  const days = parseInt(String(env.GSC_ANALYTICS_DAYS || "28").trim(), 10) || 28;
  const endDate = isoDateDaysAgo(3);
  const startDate = isoDateDaysAgo(days + 3);
  const base = {
    startDate,
    endDate,
    rowLimit: parseInt(String(env.GSC_ANALYTICS_ROW_LIMIT || "15").trim(), 10) || 15,
  };
  const queries = await apiPostJson(
    `${WEBMASTERS_API}/sites/${encSite}/searchAnalytics/query`,
    access,
    { ...base, dimensions: ["query"] },
  );
  const pages = await apiPostJson(
    `${WEBMASTERS_API}/sites/${encSite}/searchAnalytics/query`,
    access,
    { ...base, dimensions: ["page"] },
  );
  return { siteUrl, startDate, endDate, topQueries: queries.rows || [], topPages: pages.rows || [] };
}

async function cmdAnalytics(env) {
  const { access, site } = await getSiteContext(env);
  const siteUrl = resolveSiteUrl(env, site);
  const out = await fetchSearchAnalytics(access, siteUrl, env);
  console.log(JSON.stringify(out, null, 2));
}

function renderReportMd(payload) {
  const lines = [
    `# Google Search Console — отчёт routine`,
    ``,
    `**Сгенерировано:** ${payload.generated_at}`,
    `**Свойство:** ${payload.siteUrl} (${payload.permissionLevel})`,
    ``,
    `## Sitemap`,
    ``,
  ];
  for (const sm of payload.sitemaps || []) {
    lines.push(
      `- \`${sm.path}\` — pending: ${sm.isPending}, errors: ${sm.errors}, warnings: ${sm.warnings}, submitted: ${sm.lastSubmitted || "—"}`,
    );
  }
  lines.push(``, `## URL Inspection (${payload.inspect?.length ?? 0})`, ``);
  for (const row of payload.inspect || []) {
    if (row.error) lines.push(`- ${row.url} — **ошибка:** ${row.error}`);
    else lines.push(`- ${row.url} — ${row.coverageState || row.verdict || "—"}`);
  }
  lines.push(``, `## Поисковая аналитика (${payload.analytics?.startDate} … ${payload.analytics?.endDate})`, ``);
  if (!payload.analytics?.topQueries?.length && !payload.analytics?.topPages?.length) {
    lines.push(`_Пока нет данных (новый ресурс — нормально)._`);
  } else {
    lines.push(`### Топ запросы`, ``);
    for (const r of payload.analytics?.topQueries || []) {
      lines.push(`- ${r.keys?.[0]} — клики ${r.clicks}, показы ${r.impressions}`);
    }
    lines.push(``, `### Топ страницы`, ``);
    for (const r of payload.analytics?.topPages || []) {
      lines.push(`- ${r.keys?.[0]} — клики ${r.clicks}, показы ${r.impressions}`);
    }
  }
  if (payload.errors?.length) {
    lines.push(``, `## Ошибки шагов`, ``);
    for (const e of payload.errors) lines.push(`- ${e}`);
  }
  lines.push(
    ``,
    `---`,
    `Команда: \`npm run gsc:routine\` · JSON: \`deploy/gsc-routine-latest.json\``,
  );
  return `${lines.join("\n")}\n`;
}

async function cmdRoutine(env) {
  const payload = {
    generated_at: new Date().toISOString(),
    errors: [],
    steps: [],
  };

  try {
    const { access, sites, site } = await getSiteContext(env);
    const siteUrl = resolveSiteUrl(env, site);
    payload.siteUrl = siteUrl;
    payload.permissionLevel = site.permissionLevel;
    payload.all_properties = sites.map((s) => ({
      siteUrl: s.siteUrl,
      permissionLevel: s.permissionLevel,
    }));

    const feedUrl = resolveSitemapFeedUrl(env, siteUrl);
    const encSite = encodeSiteUrl(siteUrl);
    try {
      await apiPut(`${WEBMASTERS_API}/sites/${encSite}/sitemaps/${encodeURIComponent(feedUrl)}`, access);
      payload.steps.push(`sync sitemap: ${feedUrl}`);
    } catch (e) {
      payload.errors.push(`sync: ${e.message || e}`);
    }

    const sm = await apiGet(`${WEBMASTERS_API}/sites/${encSite}/sitemaps`, access);
    payload.sitemaps = sm.sitemap || [];
    payload.steps.push("sitemaps listed");

    try {
      payload.analytics = await fetchSearchAnalytics(access, siteUrl, env);
      payload.steps.push("search analytics");
    } catch (e) {
      payload.analytics = { note: "no data yet", message: e.message || String(e) };
      payload.errors.push(`analytics: ${payload.analytics.message}`);
    }

    const { filePath, urls } = resolveInspectUrls(env);
    payload.inspect_file = filePath;
    payload.inspect = await inspectUrls(access, siteUrl, urls, { log: false });
    payload.steps.push(`inspect ${urls.length} urls`);

    writeFileSync(REPORT_JSON, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
    writeFileSync(REPORT_MD, renderReportMd(payload), "utf8");
    console.log(`OK routine → ${REPORT_MD}`);
    console.log(`OK JSON → ${REPORT_JSON}`);
    if (payload.errors.length) {
      console.warn("Предупреждения:", payload.errors.join("; "));
    }
  } catch (e) {
    console.error(e.message || e);
    process.exit(1);
  }
}

const cmd = process.argv[2] || "sync";
const env = loadEnv();

try {
  if (cmd === "auth-url") printAuthUrl(env);
  else if (cmd === "auth-open") cmdAuthOpen(env);
  else if (cmd === "auth-serve") await cmdAuthServe(env);
  else if (cmd === "exchange") await cmdExchange(env, process.argv[3]);
  else if (cmd === "exchange-file") await cmdExchangeFile(env);
  else if (cmd === "sites") await cmdSites(env);
  else if (cmd === "sync") await cmdSync(env);
  else if (cmd === "sitemaps") await cmdSitemaps(env);
  else if (cmd === "audit") await cmdAudit(env);
  else if (cmd === "inspect") await cmdInspect(env, process.argv[3]);
  else if (cmd === "inspect-file") await cmdInspect(env);
  else if (cmd === "inspect-all") {
    process.env.GSC_INSPECT_LIMIT = "0";
    await cmdInspect(env);
  }
  else if (cmd === "analytics") await cmdAnalytics(env);
  else if (cmd === "routine") await cmdRoutine(env);
  else if (cmd === "report") {
    if (!existsSync(REPORT_JSON)) throw new Error("Сначала: npm run gsc:routine");
    console.log(readFileSync(REPORT_JSON, "utf8"));
  }
  else {
    console.error(
      "Команды: auth-url | auth-open | auth-serve | exchange | exchange-file | sites | sync | sitemaps | audit | analytics | inspect <url> | inspect-file | inspect-all | routine | report",
    );
    process.exit(1);
  }
} catch (e) {
  console.error(e.message || e);
  process.exit(1);
}
