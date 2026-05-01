import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  const brand = site.brandName.replace(/_/g, " ");
  return {
    name: brand,
    short_name: "АПВ",
    description:
      "Аутсорсинг складского персонала в Москве и МО: смены, SLA, прозрачные ставки, compliance.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0B1D3A",
    lang: "ru",
  };
}
