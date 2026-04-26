import type { ServicePageBilingual } from "./types";

export const postoyannyyPersonalPage: ServicePageBilingual = {
  slug: "postoyannyy-personal",
  ru: {
    h1: "Постоянный персонал на склад под долгий контракт",
    subtitle:
      "Стабильный состав смен, предсказуемая явка и единый операционный контакт — когда объём и график позволяют выйти из «пожарного» режима подбора.",
    intro: [
      "Постоянный контур подходит DC и хабам с устойчивым профилем смен: понятные окна пиков, согласованный резерв и регламенты обучения без еженедельной «пересборки» состава.",
      "Мы фиксируем KPI по явке, времени замены и отчётности; тарифная модель и штрафные механики — в КП и договоре, а не в маркетинговом тексте.",
      "Аутстаффинг не поставляем: работаем как подрядчик по сменам с ответственностью подрядчика за операционный результат на линии.",
    ],
    segments: [
      { title: "Ровный график", text: "Меньше «качелей» по численности — проще планировать обучение и качество." },
      { title: "Знание объекта", text: "Команда накапливает контекст зон, SKU и рисков — быстрее реакция на отклонения." },
      { title: "Финансовая предсказуемость", text: "Пакет смен проще уложить в P&L, чем постоянные всплески агентских комиссий." },
      { title: "Масштабирование", text: "Добавление зон/смен по согласованной дорожной карте без потери стандарта." },
    ],
    howItWorks: [
      "Диагностика профиля смен и рисков по явке.",
      "Проектирование состава, резерва и KPI.",
      "Пилот на ограниченной зоне.",
      "Стабилизация и оптимизация по метрикам.",
    ],
    includes: [
      { name: "Операционный контакт и отчётность по сменам", included: true },
      { name: "Резерв на замену", included: true },
      { name: "Инструктажи и базовое обучение", included: true },
      { name: "Полный executive search", included: false },
    ],
    comparison: [
      { label: "Предсказуемость", us: "Высокая при стабильном объёме", staff: "Зависит от HR", agency: "Средняя" },
      { label: "Скорость масштаба", us: "По дорожной карте", staff: "Медленнее", agency: "Быстрее без операций" },
      { label: "Ответственность", us: "Подрядчик на сменах", staff: "Заказчик", agency: "Смешанная" },
    ],
    faq: [
      { q: "Чем отличается от разовых подкреплений?", a: "Фокус на устойчивом составе и KPI за квартал, а не на точечных вливах." },
      { q: "Можно ли выйти из контракта?", a: "Условия расторжения и переходного периода — в договоре." },
      { q: "Нужен ли пилот?", a: "Рекомендуем для калибровки метрик и регламентов." },
      { q: "Как стартовать?", a: "Заявка или калькулятор — далее созвон с операционным менеджером." },
    ],
  },
  en: {
    h1: "Permanent warehouse staffing for long-term contracts",
    subtitle:
      "Stable shift crews, predictable attendance and one operations contact — when volume and cadence let you leave firefighting mode.",
    intro: [
      "Permanent staffing fits DCs with steady shift profiles: known peak windows, agreed reserves and training routines without weekly roster rebuilds.",
      "We align KPIs for attendance, replacement time and reporting; pricing and penalty mechanics belong in the proposal and contract, not marketing copy.",
      "We do not supply outstaffing: we operate as a shift contractor accountable for line outcomes.",
    ],
    segments: [
      { title: "Even cadence", text: "Fewer headcount swings — easier training and quality control." },
      { title: "Site context", text: "Teams accumulate zone/SKU/risk context — faster deviation response." },
      { title: "Finance predictability", text: "Shift packages land cleaner in a P&L than recurring agency spikes." },
      { title: "Scaling", text: "Add zones/shifts via an agreed roadmap without losing standards." },
    ],
    howItWorks: [
      "Shift profile and attendance risk diagnostic.",
      "Roster, reserve and KPI design.",
      "Pilot in a bounded zone.",
      "Stabilise and optimise on metrics.",
    ],
    includes: [
      { name: "Ops contact and shift reporting", included: true },
      { name: "Replacement reserve", included: true },
      { name: "Briefings and baseline training", included: true },
      { name: "Full executive search", included: false },
    ],
    comparison: [
      { label: "Predictability", us: "High at stable volumes", staff: "Depends on HR", agency: "Medium" },
      { label: "Scale-up speed", us: "Roadmap-driven", staff: "Slower", agency: "Faster without ops" },
      { label: "Accountability", us: "Vendor on shifts", staff: "Customer", agency: "Mixed" },
    ],
    faq: [
      { q: "How is this different from surge staffing?", a: "It targets stable crews and quarterly KPIs, not one-off injections." },
      { q: "Can we exit the contract?", a: "Termination and transition terms live in the agreement." },
      { q: "Is a pilot required?", a: "Recommended to calibrate metrics and procedures." },
      { q: "How to start?", a: "Use the lead form or calculator — then a call with the ops manager." },
    ],
  },
};
