import type { WarehouseSchematicVariant } from "@/components/graphics/warehouse-schematic";

const CASE_SCHEMATIC: Record<string, WarehouseSchematicVariant> = {
  "stroitelnye-materialy-sklad-obrabotka": "case-fragile",
  "sklady-tehniki-mo": "case-dual-site",
  "marketplace-multiprofil-mo": "case-assembly",
  "sklad-avtozapchastej-mo": "strip-storage",
  "mebelnyy-rc-pogruzochnye-raboty": "strip-loading",
  "tabachnyy-sklad-mo": "process-shifts",
};

export function caseSchematicVariant(slug: string): WarehouseSchematicVariant {
  return CASE_SCHEMATIC[slug] ?? "hero";
}
