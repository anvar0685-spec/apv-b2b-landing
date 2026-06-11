export type CaseStub = {
  slug: string;
  title: string;
  industry: string;
  city: string;
  durationMonths: number;
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
    title: "Склад автозапчастей известного автомобильного бренда",
    industry: "Автозапчасти / оптовый склад",
    city: "Москва",
    durationMonths: 12,
    metricUp: "Закрытие смен без аварийных подмен",
    summary:
      "Оптовый склад автозапчастей известного автомобильного бренда в Москве: приёмка, комплектация и отгрузка под окно выдачи в сервис-центры. Главное — стабильная явка под слот доставки, без срыва по договору.",
    challenge:
      "Высокая смешанность SKU и мелкая комплектация: ошибка отбора и нестабильная явка означают сорванный слот доставки в сервис. До нас собственный штат не вытягивал графики выдачи в дневном окне.",
    solution:
      "Закреплённая сменная бригада под профиль автозапчастей: разнорабочие у ворот, комплектовщики и кладовщики на отборе. Двойной контроль ячейки в первые две недели, один менеджер по заменам, отчёт по явке в операционный центр заказчика по сменам.",
    outcome:
      "Смены закрываются составом, ошибки отбора уходят в журнал, а не в звонок «пришлите ещё людей». Окно выдачи в сервис-центры держится; претензий по сменам у закупки заказчика нет.",
    clientQuote:
      "Нам было важно, чтобы смена выходила без «вчерашних» оправданий — теперь работаем без аварийных подмен в день в день.",
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
    title: "Распределительный центр известного мебельного бренда",
    industry: "Мебель / распределительный центр",
    city: "Московская область",
    durationMonths: 36,
    metricUp: "Слоты отгрузки без срыва из-за неявки",
    summary:
      "РЦ известного мебельного бренда: погрузочно-разгрузочные работы, такелаж КГТ и сборочные операции. Стабильная бригада у ворот вместо «звонка по подрядчикам в день срыва».",
    challenge:
      "Габаритная мебель и мягкая коробка, плотный график отгрузки в магазины и онлайн-заказы. Простой машины у ворот — потеря слота сети, спор с экспедицией. Раньше при неявке закрывали дыры собственным штатом и теряли темп комплектации.",
    solution:
      "Закреплённый состав на ПРР и сборке под мебельный профиль и стандарт безопасности заказчика, бригадир на смену, регламент замены при невыходе. Синхронизация с экспедицией и расписанием рамп.",
    outcome:
      "Смена выходит без авралов, окно отгрузки держится; рекламаций по повреждению габарита и потерянным слотам не было.",
    clientQuote:
      "У мебели нет права на «не вышел грузчик» — слот сети не подвинуть. С предсказуемой сменой стало нечего обсуждать в утренней планёрке.",
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
    title: "Площадка крупного маркетплейса: техника и FMCG-сырьё в одной смене",
    industry: "Маркетплейс / multi-storage",
    city: "Московская область",
    durationMonths: 24,
    metricUp: "Один регламент на разные товарные группы — без перекидывания между подрядчиками",
    summary:
      "Площадка крупного маркетплейса через подрядчика-агента: на одной территории — техника и FMCG-сырьё (шоколад/какао и соя для крупного производителя). Оба потока ведутся по единому регламенту.",
    challenge:
      "Разные товарные группы — разные требования: техника требует аккуратной обработки и пересчёта, пищевое сырьё — соблюдения зон, чистоты и допусков. Без единого подрядчика смены ходили двумя командами с разными стандартами, эскалации зависали между сторонами.",
    solution:
      "Собрали единую сменную бригаду с двумя профилями допусков: ПРР по технике + пищевые требования (контроль зон, СИЗ, чек-листы перед сменой). Один менеджер замен на оба потока, общий регламент инцидентов.",
    outcome:
      "Оба потока работают без перекидывания между подрядчиками. Аудит площадки по пищевой зоне проходит без замечаний к персоналу; претензий по сохранности техники нет.",
    clientQuote:
      "Главное — что один и тот же бригадир отвечает и за коробку с электроникой, и за поддон с какао-сырьём. Не надо «связываться через диспетчера» в инцидент.",
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
    metricUp: "Выдача в проектные окна — без срывов",
    summary:
      "Склад логистического оператора (3PL), профиль — отделочные материалы и плитка (тяжёлый и хрупкий груз одновременно). Приёмка, перекладка и выдача под проектные графики стройки.",
    challenge:
      "Тяжёлые паллеты с плиткой требуют аккуратной обработки — бой = прямой убыток. Сезонные всплески выдачи и узкие окна самовывоза: простой машины у рампы бьёт по графику стройки клиента, а не «по складу».",
    solution:
      "Состав смены под профиль стройматериалов: ПРР с навыком работы с плиточным паллетом, разнорабочие на перекладке, бригадир на объекте. Резерв на пиковые недели выдачи в выходные.",
    outcome:
      "Выдача держится в проектных окнах; бой остаётся в нормальных пределах для категории, претензии от стройподрядчиков заказчика — единичные и закрываются по регламенту.",
    clientQuote:
      "Стройка не ждёт — нам нужны люди и на вилках, и на выдаче в одну смену. Эта связка наконец работает без авралов.",
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
    metricUp: "Замены закрываются в день обращения",
    summary:
      "Два соседних склада в Московской области, хранение и обработка техники и оборудования. Оба объекта ведёт один менеджер подрядчика — единый стандарт сервиса вне зависимости от объёма площадки.",
    challenge:
      "На объекте с небольшим штатом цена «дыры в смене» выше: один невыход бьёт по дневной мощности заметнее. У внутренних подрядчиков на такие объекты обычно либо нет ресурса, либо нет внимания.",
    solution:
      "Закреплённый состав на каждый из двух объектов + перекрёстный резерв (минуты логистики между складами). Менеджер ведёт оба объекта, один регламент инцидентов и замен.",
    outcome:
      "Замены закрываются в день обращения за счёт перекрёстного резерва. Оба объекта работают по согласованному графику без авральных просьб от заказчика «дайте кого-нибудь».",
    clientQuote:
      "Раньше на наши объекты нас «забывали» в очереди подрядчиков. Здесь нет ощущения, что мы маленький клиент — есть конкретный менеджер и регламент.",
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
    metricUp: "Инвентаризации без расхождений по бригаде",
    summary:
      "Склад табачной продукции в Москве (акцизный товар): приём, складирование и отгрузка при усиленных требованиях к учёту, пропускному режиму и обращению с маркой.",
    challenge:
      "Акцизный товар — это не «обычная коробка»: ошибка в учёте или нарушение пропускного режима = претензии и аудит, а не разговор «давайте перепишем». Подрядчик по персоналу должен жить в этом режиме, а не «перепроверять, что подписал».",
    solution:
      "Подобрали состав бригады с регулярными инструктажами и допусками под требования объекта. Закрепили владельца за инвентаризациями, синхронизировали смены с пропускным режимом и графиком проверок маркировки.",
    outcome:
      "Инвентаризации проходят без расхождений по бригаде; пропускной режим выдерживается без замечаний на проверках. Заказчик закрывает регламенты учёта без участия аварийного резерва.",
    clientQuote:
      "Табак требует ровно столько дисциплины, сколько обычный склад умеет «срезать на пятничной смене». Подрядчик должен это понимать с первой недели.",
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
