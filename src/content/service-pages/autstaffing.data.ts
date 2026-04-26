import type { ServicePageBilingual } from "./types";

/** Информационная страница: на рынке встречается модель outstaffing; основной продукт компании — аутсорсинг смен на склады. */
export const autstaffingPage: ServicePageBilingual = {
  slug: "autstaffing",
  ru: {
    h1: "Аутстаффинг: как читать модель и риски (справочно)",
    subtitle:
      "Разбор для закупки и юридического контура: где проходит граница ответственности, что проверять в договоре и как не смешать аутстаффинг с аутсорсингом смен.",
    intro: [
      "На странице — справочный материал для сравнения моделей поставки персонала. **Основной коммерческий фокус нашей поставки — аутсорсинг складских смен** с KPI явки и операционной отчётностью; аутстаффинг здесь описан как контекст рынка, а не как «главный продукт».",
      "Если вам нужна предсказуемая работа склада без переноса кадрового шума на внутренний HR, начните с раздела «Аутсорсинг» и калькулятора — там зафиксированы ориентиры по ставкам и логика КП.",
      "Любые формулировки ниже носят информационный характер; финальные условия — только после Due Diligence и подписания договора с приложениями.",
    ],
    segments: [
      {
        title: "Ритейл и маркетплейсы",
        text: "Пики сезонов, DC, ночные смены. Важно: кто ведёт миграционный учёт и как измеряется явка.",
      },
      {
        title: "Производство",
        text: "Линейка под конвейер и вспомогательные операции; критичны обучение и дисциплина замен.",
      },
      {
        title: "Стройка и объекты",
        text: "Разнорабочие и подсобные бригады; пропускной режим и календарь этапов.",
      },
      {
        title: "HoReCa",
        text: "Сезонные пики, фронт и кухня; скорость выхода и прозрачность замен.",
      },
    ],
    howItWorks: [
      "Заявка и уточнение SLA: объём, профили, график, локации, требования к документам.",
      "Подбор и проверка кандидатов: скрининги, инструктажи, контроль допусков.",
      "Compliance-check до выхода на объект.",
      "Онбординг и первые смены с наставником.",
      "Операция и отчётность: явка, замены, инциденты.",
    ],
    includes: [
      { name: "HR-администрирование смен", included: true },
      { name: "Замены и резерв под пик", included: true },
      { name: "Отчётность по явке", included: true },
      { name: "Базовые инструктажи ТБ", included: true },
      { name: "Расширенный compliance-пакет", included: true },
      { name: "Юридический аутсорс работодателя заказчика", included: false },
    ],
    comparison: [
      { label: "Риск миграционных штрафов", us: "Контур подрядчика", staff: "На стороне заказчика", agency: "Зависит от модели" },
      { label: "Скорость масштабирования", us: "2–10 дней на пилот", staff: "Месяцы найма", agency: "2–6 недель" },
      { label: "Прозрачность ставки", us: "КП с разложением", staff: "ФОТ + скрытые косты", agency: "Комиссии агентства" },
    ],
    faq: [
      { q: "Чем аутстаффинг отличается от аутсорсинга смен?", a: "Аутстаффинг — персонал у подрядчика, задачи на площадке заказчика; аутсорсинг смен — управляемый контур поставки смен с KPI. Мы продвигаем вторую модель для складов." },
      { q: "Кто несёт риски по мигрантам?", a: "Зависит от договора; в типовой модели подрядчика документы ведёт он. Уточняет юрист." },
      { q: "Как быстро выходим на объём?", a: "Пилот — от нескольких дней; масштаб — по профилям и локации, фиксируется в КП." },
      { q: "Есть ли гарантии по явке?", a: "SLA согласуется индивидуально и закрепляется в приложении к договору." },
      { q: "Работаете ли по Москве и МО?", a: "Да, Москва и 30 городов области; программатика поддерживает локальное SEO." },
      { q: "Куда нажать для расчёта аутсорсинга смен?", a: "Раздел «Аутсорсинг на склады» и калькулятор — там модель поставки смен." },
    ],
  },
  en: {
    h1: "Outstaffing: how to read the model and risks (reference)",
    subtitle:
      "A procurement and legal primer: where accountability sits, what to verify in the contract, and how not to confuse outstaffing with shift outsourcing.",
    intro: [
      "This page compares staffing delivery models. **Our primary commercial offer is warehouse shift outsourcing** with attendance KPIs and ops reporting; outstaffing is described as market context, not the headline product.",
      "If you need predictable warehouse operations without pushing HR noise to your internal team, start with the Outsourcing section and the calculator — benchmarks and proposal logic live there.",
      "Copy is informational; binding terms follow Due Diligence and a signed contract with annexes.",
    ],
    segments: [
      { title: "Retail and marketplaces", text: "Seasonal peaks, DCs, night shifts. Clarify who owns migration paperwork and how attendance is measured." },
      { title: "Manufacturing", text: "Line and support ops; training and replacement discipline matter." },
      { title: "Construction and sites", text: "General labour and support crews; access control and milestone calendars." },
      { title: "HoReCa", text: "Seasonal peaks for front and kitchen; time-to-shift and replacement transparency." },
    ],
    howItWorks: [
      "Request and SLA scoping: volume, profiles, schedule, locations, document requirements.",
      "Sourcing and checks: screening, briefings, access control.",
      "Compliance check before site access.",
      "Onboarding and first shifts with mentors.",
      "Operations and reporting: attendance, replacements, incidents.",
    ],
    includes: [
      { name: "Shift HR administration", included: true },
      { name: "Peak reserves and replacements", included: true },
      { name: "Attendance reporting", included: true },
      { name: "Basic HSE briefings", included: true },
      { name: "Extended compliance pack", included: true },
      { name: "Full legal employer outsourcing for the customer", included: false },
    ],
    comparison: [
      { label: "Migration penalty risk", us: "Contractor loop", staff: "Customer-side", agency: "Model-dependent" },
      { label: "Scaling speed", us: "2–10 days to pilot", staff: "Months to hire", agency: "2–6 weeks" },
      { label: "Rate transparency", us: "Proposal breakdown", staff: "Payroll + hidden cost", agency: "Agency fees" },
    ],
    faq: [
      { q: "How is outstaffing different from shift outsourcing?", a: "Outstaffing keeps people on the vendor roster while they execute customer tasks; shift outsourcing is a governed shift-delivery loop with KPIs. We promote the latter for warehouses." },
      { q: "Who owns migration risk?", a: "Contract-dependent; in a typical vendor model the vendor runs documents. Legal confirms." },
      { q: "How fast can we ramp?", a: "Pilot in days; scale depends on profiles and location — fixed in the proposal." },
      { q: "Are there attendance guarantees?", a: "SLA is agreed case-by-case and written into the contract annex." },
      { q: "Do you cover Moscow and the Moscow Oblast?", a: "Yes — Moscow plus 30 oblast cities; programmatic pages support local SEO." },
      { q: "Where is shift outsourcing pricing?", a: "Use the Warehouse outsourcing page and the calculator for the shift model." },
    ],
  },
};
