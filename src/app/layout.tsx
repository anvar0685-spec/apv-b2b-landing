import type { ReactNode } from "react";

type Props = { children: ReactNode };

/** Корневой layout без `<html>` — см. `[locale]/layout.tsx` (next-intl). */
export default function RootLayout({ children }: Props) {
  return children;
}
