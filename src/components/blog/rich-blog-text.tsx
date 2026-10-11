import { Link } from "@/i18n/navigation";
import { normalizeBlogInternalHref } from "@/lib/blog-internal-href";

const INLINE_RE = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;

type RichBlogTextProps = {
  text: string;
  className?: string;
  /** Обёртка абзаца; для лида на странице статьи — false */
  asParagraph?: boolean;
};

export function RichBlogText({ text, className, asParagraph = true }: RichBlogTextProps) {
  const parts = text.split(INLINE_RE).filter((p) => p.length > 0);

  const content = parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-[var(--primary)]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, rawHref] = linkMatch;
      const href = normalizeBlogInternalHref(rawHref);
      return (
        <Link key={i} className="font-medium text-[var(--accent)] hover:underline" href={href}>
          {label}
        </Link>
      );
    }
    return <span key={i}>{part}</span>;
  });

  if (!asParagraph) {
    return <span className={className}>{content}</span>;
  }

  return <p className={className}>{content}</p>;
}
