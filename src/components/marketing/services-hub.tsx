import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { getServicePage } from "@/content/service-page-data";

type Props = { locale: string };

export function ServicesHub({ locale }: Props) {
  const en = locale === "en";
  const main = getServicePage("autsorsing", locale);
  if (!main) return null;

  const t = {
    kicker: en ? "Warehouses · Moscow & Moscow Oblast" : "Склады · Москва и МО",
    h1: en ? "Services" : "Услуги",
    lead: en ? (
      <>
        Core offer: <strong>warehouse shift outsourcing</strong>. Migration compliance and recruiting sit inside the
        shift-supply contract; separate pages below support procurement and SEO.
      </>
    ) : (
      <>
        Основной продукт — <strong>аутсорсинг персонала на склады</strong>. Миграционный учёт и подбор входят в
        контракт поставки смен; отдельные страницы ниже — для закупки и SEO.
      </>
    ),
    flagship: en ? "Flagship" : "Флагман",
    cta: en ? "Model and scope" : "Подробнее и модель поставки",
    blockTitle: en ? "Inside the warehouse contract" : "В рамках складского договора",
    migration: en ? "Migration compliance" : "Миграционный учёт",
    migrationDesc: en ? "Document trail for the site." : "документальный контур под объект.",
    recruiting: en ? "Recruiting" : "Подбор персонала",
    recruitingDesc: en ? "Funnel tuned to warehouse roles." : "воронка под профили склада.",
    managed: en ? "Managed contractor model" : "Управляемый подряд",
    managedDesc: en ? "For mature DCs with strict KPIs (on request)." : "для зрелых DC с жёсткими KPI (по запросу).",
    reference: en ? "Reference (we do not supply outstaffing)" : "Справочно (аутстаффинг не поставляем)",
    referenceLink: en ? "How outstaffing differs" : "Чем отличается аутстаффинг",
  };

  return (
    <main id="main" className="pb-24">
      <section className="border-b border-[var(--neutral-200)] bg-[var(--surface)] py-10 lg:py-14">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <p className="type-kicker">{t.kicker}</p>
          <h1 className="font-display mt-3 max-w-3xl text-balance text-3xl font-bold tracking-[-0.035em] text-[var(--primary)] md:text-[2.625rem] md:leading-[1.12]">
            {t.h1}
          </h1>
          <p className="type-lead mt-5 max-w-2xl">{t.lead}</p>
        </div>
      </section>

      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-6 lg:grid-cols-12">
          <Card className="border-[var(--accent)]/25 bg-gradient-to-br from-[var(--accent-soft)]/40 to-[var(--card)] lg:col-span-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">{t.flagship}</p>
            <CardTitle className="mt-2 text-2xl">{main.h1}</CardTitle>
            <CardDescription className="text-base">{main.subtitle}</CardDescription>
            <div className="mt-8">
              <Button asChild>
                <Link href={`/uslugi/${main.slug}`}>{t.cta}</Link>
              </Button>
            </div>
          </Card>

          <div className="space-y-4 lg:col-span-5">
            <p className="text-sm font-semibold text-[var(--primary)]">{t.blockTitle}</p>
            <ul className="space-y-3 text-sm leading-relaxed text-[var(--neutral-700)]">
              <li>
                <Link
                  className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
                  href="/uslugi/migracionnyy-uchet"
                >
                  {t.migration}
                </Link>{" "}
                — {t.migrationDesc}
              </li>
              <li>
                <Link
                  className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
                  href="/uslugi/podbor-personala"
                >
                  {t.recruiting}
                </Link>{" "}
                — {t.recruitingDesc}
              </li>
              <li>
                <Link
                  className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
                  href="/uslugi/upravlyaemyy-podryad"
                >
                  {t.managed}
                </Link>{" "}
                — {t.managedDesc}
              </li>
              <li className="pt-1 text-[var(--neutral-500)]">
                <span className="text-xs font-semibold uppercase tracking-wide">{t.reference}</span>
                <br />
                <Link
                  className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
                  href="/uslugi/autstaffing"
                >
                  {t.referenceLink}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
