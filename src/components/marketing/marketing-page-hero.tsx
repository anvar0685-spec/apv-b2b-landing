type MarketingPageHeroProps = {
  kicker: string;
  title: string;
  description?: string;
  /** По умолчанию широкая сетка как на контактах */
  containerClass?: string;
};

export function MarketingPageHero({
  kicker,
  title,
  description,
  containerClass = "mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8",
}: MarketingPageHeroProps) {
  return (
    <section className="border-b border-[var(--neutral-200)] bg-[var(--surface)] py-10 lg:py-14">
      <div className={containerClass}>
        <p className="type-kicker">{kicker}</p>
        <h1 className="font-display mt-3 max-w-4xl text-balance text-3xl font-bold tracking-[-0.035em] text-[var(--primary)] md:text-[2.625rem] md:leading-[1.12]">
          {title}
        </h1>
        {description ? <p className="type-lead mt-5 max-w-2xl">{description}</p> : null}
      </div>
    </section>
  );
}
