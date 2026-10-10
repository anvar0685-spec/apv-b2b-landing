import { getTranslations } from "next-intl/server";
import { WarehouseSchematic } from "@/components/graphics/warehouse-schematic";

const SHOTS = [
  { variant: "strip-storage" as const, key: "shotA" as const },
  { variant: "strip-loading" as const, key: "shotB" as const },
];

/** Компактная схема операций для промышленных посадочных — без фотографий. */
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
          <div key={shot.key} className="border-t border-[var(--neutral-200)] p-4 dark:border-white/10 sm:border-t-0 sm:border-l sm:first:border-l-0">
            <WarehouseSchematic variant={shot.variant} className="text-[var(--accent)]" />
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--neutral-600)]">{t(shot.key)}</p>
          </div>
        ))}
      </div>
      <p className="border-t border-[var(--neutral-200)] px-5 py-3 text-xs leading-snug text-[var(--neutral-500)] dark:border-white/10">{t("footnote")}</p>
    </aside>
  );
}
