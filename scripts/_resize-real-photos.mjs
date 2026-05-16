import sharp from "sharp";
import path from "node:path";
import fs from "node:fs";
import os from "node:os";

// Источники фото:
//  - SRC_DIR — реальные кадры объекта (iCloud Desktop) для hero, 02, 03;
//  - SRC_USER — два пользовательских кадра для тайлов 01 и 04 (присланы клиентом).
const SRC_DIR = path.resolve(os.homedir(), "Desktop/Фото для сайта");
const SRC_USER = path.resolve(os.homedir(), ".cursor/projects/Users-anvarrahimov-Desktop/assets");
const DST_DIR = path.resolve(process.cwd(), "public/home/industrial-band");

const jobs = [
  // hero: 16:9 — под opacity 0.22 в hero-section
  { src: path.join(SRC_DIR, "image (5).jpg"), out: "hero-sklad.jpg", w: 1600, h: 900, q: 78, pos: "top" },

  // 01 «Зона хранения и отбора» — пользовательский кадр: чистый склад с разметкой пола, стеллажи слева, бригада справа
  {
    src: path.join(SRC_USER, "______________________-e314a67f-8b66-4ee9-b5a3-0b636d2f14e2.png"),
    out: "01-zona-hraneniya.jpg",
    w: 1280, h: 960, q: 80, pos: "centre",
  },

  // 02 «Погрузка и поток ТМЦ» — реальный кадр объекта (палеты подготовлены к отгрузке + ричтрак в фоне)
  { src: path.join(SRC_DIR, "77ACE093-5411-42EB-91D2-A584DEA6CFF7.jpg"), out: "02-pogruzka-tmc.jpg", w: 1280, h: 960, q: 80, pos: "centre" },

  // 03 «Линия комплектации» — пользовательский кадр: длинный симметричный проход
  // высотного хранения, Софьино, 13 марта 2023 (по запросу заказчика 2026-05-16)
  {
    src: path.join(SRC_USER, "image__5_-39624d23-02dd-4695-92e6-63273fbe1d4a.png"),
    out: "03-liniya-komplektacii.jpg",
    w: 1280, h: 960, q: 80, pos: "centre",
  },

  // 04 «Производство · отгрузка» — пользовательский кадр: рабочий с гидротележкой загружает палет в фуру, погрузчик в фоне
  {
    src: path.join(SRC_USER, "_______________________-589abb11-7eb8-4f65-b009-ffff2940087a.png"),
    out: "04-proizvodstvo-otgruzka.jpg",
    w: 1280, h: 960, q: 80, pos: "centre",
  },
];

for (const j of jobs) {
  if (!fs.existsSync(j.src)) {
    console.error(`MISS  ${j.src}`);
    continue;
  }
  const buf = await sharp(j.src)
    .rotate()
    .resize(j.w, j.h, { fit: "cover", position: j.pos, kernel: sharp.kernel.lanczos3 })
    .jpeg({ quality: j.q, mozjpeg: true, progressive: true, chromaSubsampling: "4:2:0" })
    .toBuffer();
  fs.writeFileSync(path.join(DST_DIR, j.out), buf);
  console.log(`OK ${j.out}  ${(buf.length / 1024).toFixed(0)} KB  (${j.w}x${j.h})`);
}
