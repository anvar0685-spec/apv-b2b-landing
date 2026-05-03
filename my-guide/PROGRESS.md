# Прогресс разработки (живой трекер)

**Назначение:** единая точка правды по статусу 6-недельного плана. Агент и человек **обновляют чекбоксы и колонку «Комментарий»** после значимых шагов (не обязательно каждый коммит).

**Связанные документы**

- SEO-аудит (роль 04): [`SEO-AUDIT-FULL-2026-04-23.md`](./SEO-AUDIT-FULL-2026-04-23.md)
- Чеклист выкладки SEO в прод: [`PROD-SEO-LAUNCH.md`](./PROD-SEO-LAUNCH.md)
- База знаний контента (роль 03, конъюнктура, словарь): [`OUTSOURCING-CONTENT-KNOWLEDGE-BASE.md`](./OUTSOURCING-CONTENT-KNOWLEDGE-BASE.md)
- Итог по блогу (2026-04-23): [`ROLE03-FINAL-REPORT-BLOG-2026-04-23.md`](./ROLE03-FINAL-REPORT-BLOG-2026-04-23.md)
- Финальный аудит + чеклист: [`FINAL-AUDIT-CHECKLIST.md`](./FINAL-AUDIT-CHECKLIST.md)
- Сверка URL с мастер-доком: [`ROUTES-VS-MASTER-PROMPT.md`](./ROUTES-VS-MASTER-PROMPT.md)
- План по неделям (кратко): [`.cursor/rules/01-six-week-roadmap.mdc`](../.cursor/rules/01-six-week-roadmap.mdc)
- План детально: [`SIX-WEEK-PLAN.md`](./SIX-WEEK-PLAN.md)
- Бриф визуала: [`WEB-DESIGN-BRIEF.md`](./WEB-DESIGN-BRIEF.md)
- Цели Метрики: [`YANDEX-METRIKA-GOALS.md`](./YANDEX-METRIKA-GOALS.md)
- Роль 05 — финальный текстовый аудит: [`.cursor/rules/05-copywriter-outsourcing-auditor.mdc`](../.cursor/rules/05-copywriter-outsourcing-auditor.mdc), отчёт: [`COPYWRITER-FINAL-AUDIT-REPORT.md`](./COPYWRITER-FINAL-AUDIT-REPORT.md)

**Легенда:** `done` — закрыто по смыслу недели · `partial` — каркас/редакция без финальных тарифов/медиа от заказчика · `blocked` — ждём вводных.

---

## Сводка для нового агента (что реально есть / чего нет)

**Репозиторий:** только каталог **`apv-b2b-landing/`** (git `main`). Родительская папка «АПВ - СИСТЕМА» в git не трекается.

**Последнее крупное обновление трекера (2026-05-03):** **UI без повторяющихся боковых «дашборд-карточек»** — удалены компактные tech-widget’ы с внутренних hero/hub; вместо них **фоновое поле** `ux-tech-field-light` (сетка + градиенты) на светлых секциях и **полноширинные рельсы** `ProgrammaticFlowRail` на programmatic (середина лонгрида + компактный футер ссылок). Страницы **`/kalkulyator`** и **`/zayavka`** обёрнуты в **`ConversionPageShell`** (тот же визуальный контракт + дисклеймеры в `ru.json`). Каталог **`/uslugi`**: флагман без `Card` — вертикальный акцент и типографика. Зафиксировано здесь по запросу заказчика (видимая запись в трекере).

**Предыдущее крупное обновление трекера (2026-05-02):** **прод-деплой на VPS (Timeweb)** — приложение за **nginx → PM2 → Next standalone**; middleware учитывает **`X-Forwarded-*`** (корректные редиректы не на `localhost`); **`localePrefix: "always"`** из‑за ограничения **standalone** (канон главной **`/ru`**); в **`ru.json`** синхронизированы ключи под **`PartnersStrip`** и **`homePage.stats.items`** (плюс **`entries`** для локальной версии счётчиков). Домен и **HTTPS** — сознательно позже.

**Предыдущее крупное (2026-04-29):** **выравнивание позиционирования** — только **аутсорсинг складского персонала** на склады Москвы и МО: убраны **HoReCa** и **стройка** с главной и из **`migration.data.ts`**; кейсы **`horeca-set`** / **`stroitelstvo-obekt`** заменены на складские истории (**`regionalnyj-rc-pik`**, **`sklad-rasshirenie-mo`**) + редиректы в **`next.config.mjs`**; **`proizvodstvo-mo`** переписан под склад отгрузки; programmatic meta/H1/лонгрид и FAQ — единый закупочный язык. Блог — **`40`** статей; билд — см. «Последнее обновление». Предыдущее крупное (2026-04-23): **`/uslugi/autsorsing`**. **Тон под рынок:** [`COMPETITOR-VOICE-BENCHMARK.md`](./COMPETITOR-VOICE-BENCHMARK.md), [`TEXT-AUDIT-ROLE03-HUMAN-RU.md`](./TEXT-AUDIT-ROLE03-HUMAN-RU.md), база [`OUTSOURCING-CONTENT-KNOWLEDGE-BASE.md`](./OUTSOURCING-CONTENT-KNOWLEDGE-BASE.md) (§13 — микро-шаблоны). **2026-04-23 (блог):** нормализация всего `blog-published.ts` + отчёт [`ROLE03-FINAL-REPORT-BLOG-2026-04-23.md`](./ROLE03-FINAL-REPORT-BLOG-2026-04-23.md).

### Сделано в коде (можно продолжать с этого состояния)

| Область | Факты |
|--------|--------|
| Услуги | Страницы `/uslugi/*`: `autsorsing`, `upravlyaemyy-podryad`, `migracionnyy-uchet`, `podbor-personala`, `postoyannyy-personal`, `nochnye-smeny`; контент в `src/content/service-pages/*`, `getServicePage`, `ServicePageFull`, JSON-LD Service+FAQ. **`autsorsing`**: расширенный текст + SEO-поля в data, мета и ключевые слова. Редирект `/uslugi/autstaffing` → статья блога про отличие моделей. |
| Персонал | Хаб `/personal`, programmatic `/personal/[profession]/[city]` **на RU**, `profession-icons.tsx`; приоритетные 30 — расширенный текст; **остальные пары** — **`getProgrammaticLocalNarrative`** + городские абзацы **`programmatic-city-local.ts`** в **`ProgrammaticStaffingPage`**. |
| Отрасли / площадки / гео | `CommercialSeoPage` + **`editorialParagraphs`** из `commercial-editorial.ts`; **`MoDistrictMap`** на `/geografiya`. |
| Блог | **40** статей в **`blog-published.ts`**, хаб **`/blog`** и категории; **`BlogPosting` JSON-LD**; карточки через **`PremiumBlogCard`** (интерфейс RU). Контент: лонгриды под аутсорсинг складских смен (закупка, SLA, ТБ, роли, TCO, миграция, compliance); даты публикаций апрель–июнь 2026 (по данным в коде). |
| Шапка | `site-header-client.tsx`: grid, навигация, drawer. |
| Футер | **`site-footer.tsx`**: бренд **АПВ - СИСТЕМА**, полное наименование **ИП Махмадов**, ИНН/ОГРНИП, юр. адрес (Люберцы). |
| Реквизиты | **`config/site.ts`**: ИНН, ОГРНИП, адрес, р/с, БИК, к/с, банк; дубли в **`.env.example`** для прода. |
| Кейсы / заявка / о компании | **`/keysy`**, **`/keysy/[slug]`**; **`/zayavka`** + **`LeadMultistepForm`**; **`/o-kompanii`** + `aboutPage`. |
| SEO-мета | **`generateMetadata` + `buildPageMetadata`**; опционально **`keywords`** в `buildPageMetadata`; тексты в **`pagesSeo`** и **`ru.json`**. Для **`autsorsing`** — переопределение title/description из **`autsorsing.data.ts`**. |
| Правила Cursor | **`00`–`05`** в корне воркспейса и в **`apv-b2b-landing/.cursor/rules/`**; деплой/VPS — в **`00-agent-workflow`**; финальная вычитка текстов — **`05-copywriter-outsourcing-auditor`**. |
| Прод (техника) | VPS: **nginx** прокси на **127.0.0.1:3000**, **PM2** крутит **`.next/standalone/server.js`**; скрипты **`deploy/*`**; **git pull + `npm run build:vps`** на сервере после пуша в **`main`**. |
| Прайс и контакты | **`warehouse-hourly-rates.ts`**: 600 грузчики/разнорабочие, 650 комплектовщики (+ упаковщики/сборщики-упаковщики как смежная линейка), 680 кладовщики, 800 водители ПРТ; остальные slug — ориентиры в коде. **`site`**: телефон **+7 (925) 437-12-11**, WhatsApp, Telegram **@LVHanter**; синхрон текстов: главная (услуги), FAQ, калькулятор, мета калькулятора, `autsorsing.data`. |

### Не сделано или не закрыто без заказчика (не врать новому агенту)

| Что | Почему |
|-----|--------|
| **Финальные тарифы в публичном юридическом смысле, медиа, ERID** | До выдачи **ERID** в ОРД — плейсхолдер в `site.erid`; фото/видео объекта — от заказчика. Публичные цифры на сайте — ориентиры до утверждённого КП/договора. |
| **Локальный текст на все programmatic URL** | **done:** базовый лонгрид (`programmatic-longread.ts`) + блок «Локальный контекст» для **всех** пар через **`getProgrammaticLocalNarrative`** (`cross-priority-narratives.ts` + **`programmatic-city-local.ts`**); приоритетные 30 — прежний расширенный merge (BY_PRO+BY_CITY+BRIDGE). |
| **§5 мастер-дока 1:1 по URL** | Сверка зафиксирована в **`ROUTES-VS-MASTER-PROMPT.md`** (фактические маршруты vs устаревшие примеры в мастер-доке). |
| **Прод API лидов / env** | Роут `/api/v1/leads`; smoke на проде — отдельно. |
| **Недели 7–8** | Калькулятор расширен, кейсы — 9 шт. в `cases-stub.ts`; детали — таблица «После 6 недель». |
| **Юрстраницы** | Полноформатный текст: **`legal-site-documents.ts`**; остаётся **вычитка юристом** перед жёстким продом. |

### Куда смотреть в первую очередь

- План: **`SIX-WEEK-PLAN.md`**, мастер: **`COMPOSER-2-MASTER-PROMPT.md`**, прогресс (этот файл).
- Правила агента: **`apv-b2b-landing/.cursor/rules/`** (`00` … `05`).
- Сборка: из **`apv-b2b-landing/`** → **`npm run build`**.

---

## Дорожная карта — что осталось до прода (по смыслу, не «ещё фича»)

Порядок: сначала **риски и деньги**, потом **инфра**.

| # | Задача | Статус |
|---|--------|--------|
| 1 | **Юрист:** вычитка политики ПДн, оферты, согласия, правил под факт ведения бизнеса и **ИП Махмадов** | [ ] human |
| 2 | **Хостинг + домен + HTTPS** | partial: VPS + nginx + PM2 + **standalone** на боевом IP; **домен + TLS + финальный `NEXT_PUBLIC_SITE_URL`** — позже |
| 3 | **Прод `.env`:** `NEXT_PUBLIC_SITE_URL`, `DATABASE_URL`, `REDIS_URL` (если нужен), `JWT_SECRET` (длинный случайный), реквизиты/телеметрия по необходимости | [ ] |
| 4 | **Смоук-лиды:** с прод-домена отправить заявку → запись/уведомление (как настроите: БД, почта, Amo, Telegram) | [ ] |
| 5 | **Яндекс.Метрика:** рабочий `YANDEX_METRICA_ID` / счётчик на домене прода | [ ] |
| 6 | **ERID** (если идёте в рекламу с креативами) — вместо `ERID-TBD` | [ ] optional |
| 7 | **Согласование публичных цифр/тарифов** с вами как с заказчиком (сайт = ориентир до КП) | [x] заказчик подтвердил ориентиры (2026-04); юр./реклама — см. ERID и вычитку |

**Не блокирует прод:** второй `locale`, лонгриды по отраслям, EN-витрина — **осознанно вне скоупа** при RU-only.

---

## Неделя 1 — Дизайн-система + шаблон коммерческой страницы

| Задача | Готово | Комментарий |
|--------|--------|-------------|
| `WEB-DESIGN-BRIEF.md` | [x] | done: v1 в файле (2026-04). |
| `priority-pages-teasers.ts` | [x] | done. |
| `GLOSSARY.md` | [x] | done 2026-04-23: расширенные секции (продукт, закупка, склад, programmatic URL). |
| `CommercialSeoPage` + крошки | [x] | done + **editorialParagraphs** (нед. 4) для уникального тела. |
| Локализация hero / якоря (RU) | [x] | done: `ru.json` единственный; EN locale снят (см. сводку выше). |

---

## Неделя 2 — Главная §6.1 + лиды + Метрика

| Задача | Готово | Комментарий |
|--------|--------|-------------|
| Блоки главной (RU) | [x] | done. |
| FAQ 8–12 + JSON-LD | [x] | done: `ru.json` (без `en.json`). |
| Форма RHF + Zod | [x] | done. |
| API лидов + аналитика | [x] | partial: роут `/api/v1/leads` в билде; **смоук и прод-env — в дорожной карте «до прода»**. |
| Яндекс.Метрика | [x] | done: код + цели; **ID счётчика в прод** — в дорожной карте. |
| OG главной | [x] | done. |
| Полировка форм (focus / error / success) | [x] | done 2026-04-28: `LeadMultistepForm`. |

---

## Неделя 3 — Услуги §5 + профессии

| Задача | Готово | Комментарий |
|--------|--------|-------------|
| Маршруты `/uslugi/*` | [x] | done: все 7 slug; UI и мета **RU**; Service+FAQ JSON-LD. |
| Шаблон услуги / персонала | [x] | done: `ServicePageFull` (тёмный hero, иконки профессий), programmatic **RU**. |
| Контент 7 услуг + профессии | [x] | done по слою копирайта: intro/FAQ RU+заготовки EN в data; **тарифы** — витринные ориентиры (**согласованы с заказчиком**); programmatic — см. нед. 5. **`autsorsing`** — расширенный лонгрид + SEO-поля в data (2026-04). |
| Service JSON-LD | [x] | done. |
| Иконки профессий | [x] | done: `profession-icons.tsx`. |

---

## Неделя 4 — Отрасли, площадки, география

| Задача | Готово | Комментарий |
|--------|--------|-------------|
| Маршруты | [x] | done. |
| Уникальные тексты (RU) | [x] | done: `commercial-editorial.ts` — блоки RU; EN в объекте — **не на сайте** при RU-only. Лонгрид на каждый slug — опционально. |
| Карта МО (статика) | [x] | done: `MoDistrictMap` + подписи к точкам. |
| Sitemap + canonical | [x] | done; programmatic `/personal/*/*`, рубрики `/blog/category/*` и прочее — в одном `sitemap.xml`; см. [`PROD-SEO-LAUNCH.md`](./PROD-SEO-LAUNCH.md). |

---

## Неделя 5 — Cross-страницы

| Задача | Готово | Комментарий |
|--------|--------|-------------|
| Шаблон + `generateStaticParams` | [x] | done: `personal/[profession]/[city]`; блок локального контекста на **всех** парах. |
| 30 приоритетных cross | [x] | done: `cross-priority.ts` — 10 профессий × Москва/Химки/Подольск; расширенный merge в **`getPriorityCrossNarrative`**; на странице — бейдж «приоритетный кластер». |
| Остальные programmatic пары | [x] | done 2026-04-23: **`getProgrammaticLocalNarrative`** + **`programmatic-city-local.ts`** (2 абзаца на город + профиль + CTA). |
| QA шаблонности | [x] | done: приоритетные 30 — уникальный BRIDGE; прочие — осознанный шаблон города/профиля с вариативностью по `nameRu`. |

---

## Неделя 6 — Блог

| Задача | Готово | Комментарий |
|--------|--------|-------------|
| Long-read шаблон | [x] | done: TOC, секции, related, CTA; `/blog/[slug]` + `locale`. |
| 10 статей | [x] | done → расширено до **40** slug в `blog-published.ts` (2026-04); редакционная финальная вычитка заказчиком — по желанию. |
| Article JSON-LD | [x] | done: `BlogPosting` на странице статьи. |
| Блог в sitemap | [x] | done: из `BLOG_POSTS` / опубликованных slug. |

---

## После 6 недель (нед. 7–8 мастер-дока)

| Задача | Готово | Комментарий |
|--------|--------|-------------|
| Калькулятор §7 расширение | [x] | done: `calculator-full.tsx`, 6 шагов; `ContactStack` (бывш. QuickContactDock + CallbackFab). |
| Кейсы | [x] | done: 9 кейсов RU + поля `*En` в `cases-stub` (EN **не** на витрине при RU-only). |

---

## Отчёт: блог — 40 статей по аутсорсингу складских смен (2026-04-29)

**Файл данных:** `apv-b2b-landing/src/content/blog-published.ts` (`PUBLISHED_BLOG_ARTICLES`).

**Объём:** **40** материалов с полями slug, title, excerpt, категория, дата, readingTime, блок автора, секции с абзацами (включая выделения `**...**` для страницы статьи). Англоязычные поля (`titleEn`, `excerptEn` и т.д.) сохранены для типов и совместимости; на сайте при **RU-only** отображается русская подача.

**Угол и релевантность:** тексты ведутся от лица **подрядчика по поставке смен** на склады (явка, замена, SLA, КП, договор, ТБ, WMS, закупка, TCO, Москва и Московская область), без продажи аутстаффинга как целевого продукта; пересечение с позицией сайта — через отсылки к `/uslugi/autsorsing`, `/zayavka`, калькулятору где уместно.

**Тематические кластеры (примеры):** базовая модель и границы услуги; закупка и тендер; стоимость и TCO; профессии линейки (грузчики, комплектовщики, ПРТ, кладовщики, санитария); миграционный учёт и вторая линия аудита; compliance (ТБ, ПДн, биометрия); оптимизация (WMS, FBS, инвентаризация, KPI линии); HR/онбординг и оценка подрядчика после старта.

**SEO и техника:** у каждой статьи уникальные URL `/ru/blog/{slug}`; метаданные страницы — через **`generateMetadata`** + **`buildPageMetadata`** (title = заголовок статьи, description = excerpt); на странице — **`BlogPosting`** JSON-LD. Sitemap подтягивает посты из **`blog-stub`** → те же **40** slug.

**Проверка:** `npm run build` — успешно; статические страницы блога генерируются (в последнем билде **477** общих статических страниц приложения).

---

## Отчёт: программатика — локальный контекст на всех парах (2026-04-23)

**Код:** `src/content/cross-priority-narratives.ts` — **`getProgrammaticLocalNarrative(professionSlug, citySlug)`**: для приоритетных 30 возвращает **`getPriorityCrossNarrative`**; иначе **3 абзаца профиля** из `BY_PRO` или **`defaultProParagraphs`**, **2 абзаца города** из **`programmatic-city-local.ts`** (`getCityLocalParagraphs`), закрывающий абзац с CTA на калькулятор/КП. В **`BY_PRO`** добавлен профиль **`promoutery`**.

**UI:** `ProgrammaticStaffingPage` — блок «Локальный контекст» рендерится для **каждой** сгенерированной пары; бейдж «Приоритетный кластер» только для `isPriorityCross`.

**Документы:** расширен **`GLOSSARY.md`**; добавлен **`ROUTES-VS-MASTER-PROMPT.md`** (фактические маршруты vs примеры из мастер-дока). Обновлён **`FINAL-AUDIT-CHECKLIST.md`** (п. 2.4–2.5).

**Проверка:** `npm run build` (2026-04-23) — **OK**, **477** статических страниц.

---

## Отчёт: позиционирование — только складской персонал (2026-04-29)

**Задача:** убрать противоречия аудита (HoReCa, стройка, размытая терминология); закрепить **аутсорсинг персонала на склады** Москвы и МО.

**Файлы:** `src/messages/ru.json` (hero/trust-секторы, hero dashboard); `src/content/faq-items.ts` (сроки без ИТ); `src/content/service-pages/migration.data.ts` (интро и сегменты — только склады/логистика); `src/content/cases-stub.ts` (новые slug **`regionalnyj-rc-pik`**, **`sklad-rasshirenie-mo`**; правка **`proizvodstvo-mo`**); `next.config.mjs` (редиректы со старых slug кейсов); `programmatic-staffing-page.tsx`, `personal/.../page.tsx`, `programmatic-longread.ts`, `programmatic-city-local.ts`; **`FINAL-AUDIT-CHECKLIST.md`** п. 2.1.

**Проверка:** `npm run build` (2026-04-29) — **OK**, `exit 0` (~100 с учётом повторов загрузки шрифтов).

---

## Последнее обновление

- **Дата:** 2026-05-02  
- **Кто:** agent  
- **Что:** прод на VPS (nginx, PM2, standalone); правки **middleware** / **routing** / **`ru.json`** под прод; главная отдаёт **200** по цепочке **`/` → `/ru`**.  
- **Предыдущее крупное:** 2026-04-29 — позиционирование «только склады» + блог 40 статей.  
- **Следующий шаг:** работа над сайтом до привязки домена; затем **HTTPS**, **`NEXT_PUBLIC_SITE_URL`** / **`NEXT_PUBLIC_SITE_DOMAIN`** на финальный origin; юридическая вычитка; смоук лидов и Метрика на домене прода.
