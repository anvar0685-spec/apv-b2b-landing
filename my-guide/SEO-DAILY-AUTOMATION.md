# SEO — ежедневная автоматизация (безопасные лимиты)

## Одна команда

```bash
cd apv-b2b-landing
npm run seo:daily
```

Отчёт: `my-guide/SEO-DAILY-latest.md` · state: `deploy/.seo-automation-state.json` (локально, gitignored)

## Что делает

| Шаг | API | Зачем |
|-----|-----|--------|
| `yandex:sync` | Вебмастер | sitemap на месте |
| `yandex:recrawl-daily` | Переобход URL | до **40** новых URL/день (в рамках квоты **150/сутки**) |
| `gsc:routine-daily` | Search Console | sitemap + до **15** URL Inspection/день; аналитика раз в **7** дней |

Дубликаты не шлём повторно — учёт в `.seo-automation-state.json`.

## Почему нас не «заблокируют»

Это **официальные API** Яндекса и Google для владельца сайта, не парсинг и не накрутка трафика.

| Площадка | Правило | Наш режим |
|----------|---------|-----------|
| **Яндекс** | Квота переобхода **150 URL/сутки** (задаёт Яндекс) | Берём `min(остаток квоты, 40)`; стоп на **429**; пауза **500 ms**; **409** = уже в очереди |
| **Google GSC** | URL Inspection — лимиты на свойство (сотни/тысячи/день) | **15** inspect/день; пауза **600 ms**; sitemap — **1 PUT**/день |
| **Общее** | Не слать favicon/картинки в переобход | Только HTML-страницы из sitemap |

Переобход ≠ искусственный трафик. Это «пожалуйста, перечитай страницу» — штатная функция Вебмастера.

## Автозапуск на Mac (launchd)

```bash
# 1) Скопируй и подставь свой путь к проекту
cp deploy/com.apv.seo-daily.plist.example ~/Library/LaunchAgents/com.apv.seo-daily.plist
# отредактируй WorkingDirectory и путь к node/npm

# 2) Включи (раз в сутки ~10:00)
launchctl load ~/Library/LaunchAgents/com.apv.seo-daily.plist
```

Логи: `deploy/seo-daily-launchd.log`

Опциональные лимиты — `deploy/.seo-automation.env.local` (см. `deploy/seo-automation.env.example`).

## Когда список закончится

Скрипт напишет `pending=0` и перестанет слать переобход/inspect. Дальше достаточно раз в неделю `npm run seo:check` или после крупных релизов.

## Полная проверка (вручную / после деплоя)

```bash
npm run seo:check   # полный аудит + recrawl priority целиком при необходимости
```
