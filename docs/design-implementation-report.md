# Отчёт по дизайну и редакции без фотографий (2026-10-10)

## Визуальная система

- Акцент CTA в светлой теме: `#0F766E` (`--accent`, `--cta` в `globals.css`).
- SVG: `src/components/graphics/warehouse-schematic.tsx`; привязки кейсов и отраслей — `src/lib/case-schematic.ts`, `src/lib/industry-schematic.ts`.
- Фотографии убраны из hero, менеджера, production-strip, industrial-photo-tiles; sparkline/KPI в кейсах сняты.

## Страницы и формы

- Главная: hero-схема, компактный `#process`, список `#why-us`, кейсы без графиков.
- Калькулятор: 4 шага (3 ввода + результат), резюме, `<details>` для таблицы и примеров; формула без изменений.
- Заявка: задача → контакты → проверка и отправка.
- О компании / документы / редиректы komanda·pressa → `/o-kompanii`.
- Кейсы ×6: структура «Задача → организация → итог → особенность», SVG в теле.
- Блог: крупный lead `FEATURED_BLOG_SLUG` на стр. 1, остальные карточки компактнее.
- Отрасли ×7: схема в hero (`heroAside`).

## Проверки

| Проверка | Результат |
| --- | --- |
| `npm run build` | OK |
| `npm run test` | 4/4 staffing URL |
| `check-programmatic-routes.mjs` | 8×30=240 |
| Калькулятор контроль 30 грузчиков Москва | ~3 096 000 ₽/мес (браузер) |
| Редирект `/ru/o-kompanii/komanda` | HTTP 308 |
| Фото в `src` (публичный UI) | только скрытая галерея писем (не на главной) |

Скриншоты: `docs/screenshots/editorial-design-2026-10-10/`.

## Открытые вопросы

См. `docs/copywriting-business-questions.md` (пакет документов ИП, подтверждённые кейсы).
