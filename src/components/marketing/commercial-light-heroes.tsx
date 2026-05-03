import type { ReactNode } from "react";
import type { Crumb } from "@/components/seo/breadcrumbs";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { MarketingHeroChrome } from "@/components/marketing/marketing-hero-chrome";

type HeroProps = {
  crumbs: Crumb[];
  kicker?: string;
  title: string;
  lead: string;
  children?: ReactNode;
};

/** Светлый «атлас»: география и локальные страницы — воздух как на маркетинговых хабах */
export function CommercialAtlasHero({ crumbs, kicker, title, lead, children }: HeroProps) {
  return (
    <MarketingHeroChrome innerClassName="relative mx-auto max-w-content px-4 pb-10 pt-10 sm:px-6 sm:pb-12 sm:pt-12 lg:px-8">
      <Breadcrumbs items={crumbs} variant="light" />
      {kicker ? <p className="type-kicker mt-8">{kicker}</p> : null}
      <h1 className="font-display mt-4 max-w-[22ch] text-balance text-4xl font-bold leading-[1.1] tracking-[-0.035em] text-[var(--primary)] md:max-w-[28ch] md:text-5xl lg:text-[2.75rem]">
        {title}
      </h1>
      <p className="type-lead mt-5 max-w-2xl text-[var(--neutral-700)]">{lead}</p>
      {children}
    </MarketingHeroChrome>
  );
}

/** Вертикальный акцент слева — отрасли и площадки, без полноэкранной тёмной плиты */
export function CommercialVerticalHero({ crumbs, kicker, title, lead, children }: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--neutral-200)] bg-[var(--surface)] dark:border-white/10">
      <div
        className="pointer-events-none absolute bottom-0 left-0 top-0 w-[5px] bg-gradient-to-b from-[var(--accent)] via-[color-mix(in_srgb,var(--accent)_65%,var(--primary))] to-[var(--primary)] opacity-[0.92]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-content px-4 py-10 pl-6 sm:px-6 sm:py-12 sm:pl-10 lg:px-8 lg:pl-12">
        <Breadcrumbs items={crumbs} variant="light" />
        {kicker ? <p className="type-kicker mt-8">{kicker}</p> : null}
        <h1 className="font-display mt-4 max-w-[22ch] text-balance text-4xl font-bold leading-[1.1] tracking-[-0.035em] text-[var(--primary)] md:max-w-[30ch] md:text-5xl lg:text-[2.75rem] dark:text-white">
          {title}
        </h1>
        <p className="type-lead mt-5 max-w-2xl text-[var(--neutral-700)] dark:text-white/78">{lead}</p>
        {children}
      </div>
    </section>
  );
}
