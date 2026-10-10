import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type WarehouseSchematicVariant =
  | "hero"
  | "process-task"
  | "process-terms"
  | "process-launch"
  | "process-shifts"
  | "case-fragile"
  | "case-dual-site"
  | "case-assembly"
  | "strip-storage"
  | "strip-loading";

type Props = {
  variant: WarehouseSchematicVariant;
  className?: string;
  /** Краткое имя для содержательных схем (скринридер). */
  title?: string;
};

const stroke = "currentColor";

function BaseSvg({ className, children, title }: { className?: string; children: ReactNode; title?: string }) {
  const decorative = !title;
  return (
    <svg
      viewBox="0 0 320 200"
      className={cn("h-auto w-full text-[var(--accent)]", className)}
      role={decorative ? "presentation" : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

/** Лёгкие SVG-схемы складских операций без фотографий. */
export function WarehouseSchematic({ variant, className, title }: Props) {
  switch (variant) {
    case "hero":
      return (
        <BaseSvg className={className}>
          <g fill="none" stroke={stroke} strokeWidth="1.5" opacity="0.55">
            <rect x="24" y="48" width="120" height="88" rx="6" />
            <rect x="176" y="56" width="120" height="72" rx="6" />
            <path d="M84 136 L84 168 L236 168 L236 128" strokeDasharray="4 4" />
            <rect x="52" y="72" width="28" height="20" rx="2" fill="currentColor" fillOpacity="0.12" />
            <rect x="92" y="72" width="28" height="20" rx="2" fill="currentColor" fillOpacity="0.12" />
            <rect x="200" y="80" width="36" height="24" rx="2" fill="currentColor" fillOpacity="0.12" />
            <circle cx="148" cy="100" r="10" fill="currentColor" fillOpacity="0.2" />
            <path d="M148 90 L148 110 M138 100 L158 100" strokeWidth="2" />
          </g>
        </BaseSvg>
      );
    case "process-task":
      return (
        <BaseSvg className={className} title={title ?? "Уточнение задачи"}>
          <rect x="40" y="60" width="240" height="100" rx="8" fill="none" stroke={stroke} strokeWidth="1.5" />
          <path d="M72 100 h56 M72 120 h96" stroke={stroke} strokeWidth="2" opacity="0.7" />
          <circle cx="220" cy="100" r="22" fill="currentColor" fillOpacity="0.15" stroke={stroke} />
          <path d="M212 100 l8 8 16-16" stroke={stroke} strokeWidth="2" fill="none" />
        </BaseSvg>
      );
    case "process-terms":
      return (
        <BaseSvg className={className} title={title ?? "Согласование условий"}>
          <rect x="56" y="70" width="90" height="70" rx="6" fill="none" stroke={stroke} strokeWidth="1.5" />
          <rect x="174" y="70" width="90" height="70" rx="6" fill="none" stroke={stroke} strokeWidth="1.5" />
          <path d="M146 105 h28" stroke={stroke} strokeWidth="2" markerEnd="url(#none)" />
          <path d="M101 88 h0 M101 108 h0 M101 128 h0" stroke={stroke} strokeWidth="2" opacity="0.5" />
        </BaseSvg>
      );
    case "process-launch":
      return (
        <BaseSvg className={className} title={title ?? "Организация выхода"}>
          <path d="M48 140 L120 80 L192 140" fill="none" stroke={stroke} strokeWidth="1.5" />
          <rect x="100" y="120" width="120" height="48" rx="6" fill="currentColor" fillOpacity="0.1" stroke={stroke} />
          <circle cx="80" cy="148" r="8" fill="currentColor" fillOpacity="0.25" />
          <circle cx="240" cy="148" r="8" fill="currentColor" fillOpacity="0.25" />
        </BaseSvg>
      );
    case "process-shifts":
      return (
        <BaseSvg className={className} title={title ?? "Сопровождение смен"}>
          <rect x="64" y="72" width="192" height="88" rx="8" fill="none" stroke={stroke} strokeWidth="1.5" />
          <path d="M88 100 h144 M88 120 h112 M88 140 h80" stroke={stroke} strokeWidth="1.5" opacity="0.6" />
          <rect x="200" y="128" width="40" height="20" rx="3" fill="currentColor" fillOpacity="0.2" />
        </BaseSvg>
      );
    case "case-fragile":
      return (
        <BaseSvg className={className} title={title ?? "Аккуратная работа с паллетами"}>
          <rect x="100" y="90" width="120" height="64" rx="4" fill="currentColor" fillOpacity="0.12" stroke={stroke} />
          <path d="M100 110 h120 M100 130 h120" stroke={stroke} opacity="0.4" />
          <path d="M160 70 v20" stroke={stroke} strokeWidth="2" />
          <text x="168" y="78" fontSize="10" fill="currentColor" opacity="0.8">!</text>
        </BaseSvg>
      );
    case "case-dual-site":
      return (
        <BaseSvg className={className} title={title ?? "Два соседних склада"}>
          <rect x="40" y="80" width="100" height="72" rx="6" fill="none" stroke={stroke} strokeWidth="1.5" />
          <rect x="180" y="80" width="100" height="72" rx="6" fill="none" stroke={stroke} strokeWidth="1.5" />
          <path d="M140 116 h40" stroke={stroke} strokeWidth="2" strokeDasharray="6 4" />
          <circle cx="160" cy="116" r="6" fill="currentColor" fillOpacity="0.3" />
        </BaseSvg>
      );
    case "case-assembly":
      return (
        <BaseSvg className={className} title={title ?? "Комплектация заказов"}>
          <rect x="72" y="88" width="48" height="48" rx="4" fill="currentColor" fillOpacity="0.1" stroke={stroke} />
          <rect x="136" y="88" width="48" height="48" rx="4" fill="currentColor" fillOpacity="0.1" stroke={stroke} />
          <rect x="200" y="88" width="48" height="48" rx="4" fill="currentColor" fillOpacity="0.1" stroke={stroke} />
          <path d="M96 136 v24 M160 136 v24 M224 136 v24" stroke={stroke} opacity="0.5" />
        </BaseSvg>
      );
    case "strip-storage":
    case "strip-loading":
      return (
        <BaseSvg className={cn("max-h-[140px]", className)}>
          <rect x="32" y="56" width="256" height="96" rx="8" fill="none" stroke={stroke} strokeWidth="1.5" opacity="0.5" />
          <rect x="56" y="80" width="64" height="48" rx="4" fill="currentColor" fillOpacity="0.12" />
          <path d="M160 104 h96" stroke={stroke} strokeWidth="2" strokeDasharray="5 4" />
          {variant === "strip-loading" ? (
            <path d="M248 88 L272 104 L248 120" fill="none" stroke={stroke} strokeWidth="2" />
          ) : null}
        </BaseSvg>
      );
    default:
      return (
        <BaseSvg className={className}>
          <rect x="40" y="60" width="240" height="80" rx="8" fill="none" stroke={stroke} strokeWidth="1.5" />
        </BaseSvg>
      );
  }
}
