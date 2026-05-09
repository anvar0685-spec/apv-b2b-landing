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
# Шрифты КП-PDF: в standalone нет полного @fontsource/roboto/files — кладём woff2 рядом с бандлом.
FONT_SRC="$ROOT/node_modules/@fontsource/roboto/files"
FONT_DST="$ROOT/.next/standalone/public/fonts/kp-draft"
if [[ -d "$FONT_SRC" ]]; then
  mkdir -p "$FONT_DST"
  cp -f "$FONT_SRC/roboto-cyrillic-400-normal.woff2" "$FONT_DST/"
  cp -f "$FONT_SRC/roboto-cyrillic-700-normal.woff2" "$FONT_DST/"
fi
mkdir -p .next/standalone/.next
rm -rf .next/standalone/.next/static
cp -r .next/static .next/standalone/.next/
echo "OK: standalone готов — запуск из каталога .next/standalone: node server.js"
