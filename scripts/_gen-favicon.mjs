/**
 * Единый набор фавиконок (АП на #0B1D3A): icon.png, apple-icon, favicon-120, favicon.ico.
 * Запуск: node scripts/_gen-favicon.mjs
 */
import sharp from "sharp";
import toIco from "to-ico";
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const out = join(root, "src/app/icon.png");
const outApple = join(root, "src/app/apple-icon.png");
const outIco = join(root, "src/app/favicon.ico");
/** Яндекс рекомендует 120×120 для чёткой фавиконки в выдаче (см. support/webmaster …/favicon). */
const out120 = join(root, "public", "favicon-120.png");

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

const buf120 = await sharp(Buffer.from(svg180)).resize(120, 120).png().toBuffer();
writeFileSync(out120, buf120);
console.log("OK:", out120);

const icoSizes = [16, 32, 48];
const icoPngs = await Promise.all(
  icoSizes.map((n) => sharp(Buffer.from(svg32)).resize(n, n).png().toBuffer()),
);
writeFileSync(outIco, await toIco(icoPngs));
console.log("OK:", outIco, `(${icoSizes.join(",")} in one .ico)`);
