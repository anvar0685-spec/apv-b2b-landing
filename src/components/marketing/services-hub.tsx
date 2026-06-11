import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { getServicePage } from "@/content/service-page-data";

export function ServicesHub() {
  const main = getServicePage("autsorsing");
  if (!main) return null;

  const t = {
    kicker: "Склады · Москва и МО",
    h1: "Услуги",
    lead: (
      <>
        Основной продукт — <strong>аутсорсинг персонала на склады</strong>. Подбор и закрытие смен —{" "}
        <strong>в рамках договора с подрядчиком</strong>, без отдельной «поставки замен» как маркетингового ярлыка.
        Ниже — детали по направлениям и ролям.
      </>
    ),
    flagship: "Флагман",
    cta: "Подробнее и условия в КП",
    blockTitle: "В рамках складского договора",
    recruiting: "Подбор персонала",
    recruitingDesc: "отбор и проверка людей под профили склада.",
    warehouseOutsourceLink: "Складской аутсорсинг",
    warehouseOutsourceDesc:
      "грузчики, комплектовщики, кладовщики, водители ПРТ и погрузчиков, ПРР и смежные операции — вывод и замены смен по договору.",
    permanent: "Постоянный персонал",
    permanentDesc: "стабильный состав и KPI для долгих контрактов.",
    night: "Ночные смены",
    nightDesc: "отдельный регламент, менторинг и отчётность по ночному окну.",
    reference: "Справочно: аутстаффинг не оказываем",
    referenceLink: "Аутсорсинг и аутстаффинг — в чём разница",
  };

  return (
    <main id="main" className="min-w-0 pb-24">
      <section className="ux-tech-field-light relative overflow-hidden border-b border-[var(--neutral-200)] bg-[var(--surface)] py-10 lg:py-14 dark:border-white/10 dark:bg-[var(--primary-dark)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-px bg-gradient-to-r from-transparent via-[color-mix(in_srgb,var(--accent)_45%,transparent)] to-transparent" aria-hidden />
        <div className="relative z-[2] mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <p className="type-kicker">{t.kicker}</p>
          <h1 className="font-display mt-3 max-w-3xl text-balance text-3xl font-bold tracking-[-0.035em] text-[var(--primary)] md:text-[2.625rem] md:leading-[1.12] dark:text-white">
            {t.h1}
          </h1>
          <p className="type-lead mt-5 max-w-2xl">{t.lead}</p>
        </div>
      </section>

      <div className="mx-auto max-w-[1280px] min-w-0 px-4 py-12 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="relative lg:col-span-7">
            <div className="absolute bottom-0 left-0 top-0 w-1 rounded-full bg-gradient-to-b from-[var(--accent)] via-[color-mix(in_srgb,var(--accent)_70%,var(--primary))] to-[var(--primary)] opacity-95" aria-hidden />
            <div className="pl-6 sm:pl-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">{t.flagship}</p>
              <h2 className="font-display mt-2 text-2xl font-bold tracking-[-0.03em] text-[var(--primary)] dark:text-white">{main.h1}</h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-[var(--neutral-700)] dark:text-white/78">{main.subtitle}</p>
              <div className="mt-8">
                <Button asChild>
                  <Link href={`/uslugi/${main.slug}`}>{t.cta}</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4 lg:col-span-5">
            <p className="text-sm font-semibold text-[var(--primary)]">{t.blockTitle}</p>
            <ul className="space-y-3 text-sm leading-relaxed text-[var(--neutral-700)]">
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
                  href="/uslugi/autsorsing"
                >
                  {t.warehouseOutsourceLink}
                </Link>{" "}
                — {t.warehouseOutsourceDesc}
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
                  href="/blog/autsorsing-i-autstaffing-v-chem-raznitsa"
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
