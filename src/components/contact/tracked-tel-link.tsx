"use client";

import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

type Props = { href: string; className?: string; children: ReactNode };

export function TrackedTelLink({ href, className, children }: Props) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => {
        void trackEvent("phone_click", { href });
      }}
    >
      {children}
    </a>
  );
}
