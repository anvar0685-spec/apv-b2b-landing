import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";

export async function SiteHeader() {
  const t = await getTranslations("nav");
  const tc = await getTranslations("cta");

  const links = [
    { href: "/uslugi", label: t("services") },
    { href: "/personal", label: t("personal") },
    { href: "/keysy", label: t("cases") },
    { href: "/blog", label: t("blog") },
    { href: "/kalkulyator", label: t("calculator") },
    { href: "/o-kompanii", label: t("about") },
    { href: "/kontakty", label: t("contacts") },
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--neutral-200)] bg-white/90 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[var(--accent)] focus:px-3 focus:py-2 focus:text-white"
      >
        К основному содержимому
      </a>
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-display text-lg font-bold text-[var(--primary)]">
          {site.brandName}
        </Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-[var(--neutral-700)] hover:text-[var(--primary)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="secondary" size="sm">
            <Link href="/zayavka">{tc("proposal")}</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/kalkulyator">{tc("calc")}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
