"use client";

import { WarehouseSchematic, type WarehouseSchematicVariant } from "@/components/graphics/warehouse-schematic";

export type IndustrialPhoto = { src: string; label: string; alt: string };

const VARIANTS: WarehouseSchematicVariant[] = [
  "strip-storage",
  "strip-loading",
  "case-assembly",
  "process-launch",
];

/** Схемы операций вместо фотографий (сохраняем подписи из переводов). */
export function IndustrialPhotoTiles({ photos }: { photos: readonly IndustrialPhoto[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4 md:gap-4">
      {photos.map((ph, i) => (
        <figure
          key={ph.label}
          className="flex min-h-[140px] flex-col rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)] p-4 shadow-[var(--card-shadow)] dark:border-white/10"
        >
          <WarehouseSchematic variant={VARIANTS[i] ?? "hero"} className="flex-1 text-[var(--accent)]" />
          <figcaption className="mt-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--neutral-600)]">
            {ph.label}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
