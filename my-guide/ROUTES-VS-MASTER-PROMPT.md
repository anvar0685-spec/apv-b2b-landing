# Фактические маршруты vs примеры в `COMPOSER-2-MASTER-PROMPT.md`

Мастер-док в корне воркспейса (`my-guide/COMPOSER-2-MASTER-PROMPT.md`) — **эталон по смыслу и структуре**, но часть **примеров URL устарела**: ранняя версия предлагала плоские связки «услуга + город» под `/uslugi/…`. В репозитории **`apv-b2b-landing`** принята другая схема.

**Локаль и префикс:** страницы живут под **`/[locale]/…`**; продуктовый режим сейчас **RU-only** (`/ru/…` в полном URL или эквивалент в конфиге next-intl).

## Услуги (`/uslugi`)

**В коде есть отдельные страницы:**

| Путь | Файл-источник контента |
|------|-------------------------|
| `/uslugi` | хаб |
| `/uslugi/autsorsing` | `service-pages/autsorsing.data.ts` |
| `/uslugi/upravlyaemyy-podryad` | `upravlyaemyy-podryad.data.ts` |
| `/uslugi/migracionnyy-uchet` | `migracionnyy-uchet.data.ts` |
| `/uslugi/podbor-personala` | `podbor-personala.data.ts` |
| `/uslugi/postoyannyy-personal` | `postoyannyy-personal.data.ts` |
| `/uslugi/nochnye-smeny` | `nochnye-smeny.data.ts` |

**В мастер-доке встречаются slug’и**, которых **нет** как отдельных маршрутов (например сезонный/круглосуточный/срочный и т.д.) — их смысл может быть **раскрыт внутри** существующих услуг или блога, но **не дублирует** отдельный URL 1:1.

## Профессии и программатика

| Назначение | Фактический паттерн |
|------------|----------------------|
| Хаб профессий | `/personal` |
| Страница профессии | `/personal/[profession]` |
| **Cross «профессия × город»** | **`/personal/[profession]/[city]`** |

Генерация: `src/app/[locale]/personal/[profession]/[city]/page.tsx` + `generateStaticParams` по спискам профессий и городов.

**Не использовать** как канон для новых текстов примеры вида **`/uslugi/gruzchiki-khimki`**, **`/uslugi/komplektovschiki-wildberries`** из §5/§6 мастер-дока — это иллюстрация интента «уникальный URL под кластер», а не текущий роутинг.

## Прочие витрины

- Отрасли: `/otrasli`, `/otrasli/[slug]`  
- Площадки: `/ploshchadki`, `/ploshchadki/[slug]`  
- География: `/geografiya`, `/geografiya/[slug]`  
- Кейсы: `/keysy`, `/keysy/[slug]`  
- Блог: `/blog`, `/blog/[slug]`  
- Калькулятор: `/kalkulyator`  
- Заявка: `/zayavka`

При расхождении между этим файлом и кодом **источник правды — дерево `src/app/[locale]` и `next.config` (редиректы).**
