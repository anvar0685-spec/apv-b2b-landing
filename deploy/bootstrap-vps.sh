#!/usr/bin/env bash
# Запускать НА VPS (root): базовый стек + clone + prisma + build + pm2 + nginx :80 → :3000
# IP/домен для NEXT_PUBLIC_SITE_URL передаётся первым аргументом (пока без HTTPS — по IP или поддомен).
set -euo pipefail

APP_IP="${1:?Укажи публичный IP или временный хост, напр. 83.217.202.94}"

export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y curl git nginx ca-certificates gnupg postgresql postgresql-contrib

if ! command -v node >/dev/null 2>&1 || ! node -v 2>/dev/null | grep -q '^v20'; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi

command -v npm >/dev/null
npm install -g pm2

DBPASS=$(openssl rand -base64 32 | tr -dc 'a-zA-Z0-9' | head -c 24)
JWTSEC=$(openssl rand -base64 64 | tr -dc 'a-zA-Z0-9' | head -c 48)
install -m 600 /dev/null /root/apv-db-password.txt
echo "$DBPASS" >/root/apv-db-password.txt

if sudo -u postgres psql -tAc "SELECT 1 FROM pg_roles WHERE rolname='apv'" | grep -q 1; then
  sudo -u postgres psql -v ON_ERROR_STOP=1 -c "ALTER USER apv WITH PASSWORD '$DBPASS';"
else
  sudo -u postgres psql -v ON_ERROR_STOP=1 -c "CREATE USER apv WITH PASSWORD '$DBPASS';"
fi
if ! sudo -u postgres psql -tAc "SELECT 1 FROM pg_database WHERE datname='apv'" | grep -q 1; then
  sudo -u postgres psql -v ON_ERROR_STOP=1 -c "CREATE DATABASE apv OWNER apv;"
fi

mkdir -p /var/www
cd /var/www
if [[ ! -d apv-b2b-landing/.git ]]; then
  git clone https://github.com/anvar0685-spec/apv-b2b-landing.git apv-b2b-landing
fi
cd apv-b2b-landing
git fetch origin
git pull origin main

install -m 600 /dev/null .env.production
cat >.env.production <<EOF
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=http://${APP_IP}
DATABASE_URL=postgresql://apv:${DBPASS}@127.0.0.1:5432/apv
JWT_SECRET=${JWTSEC}
DEFAULT_TENANT_DOMAIN=${APP_IP}
DEFAULT_TENANT_SLUG=default
PLACEHOLDER_BRAND_NAME=АПВ
EOF

[[ -f ecosystem.config.cjs ]] || cp deploy/pm2.ecosystem.example.cjs ecosystem.config.cjs

set -a
# shellcheck disable=SC1091
source ./.env.production
set +a

npm ci
npx prisma db push --accept-data-loss
npx prisma db seed || true

npm run build:vps

pm2 delete apv-b2b-landing 2>/dev/null || true
pm2 start ecosystem.config.cjs --update-env
pm2 save

cat >/etc/nginx/sites-available/apv <<'NGX'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
NGX
ln -sf /etc/nginx/sites-available/apv /etc/nginx/sites-enabled/apv
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

pm2 startup systemd -u root --hp /root 2>/dev/null || true

echo "Bootstrap OK. Открой http://${APP_IP}/ — пароль БД в /root/apv-db-password.txt"
