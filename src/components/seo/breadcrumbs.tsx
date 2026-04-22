import { Link } from "@/i18n/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { absUrl } from "@/lib/abs-url";

export type Crumb = { href: string; label: string };

type Props = { items: Crumb[]; locale: string };

export function Breadcrumbs({ items, locale }: Props) {
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

  return (
    <nav aria-label="Хлебные крошки">
      <JsonLd data={json} />
      <ol className="flex flex-wrap items-center gap-2 text-sm text-[var(--neutral-500)]">
        {items.map((it, idx) => (
          <li key={it.href} className="flex items-center gap-2">
            {idx > 0 ? <span aria-hidden>/</span> : null}
            {idx === items.length - 1 ? (
              <span className="font-medium text-[var(--primary)]">{it.label}</span>
            ) : (
              <Link className="hover:text-[var(--accent)]" href={it.href}>
                {it.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
