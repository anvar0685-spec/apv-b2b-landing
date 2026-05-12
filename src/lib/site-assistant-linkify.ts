import { site } from "@/config/site";

/** Пути с префиксом локали в URL сайта → подписи для markdown-ссылок */
const ROUTE_LABELS: Record<string, string> = {
  "/ru": "Главная",
  "/ru/kalkulyator": "Калькулятор",
  "/ru/zayavka": "Заявка",
  "/ru/kontakty": "Контакты",
  "/ru/uslugi": "Услуги",
  "/ru/uslugi/autsorsing": "Аутсорсинг на склады",
  "/ru/uslugi/nochnye-smeny": "Ночные смены",
  "/ru/uslugi/podbor-personala": "Подбор персонала",
  "/ru/uslugi/postoyannyy-personal": "Постоянный персонал",
  "/ru/personal": "Персонал",
  "/ru/otrasli": "Отрасли",
  "/ru/ploshchadki": "Площадки",
  "/ru/keysy": "Кейсы",
  "/ru/blog": "Блог",
  "/ru/faq": "FAQ",
  "/ru/garantii": "Гарантии",
  "/ru/o-kompanii": "О компании",
  "/ru/dlya-postavschikov": "Для поставщиков",
  "/ru/razrabotka-saytov-dlya-autsorsinga": "Разработка сайта для аутсорсинга",
  "/ru/blog/category/veb-dlya-autsorsinga": "Блог: веб для аутсорсинга",
  "/ru/oferta": "Оферта",
};

const PATH_RE = /\/ru(?:\/[a-zA-Z0-9а-яА-ЯёЁ_-]+)*/g;

/** `/ru/foo/bar` → `/foo/bar` для next-intl `Link` (localePrefix: always на URL, href без /ru). */
export function stripLocaleFromPublicPath(publicPath: string): string {
  const p = publicPath.split("?")[0]?.split("#")[0] ?? publicPath;
  if (p === "/ru" || p === "/ru/") return "/";
  if (p.startsWith("/ru/")) return p.slice(3) || "/";
  return p.startsWith("/") ? p : `/${p}`;
}

function isInsideUnclosedMarkdownHref(before: string): boolean {
  const open = before.lastIndexOf("](");
  if (open === -1) return false;
  const after = before.slice(open + 2);
  return !after.includes(")");
}

function isProbablyAfterHttpUrl(before: string): boolean {
  return /https?:\/\/[^\s]*$/i.test(before.trimEnd());
}

function labelForPath(publicPath: string): string {
  if (ROUTE_LABELS[publicPath]) return ROUTE_LABELS[publicPath];
  const parts = publicPath.split("/").filter(Boolean);
  const slug = parts[parts.length - 1];
  if (!slug || slug === "ru") return "Раздел сайта";
  return slug
    .split("-")
    .map((w) => (w.length ? w[0]!.toUpperCase() + w.slice(1) : w))
    .join(" ");
}

/**
 * Голые пути вида `/ru/kalkulyator` в ответе модели не становятся ссылками в markdown —
 * оборачиваем в `[подпись](/kalkulyator)` для react-markdown + Link.
 * Не трогаем пути уже внутри `](...)` markdown-ссылки и продолжения `http(s)://...`.
 */
export function linkifyBarePathsForMarkdown(input: string): string {
  let out = "";
  let last = 0;
  let m: RegExpExecArray | null;
  const re = new RegExp(PATH_RE.source, "g");
  while ((m = re.exec(input)) !== null) {
    const start = m.index;
    const fullPath = m[0];
    const before = input.slice(0, start);

    if (isInsideUnclosedMarkdownHref(before) || isProbablyAfterHttpUrl(before)) {
      continue;
    }

    out += input.slice(last, start);
    const appHref = stripLocaleFromPublicPath(fullPath);
    const label = labelForPath(fullPath);
    out += `[${label}](${appHref})`;
    last = start + fullPath.length;
  }
  out += input.slice(last);
  return out;
}

/** Внутренний URL (относительный или наш origin) → путь для `Link` с префиксом локали в пути, убранным. */
export function sameSitePathOrNull(href: string | undefined): string | null {
  if (!href) return null;
  if (href.startsWith("//")) return null;
  const base = site.url.replace(/\/$/, "");
  try {
    const u = href.startsWith("http") ? new URL(href) : new URL(href, `${base}/`);
    const origin = new URL(base).origin;
    if (u.origin !== origin) return null;
    return stripLocaleFromPublicPath(u.pathname) + u.search + u.hash;
  } catch {
    return null;
  }
}
