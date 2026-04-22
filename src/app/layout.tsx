import type { ReactNode } from "react";
import { headers } from "next/headers";
import { hasLocale } from "next-intl";
import { Inter, JetBrains_Mono } from "next/font/google";
import { routing } from "@/i18n/routing";
import { themeToCssVars } from "@/lib/theme-default";
import "./globals.css";

/** В next/font для Next 14 нет отдельного Inter_Display — один Inter + веса для «display». */
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
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
      className={`${inter.variable} ${mono.variable}`}
      style={themeStyle}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[var(--background)] antialiased">{children}</body>
    </html>
  );
}
