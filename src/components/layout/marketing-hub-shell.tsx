import type { ReactNode } from "react";
import { MarketingHeroChrome, type MarketingHeroSurface } from "@/components/marketing/marketing-hero-chrome";
import { SectionDivider } from "@/components/marketing/section-divider";
import { cn } from "@/lib/utils";

type Props = {
  kicker: string;
  title: string;
  description?: string;
  children: ReactNode;
  heroContainerClass?: string;
  showDivider?: boolean;
  bodyWrapperClassName?: string;
  /** Доп. блок под лидом (дисклеймеры и т.п.) */
  belowLead?: ReactNode;
  /** Разный фокус фона hero при едином стиле */
  heroSurface?: MarketingHeroSurface;
};

export function MarketingHubShell({
  kicker,
  title,
  description,
  children,
  heroContainerClass = "mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8",
  showDivider = true,
  bodyWrapperClassName,
  belowLead,
  heroSurface = "default",
}: Props) {
  return (
    <>
      <MarketingHeroChrome innerClassName={heroContainerClass} surface={heroSurface}>
        <div className="min-w-0 max-w-3xl">
          <p className="type-kicker">{kicker}</p>
          <h1 className="font-display mt-3 max-w-4xl text-balance text-3xl font-bold tracking-[-0.04em] text-[var(--primary)] dark:text-white md:text-[2.75rem] md:leading-[1.12]">
            {title}
          </h1>
          {description ? <p className="type-lead mt-5 max-w-2xl">{description}</p> : null}
          {belowLead ? <div className="mt-4 max-w-3xl">{belowLead}</div> : null}
        </div>
      </MarketingHeroChrome>
      {showDivider ? <SectionDivider className="py-5 sm:py-6" /> : null}
      <div className={cn("relative min-w-0 ux-inner-page-cluster", bodyWrapperClassName)}>
        <div className="ux-page-body-subtle pointer-events-none absolute inset-0 -z-10 min-h-full" aria-hidden />
        {children}
      </div>
    </>
  );
}
