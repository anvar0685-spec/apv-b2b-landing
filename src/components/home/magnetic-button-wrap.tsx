"use client";

import { useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

type MagneticButtonWrapProps = {
  children: ReactNode;
  /** Множитель смещения (0–0.2) */
  strength?: number;
};

export function MagneticButtonWrap({ children, strength = 0.14 }: MagneticButtonWrapProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [t, setT] = useState({ x: 0, y: 0 });

  if (reduce) return <>{children}</>;

  return (
    <span
      ref={ref}
      className="inline-flex will-change-transform"
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        setT({
          x: (e.clientX - r.left - r.width / 2) * strength,
          y: (e.clientY - r.top - r.height / 2) * strength,
        });
      }}
      onMouseLeave={() => setT({ x: 0, y: 0 })}
      style={{
        transform: `translate3d(${t.x}px, ${t.y}px, 0)`,
        transition: t.x === 0 && t.y === 0 ? "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)" : "none",
      }}
    >
      {children}
    </span>
  );
}
