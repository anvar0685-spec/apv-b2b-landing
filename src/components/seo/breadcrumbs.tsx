import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { absUrl } from "@/lib/abs-url";

export type Crumb = { href: string; label: string };

type Props = { items: Crumb[]; locale: string; variant?: "light" | "dark" };

export function Breadcrumbs({ items, locale, variant = "light" }: Props) {
  const json = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.label,
      item: absUrl(it.href, locale),
    })),
  };

  const isDark = variant === "dark";

  return (
    <nav aria-label="Хлебные крошки">
      <JsonLd data={json} />
      <ol
        className={cn(
          "flex flex-wrap items-center gap-2 text-sm",
          isDark ? "text-white/55" : "text-[var(--neutral-500)]",
        )}
      >
        {items.map((it, idx) => (
          <li key={it.href} className="flex items-center gap-2">
            {idx > 0 ? <span aria-hidden>/</span> : null}
            {idx === items.length - 1 ? (
              <span
                className={cn(
                  "font-medium",
                  isDark ? "text-white" : "text-[var(--primary)]",
                )}
              >
                {it.label}
              </span>
            ) : (
              <Link
                className={cn(
                  "transition-colors",
                  isDark ? "text-white/85 hover:text-[var(--accent)]" : "hover:text-[var(--accent)]",
                )}
                href={it.href}
              >
                {it.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
