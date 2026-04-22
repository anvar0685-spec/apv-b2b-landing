import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Manrope, Inter, JetBrains_Mono } from "next/font/google";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { themeToCssVars } from "@/lib/theme-default";
import { absUrl } from "@/lib/abs-url";
import { site } from "@/config/site";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { YandexMetrika } from "@/components/seo/yandex-metrika";
import { CookieBanner } from "@/components/layout/cookie-banner";
import "../globals.css";

const display = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-mono",
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    metadataBase: new URL(site.url),
    robots: { index: true, follow: true },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || undefined,
    },
    alternates: {
      languages: {
        "ru-RU": absUrl("/", "ru"),
        "en-US": absUrl("/", "en"),
      },
    },
    openGraph: {
      siteName: site.brandName,
      type: "website",
      locale: params.locale === "en" ? "en_US" : "ru_RU",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = { children: React.ReactNode; params: { locale: string } };

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();
  const themeStyle = themeToCssVars(undefined);

  return (
    <html
      lang={locale}
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      style={themeStyle}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[var(--background)] antialiased">
        <NextIntlClientProvider messages={messages}>
          <SiteHeader />
          {children}
          <SiteFooter />
          <CookieBanner />
        </NextIntlClientProvider>
        <YandexMetrika />
      </body>
    </html>
  );
}
