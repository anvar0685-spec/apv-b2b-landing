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

export const CASES: CaseStub[] = [
  {
    slug: "mebelnyy-rc-pogruzochnye-raboty",
    title: "Мебельный РЦ известного бренда: ПРР и разнорабочие «под ключ»",
    industry: "Мебель / распределительный центр",
    city: "Софьино",
    staff: 48,
    durationMonths: 11,
    metricUp: "−32% простоя у рампы",
    summary:
      "Региональный центр крупного мебельного ритейла: аутсорсинг погрузочно-разгрузочных работ и такелажа КГТ — стабильные бригады у ворот вместо разрозненных подрядчиков «на звонок».",
    challenge:
      "Пики приёмки фуры и отгрузки мягкой коробки; простои у рампы и очередь машин, когда бригады не укладываются в окно.",
    solution:
      "Закрепили состав ПРР под профиль мебели и ваш стандарт безопасности, бригадира на смену и регламент замен; синхронизация с экспедицией и слотами.",
    outcome:
      "Простой транспорта у ворот сократился примерно на треть; слоты отгрузки перестали «плавить» из‑за неявки разнорабочих.",
    clientQuote:
      "Нужны были предсказуемые люди у трапа и внутри фуры — без этого слот маркетплейса не закрыть.",
    titleEn: "Furniture DC for a major brand: outsourced loading & unloading",
    industryEn: "Furniture / regional DC",
    metricUpEn: "−32% dock idle time",
    summaryEn:
      "Regional hub for a large furniture retailer: outsourced loading/unloading and bulky handling — steady dock crews instead of ad-hoc labour.",
    cityEn: "Sofyino, Moscow Oblast",
    challengeEn:
      "Inbound peaks and outbound soft-pack loads; ramp idle time and truck queues when crews missed the slot.",
    solutionEn:
      "Dedicated L/U crews briefed for furniture handling and your safety rules, shift lead and replacement playbook aligned with dock slots.",
    outcomeEn:
      "Roughly one-third less transport idle at the gate; outbound slots stopped slipping because labour showed up.",
    clientQuoteEn:
      "We needed predictable people at the ramp and inside the trailer — otherwise marketplace slots do not close.",
  },
  {
    slug: "sklad-avtozapchastej-krekshino",
    title: "Склад автозапчастей: комплектация и контроль явки в пике",
    industry: "Автозапчасти / склад",
    city: "Крекшино",
    staff: 72,
    durationMonths: 8,
    metricUp: "+19% строк комплектации за смену",
    summary:
      "Оптовый склад автозапчастей с высокой смешанностью SKU: выровняли явку на отборе и отгрузке, чтобы не «есть» окно доставки в сервисы.",
    challenge:
      "Много мелких позиций, ошибки отбора и нестабильная явка в дневном окне — сервисы получали заказы с задержкой.",
    solution:
      "Пул комплектовщиков и грузчиков под профиль автозапчастей, двойной контроль по ячейкам на старте, единый контакт по заменам.",
    outcome:
      "Темп комплектации за смену вырос примерно на пятую часть при той же численности; возвраты по ошибке отбора снизились.",
    clientQuote:
      "Для нас главное — выдать заказ в слот курьера; с явкой по сменам перестали воевать.",
    titleEn: "Auto parts warehouse: picking throughput and attendance",
    industryEn: "Auto parts / warehouse",
    metricUpEn: "+19% pick lines per shift",
    summaryEn:
      "Wholesale auto parts with mixed SKU depth: steadier attendance on picking and dispatch so service bays keep their delivery windows.",
    cityEn: "Krekshino, Moscow Oblast",
    challengeEn:
      "Small-item complexity, pick errors and uneven day-shift attendance — downstream bays saw delays.",
    solutionEn:
      "Picker and loader pool tuned to parts flows, early-stage bin discipline and one replacement owner.",
    outcomeEn:
      "Roughly a fifth more pick lines per shift at the same headcount; mis-picks dropped.",
    clientQuoteEn:
      "We need the parcel in the courier slot — we stopped fighting attendance every morning.",
  },
  {
    slug: "stroitelnye-materialy-sklad-obrabotka",
    title: "Стройматериалы: хранение, перекладка и отгрузка в проектные окна",
    industry: "Стройматериалы / склад",
    city: "Софьино",
    staff: 60,
    durationMonths: 14,
    metricUp: "96%+ закрытие смен по графику",
    summary:
      "Склад хранения и обработки отделочных и общестроительных материалов: аутсорсинг ПРР, перекладки и комплектации под выдачу на объект.",
    challenge:
      "Тяжёлые паллеты, сезонные всплески и жёсткие окна самовывоза; простои фуры били по стройграфику клиентов.",
    solution:
      "Смены ПРР и разнорабочих под вашу разметку зон, бригадир на объекте, резерв на пик выдачи в выходные.",
    outcome:
      "Закрытие смен по графику держится выше 95%; очередь самовывоза перестала раздуваться из‑за неявки.",
    clientQuote:
      "Стройка не ждёт — нам нужны люди на вилках и на выдаче одновременно.",
    titleEn: "Building materials: storage, replenishment and dispatch windows",
    industryEn: "Construction supplies / warehouse",
    metricUpEn: "96%+ shifts covered",
    summaryEn:
      "Finishing and bulk materials warehouse: outsourced loading, replenishment and picking for contractor pickup slots.",
    cityEn: "Sofyino, Moscow Oblast",
    challengeEn:
      "Heavy pallets, seasonal spikes and tight pickup windows; truck idle time hit downstream construction schedules.",
    solutionEn:
      "L/U and labour shifts mapped to your zoning, on-site lead and weekend surge reserve.",
    outcomeEn:
      "Shift coverage stayed above 95%; contractor queues stopped ballooning from no-shows.",
    clientQuoteEn:
      "Construction does not wait — we need fork drivers and dispatch staff at the same time.",
  },
  {
    slug: "marketplace-sklad-moskva",
    title: "Склад маркетплейса: стабильные смены в пике",
    industry: "Логистика / маркетплейс",
    city: "Москва",
    staff: 120,
    durationMonths: 9,
    metricUp: "+34% выработки за смену",
    summary:
      "Пик сезона на складе маркетплейса: выровняли явку, сократили простои комплектации и закрепили понятный SLA по заменам.",
    challenge:
      "Пиковые волны заказов и нестабильная явка били по темпу отбора; внутренний штат не успевал закрывать ночные смены.",
    solution:
      "Собрали пул смен с единым стандартом ввода на объект, регламентом замен и ежедневной отчётностью по явке для операционного центра.",
    outcome:
      "Выработка за смену выросла примерно на треть за счёт предсказуемой явки; вопросы по документам ушли в управляемый порядок с ответственными и сроками.",
    clientQuote:
      "Наконец-то один SLA на явку и замены — без «перекидывания» между подрядчиками в пик сезона.",
    titleEn: "Marketplace DC: stable shifts in peak season",
    industryEn: "Logistics / marketplace",
    metricUpEn: "+34% shift throughput",
    summaryEn:
      "Peak-season warehouse loop: steadier attendance, fewer picking gaps and a clear replacement SLA.",
    cityEn: "Moscow",
    challengeEn:
      "Peak order waves and unstable attendance broke shift throughput; the core team could not cover night shifts fast enough.",
    solutionEn:
      "Built a shift pool with one onboarding standard, replacement rules and daily attendance reporting for the operations centre.",
    outcomeEn:
      "Shift throughput rose by about a third through predictable attendance; document incidents moved into a controlled loop.",
    clientQuoteEn:
      "Finally one SLA for attendance and replacements — without juggling contractors in peak season.",
  },
  {
    slug: "proizvodstvo-mo",
    title: "Производственный хаб МО: склад отгрузки и комплектация",
    industry: "Склад / отгрузка",
    city: "Подольск",
    staff: 65,
    durationMonths: 6,
    metricUp: "−18% к стоимости смены",
    summary:
      "Стабилизировали смены на складе готовой продукции и отгрузки при производственном хабе: выровняли явку у рампы и стоимость смены без простоя экспедиции.",
    challenge:
      "Высокая текучка и разрыв между планом складских смен и фактическим выходом давили на окна отгрузки и график доставок.",
    solution:
      "Выровняли цепочку подбора и выхода на рампу под складской профиль, усилили инструктаж первых смен и закрепили менторов на зоне комплектации.",
    outcome:
      "Себестоимость смены снизилась на 18% при сохранении качества; замены стали планируемыми для логистики, а не «пожарными».",
    clientQuote:
      "Нам нужен был предсказуемый склад отгрузки — без этого производство простаивает в ожидании машин.",
    titleEn: "Manufacturing hub MO: outbound warehouse and picking",
    industryEn: "Warehouse / outbound",
    metricUpEn: "−18% cost per shift",
    summaryEn:
      "Stabilised shifts at the finished-goods and outbound warehouse serving a hub: steadier dock attendance and cost per shift.",
    cityEn: "Podolsk",
    challengeEn:
      "High churn and a gap between planned warehouse shifts and actual attendance squeezed shipping windows and outbound timing.",
    solutionEn:
      "Tightened the funnel for dock-facing warehouse roles, strengthened first-shift briefings and assigned mentors in picking.",
    outcomeEn:
      "Cost per shift fell by 18% with stable quality; replacements became planned for logistics, not emergency fire-fighting.",
    clientQuoteEn:
      "We needed a predictable outbound warehouse — otherwise production waits on trucks.",
  },
  {
    slug: "farma-sklad-himki",
    title: "Фарм-склад: серийность, зоны хранения и дисциплина смен",
    industry: "Фарма / склад",
    city: "Химки",
    staff: 40,
    durationMonths: 12,
    metricUp: "100% соблюдение зон хранения и серий в аудите",
    summary:
      "Усилили соблюдение регламентов хранения и серийности при высокой сменности линейки — без перекладывания операционного риска на службу качества заказчика.",
    challenge:
      "Строгие требования к зонам и сериям; любая ошибка перекладки или отбора — стоп-фактор для отгрузки и проверок.",
    solution:
      "Выделенный пул под фарм-профиль, усиленный инструктаж первых смен, контрольные точки с бригадиром и понятная эскалация замен.",
    outcome:
      "Внешний аудит по складским процессам без критических замечаний по персоналу на линии; серии и зоны хранения соблюдались по журналам.",
    clientQuote:
      "Нам важна повторяемость смены: одинаковый стандарт у стеллажа и у ворот.",
    titleEn: "Pharma warehouse: serialisation, zones and shift discipline",
    industryEn: "Pharma / warehouse",
    metricUpEn: "100% zone & serial compliance in audit",
    summaryEn:
      "Stricter discipline on storage zones and serial tracking with shift-heavy staffing — operational risk stays with the contractor playbook.",
    cityEn: "Khimki",
    challengeEn:
      "Strict zone and serial rules; any mis-pick or mis-placement stops outbound and inspections.",
    solutionEn:
      "Dedicated pharma-skilled pool, reinforced first-shift briefings and named checkpoints with the shift lead.",
    outcomeEn:
      "External audit raised no critical workforce findings on the line; journals showed zones and serials respected.",
    clientQuoteEn:
      "We need repeatable shifts — the same standard at the rack and at the gate.",
  },
  {
    slug: "regionalnyj-rc-pik",
    title: "Региональный РЦ: пик отбора без «дыр» в сменах",
    industry: "Ритейл / РЦ",
    city: "Москва",
    staff: 200,
    durationMonths: 4,
    metricUp: "95%+ закрытие смен",
    summary:
      "Закрыли сезонный пик на распределительном центре: смены у комплектации и экспедиции держали темп отгрузок без простоя линий.",
    challenge:
      "Сезонный всплеск заказов и дефицит линейки в ключевых сменах отбора и погрузки.",
    solution:
      "Собрали пул под профиль комплектации и погрузки, ускорили ввод людей на линию и синхронизировали замены с операционным центром сети.",
    outcome:
      "Закрытие смен держалось выше 95%; очередь заказов не раздувала простой отбора у стеллажей.",
    clientQuote:
      "Нам нужны были люди на пик отбора и у ворот — без этого РЦ не вывозит пик.",
    titleEn: "Regional DC: peak picking without shift gaps",
    industryEn: "Retail / DC",
    metricUpEn: "95%+ shifts covered",
    summaryEn:
      "Closed the seasonal spike at a regional DC: picking and dock shifts kept outbound pace without line idle time.",
    cityEn: "Moscow",
    challengeEn:
      "Seasonal order spike and a shortage of staff on critical picking and loading shifts.",
    solutionEn:
      "Built a pool for picking and loading profiles, sped up onboarding and aligned replacements with the network ops centre.",
    outcomeEn:
      "Shift coverage stayed above 95%; the order queue did not idle picking at the racks.",
    clientQuoteEn:
      "We needed people in the pick slot and at the gate — otherwise the DC cannot survive the peak.",
  },
  {
    slug: "sklad-rasshirenie-mo",
    title: "Склад: расширение зон под график запуска",
    industry: "Логистика / склад",
    city: "Одинцово",
    staff: 55,
    durationMonths: 5,
    metricUp: "Этапы ввода без срыва смен",
    summary:
      "Вывели смены под календарь открытия новых зон хранения: пропускной режим, инструктажи и дисциплина явки на складе.",
    challenge:
      "Сжатые сроки ввода мезонина и риск срыва графика из-за неявки и неготовности персонала к доступам и СИЗ.",
    solution:
      "Согласовали календарь смен, усилили предсменные инструктажи и закрепили ответственных за замены на объекте.",
    outcome:
      "Ключевые этапы ввода зон закрыты в срок; замены не останавливали приёмку и отгрузку.",
    clientQuote:
      "Подрядчик держал календарь выхода людей так же жёстко, как график открытия зон — для нас это редкость.",
    titleEn: "Warehouse: zone ramp-up on a launch schedule",
    industryEn: "Logistics / warehouse",
    metricUpEn: "Ramp milestones met",
    summaryEn:
      "Shift plan for opening new storage zones: access rules, briefings and disciplined attendance on site.",
    cityEn: "Odintsovo",
    challengeEn:
      "Tight mezzanine go-live dates and the risk of slippage from no-shows and crews not ready for access rules and PPE.",
    solutionEn:
      "Aligned the shift calendar, strengthened pre-shift briefings and named replacement owners on site.",
    outcomeEn:
      "Major zone go-live milestones closed on time; replacements did not stop inbound and outbound.",
    clientQuoteEn:
      "The vendor held the people calendar as tightly as the zone opening plan — that is rare for us.",
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
      "Пересобрали пул смен, ввели прозрачный регламент замен и еженедельный разбор отклонений с COO.",
    outcome:
      "Overtime снизился на 12% при том же объёме отгрузок; явка на ночные смены стабилизировалась.",
    clientQuote:
      "Мы перестали «покупать» пик сезона бесконечными переработками — смены стали закрываться ровнее.",
    titleEn: "Retail: distribution centre",
    industryEn: "Retail",
    metricUpEn: "−12% overtime",
    summaryEn:
      "Rebalanced shift patterns at the DC: less overtime and steadier night-shift coverage.",
    cityEn: "Balashikha",
    challengeEn:
      "Rising overtime on night shifts and uneven line loading during outbound peaks.",
    solutionEn:
      "Rebuilt the shift pool, introduced a transparent replacement playbook and weekly variance reviews with the COO.",
    outcomeEn:
      "Overtime fell 12% at the same outbound volume; night-shift attendance stabilised.",
    clientQuoteEn:
      "We stopped \"buying\" peak season with endless overtime — shifts now close more evenly.",
  },
  {
    slug: "3pl-cross-dock-mo",
    title: "3PL: кросс-док и сортировка без «дыр» в сменах",
    industry: "3PL / кросс-док",
    city: "Домодедово",
    staff: 75,
    durationMonths: 7,
    metricUp: "−21% время простоя ворот",
    summary:
      "Выровняли выход бригад под график у ворот и пик кросс-дока: смены закрывались, очередь фур не раздувала простой внутри.",
    challenge:
      "Несогласованность графика у ворот и явки ломала кросс-док: простои ворот перетекали в простой линии и рост переработок у постоянного штата.",
    solution:
      "Ввели единый календарь смен с буфером на замену, синхронизацию с диспетчером площадки и еженедельный разбор отклонений по 15-минутным окнам.",
    outcome:
      "Время простоя ворот снизилось примерно на пятую; переработки у ядра не выросли при том же объёме кросс-дока.",
    clientQuote:
      "Нам нужен был не «ещё людей», а люди в согласованное окно у ворот — иначе ворота всегда узкое место.",
    titleEn: "3PL: cross-dock without gate idle gaps",
    industryEn: "3PL / cross-dock",
    metricUpEn: "≈−21% gate idle time",
    summaryEn:
      "Aligned crew starts to gate slots and cross-dock peaks so shifts closed and the truck queue did not idle the line.",
    cityEn: "Domodedovo",
    challengeEn:
      "Misaligned slots and attendance broke cross-dock: gate idle time spilled into line idle and core-team overtime.",
    solutionEn:
      "Introduced one shift calendar with a replacement buffer, sync with the yard dispatcher and weekly variance reviews in 15-minute windows.",
    outcomeEn:
      "Gate idle time fell by about a fifth; core overtime did not rise at the same cross-dock volume.",
    clientQuoteEn:
      "We did not need 'more people' — we needed people in the slot, or the gate would always be the bottleneck.",
  },
  {
    slug: "kholod-konturnyy-sklad-mytischi",
    title: "Холод: зона +2…+5 °C без «провалов» по явке",
    industry: "Продуктовая логистика / холод",
    city: "Мытищи",
    staff: 48,
    durationMonths: 10,
    metricUp: "0 срывов смены по температурным зонам",
    summary:
      "Выровняли выход смен под график открытия камер и требования HACCP: буфер замен и маршрут до зоны без пересечения с сухим складом.",
    challenge:
      "Холод — не «тот же склад, но в жилетке»: срыв смены = риск цепочки, а не только позиция в графике.",
    solution:
      "Согласовали график выхода на смену, дубли по критичным сменам и сценарий, если сотрудник не прошёл чек-лист допуска к зоне.",
    outcome:
      "Смены в температурных зонах закрывались по плану; инциденты фиксировались в регламенте, а не в ночных чатах.",
    clientQuote:
      "Нам нужен был поставщик, который говорит на языке HACCP, а не только ‘люди в смену’.",
    titleEn: "Cold chain: +2…+5 °C without shift gaps",
    industryEn: "Grocery logistics / cold chain",
    metricUpEn: "0 temperature-zone shift failures",
    summaryEn:
      "Aligned shift starts with chamber open times and HACCP incidents: replacement buffer and path to zone without crossing dry flow.",
    cityEn: "Mytishchi",
    challengeEn:
      "Cold is not “the same DC in a jacket” — a missed shift is a chain risk, not just a blank cell in a roster.",
    solutionEn:
      "Aligned start slots, critical-shift doubles, and a playbook if someone fails the zone access checklist.",
    outcomeEn:
      "Temperature-zone shifts closed on plan; incidents sat in the playbook, not in night-time chat threads.",
    clientQuoteEn:
      "We needed a vendor that speaks HACCP, not only “people for the shift”.",
  },
  {
    slug: "ecom-fulfilment-ramenskoe",
    title: "E-com фулфилмент: пик 11.11 без раздувания ядра",
    industry: "E-commerce / fulfilment",
    city: "Раменское",
    staff: 110,
    durationMonths: 5,
    metricUp: "+27% отгрузочных строк при том же ядре",
    summary:
      "Набор и ввод под короткое окно пика: один контакт подрядчика, замены по регламенту, без конфликта с постоянным штатом.",
    challenge:
      "Годовой промо-пик: нужно быстро закрыть объём без потери качества комплектации и без бесконечного overtime ядра.",
    solution:
      "Пул смен под профиль FBS, приоритет индуктивных линий в графике отгрузки и еженедельный разбор отклонений до конца пика.",
    outcome:
      "Строк отгрузки стало больше без пропорционального роста постоянного штата; после пика — контролируемое сжатие численности.",
    clientQuote:
      "Мы не хотели ‘нанять всех и потом резать’ — нужен был управляемый пул под окно кампании.",
    titleEn: "E-com fulfilment: 11.11 peak without bloating core staff",
    industryEn: "E-commerce / fulfilment",
    metricUpEn: "+27% outbound lines at same core size",
    summaryEn:
      "Hiring and onboarding for a tight peak window: one vendor contact, replacement rules, no collision with the core team.",
    challengeEn:
      "Annual promo peak: surge volume fast without picking-quality drift or endless core-team overtime.",
    solutionEn:
      "Shift pool tuned to FBS profile, priority slots on induct lines, weekly variance reviews until the peak ends.",
    outcomeEn:
      "Outbound lines rose without a proportional core headcount spike; after peak, the contour tightened in a controlled way.",
    clientQuoteEn:
      "We did not want ‘hire everyone then cut’ — we needed a managed pool for the campaign window.",
  },
];

export function getCase(slug: string) {
  return CASES.find((c) => c.slug === slug);
}
