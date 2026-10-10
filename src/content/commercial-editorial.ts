/** Уникальные абзацы для отраслей (неделя 4 плана). */

/** Редакционный блок + явный индекс callout (-1 = без выделения). */
export type EditorialBundle = {
  paragraphs: string[];
  calloutParagraphIndex: number;
};

export const COMMERCIAL_CALLOUT_DISABLED = -1;

const INDUSTRY: Record<string, { ru: string[]; en: string[] }> = {
  "sklady-e-commerce": {
    ru: [
      "Подбираем работников для сборки и упаковки заказов, сортировки товара и обработки возвратов. До начала сезона согласуем нужный состав и график смен.",
      "Подбираем состав бригад и график под ваш профиль SKU: комплектация, сортировка, возвраты, паллетные потоки — с единым регламентом и одним контактом подрядчика.",
      "Калькулятор и заявка на сайте дают стартовый ориентир по фонду; финальные ставки и KPI фиксируются после диагностики объекта и графика.",
      "В закупке фиксируйте «окно пика» (день недели, часы) и сценарий «смена не вышла» — тогда сравнение подрядчиков честное и не сводится к одной строке прайса.",
    ],
    en: [
      "E-commerce and marketplaces need predictable attendance on inbound/outbound, fast replacements at peaks, and clear shift reporting — without HR noise landing on your team.",
      "We design shift supply for your SKU profile: picking, sorting, returns, pallet flows — with one guarantee framework and one contractor contact.",
      "The calculator and lead form give a starting cost envelope; final rates and KPIs are set after a site and schedule diagnostic.",
      "In procurement, capture “peak window” (weekday, hours) plus the “shift failed to show” playbook — then vendor comparison stays honest and does not collapse into one rate row.",
    ],
  },
  "sklady-riteyla": {
    ru: [
      "Распределительные центры ритейла живут циклами промо и сезонности: важны резерв, дисциплина ночных окон и согласованные показатели ошибки и скорости линии.",
      "Встраиваем смены подрядчика в процессы вашей складской системы и правила безопасности; документы на допуск и вывод людей на линию входят в согласованный объём договора.",
      "Для сетей с несколькими площадками в МО — единая модель отчётности и масштабирования между объектами.",
      "Ночные и предпраздничные недели закладывайте отдельной строкой в КП: иначе «средняя ставка» не переживёт ноябрь без споров с финансами.",
    ],
    en: [
      "Retail DCs run on promo and seasonality: shift reserves, night-window discipline, and aligned KPIs for error rate and line speed matter.",
      "We align shift outsourcing with your WMS flows and safety rules; contractor-side paperwork for site access sits inside the supply contract.",
      "For multi-site retailers in the Moscow Oblast — one reporting model and scaling pattern across locations.",
      "Price night shifts and pre-holiday weeks as separate lines in the proposal — otherwise an “average rate” will not survive November without finance arguments.",
    ],
  },
  "sklady-3pl": {
    ru: [
      "Организуем работу складской команды на площадке с несколькими заказчиками. Согласуем задачи участков, график, требования к работникам и порядок отчётности.",
      "Выстраиваем роли, графики и отчётность для площадки с несколькими клиентами — с чётким разделением ответственности в договоре.",
      "Старт на ограниченном участке (первые смены на согласованной зоне) снижает риск при смене подрядчика или расширении квадратных метров.",
      "На площадке с несколькими клиентами нужна одна методика отчётности: иначе каждый бренд по-своему считает явку и спорит о результате.",
    ],
    en: [
      "3PL operators serve multiple brands on one site: onboarding standards, KPI language, and fast replacement without breaching client guarantees are critical.",
      "We align the people layer for multi-tenant sites: roles, schedules, reporting — with clear contractual responsibility splits.",
      "A bounded start on a limited zone (first agreed shifts) reduces risk when switching vendors or adding square meters.",
      "Multi-client sites need one KPI language in reporting — otherwise each brand reads “their own” attendance and argues methodology on a shared yard.",
    ],
  },
  "proizvodstvennye-sklady": {
    ru: [
      "Производственные склады сочетают складскую механику и производственный ритм: важны стабильность смен, обучение и снижение брака между линиями.",
      "Вывод людей на смены строится вокруг узких мест — приёмка сырья, КС, отгрузка ГП — с прогнозируемым резервом и понятной эскалацией.",
      "Отчётность стыкуется с производственными сводками, чтобы операционный директор видел связь численности и выработки.",
      "Пересечение смен производства и складского блока требует явного владельца эскалации — иначе «между сменами» теряются брак и простой КС.",
    ],
    en: [
      "Manufacturing warehouses blend logistics and line cadence: shift stability, training, and defect reduction between lines matter.",
      "Shift supply is built around bottlenecks — raw inbound, WIP, finished-goods outbound — with predictable reserves and clear escalation.",
      "Reporting ties to production dashboards so ops leaders see people and output together.",
      "Where production and warehouse shifts intersect, name one escalation owner — otherwise defects and WIP stalls get lost “between shifts”.",
    ],
  },
  "farmatsevticheskie-sklady": {
    ru: [
      "Обсудим подбор работников под требования вашего фармацевтического склада. До выхода согласуем задачи, необходимые документы и инструктажи.",
      "Мы не подменяем QA продукции заказчика, но обеспечиваем предсказуемую явку и замены без нарушения ваших SOP.",
      "Пакет документов на допуск к работам и кадровое сопровождение смен — в рамках договора на персонал; детали фиксируются в приложениях.",
      "Версии приказов и допусков к зонам хранения — отдельный контрольный список: фарма не прощает рассинхрон между «бумагой» и фактическим выходом.",
    ],
    en: [
      "Pharma needs document discipline, serialization, and access control: shifts are deployed to site rules with agreed training paths.",
      "We do not replace the customer’s product QA, but we deliver predictable attendance and replacements without breaking your SOPs.",
      "Shift-supply contracts bundle HR paperwork for line roles; annexes capture specifics.",
      "Permit versions and zone access lists need their own checklist — pharma punishes any mismatch between paperwork and who actually showed up.",
    ],
  },
  "fmcg-sklady": {
    ru: [
      "FMCG — высокая скорость оборота и паллетные пики: важны короткое время выхода замены и устойчивый пул на сезон.",
      "Ночные перерывы, кросс-док и предпраздничные недели заранее закладываются в коммерческое предложение.",
      "Показатели явки и стоимость смены в одной методике учёта помогают финансам держать модель в рамках бюджета.",
      "Паллетные пики и ночные перерывы лучше заранее разобрать с подрядчиком: несогласованный резерв превращается в аврал у ворот.",
    ],
    en: [
      "FMCG means fast turns and pallet peaks: short replacement lead time and a resilient seasonal pool matter.",
      "Night-break, cross-dock, and pre-holiday weeks are planned upfront in the commercial proposal.",
      "Attendance and cost-per-shift metrics help finance keep the model inside budget.",
      "Model pallet peaks and night-break with the vendor early — unmanaged reserves turn into gate fire-fighting, not headcount.",
    ],
  },
  "sklady-klassa-a": {
    ru: [
      "Склады класса А предъявляют высокие требования к дисциплине, форме сотрудников и взаимодействию со службой эксплуатации.",
      "Мы подстраиваем формат инструктажей, форму и язык отчётности под стандарты девелопера и эксплуатации.",
      "KPI по явке и времени реакции на замену фиксируются прозрачно, чтобы закупка и операции говорили на одном языке.",
      "Визуал и дисциплина линейки на «классе А» — часть бренда площадки: под это выравниваются инструктажи и форма, без самодеятельности на объекте.",
    ],
    en: [
      "Class A sites demand discipline, frontline presentation, and tight coordination with building operations.",
      "We tune briefings, uniforms where required, and reporting language to developer and facilities standards.",
      "Attendance KPIs and replacement response times are written clearly so procurement and ops share one definition of “good”.",
      "Frontline look-and-feel is part of the asset brand — briefings and uniforms align to that standard, not ad-hoc on site.",
    ],
  },
};

const INDUSTRY_TAIL: string[] = [
  "Калькулятор на сайте даёт быстрый ориентир по месячному фонду с учётом роли, численности и графика; детальные ставки, резерв и гарантии фиксируются в коммерческом предложении после диагностики объекта.",
  "Ограниченный пилот первых смен на зоне или по части графика снижает риск при смене подрядчика и помогает закупке и операциям согласовать единые определения KPI до промышленного масштаба.",
  "Публичные тексты не заменяют индивидуальное КП и договор: штрафные механики, порядок приёмки результата и форс-мажор закрепляются в договорной документации.",
];

export function industryEditorial(slug: string): string[] | undefined {
  const b = INDUSTRY[slug];
  if (!b) return undefined;
  return [...b.ru, ...INDUSTRY_TAIL];
}

/** Явный индекс «сути для закупки»: для FMCG — абзац про паллетные пики (сильный операционный акцент). */
export function industryEditorialBundle(slug: string): EditorialBundle | undefined {
  const paragraphs = industryEditorial(slug);
  if (!paragraphs) return undefined;
  if (paragraphs.length < 3) return { paragraphs, calloutParagraphIndex: COMMERCIAL_CALLOUT_DISABLED };
  const bySlug: Record<string, number> = {
    "fmcg-sklady": 3,
  };
  const calloutParagraphIndex = bySlug[slug] ?? 1;
  return { paragraphs, calloutParagraphIndex };
}

/** Хаб «Отрасли» — вводные абзацы перед списком карточек */
export function industryHubEditorial(): string[] {
  return [
    "Раздел собирает профили складских цепочек — от e-commerce и ритейла до фармы и класса А — чтобы закупка и операции заходили на страницу уже с нужным контекстом процессов.",
    "Каждая карточка ниже — отдельный профиль отрасли: ориентиры по составу смен, гарантии и типичным сценариям закупки под ваш объект.",
    "Дальше свяжите выбранный профиль с калькулятором и разделом «Персонал»: так проще сравнить логистику выхода и резерв между локациями до запроса КП.",
  ];
}
