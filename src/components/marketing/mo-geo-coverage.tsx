import { YandexMoMapWidget } from "@/components/marketing/yandex-mo-map-widget";

/** Хаб «География»: только интерактивная карта Яндекса (без схемы-врезки). */
export function MoGeoCoverage() {
  return (
    <div className="w-full max-w-full">
      <YandexMoMapWidget />
    </div>
  );
}
