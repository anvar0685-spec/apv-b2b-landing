export type CaseStub = {
  slug: string;
  title: string;
  industry: string;
  city: string;
  staff: number;
  durationMonths: number;
  metricUp: string;
  summary: string;
  challenge: string;
  solution: string;
  outcome: string;
  clientQuote: string;
  /** Карточка на главной /en */
  titleEn?: string;
  industryEn?: string;
  summaryEn?: string;
  metricUpEn?: string;
};

export function caseCardFields(c: CaseStub, locale: string) {
  const en = locale === "en";
  return {
    slug: c.slug,
    title: en && c.titleEn ? c.titleEn : c.title,
    industry: en && c.industryEn ? c.industryEn : c.industry,
    summary: en && c.summaryEn ? c.summaryEn : c.summary,
    metricUp: en && c.metricUpEn ? c.metricUpEn : c.metricUp,
  };
}

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
      "Складской контур в пик сезона: выровняли явку, сократили простои комплектации и дали прозрачный SLA по заменам.",
    challenge:
      "Пиковые волны заказов и нестабильная явка ломали throughput; внутренний штат не успевал закрывать ночные смены.",
    solution:
      "Ввели пул смен с единым онбордингом, регламентом замен и ежедневной отчётностью по явке для операционного центра.",
    outcome:
      "Throughput смены вырос на треть за счёт предсказуемой явки; инциденты по документам ушли в контролируемый контур.",
    clientQuote:
      "Наконец-то один SLA на явку и замены — без «перекидывания» между подрядчиками в пик сезона.",
    titleEn: "Marketplace DC: stable shifts in peak season",
    industryEn: "Logistics / marketplace",
    metricUpEn: "+34% shift throughput",
    summaryEn:
      "Peak-season warehouse loop: steadier attendance, fewer picking gaps and a clear replacement SLA.",
  },
  {
    slug: "proizvodstvo-mo",
    title: "Производство МО: закрытие текучки линейки",
    industry: "Производство",
    city: "Подольск",
    staff: 65,
    durationMonths: 6,
    metricUp: "−18% cost per shift",
    summary:
      "Стабилизировали линейку на конвейере: снизили текучку между неделями и выровняли стоимость смены.",
    challenge:
      "Высокая текучка и разрыв между планом смен и фактическим выходом давили на производственный график.",
    solution:
      "Собрали воронку под профиль, усилили инструктаж первых смен и закрепили менторов на линии.",
    outcome:
      "Cost per shift снизился на 18% при сохранении качества; замены стали планируемыми, а не аварийными.",
    clientQuote:
      "Линия перестала «дышать» от недель к неделе — мы видим цифры явки так же, как OEE.",
    titleEn: "Manufacturing MO: stabilising line churn",
    industryEn: "Manufacturing",
    metricUpEn: "−18% cost per shift",
    summaryEn:
      "Stabilised the conveyor line: less week-to-week churn and a steadier cost per shift.",
  },
  {
    slug: "farma-sklad-himki",
    title: "Фарм-склад: усиленный compliance-контур",
    industry: "Фарма / склад",
    city: "Химки",
    staff: 40,
    durationMonths: 12,
    metricUp: "0 нарушений по миграционному учёту",
    summary:
      "Усилили документальный след и контроль сроков уведомлений — без переноса риска на заказчика.",
    challenge:
      "Строгие требования к документам и срокам; любая ошибка в миграционном контуре — операционный и репутационный риск.",
    solution:
      "Внедрили чек-листы, версионирование документов и SLA по эскалации до выхода на объект.",
    outcome:
      "Нарушений по миграционному учёту не зафиксировано; аудит прошёл без критических замечаний по персоналу.",
    clientQuote:
      "Для нас важно не «галочка», а предсказуемость: мы заранее знаем статус каждого сотрудника на линии.",
    titleEn: "Pharma warehouse: stronger compliance loop",
    industryEn: "Pharma / warehouse",
    metricUpEn: "0 migration paperwork violations",
    summaryEn:
      "Tighter document trail and notification deadlines — without quietly shifting risk to the client.",
  },
  {
    slug: "horeca-set",
    title: "HoReCa-сеть: сезонный пик без простоя",
    industry: "HoReCa",
    city: "Москва",
    staff: 200,
    durationMonths: 4,
    metricUp: "95%+ закрытие смен",
    summary:
      "Закрыли сезонный пик: смены закрывались стабильно, фронт и кухня не теряли темп в часы максимальной нагрузки.",
    challenge:
      "Сезонный всплеск нагрузки и дефицит линейки в ключевых локациях сети.",
    solution:
      "Собрали пул под профиль HoReCa, ускорили онбординг и синхронизировали замены с региональным операционным центром.",
    outcome:
      "Закрытие смен держалось выше 95%; простои в пик сократились без роста overtime на постоянном штате.",
    clientQuote:
      "Гости не ждут, пока мы «наймём кого-то» — смены закрыты, и сервис не проседает в пик.",
    titleEn: "HoReCa chain: seasonal peak without downtime",
    industryEn: "HoReCa",
    metricUpEn: "95%+ shifts covered",
    summaryEn:
      "Closed the seasonal spike: stable shift coverage so front-of-house and kitchen kept pace at peak.",
  },
  {
    slug: "stroitelstvo-obekt",
    title: "Стройка: бригады под срок сдачи",
    industry: "Строительство",
    city: "Одинцово",
    staff: 55,
    durationMonths: 5,
    metricUp: "Сроки этапов без срыва",
    summary:
      "Обеспечили выход бригад под календарь этапов: пропускной режим, инструктажи и дисциплина явки.",
    challenge:
      "Сжатые сроки этапов и риск срыва графика из-за неявки и неготовности бригад к пропускному режиму.",
    solution:
      "Согласовали календарь смен, усилили предсменные инструктажи и закрепили ответственных за замены.",
    outcome:
      "Ключевые этапы закрыты в срок; замены не останавливали работу на площадке.",
    clientQuote:
      "Подрядчик, который держит календарь так же жёстко, как генподрядчик — для нас это редкость.",
    titleEn: "Construction: crews aligned to handover dates",
    industryEn: "Construction",
    metricUpEn: "Milestone dates met",
    summaryEn:
      "Crews on a milestone calendar: site access rules, briefings and disciplined attendance.",
  },
  {
    slug: "ritail-raspredelenie",
    title: "Ритейл: распределительный центр",
    industry: "Ритейл",
    city: "Балашиха",
    staff: 90,
    durationMonths: 8,
    metricUp: "−12% overtime",
    summary:
      "Оптимизировали сменность на РЦ: снизили переработки и стабилизировали ночные выходы.",
    challenge:
      "Рост overtime на ночных сменах и неравномерная загрузка линейки в пик отгрузок.",
    solution:
      "Пересобрали пул смен, ввели прозрачную матрицу замен и еженедельный разбор отклонений с COO.",
    outcome:
      "Overtime снизился на 12% при том же объёме отгрузок; явка на ночные смены стабилизировалась.",
    clientQuote:
      "Мы перестали «покупать» пик сезона бесконечными переработками — смены стали закрываться ровнее.",
    titleEn: "Retail: distribution centre",
    industryEn: "Retail",
    metricUpEn: "−12% overtime",
    summaryEn:
      "Rebalanced shift patterns at the DC: less overtime and steadier night-shift coverage.",
  },
];

export function getCase(slug: string) {
  return CASES.find((c) => c.slug === slug);
}
