"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const MID = process.env.NEXT_PUBLIC_YANDEX_METRICA_ID;

/**
 * Клиентские переходы Next.js без полной перезагрузки — отдельный hit в Метрику
 * (счётчик из tag.js сам не всегда ловит soft navigation).
 * Query берём из window, чтобы не тянуть useSearchParams (он ломает static для дерева).
 */
export function YandexMetrikaSpaHit() {
  const pathname = usePathname();
  const skipFirst = useRef(true);

  useEffect(() => {
    if (!MID) return;
    const id = Number(MID);
    if (!Number.isFinite(id)) return;
    if (typeof window === "undefined" || !window.ym) return;

    if (skipFirst.current) {
      skipFirst.current = false;
      return;
    }

    const raw = window.location.search?.replace(/^\?/, "") ?? "";
    const path = raw ? `${pathname}?${raw}` : pathname;
    try {
      window.ym(id, "hit", path, { title: document.title });
    } catch {
      /* ignore */
    }
  }, [pathname]);

  return null;
}
