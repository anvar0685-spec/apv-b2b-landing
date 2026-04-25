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
    ru: { title: "Главная", teaser: "Аутсорсинг смен на склады Москвы и МО: SLA, ставки, compliance." },
    en: { title: "Home", teaser: "Warehouse shift outsourcing for Moscow & MO: SLA, rates, compliance." },
  },
  {
    path: "/uslugi",
    ru: { title: "Услуги", teaser: "Хаб форматов поставки персонала на склад." },
    en: { title: "Services", teaser: "Hub of staffing delivery formats for warehouses." },
  },
  {
    path: "/uslugi/autsorsing",
    ru: { title: "Аутсорсинг", teaser: "Контрактная поставка смен и замен под ваши KPI." },
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
    path: "/geografiya/moskva",
    ru: { title: "Москва", teaser: "Округа и логистика выхода на объект." },
    en: { title: "Moscow", teaser: "Districts and mobilisation logistics." },
  },
  {
    path: "/geografiya/moskovskaya-oblast/khimki",
    ru: { title: "Химки", teaser: "Складской кластер и время реакции бригад." },
    en: { title: "Khimki", teaser: "Warehouse cluster and crew response time." },
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
    path: "/blog",
    ru: { title: "Блог", teaser: "Методология аутсорсинга и рынок персонала." },
    en: { title: "Blog", teaser: "Outsourcing methodology and labor market notes." },
  },
];
