# Цели Яндекс.Метрики (Неделя 2)

В коде вызывается `reachGoal` при событиях ниже. Идентификаторы и заголовки для Метрики — в **`src/config/yandex-metrica-js-goals.json`** (один источник правды для CLI).

**Создание целей:** вручную в интерфейсе Метрики (тип: JavaScript-событие, идентификатор как в таблице) **или** автоматически: `npm run metrica:goals-install` (OAuth с **metrika:write**, см. `deploy/metrica-oauth.env.example` и `deploy/README-NO-DOCKER.md`).

| Идентификатор цели | Когда срабатывает |
|--------------------|---------------------|
| `lead_form_submit` | Успешная отправка мультистеп-формы `/zayavka` (`form_submit_main`). |
| `phone_click` | Клик по телефону в футере. |
| `calculator_embed_done` | Завершение мини-калькулятора на главной (`calculator_embed_completed`). |
| `calculator_full_done` | Завершение полного калькулятора на `/kalkulyator` (`calculator_completed`). |

Счётчик: `NEXT_PUBLIC_YANDEX_METRICA_ID`. События уходят только после согласия cookie (как и загрузка тега Метрики). Проверка целей: `npm run metrica:goals-check` (см. `deploy/README-NO-DOCKER.md`).
