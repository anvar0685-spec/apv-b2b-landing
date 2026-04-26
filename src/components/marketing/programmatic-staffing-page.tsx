import { CITIES, PROFESSIONS } from "@/content/professions-cities";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

type ProfessionDef = (typeof PROFESSIONS)[number];
type CityDef = (typeof CITIES)[number];

type Props = {
  profession: ProfessionDef;
  city: CityDef;
  locale: string;
};

export function ProgrammaticStaffingPage({ profession, city, locale }: Props) {
  const en = locale === "en";
  const cityName = en ? city.nameEn : city.nameRu;
  const roleName = en ? profession.titleEn : profession.titleRu;

  const t = {
    kicker: en ? "Programmatic · Moscow Oblast" : "Программатика · МО",
    h1: en
      ? `${roleName} in ${cityName} — warehouse shift outsourcing`
      : `${roleName} в ${cityName} — аутсорсинг складских смен`,
    lead: en
      ? "Local landing for search and procurement: regional context, calculator deep-link, and navigation to neighbouring cities for the same role. We do not supply outstaffing."
      : "Локальная посадочная под поиск и закупки: контекст региона, ссылка в калькулятор и переход к соседним городам по той же профессии. Аутстаффинг не поставляем.",
    calc: en ? "Estimate range" : "Рассчитать вилку",
    proposal: en ? "Request proposal" : "Получить КП",
    h2: en ? "What editorial will expand here" : "Что здесь будет развёрнуто редакцией",
    p1: en
      ? `Indicative rates and shift patterns for ${cityName}, service zone map, major employers in the area, and a local FAQ with structured data — the standard B2B stack for “role × city” pages.`
      : `Таблица ориентиров по ставкам и сменности для ${cityName}, карта зоны выхода на объект, блок крупных работодателей региона и локальный FAQ с микроразметкой — стандартный набор для B2B-программатики «профессия × город».`,
    p2: en
      ? "The page already exposes correct meta tags, clean URLs, and CTAs into the calculator with prefilled parameters — so intent is not lost between search and the lead form."
      : "Сейчас страница отдаёт корректные мета-теги, ЧПУ и CTA в калькулятор с предзаполненными параметрами — чтобы не терять интент пользователя между поиском и заявкой.",
    cardTitle: en ? "Quick actions" : "Быстрые действия",
    cardDesc: en
      ? "Calculator and request flows already carry the right context."
      : "Калькулятор и заявка уже ведут на нужный контекст.",
    l1: en ? "Case studies by industry" : "Кейсы по отраслям",
    l2: en ? "Warehouse shift outsourcing" : "Складской аутсорсинг",
    l3: en ? "Other cities for this role" : "Другие города для профессии",
  };

  return (
    <main id="main" className="pb-24">
      <section className="grain-dark relative overflow-hidden border-b border-[var(--neutral-200)] bg-[var(--primary-dark)] py-14 text-white lg:py-20">
        <div className="hero-ambient pointer-events-none absolute inset-0 opacity-75" />
        <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-soft)]">{t.kicker}</p>
          <h1 className="font-display mt-4 max-w-4xl text-balance text-3xl font-bold tracking-[-0.035em] md:text-5xl md:leading-[1.08]">
            {t.h1}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/78">{t.lead}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild>
              <Link href={`/kalkulyator?p=${profession.slug}&city=${city.slug}`}>{t.calc}</Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              className="border-white/25 bg-white/10 text-white hover:bg-white/15"
            >
              <Link href="/zayavka">{t.proposal}</Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h2 className="type-headline">{t.h2}</h2>
            <div className="type-editorial-dropcap type-body mt-6 space-y-4">
              <p>{t.p1}</p>
              <p>{t.p2}</p>
            </div>
          </div>
          <aside className="lg:col-span-5">
            <Card>
              <CardTitle className="text-lg">{t.cardTitle}</CardTitle>
              <CardDescription>{t.cardDesc}</CardDescription>
              <ul className="mt-6 space-y-3 text-sm text-[var(--neutral-700)]">
                <li className="flex gap-2">
                  <span className="font-mono-nums text-[var(--accent)]">01</span>
                  <Link className="font-medium text-[var(--accent)] hover:underline" href="/keysy">
                    {t.l1}
                  </Link>
                </li>
                <li className="flex gap-2">
                  <span className="font-mono-nums text-[var(--accent)]">02</span>
                  <Link className="font-medium text-[var(--accent)] hover:underline" href="/uslugi/autsorsing">
                    {t.l2}
                  </Link>
                </li>
                <li className="flex gap-2">
                  <span className="font-mono-nums text-[var(--accent)]">03</span>
                  <Link
                    className="font-medium text-[var(--accent)] hover:underline"
                    href={`/personal/${profession.slug}`}
                  >
                    {t.l3}
                  </Link>
                </li>
              </ul>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  );
}
