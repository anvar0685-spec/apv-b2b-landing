export type CaseStub = {
  slug: string;
  title: string;
  industry: string;
  city: string;
  durationMonths: number;
  /** Роли и контур смены из уже опубликованного текста. Без численности. */
  shiftProfile: string;
  metricUp: string;
  summary: string;
  challenge: string;
  solution: string;
  outcome: string;
  clientQuote: string;
  /** Опционально для отдельного EN deck/PDF вне сайта */
  titleEn?: string;
  industryEn?: string;
  summaryEn?: string;
  metricUpEn?: string;
  cityEn?: string;
  challengeEn?: string;
  solutionEn?: string;
  outcomeEn?: string;
  clientQuoteEn?: string;
};

export function caseCardFields(c: CaseStub) {
  return {
    slug: c.slug,
    title: c.title,
    industry: c.industry,
    summary: c.summary,
    metricUp: c.metricUp,
    city: c.city,
    shiftProfile: c.shiftProfile,
  };
}

export function caseDetailFields(c: CaseStub) {
  const card = caseCardFields(c);
  return {
    ...card,
    durationMonths: c.durationMonths,
    challenge: c.challenge,
    solution: c.solution,
    outcome: c.outcome,
    clientQuote: c.clientQuote,
  };
}

/**
 * Реальные кейсы компании, обезличенные.
 *
 * Правила публикации (соответствуют практике премиум-сегмента —
 * Coleman / ANCOR / Ventra Industrial):
 *  — заказчики и бренды не называются (NDA по умолчанию). Используем
 *    формулировки «известный бренд X», «крупный маркетплейс»,
 *    «крупный FMCG-производитель».
 *  — численность бригады не публикуется ни числом, ни категорией
 *    («большая/компактная»). Профиль смены — описательно.
 *  — по умолчанию локация — «Московская область»; для отдельных кейсов
 *    допускается «Москва» (без уточнения адреса). Точная привязка — в КП.
 *  — `metricUp` — качественный KPI, который можно подтвердить
 *    по сменам/отчёту, без выдуманных процентов.
 *  — `durationMonths` отражает текущее сотрудничество (округлённо);
 *    все проекты действующие, не «бывшие».
 */
export const CASES: CaseStub[] = [
  {
    slug: "sklad-avtozapchastej-mo",
    title: "Бригада для приёмки и комплектации автозапчастей",
    industry: "Автозапчасти / оптовый склад",
    city: "Москва",
    durationMonths: 12,
    shiftProfile: "Погрузочно-разгрузочные работы, комплектовщики и кладовщики",
    metricUp: "Согласованный состав смен и порядок замены",
    summary:
      "Приёмка, комплектация и подготовка отгрузки автозапчастей для сервисных центров. Согласованный состав смен и порядок замены.",
    challenge:
      "На складе много разных артикулов; при сборке важно правильно отбирать товар. Ошибки отбора и нестабильная явка мешали выдерживать согласованное окно отгрузки в сервис. Собственный штат не всегда закрывал дневной график.",
    solution:
      "Закреплённая сменная команда: погрузочно-разгрузочные работы у ворот, комплектовщики и кладовщики на отборе. В первые недели усилили контроль ячеек, назначили менеджера по заменам и согласовали формат отчёта по явке для заказчика.",
    outcome:
      "Работаем по согласованному составу смен и порядку замены. Отбор и отгрузку ведём по регламенту объекта; вопросы по сменам решаем через закреплённого менеджера.",
    clientQuote: "",
    titleEn: "Auto parts warehouse for a major automotive brand",
    industryEn: "Auto parts / wholesale warehouse",
    metricUpEn: "Shifts covered without emergency callouts",
    summaryEn:
      "Wholesale auto parts warehouse for a major automotive brand in Moscow: inbound, picking and dispatch geared to service-bay delivery windows. Priority — steady attendance under the delivery slot, without breaching contract terms.",
    cityEn: "Moscow",
    challengeEn:
      "High SKU mix and small-item picking: any pick error or no-show breaks a service-bay slot. The in-house team could not hold day-shift dispatch windows.",
    solutionEn:
      "Dedicated shift crew shaped for auto parts: labourers at the dock, pickers and storekeepers on selection. Two-week double-check on bins, one replacement owner, shift attendance reports to the client ops centre.",
    outcomeEn:
      "Shifts close to plan, errors stay in the journal rather than triggering ‘send more people’ calls. Service-bay windows hold; procurement raises no shift complaints.",
    clientQuoteEn:
      "We needed shifts to run without yesterday's excuses — now we operate without same-day callouts.",
  },
  {
    slug: "mebelnyy-rc-pogruzochnye-raboty",
    title: "Постоянная команда для погрузки и сборки на мебельном складе",
    industry: "Мебель / распределительный центр",
    city: "Московская область",
    durationMonths: 36,
    shiftProfile: "Погрузочные работы и сборка",
    metricUp: "Работа команды по графику отгрузки",
    summary:
      "Погрузочные работы и согласованные операции сборки на мебельном складе. Закреплённый состав смен и порядок замены.",
    challenge:
      "Габаритная мебель и плотный график отгрузки в магазины и для онлайн-заказов. Простой машины у ворот сдвигает согласованное время отгрузки. При неявке работников склад комплектовал смену силами своего штата.",
    solution:
      "Закреплённый состав на погрузочно-разгрузочные работы и сборку по правилам безопасности заказчика. Бригадир на смене, порядок замены при невыходе. Согласовали работу команды с графиком погрузки и отгрузки у ворот.",
    outcome:
      "Команда работает по согласованному графику отгрузки. Замены и вопросы по смене проходят через закреплённого менеджера.",
    clientQuote: "",
    titleEn: "Regional DC for a well-known furniture brand",
    industryEn: "Furniture / regional DC",
    metricUpEn: "Outbound slots covered without no-show breakages",
    summaryEn:
      "Regional DC for a well-known furniture brand: loading/unloading, bulky handling and assembly tasks. Steady dock crew instead of last-minute contractor calls.",
    cityEn: "Moscow Oblast",
    challengeEn:
      "Bulky furniture and soft-pack outbound, tight retail and online slots. A missed truck at the gate means a lost slot and a dispute with logistics. Previously, no-shows were covered by the in-house team at the cost of picking pace.",
    solutionEn:
      "Dedicated L/U and assembly crew briefed for furniture and your safety rules, shift lead and replacement playbook, dock-slot sync.",
    outcomeEn:
      "The shift turns up without emergencies; outbound windows hold. No claims for bulky damage or lost retail slots.",
    clientQuoteEn:
      "Furniture cannot afford ‘a loader did not come’ — the retail slot will not move. With a predictable shift, morning stand-ups have nothing to argue about.",
  },
  {
    slug: "marketplace-multiprofil-mo",
    title: "Работа команды на двух участках с разными требованиями",
    industry: "Маркетплейс / несколько товарных зон",
    city: "Московская область",
    durationMonths: 24,
    shiftProfile: "Работники для согласованных операций с техникой и пищевым сырьём; менеджер по вопросам выходов и замен",
    metricUp: "Согласованная работа команды на двух участках",
    summary:
      "Работа с техникой и пищевым сырьём на двух участках. Участие другого подрядчика и распределение задач описаны в кейсе.",
    challenge:
      "Разные товарные группы — разные требования: техника требует аккуратной обработки и пересчёта, пищевое сырьё — соблюдения зон, чистоты и допусков. При вопросах по смене было неясно, к какому ответственному обращаться.",
    solution:
      "Собрали сменную команду с двумя профилями допусков: погрузочно-разгрузочные работы с техникой и работа с пищевым сырьём (контроль зон, СИЗ, чек-листы перед сменой). На соседнем участке работала команда другого подрядчика площадки — согласовали зоны, контакты и порядок передачи задач. Один менеджер по выходам и заменам на оба потока, единый порядок связи по смене.",
    outcome:
      "Команда работает на двух участках по согласованным правилам. Учёт смен и замены — через закреплённого менеджера.",
    clientQuote: "",
    titleEn: "A major marketplace site: electronics and FMCG raw materials in one shift",
    industryEn: "Marketplace / multi-storage",
    metricUpEn: "One guarantee framework across product groups — no contractor handoffs",
    summaryEn:
      "A major marketplace site run through an agent: electronics and FMCG raw materials (cocoa-based and soy for a large producer) on the same site. Both flows run on one playbook.",
    cityEn: "Moscow Oblast",
    challengeEn:
      "Different product groups, different rules: electronics need careful handling and counts; food raw materials need zone discipline, cleanliness and permits. With two separate contractors, escalations stalled between sides.",
    solutionEn:
      "Built one shift crew with two permit profiles: electronics L/U plus food handling (zone control, PPE, pre-shift checklists). One replacement owner across both flows, one incident playbook.",
    outcomeEn:
      "Both flows run without contractor handoffs. Food-zone audits pass without workforce findings; no claims on electronics integrity.",
    clientQuoteEn:
      "The same shift lead is responsible for the electronics box and the cocoa-raw pallet. No need to ‘call dispatch’ during an incident.",
  },
  {
    slug: "stroitelnye-materialy-sklad-obrabotka",
    title: "Стройматериалы и плитка на складе логистического оператора",
    industry: "Стройматериалы / 3PL-площадка",
    city: "Московская область",
    durationMonths: 18,
    shiftProfile: "Погрузочно-разгрузочные работы с плиткой, разнорабочие, бригадир на смене",
    metricUp: "Работа команды по графику приёмки и выдачи",
    summary:
      "Склад логистического оператора (3PL), профиль — отделочные материалы и плитка (тяжёлый и хрупкий груз одновременно). Приёмка, перекладка и выдача под проектные графики стройки.",
    challenge:
      "На складе работают с тяжёлым и хрупким грузом. Повреждения плитки приводят к расходам, поэтому важно аккуратно перемещать паллеты. В сезон выдача растёт, а задержки погрузки могут сдвинуть график работ заказчика.",
    solution:
      "Состав смены под профиль стройматериалов: погрузочно-разгрузочные работы с паллетами плитки, разнорабочие на перекладке, бригадир на объекте. На пиковые недели выдачи согласовали усиление команды.",
    outcome:
      "Приёмка и выдача идут по согласованному графику. Повреждения груза и вопросы по смене фиксируем и передаём заказчику по регламенту.",
    clientQuote: "",
    titleEn: "Building materials and tiles at a 3PL operator",
    industryEn: "Building materials / 3PL site",
    metricUpEn: "Pickup windows held without slippage",
    summaryEn:
      "A 3PL operator's site, profile: finishing materials and tiles (heavy and fragile at once). Inbound, replenishment and dispatch on contractor pickup schedules.",
    cityEn: "Moscow Oblast",
    challengeEn:
      "Heavy tile pallets need careful handling — breakage is a direct loss. Seasonal pickup spikes and tight windows: a stuck truck at the dock hits the client's construction schedule, not ‘the warehouse’.",
    solutionEn:
      "Shift mix tuned for the profile: L/U skilled in tile pallets, labourers on replenishment, on-site lead. Weekend surge reserve for peak pickup weeks.",
    outcomeEn:
      "Pickup windows hold; breakage stays within category norms, contractor claims are isolated and resolved by the playbook.",
    clientQuoteEn:
      "Construction does not wait — we need people on forks and at dispatch in the same shift. That combo finally works without emergencies.",
  },
  {
    slug: "sklady-tehniki-mo",
    title: "Соседние склады техники и оборудования: единый менеджер на оба объекта",
    industry: "Техника и оборудование / склад",
    city: "Московская область",
    durationMonths: 24,
    shiftProfile: "Два соседних склада; работники для замены между объектами по согласованному порядку",
    metricUp: "Замены по согласованному регламенту",
    summary:
      "Два соседних склада в Московской области, хранение и обработка техники и оборудования. Оба объекта ведёт один менеджер подрядчика — единый стандарт сервиса вне зависимости от объёма площадки.",
    challenge:
      "На объекте с небольшим штатом один невыход заметнее влияет на дневной объём работ. Нужен понятный порядок замены и один контакт по обоим складам.",
    solution:
      "Закреплённый состав на каждый из двух объектов и работники для замены между соседними складами — по согласованному порядку. Один менеджер ведёт оба объекта, единый порядок связи и замен.",
    outcome:
      "Работников для замены можно направлять между двумя соседними складами по согласованному порядку. Оба объекта работают по согласованному графику; вопросы по сменам решает закреплённый менеджер.",
    clientQuote: "",
    titleEn: "Adjacent equipment warehouses: one manager across both sites",
    industryEn: "Equipment / warehouse",
    metricUpEn: "Same-day replacements",
    summaryEn:
      "Two adjacent warehouses in Moscow Oblast handling equipment storage and processing. Both sites run under one contractor manager — same service standard regardless of site volume.",
    cityEn: "Moscow Oblast",
    challengeEn:
      "On a small-headcount site one no-show costs a noticeable share of daily capacity. Such sites usually fall off contractors' attention.",
    solutionEn:
      "Dedicated crew per site plus a shared reserve across the two (minutes of logistics between them). One manager runs both, one incident and replacement playbook.",
    outcomeEn:
      "Replacements close same-day thanks to the cross-site reserve. Both sites run on the agreed schedule without emergency ‘send anyone’ requests from the client.",
    clientQuoteEn:
      "Our sites used to be the last on every contractor's queue. Here we do not feel like a small client — there is a real manager and a real playbook.",
  },
  {
    slug: "tabachnyy-sklad-mo",
    title: "Склад табачной продукции: контролируемый пропускной режим",
    industry: "FMCG / табак",
    city: "Москва",
    durationMonths: 10,
    shiftProfile: "Допуски, пропускной режим; ответственный за инвентаризацию",
    metricUp: "Инвентаризации проходят по согласованным правилам объекта",
    summary:
      "Склад табачной продукции в Москве (акцизный товар): приём, складирование и отгрузка при усиленных требованиях к учёту, пропускному режиму и обращению с маркой.",
    challenge:
      "Акцизный товар: ошибка в учёте или нарушение пропускного режима требует отдельной проверки. Команда должна работать по правилам объекта с первых смен.",
    solution:
      "Подобрали состав бригады с регулярными инструктажами и допусками под требования объекта. Назначили ответственного за инвентаризацию, согласовали смены с пропускным режимом и графиком проверок маркировки.",
    outcome:
      "Инвентаризации и пропускной режим ведём по согласованным правилам объекта; отчётность по сменам передаём заказчику в установленном формате.",
    clientQuote: "",
    titleEn: "Tobacco warehouse: controlled access regime",
    industryEn: "FMCG / tobacco",
    metricUpEn: "Inventory closes with no crew variance",
    summaryEn:
      "Tobacco warehouse in Moscow (excise goods): inbound, storage and dispatch under enhanced accounting, access and stamp-handling rules.",
    cityEn: "Moscow",
    challengeEn:
      "Excise goods are not ‘just boxes’: any accounting error or access breach triggers claims and audits, not a polite rewrite. The labour contractor must live in this regime, not double-check it after the fact.",
    solutionEn:
      "Selected crew with regular briefings and site permits. A named owner for inventory cycles, shifts synced to the access regime and stamp-check schedule.",
    outcomeEn:
      "Inventory closes with no crew variance; access regime holds across inspections. The client closes accounting routines without emergency reserves.",
    clientQuoteEn:
      "Tobacco requires the discipline that a regular warehouse tends to ‘relax on Friday’. The vendor must get this from week one.",
  },
];

export function getCase(slug: string) {
  return CASES.find((c) => c.slug === slug);
}
