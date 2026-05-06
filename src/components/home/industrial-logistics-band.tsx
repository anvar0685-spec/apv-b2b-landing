import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ShiftCycleSchematic } from "@/components/home/shift-cycle-schematic";

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
    src: "https://images.unsplash.com/photo-1532634896-26909d0d4b31?auto=format&fit=crop&w=1600&q=78",
    key: "photo3Label" as const,
  },
];

export async function IndustrialLogisticsBand() {
  const t = await getTranslations("homePage.industrialBand");

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

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-10">
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {PHOTOS.map((ph) => (
              <figure
                key={ph.src}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)] shadow-[var(--card-shadow)] dark:border-white/10"
              >
                <Image
                  src={ph.src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 360px"
                  className="object-cover transition duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" aria-hidden />
                <figcaption className="absolute inset-x-0 bottom-0 px-4 pb-4 pt-12 text-xs font-semibold uppercase tracking-[0.12em] text-white/95">
                  {t(ph.key)}
                </figcaption>
              </figure>
            ))}
          </div>
          <ShiftCycleSchematic title={t("schematicTitle")} caption={t("schematicCaption")} />
        </div>
      </div>
    </section>
  );
}
