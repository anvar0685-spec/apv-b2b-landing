import { MarketingHeroChrome, type MarketingHeroSurface } from "@/components/marketing/marketing-hero-chrome";

type MarketingPageHeroProps = {
  kicker: string;
  title: string;
  description?: string;
  /** По умолчанию широкая сетка как на контактах */
  containerClass?: string;
  surface?: MarketingHeroSurface;
};

export function MarketingPageHero({
  kicker,
  title,
  description,
  containerClass = "mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8",
  surface = "default",
}: MarketingPageHeroProps) {
  return (
    <MarketingHeroChrome innerClassName={containerClass} surface={surface}>
      <p className="type-kicker">{kicker}</p>
      <h1 className="font-display mt-3 max-w-4xl text-balance text-3xl font-bold tracking-[-0.035em] text-[var(--primary)] md:text-[2.625rem] md:leading-[1.12]">
        {title}
      </h1>
      {description ? <p className="type-lead mt-5 max-w-2xl">{description}</p> : null}
    </MarketingHeroChrome>
  );
}
