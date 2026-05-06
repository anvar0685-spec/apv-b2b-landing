import Image from "next/image";
import { getTranslations } from "next-intl/server";

const SHOTS = [
  {
    src: "https://images.unsplash.com/photo-1565043666747-69f107e0cc03?auto=format&fit=crop&w=1200&q=78",
    key: "shotA" as const,
  },
  {
    src: "https://images.unsplash.com/photo-1581092160562-40aa08e73337?auto=format&fit=crop&w=1200&q=78",
    key: "shotB" as const,
  },
];

/** Компактная фото-дирекция для промышленных посадочных: нейтральный свет, акцент на процессе. */
export async function ProductionVisualStrip() {
  const t = await getTranslations("commercial.productionStrip");

  return (
    <aside className="mt-10 overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--accent)_22%,var(--neutral-200))] bg-[color-mix(in_srgb,var(--accent)_4%,var(--surface))] shadow-[var(--card-shadow)] dark:border-white/12 dark:bg-[color-mix(in_srgb,var(--accent)_10%,var(--primary-dark))]">
      <div className="border-b border-[var(--neutral-200)] px-5 py-4 dark:border-white/10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">{t("kicker")}</p>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--neutral-700)] dark:text-[var(--neutral-200)]">{t("lead")}</p>
      </div>
      <div className="grid gap-0 sm:grid-cols-2">
        {SHOTS.map((shot) => (
          <div key={shot.key} className="group relative aspect-[16/10] overflow-hidden sm:aspect-[5/3]">
            <Image
              src={shot.src}
              alt=""
              fill
              unoptimized
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition duration-300 motion-reduce:transition-none brightness-[0.74] group-hover:brightness-100"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--primary-dark)]/70 via-[var(--primary-dark)]/20 to-[var(--primary-dark)]/40 transition-opacity duration-300 group-hover:opacity-20 motion-reduce:transition-none motion-reduce:group-hover:opacity-100"
              aria-hidden
            />
            <p className="absolute inset-x-0 bottom-0 z-[1] px-4 pb-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/95 drop-shadow">
              {t(shot.key)}
            </p>
          </div>
        ))}
      </div>
      <p className="border-t border-[var(--neutral-200)] px-5 py-3 text-xs leading-snug text-[var(--neutral-500)] dark:border-white/10">{t("footnote")}</p>
    </aside>
  );
}
