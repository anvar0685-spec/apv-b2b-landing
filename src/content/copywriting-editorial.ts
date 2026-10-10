import type { ProfessionSlug } from "@/content/professions-cities";
import { getWarehouseHourlyRateRub } from "@/content/warehouse-hourly-rates";

export type ProfessionEditorial = {
  /** Для H1 «… для склада в …» */
  professionLabel: string;
  hubTitle: string;
  intro: string;
  calcQuestions: string;
  calcCtaDefault: string;
};

export const PROFESSION_EDITORIAL: Record<ProfessionSlug, ProfessionEditorial> = {
  gruzchiki: {
    professionLabel: "Грузчики для склада",
    hubTitle: "Грузчики для склада",
    intro:
      "Подбираем бригаду для разгрузки и погрузки, перемещения товара и подготовки грузов к отгрузке. Согласуем график, количество работников и особенности груза до начала работы.",
    calcQuestions: "Вид и вес груза, ручные операции, условия участка, количество работников и часы",
    calcCtaDefault: "Получить расчёт для моего склада",
  },
  komplektovschiki: {
    professionLabel: "Комплектовщики для склада",
    hubTitle: "Комплектовщики для склада",
    intro:
      "Подбираем работников для отбора товара и сборки заказов. Уточняем ассортимент, способ комплектации и требования к опыту. Работу с терминалом сбора данных или вашей складской программой согласуем при подборе.",
    calcQuestions: "Способ отбора, ассортимент, оборудование, объём и график",
    calcCtaDefault: "Рассчитать стоимость комплектовщиков",
  },
  kladovschiki: {
    professionLabel: "Кладовщики для склада",
    hubTitle: "Кладовщики для склада",
    intro:
      "Подбираем работников для приёмки, размещения и учёта товара в пределах согласованных задач. До выхода уточняем порядок работы склада, требования к опыту и используемой программе.",
    calcQuestions: "Операции, складская программа, документы, опыт и график",
    calcCtaDefault: "Получить расчёт для склада",
  },
  "voditeli-prt": {
    professionLabel: "Водители складской техники",
    hubTitle: "Водители складской техники",
    intro:
      "Подбираем работников под технику и задачи вашего склада. До выхода согласуем требования к опыту и необходимым документам, порядок инструктажа и график работы.",
    calcQuestions: "Тип техники, участок, необходимые документы и количество смен",
    calcCtaDefault: "Обсудить подбор водителей",
  },
  upakovschiki: {
    professionLabel: "Упаковщики для склада",
    hubTitle: "Упаковщики для склада",
    intro:
      "Подбираем работников для упаковки товара и подготовки заказов к отправке. Согласуем виды упаковки, требования к маркировке и график работы.",
    calcQuestions: "Товар, упаковочные материалы, операции, объём и часы",
    calcCtaDefault: "Рассчитать стоимость упаковщиков",
  },
  razdorabochie: {
    professionLabel: "Разнорабочие для склада",
    hubTitle: "Разнорабочие для склада",
    intro:
      "Подбираем работников для вспомогательных задач на складе: перемещения товара, подготовки рабочих участков и других согласованных ручных работ. До выхода уточняем нагрузку и требования объекта.",
    calcQuestions: "Конкретные работы, физическая нагрузка, условия участка и график",
    calcCtaDefault: "Получить расчёт для склада",
  },
  klinery: {
    professionLabel: "Уборщики для склада",
    hubTitle: "Уборщики для склада",
    intro:
      "Подбираем работников для уборки согласованных складских зон. Уточняем участки, график, используемое оборудование и требования к работе рядом с товаром и техникой.",
    calcQuestions: "Площадь и зоны, оборудование и средства, порядок доступа и часы",
    calcCtaDefault: "Получить расчёт для склада",
  },
  "sborschiki-upakovschiki": {
    professionLabel: "Сборщики-упаковщики для склада",
    hubTitle: "Сборщики-упаковщики для склада",
    intro:
      "Подбираем работников для согласованных операций сборки и упаковки продукции. До выхода уточняем состав работ, инструкции и требования к опыту.",
    calcQuestions: "Какие операции входят в сборку, товар, инструкция, объём и график",
    calcCtaDefault: "Рассчитать стоимость сборщиков-упаковщиков",
  },
};

export const EXIT_REPLACE_LINE =
  "Организацию выхода и порядок замены обсуждаем с учётом адреса склада и времени начала смены.";

export function programmaticCityH1(
  profSlug: ProfessionSlug,
  cityPrepositional: string,
  citySlug: string,
): string {
  if (profSlug === "klinery") {
    return `Уборщики для склада в ${cityPrepositional}`;
  }
  if (profSlug === "voditeli-prt") {
    if (citySlug === "podolsk") {
      return `Водители погрузчиков для склада в ${cityPrepositional}`;
    }
    return `Водители складской техники в ${cityPrepositional}`;
  }
  const label = PROFESSION_EDITORIAL[profSlug].professionLabel;
  return `${label} в ${cityPrepositional}`;
}

export function programmaticCityLead(profSlug: ProfessionSlug): string {
  return PROFESSION_EDITORIAL[profSlug].intro;
}

export function programmaticCostLine(profSlug: ProfessionSlug, citySlug: string): string {
  const rate = getWarehouseHourlyRateRub(profSlug);
  if (profSlug === "komplektovschiki" && citySlug === "moskva") {
    return `Базовая ставка на дневную смену — от ${rate} ₽/час. Для расчёта нужны количество работников, график и задачи участка.`;
  }
  if (profSlug === "voditeli-prt" && citySlug === "podolsk") {
    return `Базовая ставка — от ${rate} ₽/час. Уточните тип техники, условия участка и количество смен — подготовим расчёт.`;
  }
  return `Базовая ставка на дневную смену — от ${rate} ₽/час. Итоговая стоимость зависит от задач и условий объекта.`;
}

/** Тело страницы «профессия × город» (без повтора hero-intro). */
export const PROGRAMMATIC_CLARIFY_BODY: Record<ProfessionSlug, string> = {
  gruzchiki:
    "Уточним вид, вес и размеры груза, ручные операции и условия участка. До выхода согласуем количество работников, график и адрес объекта. Порядок учёта часов и замены определим до начала смен.",
  komplektovschiki:
    "Уточним ассортимент, способ отбора товара и требования к работе с терминалом или складской программой. До выхода согласуем количество работников, график и адрес объекта. Порядок учёта часов и замены определим до начала смен.",
  kladovschiki:
    "Уточним согласованные операции приёмки, размещения и учёта, используемую программу, опыт работников и правила доступа. До выхода согласуем график и адрес объекта.",
  "voditeli-prt":
    "Уточним тип техники, задачи участка, опыт водителей и необходимые документы. До выхода согласуем доступ на объект, инструктажи и график. Порядок замены и ответственного по смене определим заранее.",
  upakovschiki:
    "Уточним вид упаковки, материалы, инструкции по маркировке, объём работ и график. До выхода согласуем количество работников и адрес объекта.",
  razdorabochie:
    "Уточним конкретные ручные задачи, нагрузку, условия участка, количество работников и часы. До выхода согласуем график и адрес объекта.",
  klinery:
    "Уточним зоны уборки, время работы, оборудование и инвентарь, правила работы рядом с товаром и техникой. До выхода согласуем график и адрес объекта.",
  "sborschiki-upakovschiki":
    "Уточним операции сборки и упаковки, инструкции, требования к опыту и график. До выхода согласуем количество работников и адрес объекта.",
};

export function programmaticCalcCta(profSlug: ProfessionSlug, citySlug: string): string {
  void profSlug;
  void citySlug;
  return "Рассчитать стоимость";
}

export function professionHubTitle(slug: ProfessionSlug): string {
  return PROFESSION_EDITORIAL[slug].hubTitle;
}

export function professionMetaDescription(slug: ProfessionSlug): string {
  const ed = PROFESSION_EDITORIAL[slug];
  return `${ed.professionLabel} в Москве и Московской области. ${ed.intro.split(".")[0]}. Согласуем график и стоимость под ваш объект.`;
}
