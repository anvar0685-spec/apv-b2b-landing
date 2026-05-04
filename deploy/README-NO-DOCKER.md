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

## Локально

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
