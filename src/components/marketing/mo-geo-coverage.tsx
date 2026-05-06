import { MoDistrictMap } from "@/components/marketing/mo-district-map";
import { YandexMoMapWidget } from "@/components/marketing/yandex-mo-map-widget";

/** Хаб «География»: живой виджет Яндекса + локальная схема МО (без гео-API). */
export function MoGeoCoverage() {
  return (
    <div className="space-y-10">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <YandexMoMapWidget />
        <MoDistrictMap />
      </div>
    </div>
  );
}
