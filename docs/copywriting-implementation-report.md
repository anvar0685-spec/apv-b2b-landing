# Отчёт о внедрении редакции (октябрь 2026)

**Источник:** `Промпт_Cursor_АПВ_Система_полная_редакция.md` (10.10.2026).

## Изменённые источники

| Область | Файлы |
| --- | --- |
| Общие строки RU | `src/messages/ru.json` |
| Профессии × город | `src/content/copywriting-editorial.ts`, `src/content/programmatic-longread.ts`, `src/components/marketing/programmatic-staffing-page.tsx` |
| FAQ | `src/content/faq-items.ts`, блок `homePage.faq` в `ru.json` |
| Услуги | `src/content/service-pages/*.data.ts`, `src/components/marketing/services-hub.tsx`, `src/app/[locale]/uslugi/page.tsx` |
| Персонал | `src/app/[locale]/personal/**` |
| Калькулятор | `src/components/kalkulyator/calculator-full.tsx`, `pagesSeo.kalkulyator` |
| Заявка | `leadPage`, `leadForm` в `ru.json` |
| Кейсы | `src/content/cases-stub.ts`, `caseHub` в `ru.json` |
| Отрасли (вводные) | `src/content/commercial-editorial.ts` (e-commerce, 3PL, фарма) |
| Блог | `blog-published.ts` (статья 30 дней), `blogIndex` в `ru.json` |
| Гарантии / контакты | `garantii/page.tsx`, `kontakty/page.tsx` |
| Главная | `hero-section.tsx`, hero/process/FAQ/CTA в `ru.json` |

## Шаблон programmatic

- **240** страниц: H1/lead/тело из `copywriting-editorial` + `programmatic-longread`.
- Контрольные URL: Домодедово (грузчики), Москва (комплектовщики), Подольск (водители) — отдельные CTA и строки стоимости.

## Калькулятор

- Подписи шагов по промпту; форматы работы переименованы.
- Итог: «Предварительный бюджет по выбранному графику»; альтернативные графики — блок «Примеры для других графиков».
- Формула расчёта (4,3 недели, коэффициенты, диапазон ±10%) **не менялась**.

## Проверки

- `npm run build` — выполняется агентом после коммита.
- Сравнение сумм калькулятора до/после: логика `estimate` в `calculator-full.tsx` без изменений, только тексты UI.

## Ограничения

- Полная переработка длинных `intro` на странице аутсорсинга и всех отраслевых абзацев не завершена — обновлены hero/мета и ключевые отрасли.
- Блок «Что берём на себе» на главной частично отражён в `personas` и `process`; отдельная секция не добавлялась (сохранение вёрстки).
- Юридические документы и оферта не менялись.

## Примеры «было → стало»

- Hero H1: «…на склады…» → «Аутсорсинг персонала **для складов**…» + живое описание без «закрываем смены».
- Programmatic H1: «Грузчики в Подольск — аутсорсинг…» → «Грузчики для склада в Подольске».
- Калькулятор: «Пресечки…» → нейтральная фраза про перерывы; «Предварительный расчёт» → «Предварительный бюджет по выбранному графику».
