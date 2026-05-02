# Финальный отчёт копирайтера-аутсорсера (роль 05)

**Назначение:** единый документ по результатам **полной вычитки** всех пользовательских текстов сайта (RU). Обновляется агентом в режиме **`05-copywriter-outsourcing-auditor.mdc`**.

**Связанные материалы:** [`TEXT-AUDIT-ROLE03-HUMAN-RU.md`](./TEXT-AUDIT-ROLE03-HUMAN-RU.md), [`OUTSOURCING-CONTENT-KNOWLEDGE-BASE.md`](./OUTSOURCING-CONTENT-KNOWLEDGE-BASE.md), [`COMPETITOR-VOICE-BENCHMARK.md`](./COMPETITOR-VOICE-BENCHMARK.md).

---

## Статус

| Поле | Значение |
|------|----------|
| Дата последнего полного прохода | **2026-05-02** |
| Ответственный (человек / агент) | agent (роль 05) |
| Версия сайта / коммит | Рабочая копия `apv-b2b-landing`; эталонный коммит **`main`:** `ccc4395` |
| Методология | Сканирование по маркерам (`контур`, `онбординг`, `throughput`, `cost per shift`, латиница в RU-блоках); выборочное чтение ключевых файлов; **не** построчное чтение каждого programmatic URL вручную (тысячи страниц — оценка по шаблонам и общим блокам). |

---

## 1. Резюме

Текстовый массив сайта **в целом выдержан в закупочном регистре B2B**: явка, замены, SLA, договор, Москва/МО, граница с аутстаффингом проговаривается там, где нужно. Серия из **40** статей блога по смыслу однородна и усиливает позиционирование «поставка смен подрядчиком».

Однако остаётся **системная проблема второго порядка**: перегруз операционным словом **«контур»** (десятки вхождений в блоге, кейсах, услугах, programmatic-блоках) и **вкрапления английских коллокаций в русские пользовательские строки** (`cost per shift`, `throughput`, `managed service` в RU-текстах услуги managed, латиница в заголовках карточек главной). Это не ломает смысл, но **снижает ощущение «живого русского»** и совпадает с предупреждениями из **`TEXT-AUDIT-ROLE03-HUMAN-RU.md`**.

На главной в блоке «Проблема → решение» заголовок ячейки **«Compliance»** и слово **«онбординг»** в теле — прямое попадание в чеклист аудита 2026-04-23.

Юридические тексты (`legal-site-documents.ts`) по стилю нейтральны; финальная правда — у юриста человека.

---

## 2. Критические замечания (P0)

**Явных P0 в смысле «юридически опасная ложь» или «абсурд для пользователя» по результатам этого прохода не выявлено.** Публичные обещания в основном завязаны на КП/договор или сформулированы как ориентиры.

| № | Где (файл / URL) | Проблема | Рекомендация |
|---|------------------|----------|--------------|
| — | — | — | Держать планку: не добавлять новые безусловные KPI без источника и договорной оговорки. |

---

## 3. Важные правки (P1)

| № | Где | Проблема | Рекомендация |
|---|-----|----------|--------------|
| 1 | `src/messages/ru.json` → `homePage.pain.cells.deficit.body` | Слово **«онбординг»** в пользовательском тексте главной. | Заменить на нейтральное: «ввода на объект / первых смен / обучения на линии» (как в [`TEXT-AUDIT-ROLE03-HUMAN-RU.md`](./TEXT-AUDIT-ROLE03-HUMAN-RU.md)). |
| 2 | `src/messages/ru.json` → `homePage.pain.cells.compliance.title` | Заголовок карточки целиком латиницей **«Compliance»**. | Заменить на русский заголовок, напр.: **«Требования и учёт»** или **«Комплаенс (152-ФЗ, миграция)»** — без голого английского в H-уровне карточки. |
| 3 | `src/content/service-pages/managed.data.ts` → блок `ru` | В русском тексте встречаются **«cost per shift»**, **«managed service»** (в т.ч. в FAQ). | Перевести на русский закупочный язык: «стоимость смены», «управляемый подряд»; английское название модели — максимум один раз в скобках в подзаголовке, не в каждом абзаце. |
| 4 | `src/content/cases-stub.ts` | В русских полях кейсов: **throughput**, **«Cost per shift»** (RU outcome), **онбординг**. | Заменить: «выработка смены», «стоимость смены», «единый ввод на объект / стартовые смены». |
| 5 | `src/messages/ru.json` → блок метаданных кейсов (`keysy`) | `metaDescription` содержит **throughput**, **compliance** латиницей в русском описании. | Переписать мета на русские термины (или транслитерацию комплаенса по правилам бренда). |
| 6 | `src/content/commercial-editorial.ts` | Фраза с **cost per shift** в русском абзаце. | «Стоимость смены» / «₽ за смену в модели». |
| 7 | `src/content/cross-priority-narratives.ts` | Строка **«COO+фин: один cost per shift…»** — смесь языков в одном лозунге. | Полностью русская формулировка или аккуратное «COO и финансы: одна метрика стоимости смены». |
| 8 | Блог `blog-published.ts` (русские секции) | Высокая плотность **«контур»**; отдельные заголовки со словом **«Онбординг»** (slug `onboarding-personala-podryadchika-...`). | Пройти волной: **30–40% замен** «контур» на «цепочка / зона ответственности / регламент / документооборот» по контексту; в заголовке статьи про онбординг — русский эквивалент («Ввод подрядчика на объект» и т.п.). |

---

## 4. Полировка (P2)

| № | Где | Проблема | Рекомендация |
|---|-----|----------|--------------|
| 1 | `src/messages/ru.json` → `homePage.heroDashboard` | Ключ `throughput` — в интерфейсе подпись смешивает EN и RU (значение уже русское). | Переименовать ключ/подпись на полностью русскую («Выработка линии» без англ. ярлыка в коде/переводе). |
| 2 | `src/messages/ru.json` → `trustSectors` hints | Плотность аббревиатур (**DC**, **FBS**, **FMCG**, **3PL**, латинское **compliance** в подсказке). | Для витрины главной допустимо; при желании унифицировать: пояснения по-русски в скобках у первого вхождения в блоке. |
| 3 | `src/messages/ru.json` | Роли в отзывах **COO**, **CFO**, **HRD** — норма для целевой аудитории. | Оставить; альтернатива — «операционный директор» в скобках один раз. |
| 4 | `service-pages/autsorsing.data.ts` (RU) | Абзац с вводным **«Compliance:»** латиницей. | «Требования охраны труда и учёта:» или «Соблюдение норм (ОТ, …):». |
| 5 | `service-pages/managed.data.ts` (RU) | Подзаголовок **«managed service»** в скобках в H1. | Либо только русский H1, либо один раз «управляемый подряд (managed service)» без повторов в тексте. |
| 6 | Programmatic: `programmatic-city-local.ts`, `commercial-editorial.ts`, `faq-items.ts`, `nochnye-smeny.data.ts`, `migration.data.ts`, `recruiting.data.ts` | Много «контур» подряд — визуальная однообразность при серфинге десятков URL. | Редакторская ротация синонимов (смысл не менять). |
| 7 | Все **40** статей блога | Заголовки **titleEn** / **excerptEn** на английском — для RU-only сайта не показываются, но хранятся в репо. | Если EN не планируется — оставить как технический наследие или вычистить в отдельной задаче (не влияет на русский UX). |

---

## 5. Зоны «без изменений» или «соответствует референсу»

- **Позиционирование:** «аутстаффинг не оказываем», акцент на аутсорсинг смен, Москва и МО — **последовательно** по главной, услугам и блогу.
- **Блог (40 материалов):** структура «секции + абзацы», закупочный интент, перекрёстные отсылки на `/zayavka`, калькулятор, услуги — **работает как контент-хаб**.
- **Юридические заготовки** (`legal-site-documents.ts`): стиль «официальный документ» уместен; точную правку — человеку.
- **EN-блоки** в `*.data.ts` (`en:` в услугах, `*En` в кейсах): предназначены для внешних коллатералей / будущей локали — **не смешиваются с RU на странице** при текущей сборке.

---

## 6. Охват аудита по поверхностям

| Поверхность | Файлы / маршруты | Оценка |
|-------------|------------------|--------|
| Главная (RU) | `src/messages/ru.json` (`home`, `homePage`, блоки секций), компоненты с `useTranslations` | Просмотрено; замечания P1/P2 выше. |
| Услуги (6 slug) | `src/content/service-pages/*.data.ts` | Все файлы инвентаризированы; выборочно прочитаны `autsorsing`, `managed`, `postoyannyy-personal`; **managed** — главный источник EN в RU. |
| Кейсы | `src/content/cases-stub.ts` | Просмотрено; англицизмы в русских метриках и текстах. |
| FAQ сайта | `src/content/faq-items.ts` | Сканирование «контур»; стиль ок. |
| Коммерция отрасли/площадки/гео | `src/content/commercial-editorial.ts` | Сканирование; точечные правки cost per shift. |
| Programmatic персонал | `programmatic-longread.ts`, `cross-priority-narratives.ts`, `programmatic-city-local.ts`, шаблон `programmatic-staffing-page.tsx` | Оценка по шаблонам: **риск однообразия**, не ошибка факта. |
| Блог | `src/content/blog-published.ts` — **40** статей | Полный список slug — приложение А; тела секций на русском; типичные маркеры — «контур», закупочный жаргон **RFI/RFQ/TCO/WMS** (допустимо в нише). |
| Заявка / формы | Компоненты лидов (не развёрнуты в этом отчёте построчно) | Рекомендация: отдельный короткий проход по `LeadMultistepForm` и сообщениям об ошибках при следующей итерации **05**. |
| Прочие страницы | `dlya-postavschikov`, о компании, контакты — точечно | Нет критичных находок в выборке. |

---

## 7. Рекомендации после аудита

1. Внедрить правки **P1** пачкой (главная `ru.json`, `managed.data.ts`, `cases-stub.ts`, `commercial-editorial.ts`, `cross-priority-narratives.ts`), затем **`npm run build`** и синхрон с прод **`ru.json`**.
2. Запланировать **волну 2** по блогу: снижение плотности «контур» без потери юридически точных мест (миграция, 152-ФЗ).
3. Юристу: финальная вычитка политик и оферты независимо от копирайтера.
4. После привязки домена — совместно с **04**: мета и OG без латиницы там, где целевая аудитория монолитно русская.

---

## Приложение А — блог: все slug (40)

Охвачены автоматическим поиском по файлу и признаны частью единой редакционной линии.

1. `chto-takoe-autsorsing-personala-na-sklade`
2. `autsorsing-i-autstaffing-v-chem-raznitsa`
3. `kak-vybrat-podryadchika-po-personalu-sklada`
4. `skolko-stoit-autsorsing-gruzchikov`
5. `plyusy-i-minusy-autsorsinga-sklad`
6. `kak-rabotaet-autsorsing-smen-na-praktike`
7. `raschet-ekonomii-pri-autsorsinge-frontend-k-stoimosti`
8. `kto-takoy-komplektovshchik-na-sklade-roli-i-svyazka-s-wms`
9. `obyazannosti-gruzchika-na-sklade-i-pogruzchike`
10. `migracionnyy-uchet-na-sklade-kontrol-peregovory-s-podryadchikom`
11. `sla-po-yavke-na-sklade-kak-chitat-i-zakrepit-v-dogovore`
12. `nochnye-smeny-sklad-moskva-mo-ekonomika-riski-i-koeffitsienty`
13. `reglament-zameny-personala-na-smene-chto-propisat-do-starta`
14. `integratsiya-autsorsing-personala-s-wms-i-smenskoi-otchyotnostyu`
15. `pik-sezona-e-com-kak-masshtabirovat-smeny-bez-razduvaniya-fte`
16. `kpi-linii-otbora-pri-autsorsinge-oshibka-skorost-tb`
17. `vorota-sloty-i-ochered-transporta-kto-v-zone-otvetstvennosti`
18. `tabeli-akty-smenskii-uchet-i-spory-s-podryadchikom-po-autsorsingu`
19. `upravlyaemyi-podryad-na-sklade-i-klassicheskiy-autsorsing-smen`
20. `kross-dok-sortirovka-i-komanda-roley-pri-autsorsinge-sklad`
21. `onboarding-personala-podryadchika-na-sklade-moskva-i-mo`
22. `instruktazhi-tb-i-granitsy-otvetstvennosti-pri-autsorsinge`
23. `voditel-prt-na-sklade-profili-i-autsorsing-smen`
24. `kladovshchik-pri-autsorsinge-granitsy-roli-i-uchet`
25. `sanitariya-i-uborshiki-sklada-v-modeli-podryadchika`
26. `shtrafy-bonusy-i-malyskiy-mehanizm-v-dogovore-autsorsinga-smen`
27. `smena-podryadchika-bez-ostanovki-linii-plan-perehoda`
28. `tender-kak-sravnivat-kommercheskie-predlozheniya-personala-sklada`
29. `rezervnyy-pul-podryadchika-kak-proverit-do-podpisaniya-dogovora`
30. `tipichnye-oshibki-zakupki-pri-vybore-podryadchika-po-smenam`
31. `subbota-voskresene-stavki-yavka-i-rezerv-pri-autsorsinge-moskva-mo`
32. `predprazdnichnye-nedeli-i-pikovye-nagruzki-sklad-v-moskve-i-mo`
33. `dolgosrochnyy-kontrakt-i-kratkosrochnyy-proekt-ekonomika-autsorsinga-smen`
34. `otsenka-podryadchika-posle-pervyh-30-dney-metriki-i-retrospektiva`
35. `3pl-model-i-autsorsing-lineynogo-personala-osobennosti-dogovora`
36. `fbs-marketpleys-komplektovschiki-pechi-i-autsorsing-smen`
37. `inventarizatsiya-s-privlecheniem-komandy-podryadchika-riski-i-reglament`
38. `biometriya-kpp-i-personalnye-dannye-pri-autsorsinge-smen`
39. `gibrid-shtata-i-autsorsinga-na-odnoy-linii-reglament-vzaimodeystviya`
40. `vtoraya-liniya-migracionnogo-kontrolya-pri-autsorsinge-skladskih-smen`

---

## Приложение Б — ограничения этого прохода

- **Programmatic URL** (сотни комбинаций профессия × город): оценка по **общим блокам** и приоритетным нарративам, не ручная вычитка каждого URL.
- **Динамические сообщения API / ошибки сети** — не входили в скан.
- Аудит **не заменяет** подпись журналиста/юриста; артефакт — основа для правок в коде и для человека.
