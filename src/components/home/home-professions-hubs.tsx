import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { PROFESSIONS } from "@/content/professions-cities";
import { OTRASLI_SLUGS, PLOSHCHADKI_SLUGS } from "@/lib/site-structure";
import { getLocale, getTranslations } from "next-intl/server";

/** Первые 10 ролей из канона (без промо и прочего «несклад» в хвосте списка). */
const TOP_PROFESSIONS = PROFESSIONS.slice(0, 10);

export async function HomeProfessionsHubs() {
  const locale = await getLocale();
  const t = await getTranslations("homePage.professionsHub");
  const en = locale === "en";

  return (
    <section id="professions-home" className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--neutral-500)]">{t("kicker")}</p>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-[-0.035em] text-[var(--primary)] md:text-[2.625rem] md:leading-[1.12]">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--neutral-700)]">
            {t("leadBefore")}{" "}
            <Link className="font-semibold text-[var(--accent)] hover:underline" href="/personal">
              {t("leadLink")}
            </Link>
            .
          </p>
        </div>
        <Button asChild variant="secondary">
          <Link href="/personal">{t("allProfessions")}</Link>
        </Button>
      </div>
      <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {TOP_PROFESSIONS.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/personal/${p.slug}`}
              className="block rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)] px-4 py-4 text-sm font-semibold text-[var(--primary)] shadow-[var(--card-shadow)] transition hover:border-[color-mix(in_srgb,var(--accent)_35%,var(--neutral-200))] hover:text-[var(--accent)]"
            >
              {en ? p.titleEn : p.titleRu}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-20 border-t border-[var(--neutral-200)] pt-16">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--neutral-500)]">
          {t("industriesBlockKicker")}
        </p>
        <h2 className="font-display mt-3 text-2xl font-bold tracking-tight text-[var(--primary)] md:text-3xl">
          {t("industriesBlockTitle")}
        </h2>
        <p className="mt-4 max-w-2xl text-[var(--neutral-700)]">{t("industriesBlockLead")}</p>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <Card className="border-[var(--neutral-200)] bg-[var(--surface)]">
            <CardTitle className="text-lg">{t("industriesTitle")}</CardTitle>
            <CardDescription className="mt-2">{t("industriesDesc")}</CardDescription>
            <ul className="mt-4 space-y-2 text-sm">
              {OTRASLI_SLUGS.slice(0, 4).map((o) => (
                <li key={o.slug}>
                  <Link className="text-[var(--accent)] hover:underline" href={`/otrasli/${o.slug}`}>
                    {en ? o.title.en : o.title.ru}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-5">
              <Button asChild variant="secondary" size="sm">
                <Link href="/otrasli">{t("allIndustries")}</Link>
              </Button>
            </div>
          </Card>
          <Card className="border-[var(--neutral-200)] bg-[var(--surface)]">
            <CardTitle className="text-lg">{t("platformsTitle")}</CardTitle>
            <CardDescription className="mt-2">{t("platformsDesc")}</CardDescription>
            <ul className="mt-4 space-y-2 text-sm">
              {PLOSHCHADKI_SLUGS.map((p) => (
                <li key={p.slug}>
                  <Link className="text-[var(--accent)] hover:underline" href={`/ploshchadki/${p.slug}`}>
                    {en ? p.title.en : p.title.ru}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-5">
              <Button asChild variant="secondary" size="sm">
                <Link href="/ploshchadki">{t("allPlatforms")}</Link>
              </Button>
            </div>
          </Card>
          <Card className="border-[var(--neutral-200)] bg-[var(--surface)]">
            <CardTitle className="text-lg">{t("geoTitle")}</CardTitle>
            <CardDescription className="mt-2">{t("geoDesc")}</CardDescription>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link className="text-[var(--accent)] hover:underline" href="/geografiya/moskva">
                  {t("geoMoscow")}
                </Link>
              </li>
              <li>
                <Link className="text-[var(--accent)] hover:underline" href="/geografiya/moskovskaya-oblast/khimki">
                  {t("geoKhimki")}
                </Link>
              </li>
              <li>
                <Link className="text-[var(--accent)] hover:underline" href="/geografiya/moskovskaya-oblast/podolsk">
                  {t("geoPodolsk")}
                </Link>
              </li>
            </ul>
            <div className="mt-5">
              <Button asChild variant="secondary" size="sm">
                <Link href="/geografiya">{t("geoMap")}</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
