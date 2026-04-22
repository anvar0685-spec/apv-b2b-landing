import { Link } from "@/i18n/navigation";
import { site } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--neutral-200)] bg-[var(--primary-dark)] text-[var(--neutral-200)]">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="font-display text-lg font-semibold text-white">{site.brandName}</p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--neutral-200)]">
            ИНН: {site.inn} · ОГРН: {site.ogrn}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--neutral-200)]">{site.legalAddress}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--neutral-500)]">
            Навигация
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link className="hover:text-white" href="/uslugi">
                Услуги
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/personal">
                Персонал
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/blog">
                Блог
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/pravovaya-informaciya">
                Правовая информация
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--neutral-500)]">
            Контакты (заглушки)
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a className="hover:text-white" href={`tel:${site.phone.replace(/\s/g, "")}`}>
                {site.phone}
              </a>
            </li>
            <li>
              <a className="hover:text-white" href={`mailto:${site.emailHello}`}>
                {site.emailHello}
              </a>
            </li>
            <li>
              <a className="hover:text-white" href={site.telegram} rel="noopener noreferrer">
                Telegram
              </a>
            </li>
            <li>
              <a className="hover:text-white" href={site.whatsapp} rel="noopener noreferrer">
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-[var(--neutral-500)]">
        © {new Date().getFullYear()} {site.brandName} · {site.domain}
      </div>
    </footer>
  );
}
