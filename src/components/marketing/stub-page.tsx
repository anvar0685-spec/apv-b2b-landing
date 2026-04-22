import type { ReactNode } from "react";

type StubPageProps = {
  title: string;
  description?: string;
  children?: ReactNode;
};

export function StubPage({ title, description, children }: StubPageProps) {
  return (
    <main
      id="main"
      className="mx-auto max-w-[800px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      <h1 className="font-display text-3xl font-bold tracking-tight text-[var(--primary)] md:text-5xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-6 text-lg leading-relaxed text-[var(--neutral-700)]">
          {description}
        </p>
      ) : null}
      <div className="mt-10 max-w-none space-y-4 text-base leading-relaxed text-[var(--neutral-700)]">
        {children ?? (
          <p>
            Заглушка контента: сюда войдёт финальный SEO-текст, блоки EEAT и
            CTA после согласования бренда и юр. данных.
          </p>
        )}
      </div>
    </main>
  );
}
