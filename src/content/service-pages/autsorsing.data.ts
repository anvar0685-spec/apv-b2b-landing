import type { ServicePageBilingual } from "./types";

export const autsorsingPage: ServicePageBilingual = {
  slug: "autsorsing",
  ru: {
    h1: "Аутсорсинг персонала на склады Москвы и Московской области",
    subtitle:
      "Поставка смен под KPI явки: грузчики, комплектовщики, кладовщики, водители ПРТ, уборщики и разнорабочие. Ответственность подрядчика, прозрачные ориентиры ₽/час, документальный контур без переноса операционного шума в вашу кадровую службу.",
    intro: [
      "Мы работаем как подрядчик по складским сменам: явка, замены, отчётность и согласованный SLA — без модели аутстаффинга. Это снижает риск «серых зон» в закупке и упрощает контроль со стороны COO и директора склада.",
      "Ориентиры по ставкам (₽/час, дневная смена, Москва/МО): грузчики от 600, комплектовщики от 620, кладовщики от 650, водители ПРТ от 750, разнорабочие и уборщики от 600. Ночь, сутки и пиковые окна — с коэффициентами из коммерческого предложения; итоговая модель зависит от профиля, графика и локации.",
      "Калькулятор на сайте даёт быстрый оценочный фонд; детальный расчёт и договор фиксируют KPI по явке, времени реакции на замену, compliance и формат отчётности по сменам. Ниже — блоки «кому подходит», «как работает», включения, сравнение с альтернативами, FAQ и ссылки на профессии и программатику по городам.",
      "Тексты носят информационный характер и не заменяют индивидуальную юридическую консультацию. Объёмные обязательства, штрафные механики и сроки закрепляются в договоре, приложениях к SLA и внутренних регламентах качества.",
    ],
    segments: [
      {
        title: "Приёмка и inbound",
        text: "Разгрузка транспорта, паллетный учёт, контроль расхождений, скорость обработки входящего потока в пик маркетплейса или при сезонных поставках.",
      },
      {
        title: "Отбор и сборка",
        text: "FBS/FBM, мультитовар, контроль ошибок, стабильная явка на линиях при росте заказов и промо-кампаниях.",
      },
      {
        title: "Отгрузка и экспедиция",
        text: "Очереди транспорта, слоты, внутренняя логистика до ворот — без простоя линии и с прогнозируемым резервом смен.",
      },
      {
        title: "Вспомогательные роли",
        text: "Уборка зон, внутрискладская подсобка, разнорабочие на пиковые задачи — в том же контракте смен и с единым контактом подрядчика.",
      },
    ],
    howItWorks: [
      "Диагностика процесса: объём, график, профили, точки риска по явке и документам.",
      "Проектирование KPI и регламентов смен, согласование пилота и дорожной карты на 30–90 дней.",
      "Пилот на ограниченной зоне/сменах с еженедельным разбором метрик.",
      "Масштабирование и стабилизация: резерв, обучение, корректировка состава под фактический поток.",
      "Оптимизация: узкие места, инциденты смены, обратная связь от линейных руководителей.",
    ],
    includes: [
      { name: "Операционный менеджмент смен", included: true },
      { name: "KPI-отчётность по явке и заменам", included: true },
      { name: "Ротации и обучение первых смен", included: true },
      { name: "Инцидент-менеджмент и эскалации", included: true },
      { name: "Полный compliance-контур заказчика «под ключ» без участия подрядчика", included: false },
    ],
    comparison: [
      { label: "Фокус", us: "KPI процесса и смены", staff: "Внутренний найм", agency: "Подбор кандидатов" },
      { label: "Измеримость", us: "Еженедельные метрики в отчёте", staff: "Зависит от учёта", agency: "Ограничена договором" },
      { label: "Скорость изменений", us: "Гибкая модель пула", staff: "Долго", agency: "Средне" },
    ],
    faq: [
      {
        q: "Что именно входит в аутсорсинг смен?",
        a: "Поставка линейного персонала на склад: явка, замены, инструктажи, отчётность смены и согласованный контур ответственности подрядчика. Модель аутстаффинга на сайте не позиционируем как основной продукт.",
      },
      {
        q: "Какие KPI обычно закрепляют?",
        a: "Явка, время закрытия смены, ошибка отбора/сборки, простой ворот, инциденты — набор согласуется под тип DC, 3PL или производственного склада.",
      },
      {
        q: "Как стыкуется с WMS/TMS заказчика?",
        a: "На этапе КП фиксируем каналы данных и ответственных; интеграции по API — в дорожной карте после технического аудита.",
      },
      {
        q: "Можно ли начать с пилота?",
        a: "Да, пилот — предпочтительная точка входа: ограниченный объём, понятные метрики, затем масштабирование.",
      },
      {
        q: "Кто ведёт миграционный учёт?",
        a: "В стандартной модели подрядчика документальный контур на нашей стороне; условия уточняет юрист при подписании.",
      },
      {
        q: "Как получить КП с цифрами?",
        a: "Через калькулятор и мультистеп-форму заявки: данные попадают в CRM, менеджер готовит предложение с разложением ставок и SLA.",
      },
    ],
  },
  en: {
    h1: "Warehouse shift outsourcing in Moscow and the Moscow Oblast",
    subtitle:
      "Shift delivery with attendance KPIs: loaders, pickers, warehouse clerks, PRT drivers, cleaners and general labour. Contractor accountability, transparent hourly benchmarks in RUB, and a document trail without dumping HR noise on your team.",
    intro: [
      "We operate as a warehouse shift contractor: attendance, replacements, reporting and an agreed SLA — not as an outstaffing vendor. That reduces grey zones in procurement and makes it easier for the COO and site director to govern the loop.",
      "Hourly benchmarks (RUB/h, day shift, Moscow/MO): loaders from 600, pickers from 620, warehouse clerks from 650, PRT drivers from 750, general labour and cleaners from 600. Nights, 24/7 windows and peaks use coefficients from the commercial proposal; the final model depends on profile, schedule and location.",
      "The on-site calculator gives a quick payroll estimate; the detailed proposal and contract lock KPIs for attendance, replacement response time, compliance and per-shift reporting. Below: fit, process, inclusions, comparison with alternatives, FAQ and links to roles and city landings.",
      "Copy is informational and does not replace legal advice. Material obligations, penalties and timelines are set in the contract, SLA annexes and internal quality policies.",
    ],
    segments: [
      {
        title: "Inbound and receiving",
        text: "Truck unloading, pallet control, variance handling and inbound throughput during marketplace peaks or seasonal inbound spikes.",
      },
      {
        title: "Picking and packing",
        text: "FBS/FBM, multi-SKU, error control and stable line attendance when order intake grows or promos hit.",
      },
      {
        title: "Dispatch and yard",
        text: "Transport queues, time slots and internal moves to the gate — without line stoppage and with a forecastable shift pool.",
      },
      {
        title: "Support roles",
        text: "Zone cleaning, in-warehouse support tasks and surge general labour — same shift contract, single contractor contact.",
      },
    ],
    howItWorks: [
      "Process diagnostics: volume, schedule, profiles, risk points on attendance and paperwork.",
      "KPI and shift playbook design, pilot scope and a 30–90 day ramp plan.",
      "Pilot on a limited zone/shift pattern with weekly metric reviews.",
      "Scale and stabilise: reserves, training and roster tuning to real flow.",
      "Optimisation: bottlenecks, shift incidents and feedback from line leads.",
    ],
    includes: [
      { name: "Shift operations management", included: true },
      { name: "KPI reporting on attendance and replacements", included: true },
      { name: "Rotation and first-shift training", included: true },
      { name: "Incident management and escalation paths", included: true },
      { name: "Customer-only compliance with zero contractor involvement", included: false },
    ],
    comparison: [
      { label: "Focus", us: "Process and shift KPIs", staff: "Internal hiring", agency: "Candidate sourcing" },
      { label: "Measurability", us: "Weekly metrics in reports", staff: "Depends on internal tracking", agency: "Limited by contract" },
      { label: "Rate of change", us: "Flexible pool model", staff: "Slow", agency: "Medium" },
    ],
    faq: [
      {
        q: "What is included in shift outsourcing?",
        a: "Line staffing for the warehouse: attendance, replacements, briefings, shift reporting and an agreed contractor accountability loop. We do not position outstaffing as the core offer.",
      },
      {
        q: "Which KPIs are typically fixed?",
        a: "Attendance, shift close time, pick/pack error rate, gate idle time and incidents — the set is tuned for DC, 3PL or manufacturing warehouse profiles.",
      },
      {
        q: "How does this connect to the customer WMS/TMS?",
        a: "During the proposal we agree data channels and owners; API integrations land on a roadmap after a technical audit.",
      },
      {
        q: "Can we start with a pilot?",
        a: "Yes — a pilot is the preferred entry: limited volume, clear metrics, then scale.",
      },
      {
        q: "Who runs migration compliance?",
        a: "In the standard contractor model the document loop sits with us; legal finalises wording at signature.",
      },
      {
        q: "How do we get a proposal with numbers?",
        a: "Use the calculator and the multi-step request form: data goes to the CRM and the manager returns a proposal with rate breakdown and SLA.",
      },
    ],
  },
};
