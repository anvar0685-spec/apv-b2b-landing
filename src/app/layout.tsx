import type { ReactNode } from "react";
import { headers } from "next/headers";
import { hasLocale } from "next-intl";
import { Manrope, Inter, JetBrains_Mono } from "next/font/google";
import { routing } from "@/i18n/routing";
import { themeToCssVars } from "@/lib/theme-default";
import "./globals.css";

const display = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-mono",
  display: "swap",
});

type Props = { children: ReactNode };

export default function RootLayout({ children }: Props) {
  const locale = headers().get("x-next-intl-locale");
  const lang =
    locale && hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  const themeStyle = themeToCssVars(undefined);

  return (
    <html
      lang={lang}
      className={`${display.variable} ${bodyFont.variable} ${mono.variable}`}
      style={themeStyle}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[var(--background)] antialiased">{children}</body>
    </html>
  );
}
