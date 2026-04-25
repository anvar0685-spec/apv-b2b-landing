import { analyticsAllowed } from "./cookie-consent";
import { reachYandexGoal } from "./analytics-yandex";

/** Клиентский трекинг → API (keepalive). На сервере используй `recordAnalyticsEvent`. */
export async function trackEvent(
  type: string,
  payload: Record<string, unknown>,
) {
  if (typeof window === "undefined") return;
  if (!analyticsAllowed()) return;
  reachYandexGoal(type);
  await fetch("/api/v1/analytics/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, payload }),
    keepalive: true,
  });
}
