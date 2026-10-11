import assert from "node:assert/strict";
import test from "node:test";

/** Дублирует логику src/lib/blog-internal-href.ts для регрессии без сборки TS. */
const LOCALES = new Set(["ru"]);

function normalizeBlogInternalHref(href) {
  const trimmed = href.trim();
  if (
    !trimmed ||
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("mailto:") ||
    trimmed.startsWith("tel:") ||
    trimmed.startsWith("#")
  ) {
    return trimmed;
  }

  let pathPart = trimmed;
  let suffix = "";

  const hashIdx = pathPart.indexOf("#");
  if (hashIdx !== -1) {
    suffix = pathPart.slice(hashIdx);
    pathPart = pathPart.slice(0, hashIdx);
  }
  const queryIdx = pathPart.indexOf("?");
  if (queryIdx !== -1) {
    suffix = pathPart.slice(queryIdx) + suffix;
    pathPart = pathPart.slice(0, queryIdx);
  }

  let path = pathPart.startsWith("/") ? pathPart : `/${pathPart}`;

  let changed = true;
  while (changed) {
    changed = false;
    for (const loc of LOCALES) {
      const prefix = `/${loc}`;
      if (path === prefix) {
        path = "/";
        changed = true;
        break;
      }
      if (path.startsWith(`${prefix}/`)) {
        path = path.slice(prefix.length) || "/";
        changed = true;
        break;
      }
    }
  }

  return path + suffix;
}

test("локализованный путь без дубля", () => {
  assert.equal(normalizeBlogInternalHref("/ru/kalkulyator"), "/kalkulyator");
  assert.equal(normalizeBlogInternalHref("/ru/ru/kalkulyator"), "/kalkulyator");
  assert.equal(normalizeBlogInternalHref("/ru/ru/ru/zayavka"), "/zayavka");
});

test("нелокализованный путь", () => {
  assert.equal(normalizeBlogInternalHref("/kalkulyator"), "/kalkulyator");
  assert.equal(normalizeBlogInternalHref("kalkulyator"), "/kalkulyator");
});

test("якорь и query", () => {
  assert.equal(normalizeBlogInternalHref("/ru/blog/foo#sec"), "/blog/foo#sec");
  assert.equal(normalizeBlogInternalHref("/ru/kalkulyator?x=1"), "/kalkulyator?x=1");
});

test("внешние адреса", () => {
  const ext = "https://www.consultant.ru/document/cons_doc_LAW_37868/";
  assert.equal(normalizeBlogInternalHref(ext), ext);
  assert.equal(normalizeBlogInternalHref("mailto:a@b.ru"), "mailto:a@b.ru");
});
