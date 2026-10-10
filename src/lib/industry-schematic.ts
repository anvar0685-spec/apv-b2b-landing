import type { WarehouseSchematicVariant } from "@/components/graphics/warehouse-schematic";

const INDUSTRY_SCHEMATIC: Record<string, WarehouseSchematicVariant> = {
  "sklady-e-commerce": "ecommerce-pipeline",
  "sklady-riteyla": "strip-storage",
  "sklady-3pl": "case-dual-site",
  "proizvodstvennye-sklady": "strip-loading",
  "farmatsevticheskie-sklady": "process-terms",
  "fmcg-sklady": "process-shifts",
  "sklady-klassa-a": "hero",
};

export function industrySchematicVariant(slug: string): WarehouseSchematicVariant {
  return INDUSTRY_SCHEMATIC[slug] ?? "hero";
}
