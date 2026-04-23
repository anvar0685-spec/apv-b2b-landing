type FaqItem = { id: string; question: string; answer: string };

export function FaqPremium({ items }: { items: FaqItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details
          key={item.id}
          className="group rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)] shadow-[var(--card-shadow)] transition-[box-shadow,border-color] open:border-[var(--accent)]/25 open:shadow-[var(--card-shadow-hover)]"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5 [&::-webkit-details-marker]:hidden">
            <span className="font-display text-base font-semibold tracking-tight text-[var(--primary)] md:text-lg">
              {item.question}
            </span>
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--neutral-200)] text-lg font-light text-[var(--accent)] transition group-open:rotate-45"
              aria-hidden
            >
              +
            </span>
          </summary>
          <div className="border-t border-[var(--neutral-200)] px-5 pb-5 pt-0 text-base leading-relaxed text-[var(--neutral-700)] md:px-6 md:pb-6">
            <p className="pt-4">{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
