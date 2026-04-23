import type { CSSProperties } from "react";

/**
 * Палитра и токены по умолчанию (синхронизированы с `src/app/globals.css` :root / html.dark).
 * `themeToCssVars` — для точечного оверлея (мультитенант из БД); базовая тема задаётся в CSS.
 */
export const defaultTheme = {
  primary: "#071525",
  primaryDark: "#030a12",
  accent: "#0d9488",
  accentSoft: "#ccfbf1",
  success: "#059669",
  neutral950: "#0a0a0a",
  neutral700: "#404040",
  neutral500: "#737373",
  neutral200: "#e5e5e5",
  neutral50: "#fafafa",
  background: "#ffffff",
  surface: "#f4f6f9",
  card: "#ffffff",
} as const;

export function themeToCssVars(
  t: Partial<Record<keyof typeof defaultTheme, string>> | undefined,
): CSSProperties {
  const m = { ...defaultTheme, ...t };
  return {
    "--primary": m.primary,
    "--primary-dark": m.primaryDark,
    "--accent": m.accent,
    "--accent-soft": m.accentSoft,
    "--success": m.success,
    "--neutral-950": m.neutral950,
    "--neutral-700": m.neutral700,
    "--neutral-500": m.neutral500,
    "--neutral-200": m.neutral200,
    "--neutral-50": m.neutral50,
    "--background": m.background,
    "--surface": m.surface,
    "--card": m.card,
  } as CSSProperties;
}
