import sharp from "sharp";
import path from "node:path";
import fs from "node:fs";

// Источник — реальные фото объекта (iCloud Desktop).
const SRC_DIR = path.resolve(process.env.HOME ?? "", "Desktop/Фото для сайта");
const DST_DIR = path.resolve(process.cwd(), "public/home/industrial-band");

const jobs = [
  // hero: 16:9, чуть меньше нативного апскейла, под opacity 0.22 в hero — этого хватает
  { src: "image (5).jpg", out: "hero-sklad.jpg", w: 1600, h: 900, q: 78, pos: "top" },
  // плитки 4:3 — реальный рендер 25vw на FullHD ≈ 480 px (учётом x2 retina = 960). 1280×960 — запас
  { src: "image.jpg", out: "01-zona-hraneniya.jpg", w: 1280, h: 960, q: 80, pos: "centre" },
  { src: "77ACE093-5411-42EB-91D2-A584DEA6CFF7.jpg", out: "02-pogruzka-tmc.jpg", w: 1280, h: 960, q: 80, pos: "centre" },
  { src: "2A3FCDE0-C7B5-4FE7-8A1C-F6853F4AC15A.jpg", out: "03-liniya-komplektacii.jpg", w: 1280, h: 960, q: 80, pos: "centre" },
  // image (4): водяной знак «13 марта 2023 Софьино» внизу — уходит при position "top"
  { src: "image (4).jpg", out: "04-proizvodstvo-otgruzka.jpg", w: 1280, h: 960, q: 80, pos: "top" },
];

for (const j of jobs) {
  const inPath = path.join(SRC_DIR, j.src);
  const outPath = path.join(DST_DIR, j.out);
  if (!fs.existsSync(inPath)) {
    console.error(`MISS  ${inPath}`);
    continue;
  }
  const buf = await sharp(inPath)
    .rotate() // EXIF-ориентация
    .resize(j.w, j.h, { fit: "cover", position: j.pos, kernel: sharp.kernel.lanczos3 })
    .jpeg({ quality: j.q, mozjpeg: true, progressive: true, chromaSubsampling: "4:2:0" })
    .toBuffer();
  fs.writeFileSync(outPath, buf);
  console.log(`OK ${j.out}  ${(buf.length / 1024).toFixed(0)} KB  (${j.w}x${j.h})`);
}
