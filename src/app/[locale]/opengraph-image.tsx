import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = "Open Graph";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: { locale: string } };

export default function OpengraphImage({ params }: Props) {
  const brand = site.brandName.replace(/_/g, " ");
  const tagline =
    params.locale === "en"
      ? "Line staff · Moscow & Moscow Oblast · SLA-first operations"
      : "Линейный персонал · Москва и МО · SLA и compliance";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 56,
          background: "linear-gradient(135deg, #030a12 0%, #071525 42%, #0d9488 110%)",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 62,
            fontWeight: 800,
            color: "white",
            letterSpacing: -2.5,
            lineHeight: 1.05,
            maxWidth: 1040,
          }}
        >
          {brand}
        </div>
        <div
          style={{
            marginTop: 18,
            fontSize: 26,
            color: "rgba(255,255,255,0.78)",
            maxWidth: 920,
            lineHeight: 1.35,
          }}
        >
          {tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
