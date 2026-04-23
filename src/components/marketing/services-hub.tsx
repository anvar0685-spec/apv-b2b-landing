import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { getServicePage } from "@/content/service-page-data";

export function ServicesHub() {
  const main = getServicePage("autsorsing");
  if (!main) return null;

  return (
    <main id="main" className="pb-24">
      <section className="border-b border-[var(--neutral-200)] bg-[var(--surface)] py-10 lg:py-14">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <p className="type-kicker">Склады · Москва и МО</p>
          <h1 className="font-display mt-3 max-w-3xl text-balance text-3xl font-bold tracking-[-0.035em] text-[var(--primary)] md:text-[2.625rem] md:leading-[1.12]">
            Услуги
          </h1>
          <p className="type-lead mt-5 max-w-2xl">
            Основной продукт — <strong>аутсорсинг персонала на склады</strong>. Миграционный учёт и подбор входят в
            контракт поставки смен; отдельные страницы ниже — для закупки и SEO.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-6 lg:grid-cols-12">
          <Card className="border-[var(--accent)]/25 bg-gradient-to-br from-[var(--accent-soft)]/40 to-[var(--card)] lg:col-span-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">Флагман</p>
            <CardTitle className="mt-2 text-2xl">{main.h1}</CardTitle>
            <CardDescription className="text-base">{main.subtitle}</CardDescription>
            <div className="mt-8">
              <Button asChild>
                <Link href={`/uslugi/${main.slug}`}>Подробнее и модель поставки</Link>
              </Button>
            </div>
          </Card>

          <div className="space-y-4 lg:col-span-5">
            <p className="text-sm font-semibold text-[var(--primary)]">В рамках складского договора</p>
            <ul className="space-y-3 text-sm leading-relaxed text-[var(--neutral-700)]">
              <li>
                <Link
                  className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
                  href="/uslugi/migracionnyy-uchet"
                >
                  Миграционный учёт
                </Link>{" "}
                — документальный контур под объект.
              </li>
              <li>
                <Link
                  className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
                  href="/uslugi/podbor-personala"
                >
                  Подбор персонала
                </Link>{" "}
                — воронка под профили склада.
              </li>
              <li>
                <Link
                  className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
                  href="/uslugi/upravlyaemyy-podryad"
                >
                  Управляемый подряд
                </Link>{" "}
                — для зрелых DC с жёсткими KPI (по запросу).
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
