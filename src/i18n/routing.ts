import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ru"],
  defaultLocale: "ru",
  /** `as-needed` + Next `output: standalone` даёт 307 Location на тот же `/` (бесконечный редирект у curl/части клиентов). `always` оставляет канонический префикс `/ru`. */
  localePrefix: "always",
});
