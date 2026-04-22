import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Контакты — офис и карта",
  description: "Телефон, email, Telegram, WhatsApp Business и карта (заглушки до финальных реквизитов).",
};

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
    <main id="main" className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-[var(--primary)] md:text-5xl">
            Контакты
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[var(--neutral-700)]">
            Реквизиты и контакты берутся из централизованного конфига и переменных окружения (сейчас — плейсхолдеры).
            После регистрации юрлица и выбора офиса замените значения в окружении.
          </p>

          <ul className="mt-10 space-y-4 text-[var(--neutral-800)]">
            <li>
              <span className="text-sm text-[var(--neutral-500)]">Телефон</span>
              <br />
              <a className="text-lg font-medium text-[var(--accent)] hover:underline" href={`tel:${site.phone.replace(/\s/g, "")}`}>
                {site.phone}
              </a>
            </li>
            <li>
              <span className="text-sm text-[var(--neutral-500)]">Email</span>
              <br />
              <a className="font-medium text-[var(--accent)] hover:underline" href={`mailto:${site.emailHello}`}>
                {site.emailHello}
              </a>
              {site.emailSales !== site.emailHello ? (
                <>
                  <br />
                  <a className="text-sm text-[var(--accent)] hover:underline" href={`mailto:${site.emailSales}`}>
                    {site.emailSales} (продажи)
                  </a>
                </>
              ) : null}
            </li>
            <li>
              <span className="text-sm text-[var(--neutral-500)]">Мессенджеры</span>
              <div className="mt-2 flex flex-wrap gap-3">
                <a className="text-[var(--accent)] hover:underline" href={site.telegram} rel="noopener noreferrer">
                  Telegram
                </a>
                <a className="text-[var(--accent)] hover:underline" href={site.whatsapp} rel="noopener noreferrer">
                  WhatsApp
                </a>
              </div>
            </li>
            <li>
              <span className="text-sm text-[var(--neutral-500)]">Юридический адрес</span>
              <p className="mt-1 max-w-md">{site.legalAddress}</p>
              <p className="mt-2 text-sm text-[var(--neutral-600)]">
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
          <h2 className="font-display text-xl font-semibold text-[var(--primary)]">Карта</h2>
          <p className="mt-2 text-sm text-[var(--neutral-600)]">
            Виджет Яндекс.Карт подключим после финального адреса и ключа API.
          </p>
          <div
            className="mt-6 flex aspect-[4/3] w-full items-center justify-center rounded-xl border-2 border-dashed border-[var(--neutral-300)] bg-[var(--neutral-50)] text-center text-sm text-[var(--neutral-500)]"
            role="img"
            aria-label="Заглушка карты"
          >
            Карта: плейсхолдер
          </div>
        </div>
      </div>
    </main>
  );
}
