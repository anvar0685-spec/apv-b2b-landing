import { SITE_ASSISTANT_GENERATED_ROUTES_KNOWLEDGE } from "./site-assistant-knowledge.generated";

/**
 * Сжатая «база знаний» для системного промпта: публичные факты с лендинга.
 * Обновлять при смене позиционирования или ключевых цифр на сайте.
 * Список programmatic URL — `npm run generate:assistant-knowledge` → `site-assistant-knowledge.generated.ts`.
 */
export function getSiteAssistantKnowledgeBlock(): string {
  const generated = SITE_ASSISTANT_GENERATED_ROUTES_KNOWLEDGE.trim();
  const generatedBlock = generated.length ? `\n${generated}\n` : "";
  return `
- География работ: Москва и Московская область (склады, РЦ, логистика). Вне МО и без складской темы — честно ограничить и предложить заявку/контакты.
- Продукт: аутсорсинг закрытия смен под договор — явка, замены, документы, отчётность для дирекции и закупки. Аутстаффинг как отдельный маркетинговый продукт не позиционируем.
- Разделы: Услуги (/ru/uslugi) и страница аутсорсинга (/ru/uslugi/autsorsing); Калькулятор (/ru/kalkulyator) — ориентир по стоимости; Заявка (/ru/zayavka) — бриф и КП; Контакты (/ru/kontakty); Персонал (/ru/personal) — профессии и города; Отрасли (/ru/otrasli); Площадки маркетплейсов (/ru/ploshchadki); Кейсы (/ru/keysy); Блог (/ru/blog); рубрика «Веб для аутсорсинга» в блоге (/ru/blog/category/veb-dlya-autsorsinga); страница разработки сайтов для аутсорсеров (/ru/razrabotka-saytov-dlya-autsorsinga); FAQ (/ru/faq); Гарантии (/ru/garantii); О компании (/ru/o-kompanii); блок для поставщиков (/ru/dlya-postavschikov).
- Цены и KPI: публичные ставки и калькулятор — ориентир; конкретные SLA, % явки, штрафы и юридические обязательства — только в КП и договоре под объект. Не придумывать цифры.
- Комплаенс чата: ответы справочные; чат не заменяет заявку, телефон и мессенджеры для фиксации коммерческого запроса.${generatedBlock}`.trim();
}
