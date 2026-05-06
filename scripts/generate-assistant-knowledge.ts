/**
 * Собирает компактный справочник programmatic-маршрутов для системного промпта чата.
 * Запуск: `npm run generate:assistant-knowledge` из корня `apv-b2b-landing/`.
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";

import { CITIES, PROFESSIONS } from "../src/content/professions-cities";
import { allMultipageSeoPaths, OTRASLI_SLUGS, PLOSHCHADKI_SLUGS } from "../src/lib/site-structure";

function main() {
  const lines: string[] = [];
  lines.push("Маршруты programmatic и SEO (в Markdown ссылки без префикса локали — как на сайте):");
  lines.push("- Хаб персонала: /personal; варианты /personal/{профессия} и /personal/{профессия}/{город}.");
  lines.push(`- Slug профессий: ${PROFESSIONS.map((p) => p.slug).join(", ")}.`);
  lines.push(`- Slug городов в персонале: ${CITIES.map((c) => c.slug).join(", ")}.`);
  lines.push(`- Отрасли /otrasli/* (${OTRASLI_SLUGS.length}): ${OTRASLI_SLUGS.map((o) => o.slug).join(", ")}.`);
  lines.push(`- Площадки /ploshchadki/* (${PLOSHCHADKI_SLUGS.length}): ${PLOSHCHADKI_SLUGS.map((p) => p.slug).join(", ")}.`);
  const hubs = allMultipageSeoPaths();
  lines.push(
    `- Хабы /otrasli/* и /ploshchadki/* в sitemap: ${hubs.length} путей; примеры: ${hubs.slice(0, 20).join(", ")}${hubs.length > 20 ? " …" : ""}.`,
  );

  const outPath = join(process.cwd(), "src/lib/site-assistant-knowledge.generated.ts");
  const fileBody =
    `// AUTO-GENERATED — не править вручную. Источник: scripts/generate-assistant-knowledge.ts\n` +
    `export const SITE_ASSISTANT_GENERATED_ROUTES_KNOWLEDGE: string = ${JSON.stringify(lines.join("\n"))};\n`;
  writeFileSync(outPath, fileBody, "utf8");
  // eslint-disable-next-line no-console
  console.log(`Wrote ${outPath} (${lines.join("\n").length} chars)`);
}

main();
