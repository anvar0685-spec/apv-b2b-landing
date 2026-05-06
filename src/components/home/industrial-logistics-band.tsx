import { getTranslations } from "next-intl/server";
import { IndustrialPhotoTiles } from "@/components/home/industrial-photo-tiles";
import { ShiftCycleSchematic } from "@/components/home/shift-cycle-schematic";

/** Разные стабильные кадры склада/РЦ (чтобы не дублировать hero и не ловить пустые ячейки сетки). */
const PHOTOS = [
  {
    src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=78",
    key: "photo1Label" as const,
  },
  {
    src: "https://images.unsplash.com/photo-1494412574643-ff11b0a5e972?auto=format&fit=crop&w=1600&q=78",
    key: "photo2Label" as const,
  },
  {
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=78",
    key: "photo3Label" as const,
  },
  {
    src: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1600&q=78",
    key: "photo4Label" as const,
  },
] as const;

export async function IndustrialLogisticsBand() {
  const t = await getTranslations("homePage.industrialBand");
  const tiles = PHOTOS.map((ph) => ({ src: ph.src, label: t(ph.key) }));

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
          <ShiftCycleSchematic title={t("schematicTitle")} caption={t("schematicCaption")} />
        </div>
      </div>
    </section>
  );
}
