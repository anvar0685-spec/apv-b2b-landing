import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
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

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.brandName,
    url: site.url,
    telephone: site.phone,
    email: site.emailHello,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.legalAddress,
      addressCountry: "RU",
    },
  };

  return (
    <main id="main" className="pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="border-b border-[var(--neutral-200)] bg-[var(--surface)] py-10 lg:py-14">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <p className="type-kicker">Связь</p>
          <h1 className="font-display mt-3 max-w-3xl text-balance text-3xl font-bold tracking-[-0.035em] text-[var(--primary)] md:text-[2.625rem] md:leading-[1.12]">
            Контакты
          </h1>
          <p className="type-lead mt-5 max-w-2xl">
            Реквизиты и контакты централизованы в конфигурации сайта и переменных окружения. Значения ниже соответствуют
            текущему окружению публикации.
          </p>
        </div>
      </section>

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
                  <a className="font-medium text-[var(--accent)] hover:underline" href={site.telegram} rel="noopener noreferrer">
                    Telegram
                  </a>
                  <a className="font-medium text-[var(--accent)] hover:underline" href={site.whatsapp} rel="noopener noreferrer">
                    WhatsApp
                  </a>
                </div>
              </li>
              <li className="rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)] p-6 shadow-[var(--card-shadow)]">
                <span className="text-xs font-semibold uppercase tracking-wide text-[var(--neutral-500)]">Юридический адрес</span>
                <p className="mt-2 max-w-md leading-relaxed text-[var(--neutral-700)]">{site.legalAddress}</p>
                <p className="mt-3 text-sm text-[var(--neutral-500)]">
                  ИНН {site.inn} · ОГРН {site.ogrn}
                </p>
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
              Виджет Яндекс.Карт подключается после выбора финального адреса и выдачи ключа API.
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
    </main>
  );
}
