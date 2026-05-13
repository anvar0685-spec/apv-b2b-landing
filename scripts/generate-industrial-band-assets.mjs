/**
 * Генерирует локальные JPEG для блока «Склад · смена · отчёт» и фона hero.
 * Внешний images.unsplash.com с части RU-сетей не открывается → в браузере «битые» картинки.
 * Запуск: из корня `apv-b2b-landing/`: `node scripts/generate-industrial-band-assets.mjs`
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../public/home/industrial-band");

/** SVG → JPEG: разные оттенки под четыре подписи (не фото, но грузится с вашего домена). */
function tileSvg(i) {
  const stops = [
    ["#1a2332", "#2d3a4d", "#3d4f66"],
    ["#1e2a38", "#2a3f52", "#3a5568"],
    ["#231f20", "#3a3538", "#4a4548"],
    ["#0f1419", "#1c2836", "#2a3848"],
  ][i];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1200" viewBox="0 0 1600 1200">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${stops[0]}"/>
      <stop offset="55%" style="stop-color:${stops[1]}"/>
      <stop offset="100%" style="stop-color:${stops[2]}"/>
    </linearGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1600" height="1200" fill="url(#g)"/>
  <rect width="1600" height="1200" fill="url(#grid)"/>
  <g opacity="0.07" stroke="rgba(255,255,255,0.35)" stroke-width="2" fill="none">
    ${Array.from({ length: 14 }, (_, r) => `<line x1="0" y1="${80 + r * 82}" x2="1600" y2="${80 + r * 82}"/>`).join("")}
    ${Array.from({ length: 22 }, (_, c) => `<line x1="${60 + c * 72}" y1="0" x2="${60 + c * 72}" y2="1200"/>`).join("")}
  </g>
</svg>`;
}

function heroSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="2400" height="1350" viewBox="0 0 2400 1350">
  <defs>
    <linearGradient id="hg" x1="0%" y1="0%" x2="85%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1219"/>
      <stop offset="45%" style="stop-color:#1a2633"/>
      <stop offset="100%" style="stop-color:#243447"/>
    </linearGradient>
    <pattern id="hg2" width="56" height="56" patternUnits="userSpaceOnUse">
      <path d="M 56 0 L 0 0 0 56" fill="none" stroke="rgba(255,255,255,0.035)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="2400" height="1350" fill="url(#hg)"/>
  <rect width="2400" height="1350" fill="url(#hg2)"/>
</svg>`;
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const files = [
    ["01-zona-hraneniya.jpg", () => tileSvg(0)],
    ["02-pogruzka-tmc.jpg", () => tileSvg(1)],
    ["03-liniya-komplektacii.jpg", () => tileSvg(2)],
    ["04-proizvodstvo-otgruzka.jpg", () => tileSvg(3)],
    ["hero-sklad.jpg", () => heroSvg()],
  ];
  for (const [name, svgFn] of files) {
    const buf = Buffer.from(svgFn());
    const target = path.join(outDir, name);
    const pipeline = sharp(buf).jpeg({ quality: 86, mozjpeg: true });
    if (name.startsWith("hero-")) {
      await pipeline.resize(2400, 1350, { fit: "fill" }).toFile(target);
    } else {
      await pipeline.resize(1600, 1200, { fit: "fill" }).toFile(target);
    }
    console.log("wrote", path.relative(path.join(__dirname, ".."), target));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
