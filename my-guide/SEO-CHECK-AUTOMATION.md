# SEO — автопроверка по команде

## Для пользователя

Напиши агенту: **«проверь SEO»** (или SEO аудит, check SEO).

Агент сам:

1. Запустит `npm run seo:check`
2. Прочитает отчёты и пришлёт сводку (Яндекс / Метрика / Google / прод)
3. При необходимости исправит код, **commit** и **деплой на VPS** — только если были изменения и ты просил выкатить

## Одна команда

```bash
cd apv-b2b-landing
npm run seo:check
```

## Отчёты

| Файл | Содержание |
|------|------------|
| `my-guide/SEO-CHECK-latest.md` | Полный лог всех шагов |
| `my-guide/GSC-REPORT-latest.md` | Google (кратко) |

Правила Cursor: `.cursor/rules/04-seo-strategist-orchestrator.mdc`
