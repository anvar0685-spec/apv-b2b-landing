import type { LegalSection } from "@/content/legal-pages-stub";

/** Оглавление + разделы без шапки страницы (для композиции с кастомным hero). */
export function LegalTableOfContentsAndSections({ sections }: { sections: LegalSection[] }) {
  return (
    <>
      <nav
        aria-label="Содержание документа"
        className="rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)] p-6 shadow-[var(--card-shadow)]"
      >
        <p className="text-sm font-semibold text-[var(--primary)]">Содержание</p>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-[var(--neutral-700)]">
          {sections.map((s) => (
            <li key={s.id}>
              <a className="font-medium text-[var(--accent)] underline-offset-4 hover:underline" href={`#${s.id}`}>
                {s.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-14 space-y-16">
        {sections.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-28">
            <h2 className="type-headline">{s.title}</h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-[var(--neutral-700)]">
              {s.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

type LegalBodyProps = {
  title: string;
  lead?: string;
  sections: LegalSection[];
  /** Подпись над заголовком (по умолчанию «Документ») */
  kicker?: string;
};

export function LegalBody({ title, lead, sections, kicker = "Документ" }: LegalBodyProps) {
  return (
    <main id="main" className="pb-24">
      <section className="border-b border-[var(--neutral-200)] bg-[var(--surface)] py-10 lg:py-14">
        <div className="mx-auto max-w-[880px] px-4 sm:px-6 lg:px-8">
          <p className="type-kicker">{kicker}</p>
          <h1 className="font-display mt-3 text-balance text-3xl font-bold tracking-[-0.035em] text-[var(--primary)] md:text-5xl md:leading-[1.08]">
            {title}
          </h1>
          {lead ? <p className="type-lead mt-6">{lead}</p> : null}
        </div>
      </section>

      <div className="mx-auto max-w-[880px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <LegalTableOfContentsAndSections sections={sections} />
      </div>
    </main>
  );
}
