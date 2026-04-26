import type { ServicePageBilingual } from "./types";

export const recruitingPage: ServicePageBilingual = {
  slug: "podbor-personala",
  ru: {
    h1: "Подбор персонала под ключ для линейных ролей",
    subtitle:
      "От профиля до выхода на смену: воронка, скоринг, проверки и передача в операционный контур аутсорсинга или проектный найм.",
    intro: [
      "Подбор для склада отличается от «классического агентства»: важны скорость выхода на смену, понимание профиля линии и готовность передать кандидата в контур с инструктажами и KPI.",
      "Мы проектируем воронку под профили грузчиков, комплектовщиков, операторов погрузчика и смежных ролей; дальше — либо поставка в аутсорсинг смен, либо передача по согласованной модели.",
      "Стоимость и SLA подбора фиксируются в КП; на странице — обзорный текст без индивидуальных обещаний.",
    ],
    segments: [
      { title: "Складские роли", text: "Грузчики, комплектовщики, операторы погрузчика, кладовщики." },
      { title: "Производство", text: "Сборка, упаковка, вспомогательные операции на линии." },
      { title: "Сезонные кампании", text: "Массовый найм под пик без потери качества скрининга." },
      { title: "Закрытие текучки", text: "Быстрый закрытие дефицита с понятным SLA по этапам воронки." },
    ],
    howItWorks: [
      "Профиль, воронка и источники кандидатов.",
      "Скоринг, проверки и инструктажи.",
      "Выход на объект и первые смены с наставником.",
      "Передача в аутсорсинг смен или согласованный контур заказчика.",
    ],
    includes: [
      { name: "Поиск и первичный контакт", included: true },
      { name: "Ассессмент базовых навыков", included: true },
      { name: "Сопровождение первых смен", included: true },
      { name: "Executive search топ-менеджмента", included: false },
    ],
    comparison: [
      { label: "Скорость закрытия", us: "Пакетно под профиль", staff: "Зависит от HR", agency: "Высокая без операций" },
      { label: "Контроль качества", us: "Единый стандарт подрядчика", staff: "Внутренний", agency: "Вариативно" },
      { label: "Стоимость", us: "Прозрачный пакет в КП", staff: "ФОТ + риски", agency: "Комиссия + риски срыва" },
    ],
    faq: [
      { q: "Чем отличается от классического агентства?", a: "Фокус на линейных ролях и передаче в операционный контур, а не только на резюме." },
      { q: "Можно ли объединить с аутсорсингом смен?", a: "Да, это типовой сценарий: подбор → поставка смен → отчётность." },
      { q: "Есть ли гарантия найма N человек за неделю?", a: "Конкретные цифры — предмет КП и доступности профиля на рынке." },
      { q: "Работаете по всей России?", a: "Коммерческий фокус — Москва и МО; другие регионы обсуждаются отдельно." },
      { q: "Какие проверки делаете?", a: "Базовый пакет согласуется в КП; расширенный — по запросу." },
      { q: "Как стартовать?", a: "Заявка с описанием профиля и объёма — ответ с воронкой и сроками." },
    ],
  },
  en: {
    h1: "End-to-end recruiting for line roles",
    subtitle:
      "From profile to first shift: funnel, screening, checks and handover into shift outsourcing or an agreed hiring model.",
    intro: [
      "Warehouse recruiting differs from a classic agency: time-to-shift, line profile literacy and willingness to hand people over with briefings and KPIs matter.",
      "We design funnels for loaders, pickers, forklift operators and adjacent roles, then either shift outsourcing or a customer-agreed model.",
      "Fees and SLA are fixed in the proposal; this page is an overview without individual promises.",
    ],
    segments: [
      { title: "Warehouse roles", text: "Loaders, pickers, forklift operators, warehouse clerks." },
      { title: "Manufacturing", text: "Assembly, packing and line support tasks." },
      { title: "Seasonal campaigns", text: "Volume hiring for peaks without losing screening quality." },
      { title: "Churn backfill", text: "Fast closure of gaps with a clear funnel SLA." },
    ],
    howItWorks: [
      "Profile, funnel and candidate sources.",
      "Screening, checks and briefings.",
      "Site access and first shifts with mentors.",
      "Handover to shift outsourcing or the customer loop.",
    ],
    includes: [
      { name: "Sourcing and first contact", included: true },
      { name: "Basic skills assessment", included: true },
      { name: "First-shift accompaniment", included: true },
      { name: "Executive search for leadership", included: false },
    ],
    comparison: [
      { label: "Time to fill", us: "Packaged to profile", staff: "Depends on HR", agency: "Fast without ops handover" },
      { label: "Quality control", us: "Single vendor standard", staff: "Internal", agency: "Variable" },
      { label: "Cost", us: "Transparent package in proposal", staff: "Payroll + risk", agency: "Fee + delivery risk" },
    ],
    faq: [
      { q: "How is this different from a classic agency?", a: "We focus on line roles and operational handover, not CVs alone." },
      { q: "Can it combine with shift outsourcing?", a: "Yes — typical path: recruit → shift delivery → reporting." },
      { q: "Do you guarantee N hires per week?", a: "Numbers belong in the proposal and depend on market availability for the profile." },
      { q: "Do you cover all of Russia?", a: "Commercial focus is Moscow and the Moscow Oblast; other regions are bespoke." },
      { q: "Which checks do you run?", a: "Baseline pack is agreed in the proposal; extended checks on request." },
      { q: "How to start?", a: "Send a request with profile and volume — we reply with funnel and timelines." },
    ],
  },
};
