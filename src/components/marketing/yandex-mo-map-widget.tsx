"use client";

import { useId } from "react";

const WIDGET_SRC =
  "https://yandex.ru/map-widget/v1/?ll=37.64%2C55.70&z=8.2&l=map";

/**
 * Публичный embed Яндекс.Карт (виджет) — без API-ключа JS API.
 * Центр: Москва + МО; масштаб ориентировочный для закупки.
 */
export function YandexMoMapWidget() {
  const labelId = useId();
  return (
    <figure className="space-y-2">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[var(--neutral-200)] bg-[var(--surface)] shadow-[var(--card-shadow)] dark:border-white/12 dark:bg-[var(--card)]">
        <iframe
          title="Карта: Москва и Московская область"
          aria-labelledby={labelId}
          src={WIDGET_SRC}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <figcaption id={labelId} className="text-xs leading-snug text-[var(--neutral-500)]">
        Интерактивная карта Яндекса — для ориентира по региону присутствия; не задаёт границы договора и не заменяет КП.
      </figcaption>
    </figure>
  );
}
