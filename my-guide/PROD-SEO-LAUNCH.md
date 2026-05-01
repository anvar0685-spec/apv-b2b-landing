# Чеклист SEO при выкладке в прод

## Env (P0)

| Переменная | Назначение |
|------------|------------|
| `NEXT_PUBLIC_SITE_URL` | Канонический origin: `https://...` без хвостового `/`. Должен совпадать с фактическим доменом и редиректами (www vs non-www). |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Мета-тег Google Search Console (значение `content` из GSC). |
| `NEXT_PUBLIC_YANDEX_VERIFICATION` | Код верификации Яндекс.Вебмастера. |
| `YANDEX_METRICA_ID` | Счётчик (уже читается компонентом Метрики). |

## После деплоя

1. **Оба вебмастера:** добавить сайт, подтвердить домен, отправить `https://<домен>/sitemap.xml`.
2. Проверить **robots.txt** (`/robots`) и **sitemap.xml** — абсолютные URL на боевом домене, не `localhost`.
3. **Страница проверки разметки:** несколько URL (главная, услуга, programmatic, статья блога) — Rich Results / Schema validator.
4. **Индексация:** закрыть от индекса только то, что нужно (`/api/`, `/admin` уже в robots).

## Технические решения (апрель 2026)

- Все индексируемые URL, включая `/personal/{profession}/{city}`, собраны в **одном** `sitemap.xml`.
- `GET /api/sitemap-programmatic` оставлен для совместимости, в **robots.txt не указан**.
