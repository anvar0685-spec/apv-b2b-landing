import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  CarFront,
  ClipboardList,
  Forklift,
  Hammer,
  Megaphone,
  PackageOpen,
  Sparkles,
  Truck,
  Warehouse,
} from "lucide-react";
import type { ProfessionSlug } from "@/content/professions-cities";

/** Пиктограммы для карточек профессий (Lucide, единый размер снаружи). */
export const PROFESSION_ICONS: Record<ProfessionSlug, LucideIcon> = {
  gruzchiki: Boxes,
  komplektovschiki: ClipboardList,
  kladovschiki: PackageOpen,
  "voditeli-prt": Truck,
  "operatory-pogruzchika": Forklift,
  upakovschiki: Warehouse,
  razdorabochie: Hammer,
  klinery: Sparkles,
  "voditeli-kategorii-b": CarFront,
  "sborschiki-upakovschiki": ClipboardList,
  promoutery: Megaphone,
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
