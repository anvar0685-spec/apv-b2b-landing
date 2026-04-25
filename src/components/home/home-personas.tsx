import { Building2, LineChart, UsersRound } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";

const ICONS = [Building2, UsersRound, LineChart] as const;

type PersonaCard = { title: string; body: string };

export async function HomePersonas() {
  const t = await getTranslations("homePage");
  const personas = t.raw("personas") as {
    kicker: string;
    title: string;
    lead: string;
    cards: PersonaCard[];
  };

  return (
    <section id="personas" className="border-y border-[var(--neutral-200)] bg-[var(--surface)] py-20 lg:py-28">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--neutral-500)]">{personas.kicker}</p>
        <h2 className="font-display mt-3 max-w-3xl text-3xl font-bold tracking-[-0.035em] text-[var(--primary)] md:text-[2.625rem] md:leading-[1.12]">
          {personas.title}
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--neutral-700)]">{personas.lead}</p>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {personas.cards.map((p, i) => {
            const Icon = ICONS[i] ?? Building2;
            return (
              <Card
                key={p.title}
                className="border-[var(--neutral-200)] bg-[var(--card)] shadow-[var(--card-shadow)] transition-shadow hover:shadow-[var(--card-shadow-hover)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--accent)]/25 bg-[color-mix(in_srgb,var(--accent)_8%,transparent)] text-[var(--accent)]">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <CardTitle className="mt-5 text-lg">{p.title}</CardTitle>
                <CardDescription className="mt-2 text-base leading-relaxed">{p.body}</CardDescription>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
