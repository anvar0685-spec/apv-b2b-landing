import {
  EXIT_REPLACE_LINE,
  PROFESSION_EDITORIAL,
  programmaticCostLine,
} from "@/content/copywriting-editorial";
import type { ProfessionSlug } from "@/content/professions-cities";

type Prof = { slug: string; titleRu: string; titleGenitiveRu: string };
type City = { slug: string; nameRu: string; namePrepositionalRu: string };

/**
 * Тело страницы «профессия × город»: задачи, расчёт, выход — без SEO-стены.
 */
export function getProgrammaticLongreadParagraphs(profession: Prof, city: City, priority = false): string[] {
  const pSlug = profession.slug as ProfessionSlug;
  const ed = PROFESSION_EDITORIAL[pSlug];
  const cost = programmaticCostLine(pSlug, city.slug);

  const tasksBlock = `Что уточнить для расчёта: ${ed.calcQuestions}.`;

  const compact = [
    ed.intro,
    cost,
    EXIT_REPLACE_LINE,
    tasksBlock,
    "Параметры профессии и города можно передать в калькулятор или заявку — менеджер подготовит предложение после обсуждения объекта.",
  ];

  if (!priority) {
    return compact;
  }

  return [
    ...compact,
    "На пиках приёмки и отгрузки заранее согласуем состав и резерв, чтобы линия не простаивала из‑за неявки.",
    "Документы на допуск и инструктажи согласуем до выхода; службу безопасности заказчика не подменяем, но передаём пакет под проверку.",
    "Условия замены, табели и отчётность фиксируем в договоре и коммерческом предложении — на странице только ориентиры.",
  ];
}
