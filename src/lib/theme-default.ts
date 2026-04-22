import type { CSSProperties } from "react";

/**
 * Премиум B2B-палитра: глубокий navy + teal (не «дефолтный» orange Tailwind).
 * Мержится с tenant.config.theme из БД.
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
  } as CSSProperties;
}
