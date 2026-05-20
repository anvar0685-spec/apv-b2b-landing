# Google SEO: Search Console + API (зеркало Яндекс.Вебмастера)

**Домен:** https://апв-система.рф  
**Роль:** 04 (SEO-оркестратор)  
**Дата:** 2026-05-19

## Что уже есть в коде

| Элемент | Статус |
|---------|--------|
| `robots.ts`, `sitemap.xml`, canonical, JSON-LD | Готово (общее для Яндекс + Google) |
| `verification.google` в `src/app/[locale]/layout.tsx` | Ждёт `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` в `.env.production` |
| CLI `scripts/google-search-console.mjs` | OAuth, sitemap, inspect |
| Список приоритетных URL | `deploy/webmaster-recrawl-priority.txt` (общий с Яндексом) |

**Яндекс.Метрика** — отдельно; для Google аналитика — опционально **GA4** (см. §6), на SEO-индексацию не влияет.

---

## Этап 1 — Search Console (ручной, 15–20 мин)

1. Открой [Google Search Console](https://search.google.com/search-console).
2. **Добавить ресурс** → тип **URL prefix** (не Domain, если не настраиваешь DNS TXT):
   - `https://апв-система.рф/`  
   - При необходимости дубль punycode: `https://xn----7sbbgqr3atubl.xn--p1ai/` — только если в GSC два свойства; в коде канон — кириллица.
3. Способ подтверждения: **HTML-тег** → скопируй только значение `content="..."`.
4. На VPS в `/var/www/apv-b2b-landing/.env.production`:
   ```bash
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=<код_из_GSC>
   ```
5. Деплой: `npm ci` → `source .env.production` → `npm run build:vps` → `pm2 reload`.
6. В GSC нажми **Подтвердить** → **Карты сайта** → добавь `sitemap.xml` (или `npm run gsc:sync` после API).
7. **Настройки** → география: **Россия**; предпочитаемый домен — тот же, что `NEXT_PUBLIC_SITE_URL` (без www, если так в проде).

Проверка мета-тега локально после сборки:
```bash
curl -sL https://апв-система.рф/ru | grep -i google-site-verification
```

---

## Этап 2 — OAuth и API (как Вебмастер)

### 2.1 Google Cloud

1. [Google Cloud Console](https://console.cloud.google.com/) → проект (новый или существующий).
2. **APIs & Services → Library** → включи **Google Search Console API**.
3. **OAuth consent screen**: External, тестовые пользователи = твой Gmail.
4. **Credentials → Create OAuth client ID**:
   - Тип: **Web application**
   - Authorized redirect URIs: `http://localhost:8765/oauth2/callback`
5. Скопируй Client ID / Secret в `deploy/.google-oauth.local.env` (из `deploy/google-oauth.env.example`).

### 2.2 Токены

```bash
cd apv-b2b-landing
cp deploy/google-oauth.env.example deploy/.google-oauth.local.env
# заполни GOOGLE_OAUTH_CLIENT_ID и GOOGLE_OAUTH_CLIENT_SECRET

npm run gsc:auth-serve
# откроется браузер → «Разрешить» → токены сами в .google-oauth.local.env
# (альтернатива: auth-open → code в .google-oauth-code.local → exchange-file)
npm run gsc:sites
npm run gsc:sync
npm run gsc:audit
```

Опционально после синка:
```bash
npm run gsc:inspect-file    # первые N URL из priority-листа (GSC_INSPECT_LIMIT=5)
npm run gsc:inspect -- https://апв-система.рф/ru
```

### 2.3 Переменные env (API)

| Переменная | Назначение |
|------------|------------|
| `GSC_SITE_URL` | Точное свойство, напр. `https://апв-система.рф/` |
| `GSC_SITE_MATCH` | Подстрока для автовыбора (по умолчанию punycode) |
| `GSC_SITEMAP_PATH` | `sitemap.xml` |
| `GSC_INSPECT_FILE` / `GSC_INSPECT_LIMIT` | Пакетная проверка URL Inspection |

---

## Этап 3 — Регулярный цикл (после индексации)

| Действие | Яндекс | Google |
|----------|--------|--------|
| Sitemap | `npm run webmaster:sync` | `npm run gsc:sync` |
| Переобход приоритетных URL | `npm run webmaster:recrawl` | `npm run gsc:inspect-file` (квота API, не «recrawl») |
| Диагностика | `npm run webmaster:audit` | `npm run gsc:audit` + UI «Покрытие» |
| Title/description по данным | Вебмастер → Поисковые запросы | GSC → Эффективность |

**Важно:** у Google нет прямого аналога «переобхода» с дневной квотой как у Яндекса. `urlInspection.index:inspect` — проверка статуса; запрос индексации — в UI GSC («Проверить URL» → «Запросить индексирование») или через Indexing API (только отдельные типы сайтов, не наш B2B-лендинг).

---

## Этап 4 — Технический чеклист Google

- [ ] Один канонический host (301 с www / punycode-зеркал, если появятся).
- [ ] Rich Results Test для главной, услуги, `/personal/.../moskva`, статьи блога.
- [ ] PageSpeed Insights / CrUX (полевые CWV).
- [ ] `Google-Extended` в robots — уже есть (AI-боты).
- [ ] hreflang: сейчас `ru-RU` в layout; EN-локаль — при росте EN-трафика.

---

## Ошибка 403 `access_denied` (Testing)

Текст: *«Доступ заблокирован: приложение APV не прошло проверку Google»* — это **нормально** для личного CLI, верификация Google **не нужна**.

1. [console.cloud.google.com](https://console.cloud.google.com/) → тот же проект → **Google Auth Platform** → **Audience** (или **OAuth consent screen**).
2. Блок **Test users** → **Add users**.
3. Добавь **точно** `anvar.0685@gmail.com` (тот же Gmail, что в GSC и в окне входа Google).
4. **Save** → подожди 1–2 минуты.
5. Снова: `npm run gsc:auth-serve` → **Разрешить**.

В Production выводить приложение не надо — достаточно Test users.

---

## §6 — GA4 (опционально, не P0)

Если нужна аналитика Google параллельно Метрике:

1. [analytics.google.com](https://analytics.google.com) → поток **Web** → Measurement ID `G-XXXXXXXX`.
2. Тег только после cookie-consent (как Метрика) — отдельная задача в коде.
3. Связка GSC ↔ GA4 в интерфейсе Search Console.

Для РФ B2B приоритет остаётся **Яндекс.Метрика**; GA4 — дополнение.

---

## Порядок с Яндексом (сводка)

```
P0  NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION + деплой
P0  Подтвердить GSC + sitemap (UI или gsc:sync)
P1  OAuth + gsc:audit + inspect-file на priority URL
P2  По отчёту «Эффективность» — правки title/H1 на топ-URL
```

См. также: `PROD-SEO-LAUNCH.md`, `SEO-STATUS-2026-05-19.md`, `deploy/README-NO-DOCKER.md`.
