# SEO-статус (2026-05-19)

**Домен:** https://апв-система.рф (punycode: `xn----7sbbgqr3atubl.xn--p1ai`)  
**Роль:** 04 (SEO-оркестратор)

## Техническая база — готово

| Область | Статус |
|---------|--------|
| `NEXT_PUBLIC_SITE_URL` на проде | Кириллический канон, sitemap/robots с боевым origin |
| `robots.ts` | Allow `/`, disallow `/api/`, `/admin`; sitemap один |
| `sitemap.xml` | Статика, услуги, персонал, 30 приоритетных cross, блог, кейсы |
| Programmatic вне приоритета | `noindex, follow` — не в sitemap |
| `buildPageMetadata` | canonical, OG, Twitter на всех коммерческих страницах |
| JSON-LD | Organization + WebSite (главная), Service/FAQ (услуги), LocalBusiness (контакты) |
| OG-картинка | Динамическая 1200×630, подпись «Складской персонал под ключ · Москва и область» |
| `/llms.txt` + AI-боты в robots | Для GEO |

## Правки 2026-05-19

- Главная: отдельный `metaDescription` (не hero-текст).
- `/zayavka` — `noindex`, убрана из `sitemap.xml` (форма, не посадочная).
- HTML `/sitemap` — `noindex`, убрана из XML-карты (дубль XML-sitemap).
- В `<head>` явно указан `/favicon.ico` для Яндекса.
- Вебмастер: `npm run webmaster:sync` — sitemap зарегистрирован.

## Остаётся на стороне заказчика (P0 вне кода)

1. **`NEXT_PUBLIC_YANDEX_VERIFICATION`** и **`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`** в `.env.production` на VPS → пересборка.
2. Подтвердить сайт в **Яндекс.Вебмастере** и **Google Search Console** (регион: Москва/МО).
3. После деплоя: `npm run webmaster:recrawl` из `apv-b2b-landing/` (квота ~150 URL/день).
4. В Вебмастере проверить **FAVICON_ERROR** (часто уходит после переобхода `/favicon.ico` и `/favicon-120.png`).

## Домен `.рф`

Штрафа за IDN нет. Критично: один канон (сейчас кириллица в URL карты — ок), не плодить зеркала www/punycode без 301.

## Контентный риск (мониторинг)

~210 programmatic URL с `noindex` — правильно. 30 в sitemap — держать уникальность текстов; смотреть отчёт «Низкокачественные» в Вебмастере.

## Следующий цикл (P2, по данным)

- Топ-URL по показам в Вебмастере/GSC → точечная правка title/description.
- PageSpeed / CrUX на проде после стабилизации трафика.
