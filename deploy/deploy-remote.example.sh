#!/usr/bin/env bash
# Каркас: деплой без Docker. Запуск с Mac (или CI): обновить код на VPS и пересобрать.
#
# Один раз на сервере: Node 20, nginx, pm2, git clone, .env.production, certbot.
# См. deploy/README-NO-DOCKER.md
#
# Использование:
#   export DEPLOY_HOST=root@YOUR_IP
#   export APP_DIR=/var/www/apv-b2b-landing   # опционально
#   bash deploy/deploy-remote.example.sh
#
set -euo pipefail
: "${DEPLOY_HOST:?Укажи DEPLOY_HOST=root@ip}"
APP_DIR="${APP_DIR:-/var/www/apv-b2b-landing}"

ssh -o BatchMode=yes "$DEPLOY_HOST" bash -s <<EOF
set -euo pipefail
cd "$APP_DIR"
git fetch origin
git pull origin main

# Сначала зависимости без прод-env: если в .env.production стоит NODE_ENV=production,
# то npm ci отрежет devDependencies → Next на сборке ругается на typescript/eslint.
npm ci

# Загрузить прод-переменные перед сборкой (NEXT_PUBLIC_* вшиваются в клиент).
set -a
[ -f .env.production ] && . ./.env.production
set +a

npm run build:vps

# PM2: первый раз — start; дальше — reload
if pm2 describe apv-b2b-landing >/dev/null 2>&1; then
  pm2 reload ecosystem.config.cjs --only apv-b2b-landing --update-env
else
  pm2 start ecosystem.config.cjs --only apv-b2b-landing
fi
pm2 save

# После ребута VPS без этого — nginx 502 (upstream :3000 пустой).
env PATH="\$PATH:/usr/bin:/usr/local/bin" pm2 startup systemd -u root --hp /root >/dev/null 2>&1 || true
systemctl enable pm2-root >/dev/null 2>&1 || true

sudo nginx -t && sudo systemctl reload nginx || true
curl -sfI --max-time 10 http://127.0.0.1:3000/ru | head -3
EOF

echo "Готово. Проверка: curl -sS -o /dev/null -w '%{http_code}' https://ТВОЙ_ДОМЕН/"
