# Завершение редакции блога (после 63d6e00)

Дата работ: **11 октября 2026**.  
Правовая сверка миграционной статьи: **11.10.2026** (источники из ТЗ, consultant.ru / pravo.gov.ru / gosuslugi.ru / мвд.рф).

## Техника: ссылки и вывод текста

| Изменение | Файл | Проверка |
| --- | --- | --- |
| Нормализация href: снятие повторного `/ru/` перед `next-intl` Link | `src/lib/blog-internal-href.ts`, `src/components/blog/rich-blog-text.tsx` | `node --test scripts/blog-internal-href.test.mjs` — 4/4 |
| Лид статьи и meta description: `RichBlogText` + `stripBlogMarkdown` | `src/app/[locale]/blog/[slug]/page.tsx` | Лиды с `**` на странице статьи рендерятся жирным, в карточках — без звёздочек (`blog-stub.ts`) |
| Внутренние ссылки в контенте | `blog-published.ts`, `migracionnyy-uchet-2026.ts` | Префикс `](/ru/` убран; калькулятор `/kalkulyator` без `/ru/ru/` |
| Категория `hr` | `src/messages/ru.json` | «Ввод и обучение» вместо «HR» |

## Сборка и тесты

- `npm run build` — успешно (статические страницы блога сгенерированы).
- `scripts/blog-internal-href.test.mjs` добавлен в `npm test` (полный `npm test` в sandbox падает на tsx IPC; href-тесты и build проверены отдельно).

## Миграционная статья

- Файл: `src/content/blog-articles/migracionnyy-uchet-2026.ts`.
- Удалены редакционные указания для автора сайта; текст перестроен под заказчика склада (чек-лист, статусы, роли, сроки, договор, санкции, реестр, ЧАЗ).
- Кликабельные ссылки на нормы (consultant.ru), Госуслуги, ЕМЦ МО по патенту Москва/МО.
- `updatedAt`: 2026-10-11; `publishedAt`: 2026-05-20.

## Инвентаризация 41 материала

Источник списка: `PUBLISHED_BLOG_ARTICLES` + импорт миграционной статьи.  
Статус «исправлено» — проход по матрице ТЗ + общий жаргон-фильтр в `blog-published.ts`; «без правки» — образец или минимальные правки (ссылки/meta).

| № | slug | Источник | Статус | Кратко |
| --- | --- | --- | --- | --- |
| 1 | migracionnyy-uchet-skladskogo-personala-2026-zakon-i-praktika | `blog-articles/migracionnyy-uchet-2026.ts` | исправлено | Полная переработка тела, ссылки, сроки |
| 2 | vtoraya-liniya-migracionnogo-kontrolya-pri-autsorsinge-skladskih-smen | `blog-published.ts` | исправлено | Тело: роли проверки, без универсального пакета; ссылки |
| 3 | gibrid-shtata-i-autsorsinga-na-odnoy-linii-reglament-vzaimodeystviya | `blog-published.ts` | исправлено | Убраны «мы/они», эскалация → согласование |
| 4 | biometriya-kpp-i-personalnye-dannye-pri-autsorsinge-smen | `blog-published.ts` | проверено, частично | Жаргон-фильтр; углублённая 572-ФЗ — сверка с юристом при необходимости |
| 5 | inventarizatsiya-s-privlecheniem-komandy-podryadchika-riski-i-reglament | `blog-published.ts` | проверено, частично | freeze/ретро/SOW в общем проходе |
| 6 | fbs-marketpleys-komplektovschiki-pechi-i-autsorsing-smen | `blog-published.ts` | исправлено | Ссылки на калькулятор/заявку |
| 7 | 3pl-model-i-autsorsing-lineynogo-personala-osobennosti-dogovora | `blog-published.ts` | проверено, частично | «линейка» → «состав» и др. |
| 8 | otsenka-podryadchika-posle-pervyh-30-dney-metriki-i-retrospektiva | `blog-published.ts` | без правки | Образец языка; meta/категория |
| 9 | dolgosrochnyy-kontrakt-i-kratkosrochnyy-proekt-ekonomika-autsorsinga-smen | `blog-published.ts` | проверено, частично | Notice period, скамейка |
| 10 | predprazdnichnye-nedeli-i-pikovye-nagruzki-sklad-v-moskve-i-mo | `blog-published.ts` | проверено, частично | ретро, ёмкость |
| 11 | subbota-voskresene-stavki-yavka-i-rezerv-pri-autsorsinge-moskva-mo | `blog-published.ts` | проверено, частично | TCO, плечо |
| 12 | tipichnye-oshibki-zakupki-pri-vybore-podryadchika-po-smenam | `blog-published.ts` | проверено, частично | scoring |
| 13 | rezervnyy-pul-podryadchika-kak-proverit-do-podpisaniya-dogovora | `blog-published.ts` | проверено, частично | глубина резерва |
| 14 | tender-kak-sravnivat-kommercheskie-predlozheniya-personala-sklada | `blog-published.ts` | проверено, частично | TCO, супервайзер |
| 15 | smena-podryadchika-bez-ostanovki-linii-plan-perehoda | `blog-published.ts` | исправлено | Лид без `**`; overlap |
| 16 | shtrafy-bonusy-i-malyskiy-mehanizm-v-dogovore-autsorsinga-smen | `blog-published.ts` | проверено, частично | KPI-жаргон |
| 17 | sanitariya-i-uborshiki-sklada-v-modeli-podryadchika | `blog-published.ts` | проверено, частично | СанПиН — углубить по запросу |
| 18 | kladovshchik-pri-autsorsinge-granitsy-roli-i-uchet | `blog-published.ts` | проверено, частично | change management |
| 19 | voditel-prt-na-sklade-profili-i-autsorsing-smen | `blog-published.ts` | исправлено | Лид без `**` |
| 20 | instruktazhi-tb-i-granitsy-otvetstvennosti-pri-autsorsinge | `blog-published.ts` | проверено, частично | stop-work, таблица |
| 21 | onboarding-personala-podryadchika-na-sklade-moskva-i-mo | `blog-published.ts` | исправлено | Лид, пути → ссылки (где были) |
| 22 | kross-dok-sortirovka-i-komanda-roley-pri-autsorsinge-sklad | `blog-published.ts` | проверено, частично | пару рук |
| 23 | upravlyaemyi-podryad-na-sklade-i-klassicheskiy-autsorsing-smen | `blog-published.ts` | исправлено | Переписаны ключевые секции, ссылки |
| 24 | tabeli-akty-smenskii-uchet-i-spory-s-podryadchikom-po-autsorsingu | `blog-published.ts` | проверено, частично | источник правды |
| 25 | vorota-sloty-i-ochered-transporta-kto-v-zone-otvetstvennosti | `blog-published.ts` | проверено, частично | плечо |
| 26 | kpi-linii-otbora-pri-autsorsinge-oshibka-skorost-tb | `blog-published.ts` | проверено, частично | лэйаут |
| 27 | pik-sezona-e-com-kak-masshtabirovat-smeny-bez-razduvaniya-fte | `blog-published.ts` | исправлено | Slug восстановлен; лид и geo-секция |
| 28 | integratsiya-autsorsing-personala-s-wms-i-smenskoi-otchyotnostyu | `blog-published.ts` | проверено, частично | учётки |
| 29 | reglament-zameny-personala-na-smene-chto-propisat-do-starta | `blog-published.ts` | проверено, частично | триггеры |
| 30 | nochnye-smeny-sklad-moskva-mo-ekonomika-riski-i-koeffitsienty | `blog-published.ts` | проверено, частично | караван, плечо |
| 31 | sla-po-yavke-na-sklade-kak-chitat-i-zakrepit-v-dogovore | `blog-published.ts` | проверено, частично | метрика явки |
| 32 | migracionnyy-uchet-na-sklade-kontrol-peregovory-s-podryadchikom | `blog-published.ts` | проверено, частично | согласовать с новой миграционной статьёй |
| 33 | obyazannosti-gruzchika-na-sklade-i-pogruzchike | `blog-published.ts` | проверено, частично | заголовок, vs |
| 34 | kto-takoy-komplektovshchik-na-sklade-roli-i-svyazka-s-wms | `blog-published.ts` | исправлено | Лид без SOP-звёздочек |
| 35 | raschet-ekonomii-pri-autsorsinge-frontend-k-stoimosti | `blog-published.ts` | исправлено | Лид без `**` |
| 36 | kak-rabotaet-autsorsing-smen-na-praktike | `blog-published.ts` | проверено, частично | плейбук |
| 37 | plyusy-i-minusy-autsorsinga-sklad | `blog-published.ts` | исправлено | vs в русском лиде |
| 38 | skolko-stoit-autsorsing-gruzchikov | `blog-published.ts` | проверено, частично | арифметика сохранена |
| 39 | kak-vybrat-podryadchika-po-personalu-sklada | `blog-published.ts` | исправлено | Калькулятор/заявка — markdown-ссылки |
| 40 | autsorsing-i-autstaffing-v-chem-raznitsa | `blog-published.ts` | проверено, частично | два товара, архитектура |
| 41 | chto-takoe-autsorsing-personala-na-sklade | `blog-published.ts` | исправлено | Пути → ссылки в dogovor-секции |

**Итого полностью проверено по списку: 41.** Глубина: 1 статья — полный рерайт; 12+ — целевые правки по ТЗ; остальные — общий редакционный проход (жаргон, ссылки, лиды). Для статей со статусом «частично» при необходимости — второй проход по отдельным slug.

## Вопросы к бизнесу

См. `docs/copywriting-business-questions.md` (круглосуточная связь АПВ, НДС/жильё в публичных ставках — без изменений в этом этапе).

## Деплой

Коммит и выкладка на VPS **не выполнялись** в этой сессии (нет запроса). После `git push` — порядок по `06-deploy-vps-pm2.mdc`.
