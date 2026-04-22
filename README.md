# APV B2B Landing (Sprint 1 foundation)

Премиум B2B-лендинг: **Next.js 14** (App Router), **TypeScript strict**, **Tailwind + shadcn-паттерн**, **next-intl** (ru/en), **Framer Motion**, **Prisma 5 + PostgreSQL**, **Redis** (кэш / rate limit / BullMQ), **архитектурные хуки Tier 2–4** из брифа.

## Быстрый старт (локально)

```bash
cp .env.example .env
docker compose up -d
npm run db:push
npm run db:seed
npm run dev
```

Открой `http://localhost:3000` — русская локаль без префикса, английская: `/en`.

## Скрипты

| Команда        | Назначение              |
| -------------- | ----------------------- |
| `npm run dev`  | Dev-сервер              |
| `npm run build`| Production-сборка       |
| `npm run lint` | ESLint                  |
| `npm run db:push` | Prisma → БД (dev)   |
| `npm run db:seed` | Сиды tenant/flags  |
| `npm run db:studio` | Prisma Studio     |

## API

- `POST /api/v1/leads` — создание лида (+ `LeadEvent`).
- `POST /api/v1/analytics/events` — `AnalyticsEvent` (через `trackEvent` на клиенте).
- `GET /api/v1/health` — БД/Redis статус (`force-dynamic`).
- `GET /api/docs` — заготовка OpenAPI JSON.

## Важно

- Репозиторий создан в **`apv-b2b-landing/`** (ASCII-путь): `npm` не принимает кириллицу в `name` при scaffold в корне с кириллическим именем папки.
- Бренд, домен, реквизиты — **плейсхолдеры** до финализации (см. `.env.example`).

## Деплой (цель)

**Timeweb Cloud**, российский IP, PostgreSQL, Redis, S3-совместимое хранилище — переменные уже заложены в `.env.example`.
