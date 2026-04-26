import type { ServicePageBilingual } from "./types";

export const managedPage: ServicePageBilingual = {
  slug: "upravlyaemyy-podryad",
  ru: {
    h1: "Управляемый подряд (managed service) под KPI",
    subtitle:
      "Сдвигаем фокус с «человеко-часов» на результат: план, исполнение, отчётность и улучшения по согласованным метрикам для зрелых DC и производственных контуров.",
    intro: [
      "Managed service подходит, когда операции уже измеримы: есть WMS-данные, понятные целевые показатели по явке, ошибке и простоям, и готовность к еженедельным разборам с подрядчиком.",
      "Мы совместно фиксируем KPI, дорожную карту на 90 дней и формат дашборда: явка, замены, инциденты, cost per shift — в одной плоскости для COO и финансов.",
      "Материалы страницы не заменяют юридическую оценку штрафных/бонусных механик — их проектирует юрист после согласования коммерческих параметров.",
    ],
    segments: [
      { title: "Склады высокой интенсивности", text: "Пики распродаж, устойчивый резерв, управление заменами и ночными сменами." },
      { title: "Производственные линии", text: "Стабильный выход, обучение, снижение брака и простоев между сменами." },
      { title: "Кросс-док и трансфер", text: "Сквозной контроль смен и передач между зонами без потери ответственности." },
      { title: "Проекты с фиксированным сроком", text: "Запуск новых площадок, переезды, временные мощности под жёсткий календарь." },
    ],
    howItWorks: [
      "Совместная постановка целей, рисков и базовых метрик.",
      "План ресурсов и дорожная карта на 90 дней.",
      "Еженедельные операционные разборы и корректировки.",
      "Корректировки состава и процессов по факту.",
      "Финальный отчёт и решение о масштабировании.",
    ],
    includes: [
      { name: "Операционный офис на площадке / удалённый контур", included: true },
      { name: "KPI-дашборд", included: true },
      { name: "План улучшений по итогам разборов", included: true },
      { name: "Полный перевод линейки в штат заказчика", included: false },
    ],
    comparison: [
      { label: "Управление", us: "Совместное с подрядчиком", staff: "Внутри заказчика", agency: "Частично" },
      { label: "Ответственность за KPI", us: "Высокая у подрядчика", staff: "Внутренняя", agency: "Низкая" },
      { label: "Скорость внедрения", us: "Средняя (нужен аудит)", staff: "Низкая", agency: "Высокая на подбор" },
    ],
    faq: [
      { q: "Кому подходит managed service?", a: "Зрелым операциям с понятными метриками и готовностью к совместным разборам раз в неделю." },
      { q: "Какие гарантии по KPI?", a: "Фиксируются в приложении к договору; штрафные и бонусные схемы — индивидуально." },
      { q: "Можно ли совместить с аутсорсингом смен?", a: "Да, managed часто вырастает из стабилизированного контура смен." },
      { q: "Сколько длится внедрение?", a: "Зависит от аудита процессов; ориентир обсуждается в КП." },
      { q: "Нужен ли пилот?", a: "Рекомендуем пилотный участок для калибровки метрик." },
      { q: "Как стартовать?", a: "Заявка или калькулятор — далее созвон с операционным директором проекта." },
    ],
  },
  en: {
    h1: "Managed service under KPI",
    subtitle:
      "Shift the focus from hours sold to outcomes: plan, execution, reporting and improvements against agreed metrics for mature DCs and manufacturing flows.",
    intro: [
      "Managed service fits when operations are measurable: WMS signals, clear targets for attendance, error and idle time, and appetite for weekly reviews with the vendor.",
      "We align KPIs, a 90-day roadmap and dashboard format — attendance, replacements, incidents, cost per shift — in one plane for the COO and finance.",
      "Page copy is informational; penalty/bonus mechanics need legal review after commercial terms are set.",
    ],
    segments: [
      { title: "High-intensity warehouses", text: "Sale peaks, resilient reserves, replacement and night-shift management." },
      { title: "Production lines", text: "Stable line output, training, lower defect and inter-shift idle time." },
      { title: "Cross-dock and transfer", text: "End-to-end shift control across zones without accountability gaps." },
      { title: "Fixed-date programmes", text: "New site launches, relocations and temporary capacity under a hard calendar." },
    ],
    howItWorks: [
      "Joint goal and risk framing plus baseline metrics.",
      "Resource plan and 90-day roadmap.",
      "Weekly operational reviews and tuning.",
      "Roster and process adjustments based on facts.",
      "Closing report and scale/no-scale decision.",
    ],
    includes: [
      { name: "On-site ops office / remote control tower", included: true },
      { name: "KPI dashboard", included: true },
      { name: "Improvement plan after reviews", included: true },
      { name: "Full transfer of the line into customer payroll", included: false },
    ],
    comparison: [
      { label: "Governance", us: "Joint with vendor", staff: "Inside customer", agency: "Partial" },
      { label: "KPI accountability", us: "High on vendor", staff: "Internal", agency: "Low" },
      { label: "Implementation speed", us: "Medium (audit needed)", staff: "Low", agency: "High for sourcing only" },
    ],
    faq: [
      { q: "Who is managed service for?", a: "Mature operations with clear metrics and willingness to run weekly joint reviews." },
      { q: "What KPI guarantees exist?", a: "Written into a contract annex; penalty/bonus schemes are bespoke." },
      { q: "Can it combine with shift outsourcing?", a: "Yes — managed often grows from a stabilised shift loop." },
      { q: "How long is implementation?", a: "Depends on process audit; discussed in the proposal." },
      { q: "Is a pilot required?", a: "We recommend a pilot zone to calibrate metrics." },
      { q: "How to start?", a: "Use the request form or calculator, then a call with the programme operations lead." },
    ],
  },
};
