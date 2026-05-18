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
    staff: c.staff,
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
 * Правила:
 *  — заказчики и бренды не называются (NDA по умолчанию). Используем формулировки
 *    «известный бренд X», «крупный маркетплейс», «крупный FMCG-производитель».
 *  — численность бригады и города — реальные.
 *  — `metricUp` — качественный KPI, который можно подтвердить по сменам/отчёту,
 *    без выдуманных процентов.
 *  — `durationMonths` отражает текущее сотрудничество (округлённо); все проекты
 *    действующие, не «бывшие».
 */
export const CASES: CaseStub[] = [
  {
    slug: "sklad-avtozapchastej-krekshino",
    title: "Склад автозапчастей известного бренда в Крекшино: 50 человек в смене",
    industry: "Автозапчасти / оптовый склад",
    city: "Крекшино",
    staff: 50,
    durationMonths: 12,
    metricUp: "Закрытие смен 50 чел. без аварийных подмен",
    summary:
      "Оптовый склад автозапчастей известного автомобильного бренда: 50 человек в смене на приёмке, комплектации и отгрузке. Главное — стабильная явка под окно выдачи в сервис-центры, без срыва SLA.",
    challenge:
      "Высокая смешанность SKU и мелкая комплектация: ошибка отбора и нестабильная явка означают сорванный слот доставки в сервис. До нас собственный штат не вытягивал графики выдачи в дневном окне.",
    solution:
      "Собрали закреплённую бригаду 50 чел. под профиль автозапчастей: разнорабочие у ворот, комплектовщики и кладовщики на отборе. Двойной контроль ячейки в первые 2 недели, единый менеджер по заменам, отчёт по явке в операционный центр заказчика по сменам.",
    outcome:
      "Смены закрываются составом, ошибки отбора уходят в журнал, а не в звонок «пришлите ещё людей». Окно выдачи в сервис-центры держится; претензий по сменам у закупки заказчика нет.",
    clientQuote:
      "Нам было важно, чтобы 50 человек выходили в смену без «вчерашних» оправданий — теперь работаем без подмен в день в день.",
    titleEn: "Auto parts warehouse for a major brand in Krekshino: 50-person shifts",
    industryEn: "Auto parts / wholesale warehouse",
    metricUpEn: "50-person shifts covered without emergency callouts",
    summaryEn:
      "Wholesale auto parts warehouse for a major automotive brand: 50 people per shift on inbound, picking and dispatch. Priority — steady attendance to keep service-bay delivery windows.",
    cityEn: "Krekshino, Moscow Oblast",
    challengeEn:
      "High SKU mix and small-item picking: any pick error or no-show breaks a service-bay slot. The in-house team could not hold day-shift dispatch windows.",
    solutionEn:
      "Dedicated 50-person crew shaped for auto parts: labourers at the dock, pickers and storekeepers on selection. Two-week double-check on bins, one replacement owner, shift attendance reports to the client ops centre.",
    outcomeEn:
      "Shifts close to plan, errors stay in the journal rather than triggering ‘send more people’ calls. Service-bay windows hold; procurement raises no shift complaints.",
    clientQuoteEn:
      "We needed 50 people in the shift without yesterday's excuses — now we run without same-day callouts.",
  },
  {
    slug: "mebelnyy-rc-pogruzochnye-raboty",
    title: "Распределительный центр мебельного бренда в МО: 20 человек на ПРР и сборке",
    industry: "Мебель / распределительный центр",
    city: "Московская область",
    staff: 20,
    durationMonths: 12,
    metricUp: "Слоты отгрузки без срыва из-за неявки",
    summary:
      "РЦ известного мебельного бренда: 20 человек закрывают погрузочно-разгрузочные работы, такелаж КГТ и сборочные операции. Стабильные бригады у ворот вместо «звонка по подрядчикам в день срыва».",
    challenge:
      "Габаритная мебель и мягкая коробка, плотный график отгрузки в магазины и онлайн-заказы. Простой машины у ворот — потеря слота сети, спор с экспедицией. Раньше при неявке закрывали дыры собственным штатом и теряли темп комплектации.",
    solution:
      "Закрепили состав ПРР и сборки под мебельный профиль и стандарт безопасности заказчика, бригадир на смену, регламент замены при невыходе. Синхронизация с экспедицией и расписанием рамп.",
    outcome:
      "20 человек выходят на смену без авралов, окно отгрузки держится; рекламаций по повреждению габарита и потерянным слотам не было.",
    clientQuote:
      "У мебели нет права на «не вышел грузчик» — слот сети не подвинуть. С предсказуемой сменой стало нечего обсуждать в утренней планёрке.",
    titleEn: "Furniture brand DC in Moscow Oblast: 20-person crew on L/U and assembly",
    industryEn: "Furniture / regional DC",
    metricUpEn: "Outbound slots covered without no-show breakages",
    summaryEn:
      "Regional DC for a well-known furniture brand: a 20-person crew on loading/unloading, bulky handling and assembly tasks. Steady dock crews instead of last-minute contractor calls.",
    cityEn: "Moscow Oblast",
    challengeEn:
      "Bulky furniture and soft-pack outbound, tight retail and online slots. A missed truck at the gate means a lost slot and a dispute with logistics. Previously, no-shows were covered by the in-house team at the cost of picking pace.",
    solutionEn:
      "Dedicated L/U and assembly crew briefed for furniture and your safety rules, shift lead and replacement playbook, dock-slot sync.",
    outcomeEn:
      "20 people show up to the shift without emergencies; outbound windows hold. No claims for bulky damage or lost retail slots.",
    clientQuoteEn:
      "Furniture cannot afford ‘a loader did not come’ — the retail slot will not move. With a predictable shift, morning stand-ups have nothing to argue about.",
  },
  {
    slug: "marketplace-multiprofil-zhukovsky",
    title: "Склад крупного маркетплейса в Жуковском: техника и FMCG-сырьё в одной смене",
    industry: "Маркетплейс / multi-storage",
    city: "Жуковский",
    staff: 20,
    durationMonths: 12,
    metricUp: "Один SLA на разные товарные группы — без перекидывания между подрядчиками",
    summary:
      "Площадка крупного маркетплейса через подрядчика-агента: на одной территории — техника и FMCG-сырьё (шоколад/какао и соя для крупного производителя). 20 человек ведут оба потока по единому регламенту.",
    challenge:
      "Разные товарные группы — разные требования: техника требует аккуратной обработки и пересчёта, пищевое сырьё — соблюдения зон, чистоты и допусков. Без единого подрядчика смены ходили двумя командами с разными стандартами, эскалации зависали между сторонами.",
    solution:
      "Собрали единую бригаду 20 чел. с двумя профилями допусков: ПРР по технике + пищевые требования (контроль зон, СИЗ, чек-листы перед сменой). Один менеджер замен на оба потока, общий регламент инцидентов.",
    outcome:
      "Оба потока работают без перекидывания между подрядчиками. Аудит площадки по пищевой зоне проходит без замечаний к персоналу; претензий по сохранности техники нет.",
    clientQuote:
      "Главное — что один и тот же бригадир отвечает и за коробку с электроникой, и за поддон с какао-сырьём. Не надо «связываться через диспетчера» в инцидент.",
    titleEn: "Marketplace warehouse in Zhukovsky: electronics and FMCG raw materials in one shift",
    industryEn: "Marketplace / multi-storage",
    metricUpEn: "One SLA across product groups — no contractor handoffs",
    summaryEn:
      "A major marketplace site run through an agent: electronics and FMCG raw materials (cocoa-based and soy for a large producer) on the same site. A 20-person crew runs both flows on one playbook.",
    cityEn: "Zhukovsky, Moscow Oblast",
    challengeEn:
      "Different product groups, different rules: electronics need careful handling and counts; food raw materials need zone discipline, cleanliness and permits. With two separate contractors, escalations stalled between sides.",
    solutionEn:
      "Built one 20-person crew with two permit profiles: electronics L/U plus food handling (zone control, PPE, pre-shift checklists). One replacement owner across both flows, one incident playbook.",
    outcomeEn:
      "Both flows run without contractor handoffs. Food-zone audits pass without workforce findings; no claims on electronics integrity.",
    clientQuoteEn:
      "The same shift lead is responsible for the electronics box and the cocoa-raw pallet. No need to ‘call dispatch’ during an incident.",
  },
  {
    slug: "stroitelnye-materialy-sklad-obrabotka",
    title: "Стройматериалы и плитка на складе логистического оператора в МО",
    industry: "Стройматериалы / 3PL-площадка",
    city: "Московская область",
    staff: 20,
    durationMonths: 12,
    metricUp: "Выдача в проектные окна — без срывов",
    summary:
      "Склад логистического оператора в МО, профиль — отделочные материалы и плитка (тяжёлый и хрупкий груз одновременно). 20 человек ведут приёмку, перекладку и выдачу под проектные графики стройки.",
    challenge:
      "Тяжёлые паллеты с плиткой требуют аккуратной обработки — бой = прямой убыток. Сезонные всплески выдачи и узкие окна самовывоза: простой машины у рампы бьёт по графику стройки клиента, а не «по складу».",
    solution:
      "Состав смены под профиль стройматериалов: ПРР с навыком работы с плиточным паллетом, разнорабочие на перекладке, бригадир на объекте. Резерв людей на пиковые недели выдачи в выходные.",
    outcome:
      "Выдача держится в проектных окнах; бой остаётся в нормальных пределах для категории, претензии от стройподрядчиков заказчика — единичные и закрываются по регламенту.",
    clientQuote:
      "Стройка не ждёт — нам нужны люди и на вилках, и на выдаче в одну смену. Эта связка наконец работает без авралов.",
    titleEn: "Building materials and tiles at a 3PL operator in Moscow Oblast",
    industryEn: "Building materials / 3PL site",
    metricUpEn: "Pickup windows held without slippage",
    summaryEn:
      "A 3PL operator's site in Moscow Oblast, profile: finishing materials and tiles (heavy and fragile at once). 20 people handle inbound, replenishment and dispatch on contractor pickup schedules.",
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
    title: "Малые склады техники и оборудования в МО: компактные бригады Софьино + Бритово",
    industry: "Техника и оборудование / склад",
    city: "Софьино, Бритово",
    staff: 12,
    durationMonths: 10,
    metricUp: "На малом объекте — замены в день обращения",
    summary:
      "Два соседних склада в Московской области (Софьино и Бритово): хранение и обработка техники и оборудования. На каждом — 5–6 человек, оба объекта ведёт один менеджер подрядчика. Главное — что «маленький склад» получает такой же стандарт сервиса, как крупные точки.",
    challenge:
      "На бригаде из 5–6 человек цена «дыры в смене» выше, чем на 50-человечном объекте: невыход одного грузчика — это минус 17–20% дневной мощности. У внутренних подрядчиков на такие точки обычно либо нет ресурса, либо нет внимания.",
    solution:
      "Закреплённый компактный состав по 6 человек на каждый объект + общий резерв между Софьино и Бритово (5 минут логистики). Менеджер ведёт оба склада, один регламент инцидентов и замен.",
    outcome:
      "Замены закрываются в день обращения за счёт перекрёстного резерва. Оба объекта работают по согласованному графику без авральных просьб от заказчика «дайте кого-нибудь».",
    clientQuote:
      "Раньше на малый склад нас «забывали» в очереди подрядчиков. Здесь нет ощущения, что мы маленький клиент — есть конкретный менеджер и регламент.",
    titleEn: "Small equipment warehouses in MO: lean crews in Sofyino + Britovo",
    industryEn: "Equipment / warehouse",
    metricUpEn: "Same-day replacements on small sites",
    summaryEn:
      "Two adjacent warehouses in Moscow Oblast (Sofyino and Britovo) handling equipment storage and processing. Each site runs a 5–6 person crew under one shared contractor manager — same service standard as on large sites.",
    cityEn: "Sofyino, Britovo, Moscow Oblast",
    challengeEn:
      "On a 5–6 person crew, one no-show costs 17–20% of daily capacity — far worse than on a 50-person site. Such small sites usually fall off contractors' attention.",
    solutionEn:
      "Dedicated lean crew of 6 per site plus a shared reserve across Sofyino and Britovo (5 minutes apart). One manager runs both, one incident and replacement playbook.",
    outcomeEn:
      "Replacements close same-day thanks to the cross-site reserve. Both sites run on the agreed schedule without emergency ‘send anyone’ requests from the client.",
    clientQuoteEn:
      "Small sites used to be the last on every contractor's queue. Here we do not feel like a small client — there is a real manager and a real playbook.",
  },
  {
    slug: "tabachnyy-sklad-krekshino",
    title: "Склад табачной продукции в Крекшино: контролируемый пропускной режим",
    industry: "FMCG / табак",
    city: "Крекшино",
    staff: 10,
    durationMonths: 10,
    metricUp: "Инвентаризации без расхождений по бригаде",
    summary:
      "Склад табачной продукции (акцизный товар) в Крекшино: 10 человек ведут приём, складирование и отгрузку при усиленных требованиях к учёту, пропускному режиму и обращению с маркой.",
    challenge:
      "Акцизный товар — это не «обычная коробка»: ошибка в учёте или нарушение пропускного режима = претензии и аудит, а не разговор «давайте перепишем». Подрядчик по персоналу должен жить в этом режиме, а не «перепроверять, что подписал».",
    solution:
      "Подобрали бригаду 10 чел. с регулярными инструктажами и допусками под требования объекта. Закрепили владельца за инвентаризациями, синхронизировали смены с пропускным режимом и графиком проверок маркировки.",
    outcome:
      "Инвентаризации проходят без расхождений по бригаде; пропускной режим выдерживается без замечаний на проверках. Заказчик закрывает регламенты учёта без участия аварийного резерва.",
    clientQuote:
      "Табак требует ровно столько дисциплины, сколько обычный склад умеет «срезать на пятничной смене». Подрядчик должен это понимать с первой недели.",
    titleEn: "Tobacco warehouse in Krekshino: controlled access regime",
    industryEn: "FMCG / tobacco",
    metricUpEn: "Inventory closes with no crew variance",
    summaryEn:
      "Tobacco warehouse (excise goods) in Krekshino: a 10-person crew handles inbound, storage and dispatch under enhanced accounting, access and stamp-handling rules.",
    cityEn: "Krekshino, Moscow Oblast",
    challengeEn:
      "Excise goods are not ‘just boxes’: any accounting error or access breach triggers claims and audits, not a polite rewrite. The labour contractor must live in this regime, not double-check it after the fact.",
    solutionEn:
      "Selected 10-person crew with regular briefings and site permits. A named owner for inventory cycles, shifts synced to the access regime and stamp-check schedule.",
    outcomeEn:
      "Inventory closes with no crew variance; access regime holds across inspections. The client closes accounting routines without emergency reserves.",
    clientQuoteEn:
      "Tobacco requires the discipline that a regular warehouse tends to ‘relax on Friday’. The vendor must get this from week one.",
  },
];

export function getCase(slug: string) {
  return CASES.find((c) => c.slug === slug);
}
