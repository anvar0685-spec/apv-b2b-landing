import { isPriorityCross } from "@/content/cross-priority";
import { getProgrammaticLocalNarrative } from "@/content/cross-priority-narratives";
import { CITIES, PROFESSIONS } from "@/content/professions-cities";
import { getProgrammaticLongreadParagraphs } from "@/content/programmatic-longread";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

type ProfessionDef = (typeof PROFESSIONS)[number];
type CityDef = (typeof CITIES)[number];

type Props = {
  profession: ProfessionDef;
  city: CityDef;
};

export function ProgrammaticStaffingPage({ profession, city }: Props) {
  const cityName = city.nameRu;
  const roleName = profession.titleRu;
  const priority = isPriorityCross(profession.slug, city.slug);
  const longread = getProgrammaticLongreadParagraphs(profession, city);
  const localNarrative = getProgrammaticLocalNarrative(profession.slug, city.slug);

  const t = {
    kicker: "Программатика · МО",
    h1: `${roleName} в ${cityName} — складской персонал (аутсорсинг смен)`,
    lead:
      "Локальная посадочная под поиск и закупки: контекст региона, ссылка в калькулятор и переход к соседним городам по той же профессии. Аутстаффинг не поставляем.",
    calc: "Рассчитать вилку",
    proposal: "Получить КП",
    h2: "Поставка складского персонала и закупочный контекст",
    cardTitle: "Быстрые действия",
    cardDesc: "Калькулятор и заявка уже ведут на нужный контекст.",
    l1: "Кейсы по отраслям",
    l2: "Складской аутсорсинг",
    l3: "Другие города для профессии",
    priBadge: "Приоритетный кластер (программа нед. 5)",
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
          {priority ? (
            <p className="mt-4 inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--accent-soft)]">
              {t.priBadge}
            </p>
          ) : null}
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
              {longread.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
              {localNarrative.length ? (
                <>
                  <h3 className="type-headline pt-6 text-xl" id="local-narrative">
                    Локальный контекст: {cityName} × {roleName}
                  </h3>
                  {localNarrative.map((para, j) => (
                    <p key={`loc-${j}`}>{para}</p>
                  ))}
                </>
              ) : null}
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
