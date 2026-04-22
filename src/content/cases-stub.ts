export type CaseStub = {
  slug: string;
  title: string;
  industry: string;
  city: string;
  staff: number;
  durationMonths: number;
  metricUp: string;
  summary: string;
};

export const CASES: CaseStub[] = [
  {
    slug: "marketplace-sklad-moskva",
    title: "Склад маркетплейса: стабильные смены в пике",
    industry: "Логистика / маркетплейс",
    city: "Москва",
    staff: 120,
    durationMonths: 9,
    metricUp: "+34% throughput смены",
    summary:
      "Заглушка кейса: цифры и цитата клиента будут подставлены после NDA и согласования.",
  },
  {
    slug: "proizvodstvo-mo",
    title: "Производство МО: закрытие текучки линейки",
    industry: "Производство",
    city: "Подольск",
    staff: 65,
    durationMonths: 6,
    metricUp: "−18% cost per shift",
    summary: "Шаблон для детальной страницы кейса с графиками до/после.",
  },
  {
    slug: "farma-sklad-himki",
    title: "Фарм-склад: усиленный compliance-контур",
    industry: "Фарма / склад",
    city: "Химки",
    staff: 40,
    durationMonths: 12,
    metricUp: "0 нарушений по миграционному учёту",
    summary: "Акцент на документальном следе и SLA по явке.",
  },
  {
    slug: "horeca-set",
    title: "HoReCa-сеть: сезонный пик без простоя",
    industry: "HoReCa",
    city: "Москва",
    staff: 200,
    durationMonths: 4,
    metricUp: "95%+ закрытие смен",
    summary: "Кейс для операционного директора сети.",
  },
  {
    slug: "stroitelstvo-obekt",
    title: "Стройка: бригады под срок сдачи",
    industry: "Строительство",
    city: "Одинцово",
    staff: 55,
    durationMonths: 5,
    metricUp: "Сроки этапов без срыва",
    summary: "Шаблон для отраслевого лендинга и программатики.",
  },
  {
    slug: "ritail-raspredelenie",
    title: "Ритейл: распределительный центр",
    industry: "Ритейл",
    city: "Балашиха",
    staff: 90,
    durationMonths: 8,
    metricUp: "−12% overtime",
    summary: "Короткий кейс для блока «флагманы» на главной.",
  },
];

export function getCase(slug: string) {
  return CASES.find((c) => c.slug === slug);
}
