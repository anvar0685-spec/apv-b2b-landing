/**
 * Приоритетные URL (Неделя 1): тизеры для перелинковки и будущего контент-плана.
 * Полные тексты — my-guide/content или правки в страницах.
 */
export type PageTeaser = {
  path: string;
  ru: { title: string; teaser: string };
  en: { title: string; teaser: string };
};

export const PRIORITY_PAGE_TEASERS: readonly PageTeaser[] = [
  {
    path: "/",
    ru: { title: "Главная", teaser: "Подряд по персоналу на склады Москвы и МО: явка, замены, ставки и SLA в договоре." },
    en: { title: "Home", teaser: "Warehouse shift outsourcing for Moscow & MO: SLA, rates, compliance." },
  },
  {
    path: "/uslugi",
    ru: { title: "Услуги", teaser: "Форматы работы с подрядчиком по складскому персоналу: что входит в КП." },
    en: { title: "Services", teaser: "Hub of staffing delivery formats for warehouses." },
  },
  {
    path: "/uslugi/autsorsing",
    ru: { title: "Аутсорсинг", teaser: "Выводим людей на смены под ваши KPI; замены и явка — по регламенту сопровождения, не отдельный «продукт»." },
    en: { title: "Outsourcing", teaser: "Contractual shift supply and replacements under your KPIs." },
  },
  {
    path: "/personal",
    ru: { title: "Персонал", teaser: "Складские роли: от грузчиков до операторов WMS." },
    en: { title: "Workforce", teaser: "Warehouse roles: from handlers to WMS operators." },
  },
  {
    path: "/personal/gruzchiki",
    ru: { title: "Грузчики", teaser: "Выход бригад на пиковые объёмы и постоянные линии." },
    en: { title: "Warehouse laborers", teaser: "Teams for peak volumes and steady lines." },
  },
  {
    path: "/personal/komplektovschiki",
    ru: { title: "Комплектовщики", teaser: "Пикинг, ошибки, SLA по строкам заказа." },
    en: { title: "Pickers", teaser: "Picking accuracy and order-line SLA." },
  },
  {
    path: "/otrasli/sklady-e-commerce",
    ru: { title: "E-commerce склады", teaser: "Fulfillment, пики продаж, маркетплейсы." },
    en: { title: "E-commerce warehouses", teaser: "Fulfillment, sales peaks, marketplaces." },
  },
  {
    path: "/ploshchadki/wildberries",
    ru: { title: "Площадки WB", teaser: "Персонал под требования крупных складов." },
    en: { title: "WB sites", teaser: "Staffing aligned with large-site requirements." },
  },
  {
    path: "/personal/gruzchiki/moskva",
    ru: { title: "Грузчики в Москве", teaser: "Выход бригад и резерв под столицу и ключевые склады." },
    en: { title: "Laborers in Moscow", teaser: "Teams and reserve for the capital and major DCs." },
  },
  {
    path: "/personal/komplektovschiki/himki",
    ru: { title: "Комплектовщики, Химки", teaser: "Персонал под кластер склада и время реакции бригад." },
    en: { title: "Pickers, Khimki", teaser: "Staff for the warehouse cluster and crew response." },
  },
  {
    path: "/kalkulyator",
    ru: { title: "Калькулятор", teaser: "Оценка ₽/час и смены до заявки." },
    en: { title: "Calculator", teaser: "Rough hourly and shift estimate before lead form." },
  },
  {
    path: "/zayavka",
    ru: { title: "Заявка", teaser: "Короткий бриф — менеджер вернётся с расчётом." },
    en: { title: "Request", teaser: "Short brief — manager replies with numbers." },
  },
  {
    path: "/keysy",
    ru: { title: "Кейсы", teaser: "Форматы задач и результаты в цифрах." },
    en: { title: "Case studies", teaser: "Problem formats and numeric outcomes." },
  },
  {
    path: "/razrabotka-saytov-dlya-autsorsinga",
    ru: {
      title: "Сайт для аутсорсинга",
      teaser: "Уникальный дизайн и стек под вашу нишу; паттерны качества — как на этом проекте. Фикс от 400 тыс. ₽.",
    },
    en: {
      title: "Web for staffing outsourcers",
      teaser: "Unique design and stack for your niche; same engineering discipline as this build. Fixed-price anchor.",
    },
  },
];
