import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "APV B2B Workforce",
    short_name: "APV",
    description: "Premium line-staff contractor — Moscow & MO",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0B1D3A",
    lang: "ru",
  };
}
