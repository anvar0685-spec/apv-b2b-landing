import fs from "fs";
import path from "path";
import { Font } from "@react-pdf/renderer";

let done = false;

/** WOFF (не WOFF2): в standalone react-pdf/fontkit часто даёт RangeError на этапе embed glyph для .woff2. */
const FONT_FILES = {
  w400: "roboto-cyrillic-400-normal.woff",
  w700: "roboto-cyrillic-700-normal.woff",
} as const;

function resolveRobotoFilesDir(): string {
  const cwd = process.cwd();
  const fromPublic = path.join(cwd, "public/fonts/kp-draft");
  const fromNodeModules = path.join(cwd, "node_modules/@fontsource/roboto/files");
  const marker = FONT_FILES.w400;
  if (fs.existsSync(path.join(fromPublic, marker))) return fromPublic;
  if (fs.existsSync(path.join(fromNodeModules, marker))) return fromNodeModules;
  return fromNodeModules;
}

/** Регистрирует кириллические начертания Roboto из @fontsource/roboto (один раз за процесс). */
export function registerKpDraftFonts(): void {
  if (done) return;
  const dir = resolveRobotoFilesDir();
  Font.register({
    family: "Roboto",
    fonts: [
      { src: path.join(dir, FONT_FILES.w400), fontWeight: 400 },
      { src: path.join(dir, FONT_FILES.w700), fontWeight: 700 },
    ],
  });
  done = true;
}
