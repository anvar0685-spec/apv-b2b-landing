import type { Metadata } from "next";
import { site } from "@/config/site";

const brand = site.brandName.replace(/_/g, " ");

export const metadata: Metadata = {
  title: `Страница не найдена | ${brand}`,
  description:
    "Запрошенная страница не найдена. Аутсорсинг складского персонала в Москве и МО — АПВ — СИСТЕМА.",
  robots: { index: false, follow: true },
};

/** Корневой 404 (вне [locale]) — с title/description для краулеров. */
export default function RootNotFound() {
  return (
    <main className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-2xl font-bold">Страница не найдена</h1>
      <p className="mt-4">
        <a className="text-[var(--accent)] underline" href="/ru">
          На главную
        </a>
      </p>
    </main>
  );
}
