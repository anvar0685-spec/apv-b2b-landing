import type { ReactNode } from "react";

type StubPageProps = {
  title: string;
  description?: string;
  kicker?: string;
  children?: ReactNode;
};

export function StubPage({ title, description, kicker = "Компания", children }: StubPageProps) {
  return (
    <main id="main" className="pb-24">
      <section className="border-b border-[var(--neutral-200)] bg-[var(--surface)] py-10 lg:py-14">
        <div className="mx-auto max-w-[880px] px-4 sm:px-6 lg:px-8">
          <p className="type-kicker">{kicker}</p>
          <h1 className="font-display mt-3 text-balance text-3xl font-bold tracking-[-0.035em] text-[var(--primary)] md:text-5xl md:leading-[1.08]">
            {title}
          </h1>
          {description ? <p className="type-lead mt-6">{description}</p> : null}
        </div>
      </section>

      <article className="mx-auto max-w-[880px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="type-editorial-dropcap space-y-5 text-base leading-relaxed text-[var(--neutral-700)]">
          {children ?? (
            <>
              <p>
                Раздел готовится к публикации: здесь появится структурированный материал с оглавлением, акцентами и
                перекрёстными ссылками на услуги, кейсы и калькулятор.
              </p>
              <p>
                Если вам нужен этот контент раньше официального релиза — оставьте заявку: команда пришлёт бриф и
                согласует формат под вашу коммуникацию.
              </p>
            </>
          )}
        </div>
      </article>
    </main>
  );
}
