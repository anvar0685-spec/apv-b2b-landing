import { analyticsAllowed } from "@/lib/cookie-consent";

declare global {
  interface Window {
    ym?: (id: number, method: string, ...args: unknown[]) => void;
  }
}

/** Цели Яндекс.Метрики — создайте в интерфейсе Метрики с теми же идентификаторами. */
const GOAL_BY_EVENT: Partial<Record<string, string>> = {
  form_submit_main: "lead_form_submit",
  phone_click: "phone_click",
  calculator_embed_completed: "calculator_embed_done",
  calculator_completed: "calculator_full_done",
};

export function reachYandexGoal(eventType: string) {
  if (typeof window === "undefined") return;
  if (!analyticsAllowed()) return;
  const goal = GOAL_BY_EVENT[eventType];
  if (!goal) return;
  const raw = process.env.NEXT_PUBLIC_YANDEX_METRICA_ID;
  if (!raw) return;
  const id = Number(raw);
  if (!Number.isFinite(id) || !window.ym) return;
  try {
    window.ym(id, "reachGoal", goal);
  } catch {
    /* ignore */
  }
}
