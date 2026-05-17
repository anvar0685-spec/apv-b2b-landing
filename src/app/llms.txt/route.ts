import { NextResponse } from "next/server";
import { site } from "@/config/site";

/** Краткое описание сайта для LLM/ассистентов (соглашение llms.txt). */
export async function GET() {
  const base = site.url.replace(/\/$/, "");
  const body = [
    `# ${site.brandName}`,
    "",
    `> Сайт: ${base}/`,
    "> Язык основного контента: русский (локаль по умолчанию без префикса /ru в URL при as-needed).",
    "",
    "## Чем занимается компания",
    "",
    "B2B-аутсорсинг персонала на склады и логистику в Москве и Московской области: комплектовщики, грузчики, кладовщики, водители погрузчиков, миграционный учёт, подбор, ночные смены, постоянный персонал.",
    "",
    "## Куда смотреть на сайте",
    "",
    `- Главная: ${base}/`,
    `- Услуги: ${base}/uslugi`,
    `- Персонал / профессии: ${base}/personal`,
    `- Калькулятор: ${base}/kalkulyator`,
    `- Заявка: ${base}/zayavka`,
    `- Блог: ${base}/blog`,
    `- Контакты: ${base}/kontakty`,
    "",
    "## Карта сайта",
    "",
    `${base}/sitemap.xml`,
    "",
    "## Контакты для правок описания (не для спама)",
    "",
    `${site.emailHello}`,
    "",
    "## Правовые страницы",
    "",
    `- Политика конфиденциальности: ${base}/politika-konfidencialnosti`,
    `- Обработка ПД: ${base}/soglasie-na-obrabotku-pd`,
    "",
  ].join("\n");

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
