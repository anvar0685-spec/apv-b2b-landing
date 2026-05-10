"use client";

import { useEffect } from "react";

const STORAGE_KEY = "apv-theme";

/**
 * Сайт всегда в светлой теме: полная тёмная тема по всем шаблонам не доведена,
 * переключатель давал «битый» вид. Класс `dark` не навешиваем; старый ключ в LS чистим.
 */
export function ThemeProvider() {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  return null;
}
