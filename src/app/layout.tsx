import type { ReactNode } from "react";
import { headers } from "next/headers";
import { hasLocale } from "next-intl";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { routing } from "@/i18n/routing";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const interDisplay = Inter_Tight({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800"],
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

  return (
    <html
      lang={lang}
      className={`${inter.variable} ${interDisplay.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[var(--background)] antialiased">{children}</body>
    </html>
  );
}
