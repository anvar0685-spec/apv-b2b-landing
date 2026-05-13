import { getTranslations } from "next-intl/server";
import { IndustrialPhotoTiles } from "@/components/home/industrial-photo-tiles";
import { ShiftCycleSchematic } from "@/components/home/shift-cycle-schematic";

/**
 * Локальные JPEG из `public/home/industrial-band/` (не Unsplash: с части RU-сетей CDN не грузится → «битые» картинки).
 * Перегенерация абстрактных фонов: `npm run generate:industrial-band-assets`. Свои фото — заменить файлы и/или пути, см. `my-guide/ЧТО-НУЖНО-СДЕЛАТЬ.md`.
 */
const PHOTOS = [
  { src: "/home/industrial-band/01-zona-hraneniya.jpg", key: "photo1Label" as const },
  { src: "/home/industrial-band/02-pogruzka-tmc.jpg", key: "photo2Label" as const },
  { src: "/home/industrial-band/03-liniya-komplektacii.jpg", key: "photo3Label" as const },
  { src: "/home/industrial-band/04-proizvodstvo-otgruzka.jpg", key: "photo4Label" as const },
] as const;

export async function IndustrialLogisticsBand() {
  const t = await getTranslations("homePage.industrialBand");
  const tiles = PHOTOS.map((ph) => ({ src: ph.src, label: t(ph.key) }));
  const schematicSteps = t.raw("schematicSteps") as readonly { n: string; title: string; hint: string }[];

  return (
    <section
      className="relative overflow-hidden border-y border-[var(--neutral-200)] bg-[var(--surface)] dark:border-white/10"
      aria-labelledby="industrial-band-heading"
    >
      <div className="ux-blueprint-hatch pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.2]" aria-hidden />
      <div className="relative mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <p className="type-kicker">{t("kicker")}</p>
          <h2 id="industrial-band-heading" className="font-display mt-3 text-2xl font-bold tracking-tight text-[var(--primary)] md:text-4xl md:leading-[1.12]">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--neutral-700)] dark:text-[var(--neutral-200)]">{t("lead")}</p>
        </div>

        <div className="mt-12 space-y-10">
          {/* Всегда показываем все кадры: 2×2 на узком экране, 4 в ряд на md+ */}
          <IndustrialPhotoTiles photos={tiles} />
          <ShiftCycleSchematic title={t("schematicTitle")} caption={t("schematicCaption")} steps={schematicSteps} />
        </div>
      </div>
    </section>
  );
}
