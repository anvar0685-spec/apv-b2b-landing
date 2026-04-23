import { cn } from "@/lib/utils";

type BrandMarkProps = {
  letters: string;
  className?: string;
  /** Размер контейнера (h/w), по умолчанию 40px */
  sizeClassName?: string;
};

/** Геометрический логомарк (монограмма) — SVG, масштабируется через className. */
export function BrandMark({ letters, className, sizeClassName = "h-10 w-10" }: BrandMarkProps) {
  const ab = letters.slice(0, 2).toUpperCase();
  return (
    <svg
      className={cn(sizeClassName, "shrink-0", className)}
      width={40}
      height={40}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="bm-stroke" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--accent-soft)" />
        </linearGradient>
      </defs>
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="11"
        stroke="url(#bm-stroke)"
        strokeWidth="1.25"
        fill="var(--primary-dark)"
      />
      <text
        x="50%"
        y="52%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="white"
        style={{
          fontFamily: "var(--font-sans), system-ui, sans-serif",
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: "-0.02em",
        }}
      >
        {ab}
      </text>
    </svg>
  );
}
