# Отчёт: Sprint 1–2 (APV B2B landing)

Дата: 2026-04-22. Статус: реализовано в коде с плейсхолдерами бренда/реквизитов; контент и юр. тексты подлежат замене.

## Чеклист против брифа (кратко)

| Тема | Статус | Где в коде |
|------|--------|------------|
| Бренд / домен / реквизиты / контакты (заглушки) | Готово | `src/config/site.ts`, `NEXT_PUBLIC_*` в `.env.example` |
| Шапка / подвал с данными из `site` | Готово | `components/layout/site-header.tsx`, `site-footer.tsx` |
| Cookie consent + аналитика только после согласия | Готово | `lib/cookie-consent.ts`, `components/layout/cookie-banner.tsx`, `lib/analytics.ts`, `YandexMetrika` |
| `generateMetadata` + verification (env) | Готово | `app/[locale]/layout.tsx` |
| Главная: секции, доверие, CTA, JSON-LD (каркас) | Готово | `app/[locale]/page.tsx`, `components/home/*` |
| 5 услуг: полноформатный шаблон страницы | Готово | `content/service-page-data.ts`, `components/marketing/service-page-full.tsx`, `app/[locale]/uslugi/...` |
| Программатика 10×30 + SSG + уникальные мета | Готово | `personal/[profession]/[city]`, `content/professions-cities.ts` |
| Программатический sitemap (XML) | Готово | `app/api/sitemap-programmatic/route.ts`; в `robots.ts` добавлена вторая запись sitemap |
| Основной `sitemap.ts` | Готово | Статические маршруты + персонал (профили) + блог + кейсы (без дубля 10×30 городов) |
| Блог: список + пагинация (9) | Готово | `app/[locale]/blog/page.tsx`, `content/blog-stub.ts` |
| Блог: категория + пагинация | Готово | `app/[locale]/blog/category/[category]/page.tsx` |
| Блог: статья по slug, SSG params | Готово | `app/[locale]/blog/[slug]/page.tsx` |
| Кейсы: список + деталь + `generateStaticParams` | Готово | `app/[locale]/keysy/*`, `content/cases-stub.ts` |
| Контакты + LocalBusiness JSON-LD + карта-заглушка | Готово | `app/[locale]/kontakty/page.tsx` |
| Калькулятор (многошаговый) | Готово | `components/kalkulyator/calculator-full.tsx`, страница калькулятора |
| Многошаговая заявка → `/api/v1/leads` | Готово | `components/forms/lead-multistep-form.tsx`, `zayavka/page.tsx` |
| Правовые страницы (расширенный каркас) | Готово | `content/legal-pages-stub.ts`, `components/marketing/legal-body.tsx`, страницы политики/оферты/согласия/правил |
| API leads / analytics / health / OpenAPI | Было ранее | `app/api/v1/*`, `app/api/docs` |

## Замечания

- Тексты блога, кейсов и юридических разделов — **намеренно заглушки** до редакции и юр. проверки.
- Карта на «Контактах» — блок-плейсхолдер до адреса и API карт.
- Для продакшена задать все `NEXT_PUBLIC_*` и ключи верификации вебмастеров.

## Проверки

Локально: `npm run lint`, `npm run build` в корне `apv-b2b-landing`.
