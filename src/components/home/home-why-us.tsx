import { BadgeCheck, Gauge, Layers, Scale, ShieldCheck, Sparkles } from "lucide-react";
import { getTranslations } from "next-intl/server";

const ICONS = [Gauge, ShieldCheck, Scale, Layers, BadgeCheck, Sparkles] as const;

type WhyItem = { title: string; text: string };

export async function HomeWhyUs() {
  const t = await getTranslations("homePage");
  const block = t.raw("whyUs") as {
    kicker: string;
    title: string;
    lead: string;
    items: WhyItem[];
  };

  return (
    <section id="why-us" className="bg-[var(--surface)] py-20 lg:py-28">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--neutral-500)]">{block.kicker}</p>
        <h2 className="font-display mt-3 max-w-3xl text-3xl font-bold tracking-[-0.035em] text-[var(--primary)] md:text-[2.625rem] md:leading-[1.12]">
          {block.title}
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--neutral-700)]">{block.lead}</p>
        <ul className="mt-10 divide-y divide-[var(--neutral-200)] rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)]">
          {block.items.map((it, i) => {
            const Icon = ICONS[i] ?? Gauge;
            return (
              <li key={it.title} className="flex gap-4 px-5 py-5 sm:px-6 sm:py-6">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" aria-hidden />
                <div className="min-w-0">
                  <h3 className="font-display text-base font-semibold text-[var(--primary)] sm:text-lg">{it.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--neutral-700)] md:text-base">{it.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
