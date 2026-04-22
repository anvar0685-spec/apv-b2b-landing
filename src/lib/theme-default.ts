import type { CSSProperties } from "react";

/** Дефолт из брифа; мержится с tenant.config.theme из БД. */
export const defaultTheme = {
  primary: "#0B1D3A",
  primaryDark: "#05101F",
  accent: "#F97316",
  accentSoft: "#FFEDD5",
  success: "#10B981",
  neutral950: "#0A0A0A",
  neutral700: "#404040",
  neutral500: "#737373",
  neutral200: "#E5E5E5",
  neutral50: "#FAFAFA",
  background: "#FFFFFF",
  surface: "#F7F8FA",
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
