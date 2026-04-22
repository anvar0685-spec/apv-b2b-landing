"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";

type HeroWordsRevealProps = {
  text: string;
  className?: string;
};

export function HeroWordsReveal({ text, className }: HeroWordsRevealProps) {
  const reduce = useReducedMotion();
  const words = text.split(/\s+/).filter(Boolean);

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {words.map((w, i) => (
        <Fragment key={`${i}-${w}`}>
          {i > 0 ? " " : null}
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: i * 0.035,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {w}
          </motion.span>
        </Fragment>
      ))}
    </span>
  );
}
