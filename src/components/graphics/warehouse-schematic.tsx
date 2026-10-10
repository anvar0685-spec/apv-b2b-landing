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
  | "ecommerce-pipeline"
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
        <BaseSvg className={className} title={title ?? "Приёмка, перемещение и выдача хрупкого груза"}>
          <g fill="none" stroke={stroke} strokeWidth="1.25">
            <rect x="28" y="100" width="56" height="48" rx="4" fill="currentColor" fillOpacity="0.1" />
            <path d="M100 124 h48" strokeDasharray="4 3" />
            <rect x="148" y="92" width="64" height="56" rx="4" fill="currentColor" fillOpacity="0.14" strokeDasharray="3 2" />
            <path d="M228 124 h44" />
            <rect x="272" y="104" width="28" height="40" rx="3" fill="currentColor" fillOpacity="0.18" />
          </g>
          <text x="36" y="92" fontSize="9" fill="currentColor" opacity="0.85">Приёмка</text>
          <text x="152" y="86" fontSize="9" fill="currentColor" opacity="0.85">Перекладка</text>
          <text x="268" y="98" fontSize="9" fill="currentColor" opacity="0.85">Выдача</text>
          <text x="158" y="118" fontSize="14" fill="currentColor" opacity="0.75">!</text>
        </BaseSvg>
      );
    case "case-dual-site":
      return (
        <BaseSvg className={className} title={title ?? "Два склада и один менеджер замен"}>
          <rect x="24" y="88" width="88" height="64" rx="6" fill="none" stroke={stroke} strokeWidth="1.5" />
          <rect x="208" y="88" width="88" height="64" rx="6" fill="none" stroke={stroke} strokeWidth="1.5" />
          <text x="40" y="82" fontSize="9" fill="currentColor" opacity="0.8">Склад 1</text>
          <text x="224" y="82" fontSize="9" fill="currentColor" opacity="0.8">Склад 2</text>
          <circle cx="160" cy="120" r="14" fill="currentColor" fillOpacity="0.2" stroke={stroke} strokeWidth="1.5" />
          <text x="152" y="124" fontSize="8" fill="currentColor" opacity="0.9">Менеджер</text>
          <path d="M112 120 h32 M176 120 h32" stroke={stroke} strokeWidth="1.5" markerEnd="url(#none)" />
          <path d="M160 134 v18" stroke={stroke} strokeWidth="1.25" strokeDasharray="4 3" />
          <text x="124" y="168" fontSize="9" fill="currentColor" opacity="0.75">Замена между объектами</text>
        </BaseSvg>
      );
    case "ecommerce-pipeline":
      return (
        <BaseSvg className={className} title={title ?? "Отбор, сборка, упаковка и отгрузка"}>
          <g fill="none" stroke={stroke} strokeWidth="1.25">
            {[
              { x: 16, label: "Отбор" },
              { x: 88, label: "Сборка" },
              { x: 160, label: "Упаковка" },
              { x: 232, label: "Отгрузка" },
            ].map((step, i) => (
              <g key={step.label}>
                <rect x={step.x} y="88" width="56" height="52" rx="5" fill="currentColor" fillOpacity="0.1" />
                {i < 3 ? <path d={`M${step.x + 56} 114 h24`} stroke={stroke} /> : null}
              </g>
            ))}
            <path d="M248 72 h8 v-12 h24" stroke={stroke} strokeDasharray="3 2" opacity="0.55" />
            <text x="244" y="58" fontSize="8" fill="currentColor" opacity="0.65">Возвраты</text>
          </g>
          <text x="22" y="82" fontSize="9" fill="currentColor" opacity="0.9">Отбор товара</text>
          <text x="90" y="82" fontSize="9" fill="currentColor" opacity="0.9">Сборка заказа</text>
          <text x="168" y="82" fontSize="9" fill="currentColor" opacity="0.9">Упаковка</text>
          <text x="238" y="82" fontSize="9" fill="currentColor" opacity="0.9">Отгрузка</text>
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
