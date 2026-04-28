import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { getServicePage } from "@/content/service-page-data";

export function ServicesHub() {
  const main = getServicePage("autsorsing");
  if (!main) return null;

  const t = {
    kicker: "Склады · Москва и МО",
    h1: "Услуги",
    lead: (
      <>
        Основной продукт — <strong>аутсорсинг персонала на склады</strong>. Миграционный учёт и подбор входят в
        контракт поставки смен; отдельные страницы ниже — для закупки и SEO.
      </>
    ),
    flagship: "Флагман",
    cta: "Подробнее и модель поставки",
    blockTitle: "В рамках складского договора",
    migration: "Миграционный учёт",
    migrationDesc: "документальный контур под объект.",
    recruiting: "Подбор персонала",
    recruitingDesc: "воронка под профили склада.",
    managed: "Управляемый подряд",
    managedDesc: "для зрелых DC с жёсткими KPI (по запросу).",
    permanent: "Постоянный персонал",
    permanentDesc: "стабильный состав и KPI для долгих контрактов.",
    night: "Ночные смены",
    nightDesc: "отдельный SLA, менторинг и отчётность по ночи.",
    reference: "Справочно (аутстаффинг не поставляем)",
    referenceLink: "Чем отличается аутстаффинг",
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
              <li>
                <Link
                  className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
                  href="/uslugi/postoyannyy-personal"
                >
                  {t.permanent}
                </Link>{" "}
                — {t.permanentDesc}
              </li>
              <li>
                <Link
                  className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
                  href="/uslugi/nochnye-smeny"
                >
                  {t.night}
                </Link>{" "}
                — {t.nightDesc}
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
