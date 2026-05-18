import { getTranslations } from "next-intl/server";
import { IndustrialPhotoTiles } from "@/components/home/industrial-photo-tiles";
import { ShiftCycleSchematic } from "@/components/home/shift-cycle-schematic";

/**
 * Реальные фото действующего объекта в Подмосковье — `public/home/industrial-band/` (внутренняя пометка, в публичных текстах локация не раскрывается).
 * Старые stock-кадры — резервная копия в `public/home/industrial-band/_old-stock/`.
 * Замена комплекта: положить новые JPEG поверх и при необходимости запустить `node scripts/_resize-real-photos.mjs`.
 */
const PHOTOS = [
  { src: "/home/industrial-band/01-zona-hraneniya.jpg", labelKey: "photo1Label" as const, altKey: "photo1Alt" as const },
  { src: "/home/industrial-band/02-pogruzka-tmc.jpg", labelKey: "photo2Label" as const, altKey: "photo2Alt" as const },
  { src: "/home/industrial-band/03-liniya-komplektacii.jpg", labelKey: "photo3Label" as const, altKey: "photo3Alt" as const },
  { src: "/home/industrial-band/04-proizvodstvo-otgruzka.jpg", labelKey: "photo4Label" as const, altKey: "photo4Alt" as const },
] as const;

export async function IndustrialLogisticsBand() {
  const t = await getTranslations("homePage.industrialBand");
  const tiles = PHOTOS.map((ph) => ({ src: ph.src, label: t(ph.labelKey), alt: t(ph.altKey) }));
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
