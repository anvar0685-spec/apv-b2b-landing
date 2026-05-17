# Деплой без Docker (Next.js standalone + Nginx + PM2)

Каркас для VPS (Timeweb и аналоги): приложение слушает **127.0.0.1:3000**, снаружи — **Nginx** с TLS.

## Что в репозитории

| Файл | Назначение |
|------|------------|
| `next.config.mjs` → `output: 'standalone'` | Минимальный серверный бандл в `.next/standalone/` |
| `deploy/copy-standalone-assets.sh` | Копирует `public` и `.next/static` в standalone (обязательно после каждого build) |
| `deploy/nginx-site.conf.example` | Пример reverse-proxy |
| `deploy/pm2.ecosystem.example.cjs` | Пример PM2: `cwd` = `.next/standalone`, скрипт `server.js` |
| `deploy/deploy-remote.example.sh` | Шаблон: `git pull` на сервере → `npm ci` → `build:vps` → `pm2 reload` |
| `deploy/yandex-oauth.env.example` | Шаблон переменных Яндекс OAuth (Вебмастер API); секреты — в `deploy/.yandex-oauth.local.env` (локально, **не в git**) |
| `deploy/metrica-oauth.env.example` | Шаблон для **API Метрики** (опционально отдельный `deploy/.metrica-oauth.local.env`) |
| `scripts/yandex-webmaster.mjs` | CLI: OAuth, sitemap, **переобход URL** (`recrawl` / `recrawl-quota`), список приоритетов `deploy/webmaster-recrawl-priority.txt` |
| `scripts/yandex-metrica.mjs` | CLI: Management API — счётчики, карточка, **goals-check** / **goals-install** (список целей: `src/config/yandex-metrica-js-goals.json`) |
| `src/app/llms.txt/route.ts` | GEO: публичный **`/llms.txt`** для LLM; см. `.cursor/rules/04-seo-strategist-orchestrator.mdc` |

## Яндекс OAuth (API Вебмастера, скрипты)

1. Скопируй `deploy/yandex-oauth.env.example` → `deploy/.yandex-oauth.local.env`, подставь **Client ID** и **Client secret** из [oauth.yandex.ru](https://oauth.yandex.ru/) (тип приложения: «Для доступа к API или отладки», права: **Яндекс.Вебмастер** и при необходимости **Яндекс.Метрика** для `scripts/yandex-metrica.mjs`).
2. **Не коммить** `.yandex-oauth.local.env` — файл в `.gitignore`.
3. **Регистрация sitemap через API** (из корня `apv-b2b-landing/`):
   - `node scripts/yandex-webmaster.mjs auth-open` (macOS: откроет браузер) или `npm run webmaster:auth-url` — только вывести ссылку.
   - Код со страницы Яндекса — **одной строкой** в файл `deploy/.yandex-oauth-code.local` (файл в `.gitignore`).
   - `node scripts/yandex-webmaster.mjs exchange-file` — обмен кода на токены и запись в `deploy/.yandex-oauth.local.env` (файл с кодом удалится).
   - `node scripts/yandex-webmaster.mjs sync` — добавить `sitemap.xml` в Вебмастер (если ещё нет). При наличии только `YANDEX_OAUTH_REFRESH_TOKEN` скрипт сам запросит новый access.
4. **Переобход приоритетных URL** (квота API — смотри `recrawl-quota`):
   - `node scripts/yandex-webmaster.mjs recrawl-quota` — сколько осталось заявок на переобход за сегодня.
   - `node scripts/yandex-webmaster.mjs recrawl` — отправить URL из `deploy/webmaster-recrawl-priority.txt` в пределах квоты (пауза между запросами). Лимит за один запуск: `WEBMASTER_RECRAWL_LIMIT` в env.
5. Альтернатива: implicit-токен вручную из URL `#access_token=...` → переменная `YANDEX_WEBMASTER_ACCESS_TOKEN` в том же `.local.env`.
6. Документация: [Как получить OAuth-токен](https://yandex.ru/dev/webmaster/doc/ru/tasks/how-to-get-oauth).

## Яндекс.Метрика (счётчик на сайте + API)

1. **Счётчик на сайте:** создай на [metrika.yandex.ru](https://metrika.yandex.ru/), домен = прод. В **`.env.production`** на VPS (и локально для проверки) задай **`NEXT_PUBLIC_YANDEX_METRICA_ID=<номер>`**, затем **`npm run build:vps`** — иначе ID не попадёт в клиентский бандл. Тег после согласия cookies — `src/components/seo/yandex-metrika.tsx` (+ **SPA-hit** `yandex-metrika-spa-hit.tsx`), цели — `src/lib/analytics-yandex.ts`. Список JS-целей в коде и для CLI: **`src/config/yandex-metrica-js-goals.json`**, человекочитаемо — **`my-guide/YANDEX-METRIKA-GOALS.md`**.
2. **API Метрики (локально):** в [oauth.yandex.ru](https://oauth.yandex.ru/) у приложения включи **«Яндекс.Метрика»**: для чтения — **metrika:read**, для `goals-install` — ещё **metrika:write**. После смены прав снова **`auth-open`** → **`exchange-file`**. Токен можно держать в **`deploy/.metrica-oauth.local.env`** — см. **`deploy/metrica-oauth.env.example`**.
3. Команды из корня `apv-b2b-landing/`:
   - `npm run metrica:counters` — список счётчиков аккаунта.
   - `npm run metrica:counter` — карточка счётчика из env.
   - `npm run metrica:goals-check` — сверка целей с `src/config/yandex-metrica-js-goals.json` (учитываются и **имя** цели, и **идентификатор** в условии `action` / `exact`).
   - `npm run metrica:goals-install` — создать недостающие JS-цели на счётчике (**нужен metrika:write**).

Для **только верификации сайта** в интерфейсе Вебмастера OAuth **не нужен** — достаточно `NEXT_PUBLIC_YANDEX_VERIFICATION` в `.env.production` и пересборки.


```bash
npm run build:vps
# проверка: cd .next/standalone && set -a && source ../../.env.production && set +a && node server.js
```

## Один раз на сервере (Ubuntu)

1. Node 20 LTS ([nodesource](https://github.com/nodesource/distributions) или `nvm`).
2. `npm i -g pm2` и `pm2 startup`.
3. Nginx + TLS (например Certbot).
4. Каталог приложения, например `/var/www/apv-b2b-landing`:
   ```bash
   sudo mkdir -p /var/www/apv-b2b-landing
   sudo chown "$USER:$USER" /var/www/apv-b2b-landing
   git clone <repo> /var/www/apv-b2b-landing
   cd /var/www/apv-b2b-landing
   ```
5. **`ecosystem.config.cjs`** уже в корне репозитория (подхватывает `.env.production`); при своём варианте ориентируйся на `deploy/pm2.ecosystem.example.cjs`.
6. Создать **`.env.production`** в корне репо на сервере (`chmod 600`). Минимум для SEO/канона:
   - `NEXT_PUBLIC_SITE_URL=https://твой-домен.ru`
   - плюс всё из корневого `.env.example`, что реально нужно на бою (БД, Redis, секреты API и т.д.).
7. Первый билд:
   ```bash
   set -a && . ./.env.production && set +a
   npm ci
   npm run build:vps
   pm2 start ecosystem.config.cjs
   pm2 save
   ```
8. Nginx: по образцу `deploy/nginx-site.conf.example` — `proxy_pass` на `127.0.0.1:3000`.

## Переменные окружения

- **`NEXT_PUBLIC_*`** задаются **до** `npm run build` — они попадают в клиентский бандл.
- Серверные (`DATABASE_URL`, `JWT_SECRET`, …) читаются **в рантайме**; их можно менять без пересборки, но после правок `.env.production` нужен **`pm2 reload ecosystem.config.cjs --only apv-b2b-landing --update-env`** (конфиг перечитывает файл при reload).

PM2 **не подставляет** `.env.production` сам по умолчанию. В этом репозитории **`ecosystem.config.cjs` в корне** при старте PM2 парсит `.env.production` из корня репо и передаёт пары `KEY=VAL` в `env` процесса (в т.ч. `DEEPSEEK_API_KEY`). Альтернативы при кастомном конфиге:

- экспортировать переменные в shell перед `pm2 start`, или
- `dotenv-cli`: `dotenv -e .env.production -- pm2 start ecosystem.config.cjs`.

Скрипт `deploy-remote.example.sh` использует `set -a; . ./.env.production` перед `npm ci` / сборкой — так подтягиваются и **NEXT_PUBLIC_*** для билда.

## RAM

Сборка `next build` на слабом VPS (1 GB) может упираться в память. Тогда: билд в **GitHub Actions**, на сервер **rsync** только `.next/standalone`, `public`, `package-lock.json` / точечно `node_modules` для prisma runtime — или поднять тариф на время первого деплоя.

## Обновление

С Mac (после `git push`):

```bash
export DEPLOY_HOST=root@IP
bash deploy/deploy-remote.example.sh
```

В скрипте деплоя **`npm ci` выполняется до `source .env.production`**: иначе при `NODE_ENV=production` в `.env.production` npm не ставит devDependencies, и `next build` падает на typecheck/ESLint.
