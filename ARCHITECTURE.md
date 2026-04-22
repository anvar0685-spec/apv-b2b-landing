# Архитектура (Tier 1 сейчас, Tier 2–4 — задел)

## Слои

1. **Frontend:** Next.js App Router, RSC где уместно, клиентские острова (формы, motion, чат позже).
2. **API:** `/api/v1/*` REST, версионирование префиксом; OpenAPI — `/api/docs` (расширение без ломки контрактов).
3. **Данные:** PostgreSQL + Prisma; все бизнес-сущности с **`tenantId`**.
4. **Кэш / лимиты / очереди:** Redis; BullMQ очередь `email` создаётся только при `REDIS_URL`.
5. **Файлы:** S3-совместимый клиент (`lib/s3.ts`) — без локального хранения прод-ассетов.

## Multi-tenant (Tier 3)

- Модель **`Tenant`**, резолвинг по `Host` → заголовок **`x-tenant-slug`** в `middleware.ts` (сейчас `DEFAULT_TENANT_SLUG`).
- Тема: CSS variables из `tenant.config.theme` (пока в layout — статический дефолт из брифа; merge из БД — без блокировки `next build`, через cache/async позже).

## Лиды и маршрутизация (Tier 2)

- **`Lead`** + **`LeadEvent`**: полная история, поля под ICP, партнёра, аукцион (логика отложена).
- **`Partner`**, **`PartnerPayment`**, **`PartnerReview`**: схема в БД, UI портала — нет.

## Контент-лицензирование (Tier 3)

- **`ContentPackage`**, **`ContentPackageItem`**, **`ContentLicense`**.
- **`Article`**: `sourceType`, `canonicalTenantId` для white-label и canonical-логики.

## Аналитика (Tier 4)

- **`AnalyticsEvent`** + `recordAnalyticsEvent` / клиентский **`trackEvent`**.
- Агрегации / monthly rollup — следующий спринт (cron + job queue).

## Feature flags

- Таблица **`FeatureFlag`**, утилита **`isFeatureEnabled`** (rollout %).

## Безопасность

- Rate limit на API (Redis или in-memory fallback).
- CSRF для cookie-based форм — когда появится session-based admin; сейчас публичные JSON API только с лимитами.

## SEO

- `robots.ts`, `sitemap.ts` (ru+en + программатика 10×30×2), `manifest.ts`, `humans.txt`, `security.txt`.
- Страницы без trailing slash (`next.config.mjs`).
