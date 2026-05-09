import path from "path";
import { Font } from "@react-pdf/renderer";

let done = false;

/** Регистрирует кириллические начертания Roboto из @fontsource/roboto (один раз за процесс). */
export function registerKpDraftFonts(): void {
  if (done) return;
  const dir = path.join(process.cwd(), "node_modules/@fontsource/roboto/files");
  Font.register({
    family: "Roboto",
    fonts: [
      { src: path.join(dir, "roboto-cyrillic-400-normal.woff2"), fontWeight: 400 },
      { src: path.join(dir, "roboto-cyrillic-700-normal.woff2"), fontWeight: 700 },
    ],
  });
  done = true;
}
