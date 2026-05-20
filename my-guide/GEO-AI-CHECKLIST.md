# GEO / AI — чеклист видимости для LLM и ассистентов

**Дата:** 2026-05-20  
**Связано:** `.cursor/rules/04-seo-strategist-orchestrator.mdc`, `my-guide/GOOGLE-SEO-AUTOMATION.md`, `my-guide/SEO-CHECK-AUTOMATION.md`.

## Главное

«Универсальной кнопки» индекса во всех нейросетях нет. Есть **три типа поведения** систем:

| Группа | Кто | Что делать |
|--------|-----|------------|
| Свой краулер | GPTBot/ChatGPT, PerplexityBot, ClaudeBot, Google-Extended, YandexAdditionalGenerative, MistralAI и др. | Не блокировать в `robots.txt`, держать открытый HTML/JSON-LD, давать **`/llms.txt`** |
| Без своего обхода | Алиса, YandexGPT | Сильный **Яндекс.Вебмастер**: индексация, регион Москва/МО, низкокачественные страницы 0 |
| Закрытые | GigaChat, частично Kimi/DeepSeek | Влияем **косвенно**: SEO Яндекс + сильный русскоязычный контент, упоминания на сторонних ресурсах |

**Не обещать клиенту** «нас проиндексирует X» — нет публичных кабинетов как у GSC.

## Что уже в коде

| Файл | Назначение |
|------|------------|
| `src/app/llms.txt/route.ts` | Карточка компании + FAQ для LLM (соглашение llmstxt.org) |
| `src/app/robots.ts` | Явные `Allow` для ~25 AI/LLM user-agent |
| `src/components/home/home-sections.tsx` | `FAQPage` + `SpeakableSpecification` JSON-LD |
| `src/components/marketing/service-page-full.tsx` | `Service` + `FAQPage` JSON-LD |
| `src/app/[locale]/contacts/...` | `LocalBusiness` JSON-LD |
| `sitemap.xml`, canonical | Полная карта + один источник правды |

## Чеклист при появлении нового LLM-бота

1. Найти **официальное имя user-agent**: документация вендора / каталоги:
   - https://darkvisitors.com/agents
   - https://robotstxt.org/db.html
   - https://github.com/ai-robots-txt/ai.robots.txt
2. Добавить строку в `AI_AND_RESEARCH_BOTS` (`src/app/robots.ts`). Регистр важен.
3. `npm run build` — проверка типов.
4. После деплоя: `curl https://апв-система.рф/robots.txt | rg <bot>` — убедиться, что правило в выдаче.
5. По возможности — отслеживать **логи nginx** на наличие user-agent через `awk '{print $NF}'` или анализатор.

## Что НЕ работает (не тратить время)

- Регистрация сайта «в ChatGPT» / «в Perplexity» как в GSC — таких форм нет.
- IndexNow для Яндекса — у нас уже есть `webmaster:recrawl`, дублирует.
- Закрытые партнёрки нейросетей — для B2B-аутсорсера склада не релевантны.
- Перегружать `/llms.txt` маркетингом — модели «срезают» нестандартные блоки, оставляют только факты.

## Что усиливает цитируемость (по нашему опыту аналогов)

- **Конкретные ответы на вопросы** прямо в HTML (h2-вопрос + первый абзац с ответом).
- **Числа и факты** в тексте: «замена в день», «офис в Бронницах, Каширский пер., 46», «миграционный учёт включён».
- **Уникальные кейсы** с цифрами (без NDA-нарушения).
- **Отдельные посадочные** «профессия + город» (`/personal/gruzchiki/moskva` и т.п.) — LLM лучше цитируют точные URL, чем главную.

## Регулярная проверка

`npm run seo:check` в `apv-b2b-landing/` (правило 04):

- robots.txt отдаётся со всеми ботами в списке
- `/llms.txt` доступен
- sitemap.xml без ошибок
- ключевые URL в индексе Яндекса/Google

Раз в 2–3 месяца — пересмотр списка ботов и `/llms.txt` (новые услуги, цены, регионы).

## Где НЕ заводить отдельно

- **GA4** — не про LLM, опционально.
- **Bing Webmaster Tools** — Bing AI частично перекрыт нашими user-agent правилами, отдельной выгоды для B2B-аутсорсера склада в МО нет.
- **Карточки в каталогах ИИ-стартапов** — не наш сегмент.

## Куда смотреть, если попали в ответ нейросети

Серверные логи на VPS (`/var/log/nginx/access.log`): фильтр по `GPTBot|PerplexityBot|ClaudeBot|YandexAdditional` — частота обхода и какие URL берут. Это единственный объективный сигнал «они нас читают».
