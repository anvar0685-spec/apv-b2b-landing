import type { ServicePageBilingual } from "./types";

export const nochnyeSmenyPage: ServicePageBilingual = {
  slug: "nochnye-smeny",
  ru: {
    h1: "Ночные смены на склад — поставка под регламент",
    subtitle:
      "Инструктажи, менторинг первых смен, дисциплина замен и отчётность по KPI явки — когда ночной контур нельзя оставлять «на автопилоте».",
    intro: [
      "Ночные окна повышают риск инцидентов и просадки явки: важны укороченный цикл реакции, понятные эскалации и согласованный резерв без размывания ответственности.",
      "Мы проектируем ночной контур как отдельный SLA: состав, обучение, контрольные точки первой недели и формат отчёта для дневного операционного директора.",
      "Тарифы и коэффициенты ночи — в коммерческом предложении; на странице — обзор без индивидуальных обещаний.",
    ],
    segments: [
      { title: "Inbound ночью", text: "Разгрузка и приёмка при ограниченном контроле дневной смены." },
      { title: "Комплектация", text: "Стабильная скорость линий при сниженной освещённости и мониторинге ошибок." },
      { title: "Отгрузка к утру", text: "Подготовка партий к дневным слотам без простоя ворот." },
      { title: "Сервисные роли", text: "Уборка зон, внутренняя логистика, подсобка для ночного контура." },
    ],
    howItWorks: [
      "Карта рисков ночного контура и профиль смен.",
      "Регламент инструктажей, менторинг и резерв.",
      "Пилот на ограниченной зоне с ночными метриками.",
      "Стабилизация и еженедельный разбор с заказчиком.",
    ],
    includes: [
      { name: "Ночной операционный контакт", included: true },
      { name: "Резерв на замену", included: true },
      { name: "Расширенный отчёт по ночным сменам", included: true },
      { name: "Круглосуточный медпункт на площадке", included: false },
    ],
    comparison: [
      { label: "Контроль рисков", us: "Отдельный ночной SLA", staff: "Зависит от дисциплины", agency: "Низкий" },
      { label: "Стоимость", us: "Коэффициент ночи в КП", staff: "ФОТ + доплаты", agency: "Комиссия + доплаты" },
      { label: "Замены", us: "Резерв подрядчика", staff: "Внутренний пул", agency: "Точечно" },
    ],
    faq: [
      { q: "Чем ночь отличается от дневной поставки?", a: "Отдельные регламенты, метрики и резерв; коэффициенты в КП." },
      { q: "Как обеспечивается безопасность?", a: "Инструктажи и контрольные точки согласуются с заказчиком и регламентами площадки." },
      { q: "Можно ли совместить с дневным контрактом?", a: "Да, единый договор с раздельными SLA по окнам." },
      { q: "Как стартовать?", a: "Заявка с описанием ночного контура — ответ с планом пилота." },
    ],
  },
  en: {
    h1: "Night shifts for warehouses — governed delivery",
    subtitle:
      "Briefings, first-shift mentoring, replacement discipline and attendance KPI reporting — because night windows cannot run on autopilot.",
    intro: [
      "Night windows raise incident risk and attendance drift: short reaction loops, clear escalations and an agreed reserve matter — without blurring accountability.",
      "We design nights as a separate SLA: roster, training, week-one checkpoints and reporting for the daytime ops lead.",
      "Night coefficients and pricing sit in the commercial proposal; this page is an overview without bespoke promises.",
    ],
    segments: [
      { title: "Night inbound", text: "Unloading and receiving with limited daytime oversight." },
      { title: "Picking", text: "Line speed with lower-light ergonomics and error monitoring." },
      { title: "Morning-ready outbound", text: "Prepare batches for daytime gate slots without idle doors." },
      { title: "Support roles", text: "Zone cleaning, internal logistics and night back-office tasks." },
    ],
    howItWorks: [
      "Night risk map and shift profile.",
      "Briefing playbook, mentoring and reserves.",
      "Pilot in a bounded zone with night metrics.",
      "Stabilise and run weekly reviews with the customer.",
    ],
    includes: [
      { name: "Night operations contact", included: true },
      { name: "Replacement reserve", included: true },
      { name: "Extended night-shift reporting", included: true },
      { name: "On-site 24/7 medical room", included: false },
    ],
    comparison: [
      { label: "Risk control", us: "Dedicated night SLA", staff: "Depends on discipline", agency: "Low" },
      { label: "Cost", us: "Night coefficient in proposal", staff: "Payroll + premiums", agency: "Fee + premiums" },
      { label: "Replacements", us: "Vendor reserve", staff: "Internal pool", agency: "Ad hoc" },
    ],
    faq: [
      { q: "How is night different from day supply?", a: "Separate playbooks, metrics and reserves; coefficients in the proposal." },
      { q: "How is safety handled?", a: "Briefings and checkpoints align with the customer and site rules." },
      { q: "Can it combine with a day contract?", a: "Yes — one agreement with separate SLAs per window." },
      { q: "How to start?", a: "Send a request describing the night loop — we reply with a pilot plan." },
    ],
  },
};
