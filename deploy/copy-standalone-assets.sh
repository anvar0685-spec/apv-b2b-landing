#!/usr/bin/env bash
# После `next build` копирует `public` и `.next/static` внутрь `.next/standalone`
# (требование Next.js для standalone-режима).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
if [[ ! -f .next/standalone/server.js ]]; then
  echo "Нет .next/standalone/server.js — сначала: npm run build (нужен output: standalone в next.config)."
  exit 1
fi
rm -rf .next/standalone/public
cp -r public .next/standalone/
mkdir -p .next/standalone/.next
rm -rf .next/standalone/.next/static
cp -r .next/static .next/standalone/.next/
echo "OK: standalone готов — запуск из каталога .next/standalone: node server.js"
