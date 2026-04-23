import { SERVICE_PAGES } from "@/content/service-page-data";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const models = Object.values(SERVICE_PAGES);

export function ServicesHub() {
  return (
    <main id="main" className="pb-24">
      <section className="border-b border-[var(--neutral-200)] bg-[var(--surface)] py-10 lg:py-14">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <p className="type-kicker">Направления</p>
          <h1 className="font-display mt-3 max-w-3xl text-balance text-3xl font-bold tracking-[-0.035em] text-[var(--primary)] md:text-[2.625rem] md:leading-[1.12]">
            Услуги
          </h1>
          <p className="type-lead mt-5 max-w-2xl">
            Выберите направление — каждая страница раскрывает модель поставки, включения, сравнение с альтернативами и
            FAQ для закупки и SEO.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {models.map((m) => (
            <Card key={m.slug} className="flex flex-col">
              <CardTitle className="line-clamp-4 text-xl">{m.h1}</CardTitle>
              <CardDescription className="flex-1">{m.subtitle}</CardDescription>
              <div className="mt-6">
                <Button asChild variant="secondary" size="sm">
                  <Link href={`/uslugi/${m.slug}`}>Подробнее</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
