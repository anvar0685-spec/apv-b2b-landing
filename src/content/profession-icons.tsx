import type { LucideIcon } from "lucide-react";
import { Boxes, ClipboardList, Forklift, Hammer, PackageOpen, Layers, Sparkles, Warehouse } from "lucide-react";
import type { ProfessionSlug } from "@/content/professions-cities";

/** Пиктограммы для карточек профессий (Lucide, единый размер снаружи). */
export const PROFESSION_ICONS: Record<ProfessionSlug, LucideIcon> = {
  gruzchiki: Boxes,
  komplektovschiki: ClipboardList,
  kladovschiki: PackageOpen,
  "voditeli-prt": Forklift,
  upakovschiki: Warehouse,
  razdorabochie: Hammer,
  klinery: Sparkles,
  "sborschiki-upakovschiki": Layers,
};

export function ProfessionIcon({
  slug,
  className,
}: {
  slug: ProfessionSlug;
  className?: string;
}) {
  const Icon = PROFESSION_ICONS[slug];
  return <Icon className={className} aria-hidden />;
}
