# Отчёт о внедрении редакции (октябрь 2026)

**Источники:** полная редакция (проход 1, `ca86dc6`); завершение (`5dc57e5`); **`Cursor_АПВ_Система_финальные_исправления.md`** (проход 3).

## Проход 3 — финальные исправления (окт 2026)

| Пункт | Файлы | На странице | Проверка |
| --- | --- | --- | --- |
| Город в калькуляторе и заявке | `staffing-url-params.ts`, `calculator-full.tsx`, `lead-multistep-form.tsx`, `programmatic-*` | Query `city`/`p` читается; Podolsk/Domodedovo не сбрасываются в Москву; CTA городских страниц с profession+city | `npm run test` (4 кейса), build |
| Часы менеджера | `manager-contact.ts`, `manager-card.tsx` | Едино «Пн–Пт, 9:00–18:00 (МСК)» сверху и внизу карточки | build |
| Главная | `ru.json` | serviceScope lead, профессии, плитки подбор/ночь, calcLead, trust sr-only, monthHint мини-калькулятора | build |
| Аутсорсинг остатки | `autsorsing.data.ts`, `service-page-full.tsx` | howLead, casesLead, positioning + ссылка на подбор, FAQ стоимости | build |
| 3 услуги | `recruiting/postoyannyy/nochnye.data.ts`, `shared-service-copy.ts` | Полное тело, FAQ, CTA «Получите расчёт…», без таблицы сравнения | build |
| Programmatic 240 | `programmatic-longread.ts`, `copywriting-editorial.ts` | Без повтора hero; блок «Что уточним» по профессии | build 240 URL |
| Кейсы ×6 | `cases-stub.ts` | ПРР расшифрованы; marketplace — абзац про другого подрядчика; смягчены абсолютные KPI | build |
| Отрасли ×4 правки | `industry-page-content.ts` | 3PL, производство, фарма, FMCG — готовые фразы | build |
| Таблица ставок | `shift-pricing-table.tsx` | Пояснение месячных примеров vs чередование работников | build |

```text
npm run test   → 4/4 pass
npm run build  → exit 0, 347 страниц
```

Формула полного калькулятора и `estimate.ts` не менялись. Контроль 30 грузчиков / Москва / 40 ч — по прежним значениям промпта (ручная сверка при приёмке).

## Проход 5 — редакция и дизайн без фотографий (2026-10-10)

| Пункт | Файлы | Проверка |
| --- | --- | --- |
| Кейсы стройматериалы / 2 склада | `cases-stub.ts` | Тексты §4.1–4.2 |
| Город калькулятора, email заявки | `calculator-full.tsx`, `ru.json` | Браузер: подпись города, hint PDF |
| Калькулятор 3+1 шага | `calculator-full.tsx` | 3 096 000 ₽ контроль, 4 шага UI |
| Заявка: задача → контакты → проверка | `lead-multistep-form.tsx` | Порядок шагов |
| Фото сняты | hero, manager, production-strip | curl/rg HTML |
| Командa/Пресса | `next.config.mjs`, sitemap, `o-kompanii` | 308 на `/o-kompanii` |
| Дизайн | `warehouse-schematic.tsx`, process, why-us, `--accent` | `design-implementation-report.md` |

## Проход 4 — закрытие остатков после b7fc7b0

| Пункт | Файлы | Проверка |
| --- | --- | --- |
| Аутсорсинг | `service-page-full.tsx`, scroll-story | «Что берём на себя», howLead вместо howStoryLead на этапах |
| 3 услуги | `types.ts`, `*.data.ts`, `service-page-full.tsx` | «Об услуге» / кастомные заголовки; CTA «Рассчитать стоимость» |
| #why-us | `ru.json` | «Почему с нами удобно работать» + 6 карточек |
| Кейсы ×6 | `cases-stub.ts`, `keysy/[slug]/page.tsx` | Нейтральные metricUp/challenge/solution/outcome; цитаты скрыты |
| Таблица цен | `shift-pricing.ts` | Подписи «График склада…» без «на 1 чел.» |
| Programmatic | `check-programmatic-routes.mjs` | 8×30=240, longread без жаргона |

```text
npm run test && npm run build → OK
```

## Проход 2 — сводная таблица

| Раздел | Файлы | На странице | Проверка | Остаток |
| --- | --- | --- | --- | --- |
| Главная | `page.tsx`, `home-service-scope.tsx`, `service-scope.ts`, `ru.json`, `hero-rate-panel.tsx`, `cases-stub.ts`, `home-sections.tsx` | Блок «Что берём на себя», лента 7 направлений, ставки «Базовые…», укороченные кейсы, убраны дублирующие band/tech | `npm run build` OK | KPI на карточках кейсов (качественные метрики) — по желанию упростить на детальных страницах |
| Аутсорсинг | `autsorsing.data.ts`, `service-page-full.tsx`, `shift-pricing-table.tsx` | Короткий intro, 4 задачи, 4 этапа, 5 включений, текст модели вместо таблицы, FAQ 6 вопросов, CTA «Получите расчёт…» | build + шаблон страницы | EN-блок услуги не переписывался |
| Каталог отраслей | `otrasli/page.tsx`, `site-structure.ts` | H1 «Персонал для разных типов складов», карточки с lead | build | — |
| 7 отраслей | `industry-page-content.ts`, `industry-staffing-body.tsx`, `otrasli/[slug]/page.tsx` | Компактная структура: задачи → уточнить → профессии → расчёт → ссылки | build SSG 7 URL | `commercial-editorial.ts` для отраслей больше не рендерится (legacy) |
| Title бренда | `lib/seo.ts`, meta в `ru.json`, `autsorsing.data.ts`, `blogIndex` | Один суффикс «\| АПВ - СИСТЕМА» из `buildPageMetadata` | логика `titleHasBrand` | Проверить редкие страницы с кастомным title вручную при SEO-аудите |
| Карточки блога | `blog-stub.ts`, `blog-reading-time.ts` | Excerpt без `**` в списке | build | Старые `readingTime` в data — игнорируются, считаются динамически |
| Статья 30 дней | `blog/[slug]/page.tsx` RichParagraph | Ссылки на `/ru/kalkulyator` и `/ru/kontakty` кликабельны | build | — |
| Время чтения | `computeArticleReadingMinutes` | 200 слов/мин, ceil, min 1; статья 30 дней ≈ **2 мин** (было 6 в data) | tsx smoke | — |
| Менеджер | `manager-card.tsx` | «Пн–Пт, 9:00–18:00», текст приглашения по промпту; убраны «онлайн» и 15 мин | визуально | Часы — нейтральная редакция до подтверждения владельцем (см. business-questions) |
| Калькулятор / ставки | без изменений логики `estimate` | Пояснение 4,3 недели в таблице цен | build | — |

## Проход 1 (кратко)

- Центральный слой programmatic, hero/FAQ/процесс, калькулятор (только UI), 40 статей блога (1 полный рерайт).
- Коммит: `ca86dc6`.

## Проверки прохода 2

```text
npm run build  → exit 0, 347 страниц
```

Push и деплой по промпту завершения **не выполнялись** (отдельное поручение владельца).

## Примеры до/после

- Title главной: «…\| АПВ — СИСТЕМА \| АПВ - СИСТЕМА» → один суффикс бренда.
- Аутсорсинг intro: 12 абзацев жаргона → один абзац «Как организуем работу».
- Отрасли: общий хвост про пилот/KPI → структурированные блоки в `IndustryStaffingBody`.
- Карточка менеджера: «Онлайн · 15 минут» → «Пн–Пт, 9:00–18:00 (МСК)».

## Итог

Обязательные пункты промпта завершения закрыты в коде и прошли production build. Юридические документы, формула калькулятора и реквизиты не менялись.
