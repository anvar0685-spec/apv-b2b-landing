import type { LegalSection } from "@/content/legal-pages-stub";

type LegalBodyProps = {
  title: string;
  lead?: string;
  sections: LegalSection[];
};

export function LegalBody({ title, lead, sections }: LegalBodyProps) {
  return (
    <main id="main" className="mx-auto max-w-[880px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <h1 className="font-display text-3xl font-bold tracking-tight text-[var(--primary)] md:text-5xl">
        {title}
      </h1>
      {lead ? (
        <p className="mt-6 text-lg leading-relaxed text-[var(--neutral-700)]">{lead}</p>
      ) : null}

      <nav
        aria-label="Содержание документа"
        className="mt-10 rounded-xl border border-[var(--neutral-200)] bg-[var(--neutral-50)] p-6"
      >
        <p className="text-sm font-semibold text-[var(--primary)]">Содержание</p>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-[var(--neutral-700)]">
          {sections.map((s) => (
            <li key={s.id}>
              <a className="text-[var(--accent)] hover:underline" href={`#${s.id}`}>
                {s.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-14 space-y-16">
        {sections.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-28">
            <h2 className="font-display text-2xl font-semibold text-[var(--primary)]">{s.title}</h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-[var(--neutral-700)]">
              {s.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
