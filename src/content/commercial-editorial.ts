/** Уникальные абзацы для отраслей / площадок / гео (неделя 4 плана). */

import type { GeoRegionSlug } from "@/lib/site-structure";
import { geoLabel } from "@/lib/site-structure";

/** Редакционный блок + явный индекс callout (-1 = без выделения). */
export type EditorialBundle = {
  paragraphs: string[];
  calloutParagraphIndex: number;
};

export const COMMERCIAL_CALLOUT_DISABLED = -1;

const INDUSTRY: Record<string, { ru: string[]; en: string[] }> = {
  "sklady-e-commerce": {
    ru: [
      "E-commerce и маркетплейсы требуют предсказуемой явки на приёмку и отгрузку, быстрых замен в пик и прозрачной отчётности по сменам — без переноса кадрового шума в вашу службу.",
      "Подбираем состав бригад и график под ваш профиль SKU: комплектация, сортировка, возвраты, паллетные потоки — с единым SLA и одним контактом подрядчика.",
      "Калькулятор и заявка на сайте дают стартовый ориентир по фонду; финальные ставки и KPI фиксируются после диагностики объекта и графика.",
      "В закупке фиксируйте «окно пика» (день недели, часы) и сценарий «смена не вышла» — тогда сравнение подрядчиков честное и не сводится к одной строке прайса.",
    ],
    en: [
      "E-commerce and marketplaces need predictable attendance on inbound/outbound, fast replacements at peaks, and clear shift reporting — without HR noise landing on your team.",
      "We design shift supply for your SKU profile: picking, sorting, returns, pallet flows — with one SLA and one contractor contact.",
      "The calculator and lead form give a starting cost envelope; final rates and KPIs are set after a site and schedule diagnostic.",
      "In procurement, capture “peak window” (weekday, hours) plus the “shift failed to show” playbook — then vendor comparison stays honest and does not collapse into one rate row.",
    ],
  },
  "sklady-riteyla": {
    ru: [
      "Ритейл-DC живут циклами промо и сезонности: важны резерв смен, дисциплина ночных окон и согласованные KPI по ошибке и скорости линии.",
      "Совмещаем аутсорсинг смен с вашими WMS-процессами и внутренними регламентами безопасности; миграционный учёт и кадровые документы — в рамках договора с подрядчиком.",
      "Для сетей с несколькими площадками в МО — единая модель отчётности и масштабирования между объектами.",
      "Ночные и предпраздничные недели закладывайте отдельной строкой в КП: иначе «средняя ставка» не переживёт ноябрь без споров с финансами.",
    ],
    en: [
      "Retail DCs run on promo and seasonality: shift reserves, night-window discipline, and aligned KPIs for error rate and line speed matter.",
      "We align shift outsourcing with your WMS flows and safety rules; documents and migration compliance sit inside the supply contract.",
      "For multi-site retailers in the Moscow Oblast — one reporting model and scaling pattern across locations.",
      "Price night shifts and pre-holiday weeks as separate lines in the proposal — otherwise an “average rate” will not survive November without finance arguments.",
    ],
  },
  "sklady-3pl": {
    ru: [
      "3PL-операторы обслуживают несколько брендов на одной площадке: критичны стандарты инструктажа, язык KPI и быстрый вывод замены без простоя клиентских SLA.",
      "Мы помогаем выровнять линейку людей и регламент смен под мульти-клиент: роли, графики, отчётность — с разделением ответственности в договоре.",
      "Старт на ограниченном участке (первые смены на согласованной зоне) снижает риск при смене подрядчика или расширении квадратных метров.",
      "Для мульти-клиента важен единый язык KPI в отчёте: иначе каждый бренд читает «свою» явку и спорит о методике на общей площадке.",
    ],
    en: [
      "3PL operators serve multiple brands on one site: onboarding standards, KPI language, and fast replacement without breaching client SLAs are critical.",
      "We align the people layer for multi-tenant sites: roles, schedules, reporting — with clear contractual responsibility splits.",
      "A bounded start on a limited zone (first agreed shifts) reduces risk when switching vendors or adding square meters.",
      "Multi-client sites need one KPI language in reporting — otherwise each brand reads “their own” attendance and argues methodology on a shared yard.",
    ],
  },
  "proizvodstvennye-sklady": {
    ru: [
      "Производственные склады сочетают складскую механику и производственный ритм: важны стабильность смен, обучение и снижение брака между линиями.",
      "Вывод людей на смены строится вокруг узких мест — приёмка сырья, КС, отгрузка ГП — с прогнозируемым резервом и понятной эскалацией.",
      "Отчётность стыкуется с производственными дашбордами, чтобы COO видел связку людей и output.",
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
      "Фарма требует дисциплины документов, серийности и доступа: смены выводятся под регламенты площадки и согласованную программу инструктажей.",
      "Мы не подменяем QA продукции заказчика, но обеспечиваем предсказуемую явку и замены без нарушения ваших SOP.",
      "Миграционный учёт и кадровые документы — в рамках договора на персонал для смен; детали фиксируются в приложениях.",
      "Версии приказов и допусков к зонам хранения — отдельный контрольный список: фарма не прощает рассинхрон между «бумагой» и фактическим выходом.",
    ],
    en: [
      "Pharma needs document discipline, serialization, and access control: shifts are deployed to site rules with agreed training paths.",
      "We do not replace the customer’s product QA, but we deliver predictable attendance and replacements without breaking your SOPs.",
      "Migration and HR document flows sit inside the shift-supply contract; specifics live in annexes.",
      "Permit versions and zone access lists need their own checklist — pharma punishes any mismatch between paperwork and who actually showed up.",
    ],
  },
  "fmcg-sklady": {
    ru: [
      "FMCG — высокая скорость оборота и паллетные пики: важны короткое время выхода замены и устойчивый пул на сезон.",
      "Сценарии night-break, кросс-дока и предпраздничных недель закладываются заранее в коммерческом предложении.",
      "Показатели явки и стоимость смены в одной методике учёта помогают финансам держать модель в рамках бюджета.",
      "Паллетные пики и night-break сценарии лучше моделировать заранее с подрядчиком: резерв без согласования превращается в «пожар» на воротах.",
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
      "Класс А — высокие требования к дисциплине, внешнему виду линейки и коммуникации с инфраструктурой площадки.",
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

const PLATFORM: Record<string, { ru: string[]; en: string[] }> = {
  wildberries: {
    ru: [
      "Крупные площадки WB требуют масштабируемых команд под приёмку и отгрузку и дисциплину замен в пиковые окна.",
      "Мы выравниваем профили под ваши зоны и график, сохраняя единый контакт подрядчика и отчётность по сменам.",
      "Старт — диагностика и первые согласованные смены на участке; дальше — наращивание по дорожной карте.",
      "Слоты на воротах и скорость первичного допуска людей на линию — часть коммерческого пакета: без них KPI по комплектации «плывут» не из-за людей, а из-за логистики входа.",
    ],
    en: [
      "Large WB sites need scalable teams for inbound/outbound and disciplined replacements at peaks.",
      "We align role mixes to your zones and schedule while keeping one contractor contact and shift-level reporting.",
      "Kickoff is a process diagnostic and first agreed shifts on a bounded area; scale follows an agreed roadmap.",
      "Gate slots and first-day onboarding speed belong in the commercial pack — without them picking KPIs drift because of inbound logistics, not headcount.",
    ],
  },
  ozon: {
    ru: [
      "Высокая интенсивность линий Ozon чувствительна к явке и скорости ввода замены в смену.",
      "В договор входят обучение первой смены, менторинг и контрольные точки первой недели.",
      "Документы и миграционный учёт — в рамках договора с подрядчиком, без «серых зон» в закупке.",
      "Первая неделя после массового набора — критична: менторинг и чек-лист первой смены дешевле, чем переделка ошибок в outbound.",
    ],
    en: [
      "High-intensity Ozon lines are sensitive to attendance and replacement onboarding speed.",
      "Shift supply includes first-shift training, mentoring, and week-one checkpoints.",
      "Documents and migration compliance are inside the supply contract — no grey zones for procurement.",
      "Week one after a bulk hire is where projects win or lose — mentoring and first-shift checklists beat rework in outbound.",
    ],
  },
  "yandex-market": {
    ru: [
      "Логистические хабы маркетплейса требуют предсказуемого выхода бригад и согласованных слотов на воротах.",
      "Мы помогаем синхронизировать пул смен с вашим планом отгрузок и внутренней маршрутизацией.",
      "Отчётность по сменам стыкуется с операционными встречами 3PL/заказчика.",
      "Маршрутизация внутри хаба и язык KPI должны быть согласованы между 3PL и сетью — иначе «наша явка» и «ваша явка» расходятся в одной смене.",
    ],
    en: [
      "Marketplace hubs need predictable crew mobilisation and aligned gate slots.",
      "We sync the shift pool with your shipping plan and internal routing.",
      "Shift reporting maps to joint 3PL/customer ops reviews.",
      "Hub routing and KPI language must be aligned between 3PL and the marketplace — otherwise “our attendance” and “your attendance” diverge in the same shift.",
    ],
  },
  lamoda: {
    ru: [
      "Fashion и обувь на складе: аккуратность при примерке/возвратах, скорость комплектации и контроль ошибок.",
      "Смены подбираются под профиль зоны (приёмка, сток, отгрузка) с единым SLA.",
      "Старт на одной зоне снижает риск при смене формата сортировки.",
      "Этот сегмент чувствителен к ошибке комплектации и возвратам: AQL и выборочный контроль лучше зашить в SLA, а не обсуждать постфактум.",
    ],
    en: [
      "Fashion fulfillment: careful handling for returns flows, picking speed, and error control.",
      "Shifts are tuned to zone profiles (inbound, stock, outbound) under one SLA.",
      "A single-zone start reduces risk when changing sortation formats.",
      "Fashion is sensitive to picking errors and returns — bake AQL/sampling into the SLA instead of debating it after the fact.",
    ],
  },
  "sber-market": {
    ru: [
      "Экосистемные сети требуют согласованных регламентов коммуникации между площадкой, 3PL и подрядчиком по сменам.",
      "Мы закрепляем каналы эскалации и формат еженедельных разборов метрик.",
      "Масштабирование между городами МО — с унифицированным шаблоном отчётности.",
      "Экосистемные SLA требуют единого окна эскалации: иначе инцидент «зависает» между вендором смен, 3PL и сетью.",
    ],
    en: [
      "Ecosystem retail needs aligned communication rules between the site, 3PL, and shift vendor.",
      "We define escalation channels and a weekly metrics review format.",
      "Scaling across Moscow Oblast cities uses a unified reporting template.",
      "Ecosystem SLAs need one escalation window — otherwise incidents stall between the shift vendor, 3PL, and the retailer.",
    ],
  },
};

const GEO_HUB: { ru: string[]; en: string[] } = {
  ru: [
    "Раздел «География» — опорный хаб для локального поиска: Москва по округам и ключевые города Московской области.",
    "Каждая карточка ведёт на посадочную с ЧПУ; программатика профессий × города доступна из раздела «Персонал».",
    "Ниже — схематичная карта МО (статика): ориентир зоны присутствия, не навигационный сервис.",
  ],
  en: [
    "Geography is the anchor hub for local search: Moscow by district and key cities in the Moscow Oblast.",
    "Each card links to a clean-URL landing; profession × city programmatic pages live under Workforce.",
    "Below is a schematic MO map (static): a presence-zone hint, not a navigation product.",
  ],
};

const GEO_REGION: Record<string, { ru: string[]; en: string[] }> = {
  moskva: {
    ru: [
      "Москва — высокая плотность объектов и трафика; критичны время выхода на смену и резерв замен в часы пик.",
      "Округа ниже ведут на локальные страницы; контент наращивается редакцией без потери URL-стабильности.",
      "Транспортная доступность и «час пик» на выходе влияют на стоимость смены сильнее, чем разница в паре десятков рублей к ставке — учитывайте при расчёте выхода на объект.",
    ],
    en: [
      "Moscow means dense sites and traffic; shift start reliability and peak replacement reserves are critical.",
      "Districts below link to local pages; editorial content grows without breaking URL stability.",
      "Access corridors and rush-hour mobilisation often matter more to shift economics than a few roubles on the hourly rate — model both.",
    ],
  },
  "moskovskaya-oblast": {
    ru: [
      "Московская область — разброс по расстояниям и транспортным коридорам; в модель закладывается логистика выхода и резерв на замену.",
      "Список городов — рабочий периметр программатики; детальные тексты подключаются по приоритету спроса.",
      "Для удалённых от МКАД площадок заранее проговаривайте жильё/транзит или сдвиг графика — иначе резерв замены «съедается» логистикой, а не профилем.",
    ],
    en: [
      "The Moscow Oblast spans distances and transport corridors; the model includes mobilisation logistics and replacement reserves.",
      "The city list is the working perimeter for programmatic pages; deeper copy rolls out by demand priority.",
      "For sites far from the MKAD, align housing/transit or shift timing early — otherwise replacement reserves burn off on logistics, not profile fit.",
    ],
  },
};

const INDUSTRY_TAIL: string[] = [
    "Калькулятор на сайте даёт быстрый ориентир по месячному фонду с учётом роли, численности и графика; детальные ставки, резерв и SLA фиксируются в коммерческом предложении после диагностики объекта.",
    "Ограниченный пилот первых смен на зоне или по части графика снижает риск при смене подрядчика и помогает закупке и операциям согласовать единые определения KPI до промышленного масштаба.",
    "Публичные тексты не заменяют индивидуальное КП и договор: штрафные механики, порядок приёмки результата и форс-мажор закрепляются в договорной документации.",
  ];

const PLATFORM_TAIL: string[] = [
    "Для площадочных моделей критичны слоты на воротах, скорость ввода замены и язык отчётности, понятный и 3PL, и сети-заказчику одновременно.",
    "Связка с разделом «Персонал» и программатикой по городам МО позволяет закупке сравнить логистику выхода и резерв между локациями до подписания договора.",
    "Ориентиры по ставкам на витрине сайта — база для первичного сравнения; итоговая экономика зависит от графика, пиков и требований площадки к документам и допускам.",
  ];

const GEO_TAIL: string[] = [
    "Программатика «профессия × город» доступна из раздела «Персонал»: каждая пара URL получает своё ЧПУ и согласованный коммерческий и SEO-каркас под закупку и поиск.",
    "Схематичная карта в хабе «География» иллюстрирует зону присутствия и не является навигационным сервисом.",
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

export function platformEditorial(slug: string): string[] | undefined {
  const b = PLATFORM[slug];
  if (!b) return undefined;
  return [...b.ru, ...PLATFORM_TAIL];
}

export function platformEditorialBundle(slug: string): EditorialBundle | undefined {
  const paragraphs = platformEditorial(slug);
  if (!paragraphs) return undefined;
  if (paragraphs.length < 3) return { paragraphs, calloutParagraphIndex: COMMERCIAL_CALLOUT_DISABLED };
  return { paragraphs, calloutParagraphIndex: 1 };
}

/** Хаб «Отрасли» — вводные абзацы перед списком карточек */
export function industryHubEditorial(): string[] {
  return [
    "Раздел собирает профили складских цепочек — от e-commerce и ритейла до фармы и класса А — чтобы закупка и операции заходили на страницу уже с нужным контекстом процессов.",
    "Каждая карточка ниже — отдельная посадочная с уникальным текстом: ориентиры по составу смен, SLA и типичным сценариям закупки под ваш объект.",
    "Дальше свяжите выбранный профиль с калькулятором и разделом «Персонал»: так проще сравнить логистику выхода и резерв между локациями до запроса КП.",
  ];
}

/** Хаб «Площадки» */
export function platformHubEditorial(): string[] {
  return [
    "Площадки и маркетплейсы задают правила допуска, слоты на воротах и язык отчётности — отдельные страницы ниже помогают не смешивать требования разных брендов в одной закупке.",
    "Мы выравниваем состав смен под регламент конкретной площадки и ваш график, сохраняя единый контакт подрядчика и прозрачность по сменам.",
    "Для сравнения фонда используйте калькулятор и программатику по городам: итоговая экономика всё равно фиксируется в КП после диагностики объекта.",
  ];
}

/** Гео-посадочная города / округа */
export function geoCityEditorial(region: GeoRegionSlug, city: string): string[] {
  const loc = geoLabel(city);
  const reg = geoLabel(region);
  return [
    `Локальная посадочная для «${loc.ru}» в периметре «${reg.ru}»: географический контекст для закупки и поиска; детальные ставки и SLA — в коммерческом предложении после диагностики объекта.`,
    `Связка с разделом «Персонал» и программатикой «профессия × город» даёт сравнимые ориентиры по логистике выхода и резерву замен между локациями до подписания договора.`,
    `Публичный текст не заменяет индивидуальное КП: график пиков, окна на воротах и требования к документам закрепляются на стороне объекта и подрядчика в договорной документации.`,
  ];
}

export function geoHubEditorial(): string[] {
  return [...GEO_HUB.ru, ...GEO_TAIL];
}

export function geoRegionEditorial(region: string): string[] | undefined {
  const b = GEO_REGION[region];
  if (!b) return undefined;
  return [...b.ru, ...GEO_TAIL];
}
