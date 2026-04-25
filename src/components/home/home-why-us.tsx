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
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {block.items.map((it, i) => {
            const Icon = ICONS[i] ?? Gauge;
            return (
              <li
                key={it.title}
                className="rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)] p-6 shadow-[var(--card-shadow)]"
              >
                <Icon className="h-6 w-6 text-[var(--accent)]" aria-hidden />
                <h3 className="font-display mt-4 text-lg font-semibold text-[var(--primary)]">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--neutral-700)] md:text-base">{it.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
