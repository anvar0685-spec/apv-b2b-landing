/** Уникальные абзацы для отраслей / площадок / гео (неделя 4 плана). */

const INDUSTRY: Record<string, { ru: string[]; en: string[] }> = {
  "sklady-e-commerce": {
    ru: [
      "E-commerce и маркетплейсы требуют предсказуемой явки на inbound/outbound, быстрых замен в пик и прозрачной отчётности по сменам — без переноса кадрового шума в вашу службу.",
      "Мы проектируем поставку смен под ваш профиль SKU: комплектация, сортировка, возвраты, паллетный контур — с единым SLA и контактом подрядчика.",
      "Калькулятор и заявка на сайте дают стартовый ориентир по фонду; финальные ставки и KPI фиксируются после диагностики объекта и графика.",
    ],
    en: [
      "E-commerce and marketplaces need predictable attendance on inbound/outbound, fast replacements at peaks, and clear shift reporting — without HR noise landing on your team.",
      "We design shift supply for your SKU profile: picking, sorting, returns, pallet flows — with one SLA and one contractor contact.",
      "The calculator and lead form give a starting cost envelope; final rates and KPIs are set after a site and schedule diagnostic.",
    ],
  },
  "sklady-riteyla": {
    ru: [
      "Ритейл-DC живут циклами промо и сезонности: важны резерв смен, дисциплина ночных окон и согласованные KPI по ошибке и скорости линии.",
      "Совмещаем аутсорсинг смен с вашими WMS-процессами и внутренними регламентами безопасности; документы и миграционный контур — в рамках договора поставки.",
      "Для сетей с несколькими площадками в МО — единая модель отчётности и масштабирования между объектами.",
    ],
    en: [
      "Retail DCs run on promo and seasonality: shift reserves, night-window discipline, and aligned KPIs for error rate and line speed matter.",
      "We align shift outsourcing with your WMS flows and safety rules; documents and migration compliance sit inside the supply contract.",
      "For multi-site retailers in the Moscow Oblast — one reporting model and scaling pattern across locations.",
    ],
  },
  "sklady-3pl": {
    ru: [
      "3PL-операторы обслуживают несколько брендов на одной площадке: критичны стандарты инструктажа, язык KPI и быстрый вывод замены без простоя клиентских SLA.",
      "Мы помогаем выровнять «человеческий» контур под мульти-клиент: роли, графики, отчётность — с разделением ответственности в договоре.",
      "Пилот на ограниченной зоне снижает риск при смене подрядчика или расширении квадратных метров.",
    ],
    en: [
      "3PL operators serve multiple brands on one site: onboarding standards, KPI language, and fast replacement without breaching client SLAs are critical.",
      "We align the people layer for multi-tenant sites: roles, schedules, reporting — with clear contractual responsibility splits.",
      "A pilot in a bounded zone reduces risk when switching vendors or adding square meters.",
    ],
  },
  "proizvodstvennye-sklady": {
    ru: [
      "Производственные склады сочетают складскую механику и производственный ритм: важны стабильность смен, обучение и снижение брака между линиями.",
      "Поставка смен строится вокруг узких мест — приёмка сырья, КС, отгрузка ГП — с прогнозируемым резервом и понятной эскалацией.",
      "Отчётность стыкуется с производственными дашбордами, чтобы COO видел связку людей и output.",
    ],
    en: [
      "Manufacturing warehouses blend logistics and line cadence: shift stability, training, and defect reduction between lines matter.",
      "Shift supply is built around bottlenecks — raw inbound, WIP, finished-goods outbound — with predictable reserves and clear escalation.",
      "Reporting ties to production dashboards so ops leaders see people and output together.",
    ],
  },
  "farmatsevticheskie-sklady": {
    ru: [
      "Фарма требует дисциплины документов, серийности и доступа: смены выводятся под регламенты площадки и согласованный контур обучения.",
      "Мы не подменяем QA продукции заказчика, но обеспечиваем предсказуемую явку и замены без нарушения ваших SOP.",
      "Миграционный и кадровый контур — в рамках договора поставки смен; детали фиксируются в приложениях.",
    ],
    en: [
      "Pharma needs document discipline, serialization, and access control: shifts are deployed to site rules with agreed training paths.",
      "We do not replace the customer’s product QA, but we deliver predictable attendance and replacements without breaking your SOPs.",
      "Migration and HR document flows sit inside the shift-supply contract; specifics live in annexes.",
    ],
  },
  "fmcg-sklady": {
    ru: [
      "FMCG — высокая скорость оборота и паллетные пики: важны короткое время выхода замены и устойчивый пул на сезон.",
      "Сценарии night-break, кросс-дока и предпраздничных недель закладываются заранее в коммерческом предложении.",
      "Показатели явки и cost per shift помогают финансам держать модель в рамках бюджета.",
    ],
    en: [
      "FMCG means fast turns and pallet peaks: short replacement lead time and a resilient seasonal pool matter.",
      "Night-break, cross-dock, and pre-holiday weeks are planned upfront in the commercial proposal.",
      "Attendance and cost-per-shift metrics help finance keep the model inside budget.",
    ],
  },
  "sklady-klassa-a": {
    ru: [
      "Класс А — высокие требования к дисциплине, внешнему виду линейки и коммуникации с инфраструктурой площадки.",
      "Мы подстраиваем формат инструктажей, форму и язык отчётности под стандарты девелопера и эксплуатации.",
      "KPI по явке и времени реакции на замену фиксируются прозрачно, чтобы закупка и операции говорили на одном языке.",
    ],
    en: [
      "Class A sites demand discipline, frontline presentation, and tight coordination with building operations.",
      "We tune briefings, uniforms where required, and reporting language to developer and facilities standards.",
      "Attendance KPIs and replacement response times are written clearly so procurement and ops share one definition of “good”.",
    ],
  },
};

const PLATFORM: Record<string, { ru: string[]; en: string[] }> = {
  wildberries: {
    ru: [
      "Крупные площадки WB требуют масштабируемых команд под inbound/outbound и дисциплину замен в пиковые окна.",
      "Мы выравниваем профили под ваши зоны и график, сохраняя единый контакт подрядчика и отчётность по сменам.",
      "Старт — диагностика процесса и пилот; масштабирование — по согласованной дорожной карте.",
    ],
    en: [
      "Large WB sites need scalable teams for inbound/outbound and disciplined replacements at peaks.",
      "We align role mixes to your zones and schedule while keeping one contractor contact and shift-level reporting.",
      "Kickoff is a process diagnostic and pilot; scale follows an agreed roadmap.",
    ],
  },
  ozon: {
    ru: [
      "Высокая интенсивность линий Ozon чувствительна к явке и скорости онбординга замены.",
      "Поставка смен включает обучение первой смены, менторинг и контрольные точки первой недели.",
      "Документы и миграционный контур — в рамках договора поставки, без «серых зон» в закупке.",
    ],
    en: [
      "High-intensity Ozon lines are sensitive to attendance and replacement onboarding speed.",
      "Shift supply includes first-shift training, mentoring, and week-one checkpoints.",
      "Documents and migration compliance are inside the supply contract — no grey zones for procurement.",
    ],
  },
  "yandex-market": {
    ru: [
      "Логистические хабы маркетплейса требуют предсказуемого выхода бригад и согласованных слотов на воротах.",
      "Мы помогаем синхронизировать пул смен с вашим планом отгрузок и внутренней маршрутизацией.",
      "Отчётность по сменам стыкуется с операционными встречами 3PL/заказчика.",
    ],
    en: [
      "Marketplace hubs need predictable crew mobilisation and aligned gate slots.",
      "We sync the shift pool with your shipping plan and internal routing.",
      "Shift reporting maps to joint 3PL/customer ops reviews.",
    ],
  },
  lamoda: {
    ru: [
      "Fashion fulfillment: аккуратность при примерке/возвратах, скорость комплектации и контроль ошибок.",
      "Смены подбираются под профиль зоны (inbound, сток, outbound) с единым SLA.",
      "Пилот на одной зоне снижает риск при смене формата сортировки.",
    ],
    en: [
      "Fashion fulfillment: careful handling for returns flows, picking speed, and error control.",
      "Shifts are tuned to zone profiles (inbound, stock, outbound) under one SLA.",
      "A single-zone pilot reduces risk when changing sortation formats.",
    ],
  },
  "sber-market": {
    ru: [
      "Экосистемные сети требуют согласованных регламентов коммуникации между площадкой, 3PL и подрядчиком по сменам.",
      "Мы закрепляем каналы эскалации и формат еженедельных разборов метрик.",
      "Масштабирование между городами МО — с унифицированным шаблоном отчётности.",
    ],
    en: [
      "Ecosystem retail needs aligned communication rules between the site, 3PL, and shift vendor.",
      "We define escalation channels and a weekly metrics review format.",
      "Scaling across Moscow Oblast cities uses a unified reporting template.",
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
    ],
    en: [
      "Moscow means dense sites and traffic; shift start reliability and peak replacement reserves are critical.",
      "Districts below link to local pages; editorial content grows without breaking URL stability.",
    ],
  },
  "moskovskaya-oblast": {
    ru: [
      "Московская область — разброс по расстояниям и транспортным коридорам; в модель закладывается логистика выхода и резерв на замену.",
      "Список городов — рабочий периметр программатики; детальные тексты подключаются по приоритету спроса.",
    ],
    en: [
      "The Moscow Oblast spans distances and transport corridors; the model includes mobilisation logistics and replacement reserves.",
      "The city list is the working perimeter for programmatic pages; deeper copy rolls out by demand priority.",
    ],
  },
};

export function industryEditorial(slug: string, locale: string): string[] | undefined {
  const b = INDUSTRY[slug];
  if (!b) return undefined;
  return locale === "en" ? b.en : b.ru;
}

export function platformEditorial(slug: string, locale: string): string[] | undefined {
  const b = PLATFORM[slug];
  if (!b) return undefined;
  return locale === "en" ? b.en : b.ru;
}

export function geoHubEditorial(locale: string): string[] {
  return locale === "en" ? GEO_HUB.en : GEO_HUB.ru;
}

export function geoRegionEditorial(region: string, locale: string): string[] | undefined {
  const b = GEO_REGION[region];
  if (!b) return undefined;
  return locale === "en" ? b.en : b.ru;
}
