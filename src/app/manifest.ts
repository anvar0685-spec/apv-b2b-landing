import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  const brand = site.brandName.replace(/_/g, " ");
  return {
    name: brand,
    short_name: "АПВ",
    description:
      "Аутсорсинг складского персонала в Москве и МО: смены, гарантии, прозрачные ставки, документы и требования площадки.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0B1D3A",
    lang: "ru",
    icons: [
      { src: "/icon.png", sizes: "32x32", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png", purpose: "any" },
    ],
  };
}
