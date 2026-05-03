"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Обёртка секции: при motion=false — обычный div (страницы без «истории» не анимируются). */
export function ServiceSectionWrap({
  motionEnabled,
  className,
  children,
}: {
  motionEnabled: boolean;
  className?: string;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();

  if (!motionEnabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%", amount: 0.2 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
