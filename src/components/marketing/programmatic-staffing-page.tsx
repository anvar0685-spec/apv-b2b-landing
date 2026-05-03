import { isPriorityCross } from "@/content/cross-priority";
import { getProgrammaticLocalNarrative } from "@/content/cross-priority-narratives";
import { CITIES, PROFESSIONS } from "@/content/professions-cities";
import { getProgrammaticLongreadParagraphs } from "@/content/programmatic-longread";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { OperationalDarkHero } from "@/components/layout/operational-dark-hero";
import { ProgrammaticOpsAside } from "@/components/marketing/programmatic-ops-aside";
import { ProfessionIcon } from "@/content/profession-icons";
import { pairingVisualVariant, variantClass } from "@/lib/slug-visual-seed";
import { cn } from "@/lib/utils";

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
  const v = pairingVisualVariant(profession.slug, city.slug);

  const t = {
    kicker: "Программатика · МО",
    h1: `${roleName} в ${cityName} — складской персонал (аутсорсинг смен)`,
    lead:
      "Локальная посадочная под поиск и закупки: контекст региона, ссылка в калькулятор и переход к соседним городам по той же профессии. Аутстаффинг не поставляем.",
    calc: "Рассчитать вилку",
    proposal: "Получить КП",
    h2: "Поставка складского персонала и закупочный контекст",
    cardTitle: "Операционное окно",
    cardDesc: "Калькулятор и заявка уже ведут на нужный контекст.",
    step1: "Заявка",
    step2: "Согласование",
    step3: "Выход на смену",
    l1: "Кейсы по отраслям",
    l2: "Складской аутсорсинг",
    l3: "Другие города для профессии",
    calcCta: "Открыть калькулятор с контекстом",
    priBadge: "Приоритетный кластер (программа нед. 5)",
  };

  const calcHref = `/kalkulyator?p=${profession.slug}&city=${city.slug}`;

  return (
    <main id="main" className="pb-24">
      <OperationalDarkHero
        sectionClassName="border-b border-white/[0.08]"
        ambientClassName="opacity-75"
        kickerAsText={false}
        kicker={
          <p className="inline-flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-[var(--accent-soft)]">
              <ProfessionIcon slug={profession.slug} className="h-6 w-6" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-soft)]">{t.kicker}</span>
          </p>
        }
        title={t.h1}
        description={t.lead}
        meta={
          priority ? (
            <p className="mt-4 inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--accent-soft)]">
              {t.priBadge}
            </p>
          ) : null
        }
        actions={
          <>
            <Button asChild>
              <Link href={calcHref}>{t.calc}</Link>
            </Button>
            <Button asChild variant="secondary" className="border-white/25 bg-white/10 text-white hover:bg-white/15">
              <Link href="/zayavka">{t.proposal}</Link>
            </Button>
          </>
        }
        decoration={<div className={cn("ux-prog-angled", variantClass(v))} aria-hidden />}
      />

      <div className="relative">
        <div className="ux-page-body-subtle pointer-events-none absolute inset-0 -z-10 min-h-full opacity-[0.55] dark:opacity-[0.38]" aria-hidden />
        <div className="relative mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
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
            <ProgrammaticOpsAside
              professionSlug={profession.slug}
              cityName={cityName}
              calcHref={calcHref}
              labels={{
                cardTitle: t.cardTitle,
                cardDesc: t.cardDesc,
                step1: t.step1,
                step2: t.step2,
                step3: t.step3,
                l1: t.l1,
                l2: t.l2,
                l3: t.l3,
                calcCta: t.calcCta,
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
