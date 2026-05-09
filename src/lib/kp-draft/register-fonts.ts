import fs from "fs";
import path from "path";
import { Font } from "@react-pdf/renderer";

let done = false;

function resolveRobotoFilesDir(): string {
  const cwd = process.cwd();
  const fromPublic = path.join(cwd, "public/fonts/kp-draft");
  const fromNodeModules = path.join(cwd, "node_modules/@fontsource/roboto/files");
  const marker = "roboto-cyrillic-400-normal.woff2";
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
      { src: path.join(dir, "roboto-cyrillic-400-normal.woff2"), fontWeight: 400 },
      { src: path.join(dir, "roboto-cyrillic-700-normal.woff2"), fontWeight: 700 },
    ],
  });
  done = true;
}
