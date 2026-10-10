import {
  EXIT_REPLACE_LINE,
  programmaticCostLine,
  PROGRAMMATIC_CLARIFY_BODY,
} from "@/content/copywriting-editorial";
import type { ProfessionSlug } from "@/content/professions-cities";

type Prof = { slug: string; titleRu: string; titleGenitiveRu: string };
type City = { slug: string; nameRu: string; namePrepositionalRu: string };

/**
 * Тело страницы «профессия × город»: без повтора hero-intro.
 */
export function getProgrammaticLongreadParagraphs(profession: Prof, city: City, priority = false): string[] {
  const pSlug = profession.slug as ProfessionSlug;
  const cost = programmaticCostLine(pSlug, city.slug);
  const clarify = PROGRAMMATIC_CLARIFY_BODY[pSlug];

  const compact = [
    clarify,
    cost,
    EXIT_REPLACE_LINE,
    "Параметры профессии и города можно передать в калькулятор или заявку — менеджер подготовит предложение после обсуждения объекта.",
  ];

  if (!priority) {
    return compact;
  }

  return [
    ...compact,
    "На пиках приёмки и отгрузки заранее согласуем состав и резерв, чтобы линия не простаивала из‑за неявки.",
    "Документы на допуск и инструктажи согласуем до выхода; службу безопасности заказчика не подменяем, но передаём пакет под проверку.",
  ];
}
