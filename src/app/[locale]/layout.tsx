import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { absUrl } from "@/lib/abs-url";
import { site } from "@/config/site";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { YandexMetrika } from "@/components/seo/yandex-metrika";
import { YandexMetrikaSpaHit } from "@/components/seo/yandex-metrika-spa-hit";
import { CookieBanner } from "@/components/layout/cookie-banner";
import { PageTransition } from "@/components/layout/page-transition";
import { ManagerCard } from "@/components/layout/manager-card";
import { ThemeProvider } from "@/components/layout/theme-provider";

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(site.url),
    icons: {
      // /favicon.ico — из src/app/favicon.ico (Next добавляет link автоматически)
      icon: [
        { url: "/icon.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-120.png", sizes: "120x120", type: "image/png" },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    },
    robots: { index: true, follow: true },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || undefined,
    },
    alternates: {
      languages: {
        "ru-RU": absUrl("/"),
      },
    },
    openGraph: {
      siteName: site.brandName,
      type: "website",
      locale: "ru_RU",
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

  return (
    <>
      <ThemeProvider />
      <NextIntlClientProvider messages={messages}>
        <SiteHeader />
        <PageTransition>{children}</PageTransition>
        <SiteFooter />
        <CookieBanner />
        <ManagerCard />
      </NextIntlClientProvider>
      <YandexMetrika />
      <Suspense fallback={null}>
        <YandexMetrikaSpaHit />
      </Suspense>
    </>
  );
}
