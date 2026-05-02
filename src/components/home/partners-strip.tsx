import { getTranslations } from "next-intl/server";

export async function PartnersStrip() {
  const t = await getTranslations("home");
  const companies = t.raw("partnerCompanies") as string[];

  return (
    <section
      className="border-y border-[var(--neutral-200)] bg-[var(--card)]/80 py-12 md:py-14"
      aria-labelledby="partners-heading"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <p id="partners-heading" className="type-kicker text-center">
          {t("partnersKicker")}
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-[var(--neutral-700)] md:text-base">
          {t("partnersLead")}
        </p>
        <ul className="mx-auto mt-8 grid max-w-3xl gap-3 sm:gap-4">
          {companies.map((name) => (
            <li
              key={name}
              className="rounded-2xl border border-[var(--neutral-200)] bg-[var(--surface)] px-4 py-3 text-center text-sm font-semibold text-[var(--primary)] shadow-[var(--card-shadow)] md:px-6 md:text-base"
            >
              {name}
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-[var(--neutral-500)]">
          {t("partnersNote")}
        </p>
      </div>
    </section>
  );
}
