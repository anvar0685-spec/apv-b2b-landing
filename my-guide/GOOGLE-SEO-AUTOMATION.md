# Google SEO — автоматизация через агента

**Один запуск для агента:** из `apv-b2b-landing/`

```bash
npm run gsc:routine
# или вместе с Яндексом:
npm run seo:routine
```

**Результат:**

| Файл | Содержимое |
|------|------------|
| `my-guide/GSC-REPORT-latest.md` | Человекочитаемый отчёт |
| `deploy/gsc-routine-latest.json` | JSON для агента (gitignored) |

## Что делает `gsc:routine` (без UI)

1. Refresh OAuth access token (из `GOOGLE_OAUTH_REFRESH_TOKEN`)
2. **PUT** sitemap → GSC
3. Статус sitemap (pending/errors)
4. **Search Analytics** — топ запросы/страницы за 28 дней (если уже есть данные)
5. **URL Inspection** — все URL из `deploy/webmaster-recrawl-priority.txt` (или лимит `GSC_ROUTINE_INSPECT_LIMIT`)

## Команды по отдельности

| npm | Назначение |
|-----|------------|
| `gsc:sync` | только sitemap |
| `gsc:inspect-all` | все приоритетные URL |
| `gsc:analytics` | только отчёт кликов/показов |
| `gsc:audit` | JSON-сводка свойства |
| `gsc:report` | вывести последний JSON routine |

## Когда агент запускает сам

- После **деплоя** с изменениями SEO/контента/sitemap
- По запросу «проверь Google / GSC»
- Раз в **3–7 дней** на мониторинг (индексация, sitemap)

## Что API **не** автоматизирует (ограничение Google)

| Действие | Как |
|----------|-----|
| «Запросить индексирование» как в UI | Только вручную в GSC → Проверка URL (Indexing API — не для B2B-лендинга) |
| Появление кликов в «Обзоре» | Ждать 24–72 ч после подтверждения |
| 100% страниц в индексе | Время + качество контента |

## Env (опционально)

```env
GSC_ROUTINE_INSPECT_LIMIT=0   # 0 = все URL из priority-файла
GSC_ANALYTICS_DAYS=28
GSC_INSPECT_DELAY_MS=500
```

Секреты: `deploy/.google-oauth.local.env` (уже настроено).

## Правило для Cursor

См. `.cursor/rules/04-seo-strategist-orchestrator.mdc` — блок **Google GSC API**.
