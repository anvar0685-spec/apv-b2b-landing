#!/usr/bin/env bash
# Запускать НА VPS (root) после деплоя или если после ребута 502:
#   cd /var/www/apv-b2b-landing && bash deploy/ensure-pm2-boot.sh
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/apv-b2b-landing}"
cd "$APP_DIR"

if ! pm2 describe apv-b2b-landing >/dev/null 2>&1; then
  pm2 start ecosystem.config.cjs --only apv-b2b-landing --update-env
fi

pm2 save
env PATH="$PATH:/usr/bin:/usr/local/bin" pm2 startup systemd -u root --hp /root
systemctl enable pm2-root
systemctl is-enabled pm2-root
systemctl is-active pm2-root

if ! curl -sfI --max-time 10 http://127.0.0.1:3000/ru | head -1 | grep -q '200'; then
  echo "FAIL: :3000 не отвечает 200" >&2
  pm2 logs apv-b2b-landing --lines 30 --nostream || true
  exit 1
fi

echo "OK: apv-b2b-landing в PM2, pm2-root enabled, /ru → 200"
