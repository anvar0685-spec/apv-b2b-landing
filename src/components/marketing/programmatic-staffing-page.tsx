import { isPriorityCross } from "@/content/cross-priority";
import { getProgrammaticLocalNarrative } from "@/content/cross-priority-narratives";
import { CITIES, PROFESSIONS } from "@/content/professions-cities";
import { getProgrammaticLongreadParagraphs } from "@/content/programmatic-longread";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { OperationalDarkHero } from "@/components/layout/operational-dark-hero";
import { ProgrammaticFlowRail } from "@/components/marketing/programmatic-flow-rail";
import { ProfessionIcon } from "@/content/profession-icons";
import { commercialProductionStripFromSlug } from "@/lib/commercial-seo-variant";
import { ProductionVisualStrip } from "@/components/marketing/production-visual-strip";
import { pairingVisualVariant, variantClass } from "@/lib/slug-visual-seed";
import { cn } from "@/lib/utils";

type ProfessionDef = (typeof PROFESSIONS)[number];
type CityDef = (typeof CITIES)[number];

type Props = {
  profession: ProfessionDef;
  city: CityDef;
};

export async function ProgrammaticStaffingPage({ profession, city }: Props) {
  const cityName = city.nameRu;
  const roleName = profession.titleRu;
  const priority = isPriorityCross(profession.slug, city.slug);
  const productionSeed = `${profession.slug}-${city.slug}`;
  const showProductionStrip = commercialProductionStripFromSlug(productionSeed);
  const longread = getProgrammaticLongreadParagraphs(profession, city, priority);
  const localNarrative = priority ? getProgrammaticLocalNarrative(profession.slug, city.slug) : [];
  const v = pairingVisualVariant(profession.slug, city.slug);

  const t = {
    kicker: "Персонал · Москва и МО",
    h1: `${roleName} в ${cityName} — складской персонал (аутсорсинг смен)`,
    lead:
      `Что важно по профилю «${roleName}» в ${cityName}: ставка, логистика выхода на объект, документы и резерв на замену. Калькулятор и заявка ведут к КП. Аутстаффинг не оказываем — работаем как подрядчик по сменам.`,
    calc: "Рассчитать вилку",
    proposal: "Получить КП",
    h2: "Как закрываем смены по этой роли",
    cardTitle: "Что дальше",
    cardDesc: "Калькулятор и заявка уже учитывают город и профиль — менеджер пришлёт КП с резервом и коэффициентами.",
    step1: "Заявка",
    step2: "Согласование",
    step3: "Выход на смену",
    l1: "Кейсы по отраслям",
    l2: "Складской аутсорсинг",
    l3: "Соседние города по этой роли",
    calcCta: "Открыть калькулятор",
    footerCaption: "Материалы и соседние города",
    priBadge: "Популярный сценарий для расчёта",
  };

  const calcHref = `/kalkulyator?p=${profession.slug}&city=${city.slug}`;

  const midBreak =
    longread.length <= 1 ? longread.length : Math.max(1, Math.floor(longread.length / 2));
  const headParas = longread.slice(0, midBreak);
  const tailParas = longread.slice(midBreak);

  const railLabels = {
    railTitle: t.cardTitle,
    railLead: t.cardDesc,
    step1: t.step1,
    step2: t.step2,
    step3: t.step3,
    l1: t.l1,
    l2: t.l2,
    l3: t.l3,
    calcCta: t.calcCta,
    proposalCta: t.proposal,
    footerCaption: t.footerCaption,
  };

  return (
    <main id="main" className="pb-24">
      <OperationalDarkHero
        sectionClassName="border-b border-white/[0.08]"
        ambientClassName="opacity-75"
        kickerAsText={false}
        kicker={
          <p className="inline-flex items-center gap-3 text-[var(--accent-soft)]">
            <ProfessionIcon slug={profession.slug} className="h-7 w-7 shrink-0 opacity-90" />
            <span className="text-xs font-semibold uppercase tracking-[0.14em]">{t.kicker}</span>
          </p>
        }
        title={t.h1}
        description={t.lead}
        meta={null}
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

      <div className="relative ux-inner-page-cluster">
        <div className="ux-page-body-subtle pointer-events-none absolute inset-0 -z-10 min-h-full opacity-[0.55] dark:opacity-[0.38]" aria-hidden />
        <div
          className={cn(
            "relative mx-auto px-4 py-16 sm:px-6 lg:py-24 ux-inner-section-canopy",
            v === 0 && "max-w-[720px] lg:max-w-[700px]",
            v === 1 && "max-w-[720px] lg:max-w-[780px]",
            v === 2 && "max-w-[720px] lg:max-w-[660px]",
          )}
        >
          <h2 className="type-headline">{t.h2}</h2>
          <div className="type-editorial-dropcap type-body mt-6 space-y-4">
            {headParas.map((para, i) => (
              <p key={`h-${i}`}>{para}</p>
            ))}
          </div>

          {showProductionStrip ? (
            <div className="mt-10">
              <ProductionVisualStrip />
            </div>
          ) : null}

          <ProgrammaticFlowRail
            variant="mid"
            professionSlug={profession.slug}
            cityName={cityName}
            calcHref={calcHref}
            labels={railLabels}
            priorityCluster={priority}
            priorityBadge={priority ? t.priBadge : undefined}
          />

          <div className="type-body space-y-4">
            {tailParas.map((para, i) => (
              <p key={`t-${i}`}>{para}</p>
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

          <ProgrammaticFlowRail
            variant="footer"
            professionSlug={profession.slug}
            cityName={cityName}
            calcHref={calcHref}
            labels={railLabels}
            priorityCluster={priority}
            priorityBadge={priority ? t.priBadge : undefined}
          />
        </div>
      </div>
    </main>
  );
}
