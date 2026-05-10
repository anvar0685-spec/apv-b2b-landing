import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MarketingHubShell } from "@/components/layout/marketing-hub-shell";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { absUrl } from "@/lib/abs-url";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "pagesSeo" });
  return buildPageMetadata({
    locale: params.locale,
    pathname: "/kontakty",
    title: t("kontakty.metaTitle"),
    description: t("kontakty.metaDescription"),
  });
}

export default async function Page({ params }: Props) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.brandName,
    legalName: site.legalEntityFullName,
    url: absUrl("/", params.locale),
    telephone: site.phone,
    email: site.emailHello,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.legalAddress,
      addressLocality: "Люберцы",
      addressRegion: "Московская область",
      addressCountry: "RU",
    },
  };

  return (
    <main id="main" className="pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <MarketingHubShell
        kicker="Связь"
        title="Контакты"
        description="Реквизиты и контакты централизованы в конфигурации сайта и переменных окружения. Значения ниже соответствуют текущему окружению публикации."
        heroSurface="contacts"
      >
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <ul className="space-y-6 text-[var(--neutral-950)]">
              <li className="rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)] p-6 shadow-[var(--card-shadow)]">
                <span className="text-xs font-semibold uppercase tracking-wide text-[var(--neutral-500)]">Телефон</span>
                <br />
                <a
                  className="mt-2 inline-block text-xl font-semibold text-[var(--accent)] transition hover:underline"
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                >
                  {site.phone}
                </a>
              </li>
              <li className="rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)] p-6 shadow-[var(--card-shadow)]">
                <span className="text-xs font-semibold uppercase tracking-wide text-[var(--neutral-500)]">Email</span>
                <br />
                <a
                  className="mt-2 inline-block font-semibold text-[var(--accent)] transition hover:underline"
                  href={`mailto:${site.emailHello}`}
                >
                  {site.emailHello}
                </a>
                {site.emailSales !== site.emailHello ? (
                  <>
                    <br />
                    <a className="mt-1 inline-block text-sm text-[var(--accent)] hover:underline" href={`mailto:${site.emailSales}`}>
                      {site.emailSales} (продажи)
                    </a>
                  </>
                ) : null}
              </li>
              <li className="rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)] p-6 shadow-[var(--card-shadow)]">
                <span className="text-xs font-semibold uppercase tracking-wide text-[var(--neutral-500)]">Мессенджеры</span>
                <div className="mt-3 flex flex-wrap gap-4">
                  {site.max ? (
                    <a className="font-medium text-[var(--accent)] hover:underline" href={site.max} rel="noopener noreferrer">
                      MAX
                    </a>
                  ) : null}
                  <a className="font-medium text-[var(--accent)] hover:underline" href={site.telegram} rel="noopener noreferrer">
                    Telegram
                  </a>
                  <a className="font-medium text-[var(--accent)] hover:underline" href={site.whatsapp} rel="noopener noreferrer">
                    WhatsApp
                  </a>
                </div>
              </li>
              <li className="rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)] p-6 shadow-[var(--card-shadow)]">
                <span className="text-xs font-semibold uppercase tracking-wide text-[var(--neutral-500)]">
                  Юридическое лицо
                </span>
                <p className="mt-2 text-sm font-medium leading-snug text-[var(--neutral-950)]">{site.legalEntityFullName}</p>
                <span className="mt-4 block text-xs font-semibold uppercase tracking-wide text-[var(--neutral-500)]">
                  Юридический адрес
                </span>
                <p className="mt-2 max-w-md leading-relaxed text-[var(--neutral-700)]">{site.legalAddress}</p>
                <p className="mt-3 text-sm text-[var(--neutral-500)]">
                  ИНН {site.inn} · ОГРНИП {site.ogrn}
                </p>
              </li>
              <li className="rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)] p-6 shadow-[var(--card-shadow)]">
                <span className="text-xs font-semibold uppercase tracking-wide text-[var(--neutral-500)]">Банковские реквизиты</span>
                <dl className="mt-3 space-y-2 text-sm text-[var(--neutral-700)]">
                  <div>
                    <dt className="text-xs text-[var(--neutral-500)]">Расчётный счёт</dt>
                    <dd className="font-mono-nums font-medium">{site.checkingAccount}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[var(--neutral-500)]">Банк</dt>
                    <dd>{site.bankName}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[var(--neutral-500)]">ИНН банка</dt>
                    <dd className="font-mono-nums">{site.bankInn}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[var(--neutral-500)]">БИК</dt>
                    <dd className="font-mono-nums">{site.bik}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[var(--neutral-500)]">к/с</dt>
                    <dd className="font-mono-nums break-all">{site.correspondentAccount}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[var(--neutral-500)]">Юр. адрес банка</dt>
                    <dd className="leading-relaxed">{site.bankLegalAddress}</dd>
                  </div>
                </dl>
              </li>
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/zayavka">Оставить заявку</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/kalkulyator">Рассчитать проект</Link>
              </Button>
            </div>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold tracking-tight text-[var(--primary)]">Карта</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--neutral-700)]">
              Виджет Яндекс.Карт подключается после выдачи ключа API (юр. адрес — Люберцы, см. блок реквизитов).
            </p>
            <div
              className="mt-8 flex aspect-[4/3] w-full items-center justify-center rounded-2xl border border-[var(--neutral-200)] bg-gradient-to-br from-[var(--surface)] to-[var(--card)] text-center shadow-[var(--card-shadow)]"
              role="img"
              aria-label="Интерактивная карта появится после подключения виджета"
            >
              <div>
                <p className="font-display text-sm font-semibold text-[var(--primary)]">Карта офиса</p>
                <p className="mt-2 px-6 text-xs text-[var(--neutral-500)]">Здесь будет интерактивный виджет с меткой входа.</p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </MarketingHubShell>
    </main>
  );
}
