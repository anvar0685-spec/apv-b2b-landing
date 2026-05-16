/**
 * Генерация src/app/icon.png (32×32) для Next.js metadata / вкладки браузера.
 * Запуск: node scripts/_gen-favicon.mjs
 */
import sharp from "sharp";
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const out = join(root, "src/app/icon.png");
const outApple = join(root, "src/app/apple-icon.png");

const svg32 = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="8" fill="#0B1D3A"/>
  <text x="16" y="21" text-anchor="middle" fill="#ffffff"
    font-family="Inter, system-ui, -apple-system, 'Segoe UI', sans-serif"
    font-size="11" font-weight="700">АП</text>
</svg>`;

const svg180 = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" rx="40" fill="#0B1D3A"/>
  <text x="90" y="118" text-anchor="middle" fill="#ffffff"
    font-family="Inter, system-ui, -apple-system, 'Segoe UI', sans-serif"
    font-size="62" font-weight="700">АП</text>
</svg>`;

const buf32 = await sharp(Buffer.from(svg32)).resize(32, 32).png().toBuffer();
writeFileSync(out, buf32);
console.log("OK:", out);

const buf180 = await sharp(Buffer.from(svg180)).resize(180, 180).png().toBuffer();
writeFileSync(outApple, buf180);
console.log("OK:", outApple);
