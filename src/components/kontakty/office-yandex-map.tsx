import { site } from "@/config/site";

type Props = {
  /** Полный URL виджета (можно переопределить через env). */
  mapWidgetSrc: string;
  /** Ссылка «Открыть в Яндекс.Картах». */
  openInMapsHref: string;
};

/**
 * Встраиваемый фрейм Яндекс.Карт + оформление под премиум-витрину.
 * Без API-ключа: статический map-widget по координатам из `site`.
 */
export function OfficeYandexMapFrame({ mapWidgetSrc, openInMapsHref }: Props) {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-[1px] rounded-[1.35rem] bg-gradient-to-br from-[color-mix(in_srgb,var(--accent)_42%,transparent)] via-[color-mix(in_srgb,var(--primary)_18%,transparent)] to-[color-mix(in_srgb,var(--accent)_28%,transparent)] opacity-90 blur-[0.5px]"
      />
      <div className="relative overflow-hidden rounded-3xl border border-[color-mix(in_srgb,var(--neutral-200)_88%,var(--accent)_12%)] bg-[var(--card)] shadow-[0_28px_64px_-28px_rgba(7,21,37,0.35),0_0_0_1px_color-mix(in_srgb,var(--accent)_10%,transparent)] ring-1 ring-inset ring-white/40 dark:border-white/12 dark:ring-white/[0.06]">
        <div className="flex items-center justify-between gap-3 border-b border-[var(--neutral-200)]/80 bg-[color-mix(in_srgb,var(--surface)_92%,var(--card))] px-4 py-3 sm:px-5 dark:border-white/10">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--neutral-500)]">Офис</p>
            <p className="mt-1 text-sm font-semibold leading-snug text-[var(--primary)] sm:text-base">{site.officeAddressLine}</p>
          </div>
          <a
            className="shrink-0 rounded-full border border-[color-mix(in_srgb,var(--accent)_35%,var(--neutral-200))] bg-[var(--card)] px-3 py-1.5 text-xs font-semibold text-[var(--accent)] shadow-sm transition hover:border-[var(--accent)]/55 hover:bg-[color-mix(in_srgb,var(--accent)_10%,var(--card))] sm:text-sm"
            href={openInMapsHref}
            rel="noopener noreferrer"
            target="_blank"
          >
            В Картах
          </a>
        </div>
        <div className="relative aspect-[16/10] w-full min-h-[220px] bg-[var(--neutral-950)] sm:min-h-[280px] lg:min-h-[320px]">
          <iframe
            title="Карта: офис в Бронницах"
            src={mapWidgetSrc}
            width="100%"
            height="100%"
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
        <p className="border-t border-[var(--neutral-200)]/80 bg-[var(--surface)] px-4 py-2.5 text-xs leading-relaxed text-[var(--neutral-600)] sm:px-5 dark:border-white/10">
          Юридический адрес ИП и реквизиты — в блоке слева. Сюда приезжают на встречи по записи и выдаче документов.
        </p>
      </div>
    </div>
  );
}
