import { PROFESSIONS } from "@/content/professions-cities";

export type IndustryTask = { title: string; text: string };

export type IndustryPageContent = {
  tasks: IndustryTask[];
  clarifyBefore: string[];
  professionSlugs: string[];
  professionLabels: Record<string, string>;
  professionsLead: string;
  relatedLinks: { href: string; label: string }[];
};

const labelBySlug = Object.fromEntries(PROFESSIONS.map((p) => [p.slug, p.titleRu])) as Record<string, string>;

function content(
  tasks: IndustryTask[],
  clarifyBefore: string[],
  professionSlugs: string[],
  professionsLead: string,
  relatedLinks: { href: string; label: string }[],
): IndustryPageContent {
  const professionLabels: Record<string, string> = {};
  for (const slug of professionSlugs) {
    professionLabels[slug] = labelBySlug[slug] ?? slug;
  }
  return { tasks, clarifyBefore, professionSlugs, professionLabels, professionsLead, relatedLinks };
}

const COMMON_RELATED: { href: string; label: string }[] = [
  { href: "/uslugi/autsorsing", label: "Аутсорсинг складского персонала" },
  { href: "/kalkulyator", label: "Калькулятор стоимости" },
  { href: "/zayavka", label: "Заявка на расчёт" },
];

export const INDUSTRY_PAGE_CONTENT: Record<string, IndustryPageContent> = {
  "sklady-e-commerce": content(
    [
      {
        title: "Сборка и упаковка заказов",
        text: "Подбираем комплектовщиков, упаковщиков и сборщиков-упаковщиков под ваш ассортимент и способ отбора.",
      },
      {
        title: "Сортировка и подготовка отгрузки",
        text: "Согласуем работу на участках сортировки и отгрузки, график смен и требования к маркировке.",
      },
      {
        title: "Возвраты и вспомогательные операции",
        text: "Обсуждаем обработку возвратов и ручные задачи в пределах доступных профессий.",
      },
    ],
    [
      "Как отбираются и упаковываются заказы",
      "Требования к маркировке",
      "Нагрузка по дням и сезонные пики",
      "Оборудование участка и время отгрузки",
    ],
    ["komplektovschiki", "upakovschiki", "sborschiki-upakovschiki", "gruzchiki"],
    "Состав команды зависит от операций на вашем складе — уточняем до подбора.",
    [...COMMON_RELATED, { href: "/keysy/marketplace-multiprofil-mo", label: "Кейс: маркетплейс" }],
  ),
  "sklady-riteyla": content(
    [
      {
        title: "Приёмка товара",
        text: "Подбираем грузчиков и разнорабочих под входящий поток и правила вашего РЦ.",
      },
      {
        title: "Подготовка отгрузки в магазины",
        text: "Согласуем комплектовщиков и кладовщиков под отбор и подготовку поставок в сеть.",
      },
      {
        title: "Перемещение и вспомогательные работы",
        text: "Обсуждаем ручные операции и уборку зон в пределах согласованного состава.",
      },
    ],
    [
      "Какие товарные группы обрабатываются",
      "Как готовятся поставки в магазины",
      "График приёмки и отгрузки",
      "Требования к доступу на объект",
    ],
    ["gruzchiki", "komplektovschiki", "kladovschiki", "razdorabochie"],
    "Профили и численность согласуем под операции вашего распределительного центра.",
    COMMON_RELATED,
  ),
  "sklady-3pl": content(
    [
      {
        title: "Работа на участках площадки",
        text: "Организуем смены под задачи зон с несколькими заказчиками — состав и график согласуем отдельно.",
      },
      {
        title: "Приёмка, отбор и отгрузка",
        text: "Подбираем работников под согласованные операции без обещания единого стандарта для всех клиентов площадки.",
      },
      {
        title: "Учёт и связь по смене",
        text: "Фиксируем порядок подтверждения часов и отчётности до выхода команды.",
      },
    ],
    [
      "На каких участках нужна команда",
      "Различаются ли задачи клиентов",
      "Как распределяются работники",
      "Как подтверждаются часы и табели",
    ],
    ["gruzchiki", "komplektovschiki", "kladovschiki", "razdorabochie"],
    "Требования к работникам и зонам доступа уточняем для каждого объекта.",
    [...COMMON_RELATED, { href: "/keysy/stroitelnye-materialy-sklad-obrabotka", label: "Кейс: склад 3PL" }],
  ),
  "proizvodstvennye-sklady": content(
    [
      {
        title: "Складские операции",
        text: "Подбираем работников для приёмки, перемещения и отгрузки в рамках согласованных задач склада.",
      },
      {
        title: "Вспомогательные работы",
        text: "Обсуждаем разнорабочих и уборку зон — без смешения с производственными специальностями.",
      },
      {
        title: "Согласование доступа",
        text: "До выхода уточняем инструктажи, зоны и график участков.",
      },
    ],
    [
      "Какие операции относятся к складу, а какие к производству",
      "Нагрузка по сменам",
      "Инструктажи и допуски",
      "График участков",
    ],
    ["gruzchiki", "kladovschiki", "razdorabochie", "klinery"],
    "Состав команды согласуем после уточнения границ складских и вспомогательных задач.",
    COMMON_RELATED,
  ),
  "farmatsevticheskie-sklady": content(
    [
      {
        title: "Согласование задач",
        text: "Обсуждаем, какие операции допустимы для работников подрядчика на вашем объекте.",
      },
      {
        title: "Документы и инструктажи",
        text: "До выхода согласуем пакет документов, инструктажи и зоны доступа по правилам заказчика.",
      },
      {
        title: "Складские операции в согласованном объёме",
        text: "Подбираем грузчиков, комплектовщиков и кладовщиков там, где это разрешено вашими регламентами.",
      },
    ],
    [
      "Какие операции разрешены работникам",
      "Требования к документам и инструктажам",
      "Зоны доступа и условия объекта",
      "Порядок замены и отчётности",
    ],
    ["gruzchiki", "komplektovschiki", "kladovschiki"],
    "Мы не подменяем фармацевтический контроль заказчика — подбор возможен после согласования требований.",
    COMMON_RELATED,
  ),
  "fmcg-sklady": content(
    [
      {
        title: "Приёмка и комплектация",
        text: "Подбираем работников под приёмку, отбор и подготовку отгрузки товаров повседневного спроса.",
      },
      {
        title: "Паллетные и ручные операции",
        text: "Согласуем участки с высокой оборачиваемостью и требования к упаковке.",
      },
      {
        title: "Сезонные пики",
        text: "До нагрузки обсуждаем состав команды и график смен.",
      },
    ],
    [
      "Товарные группы, упаковка и маркировка",
      "Нагрузка по сменам",
      "Требования к отдельным зонам, если они есть",
      "График приёмки и отгрузки",
    ],
    ["gruzchiki", "komplektovschiki", "kladovschiki", "razdorabochie"],
    "Профили подбираем под согласованные операции — без обещания специализации по всем группам товара.",
    [...COMMON_RELATED, { href: "/keysy/tabachnyy-sklad-mo", label: "Кейс: FMCG" }],
  ),
  "sklady-klassa-a": content(
    [
      {
        title: "Операции на объекте",
        text: "Обсуждаем приёмку, отбор, отгрузку и вспомогательные задачи в рамках регламента площадки.",
      },
      {
        title: "Навыки работников",
        text: "Уточняем опыт работы со складской техникой и программой — в объёме, который подтверждается на объекте.",
      },
      {
        title: "Доступ и дисциплина смены",
        text: "Согласуем форму, инструктажи и время начала смен по требованиям эксплуатации.",
      },
    ],
    [
      "Операции, техника и складская программа",
      "Навыки и опыт работников",
      "Доступ на объект и время начала смен",
      "Порядок отчётности",
    ],
    ["komplektovschiki", "kladovschiki", "voditeli-prt", "gruzchiki"],
    "Состав команды и требования к навыкам согласуем под процессы вашего склада.",
    COMMON_RELATED,
  ),
};

export function getIndustryPageContent(slug: string): IndustryPageContent | undefined {
  return INDUSTRY_PAGE_CONTENT[slug];
}
