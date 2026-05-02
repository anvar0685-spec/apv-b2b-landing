#!/usr/bin/env bash
# Одноразово на VPS (root): убрать дефолт nginx и включить прокси на Next (127.0.0.1:3000).
set -euo pipefail

echo "== Отключаем дефолтные сайты nginx =="
rm -f /etc/nginx/sites-enabled/default
rm -f /etc/nginx/conf.d/default.conf 2>/dev/null || true

echo "== Включаем apv (прокси на PM2/Next) =="
install -d /etc/nginx/sites-available /etc/nginx/sites-enabled
cat >/etc/nginx/sites-available/apv <<'NGX'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port $server_port;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
NGX
ln -sf /etc/nginx/sites-available/apv /etc/nginx/sites-enabled/apv

nginx -t
systemctl reload nginx

echo "== Проверка =="
curl -sI http://127.0.0.1/ | head -n 5 || true
echo ""
pm2 status || true
