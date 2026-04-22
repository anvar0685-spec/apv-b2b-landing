import { Link } from "@/i18n/navigation";
import { site } from "@/config/site";
import { Button } from "@/components/ui/button";

const displayBrand = site.brandName.replace(/_/g, " ");

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--neutral-200)] bg-[var(--primary-dark)] text-[var(--neutral-200)]">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="font-display text-lg font-semibold text-white">{displayBrand}</p>
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

      <div className="border-t border-white/10 bg-black/15 px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-[1280px] lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.12em] text-[var(--neutral-500)]">
            Дайджест для операционных команд
          </p>
          <form
            className="mx-auto mt-6 flex max-w-lg flex-col gap-3 sm:flex-row sm:items-stretch"
            action="/zayavka"
            method="get"
          >
            <label htmlFor="footer-digest-email" className="sr-only">
              Email
            </label>
            <input
              id="footer-digest-email"
              name="email_hint"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="Рабочий email"
              className="h-11 flex-1 rounded-xl border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-white/40 outline-none ring-[var(--accent)] transition focus:ring-2"
            />
            <Button type="submit" className="shrink-0 sm:w-auto">
              Подписаться
            </Button>
          </form>
          <p className="mt-3 text-center text-[11px] leading-relaxed text-[var(--neutral-500)]">
            Заглушка: без рассылки до подключения ESP; переход на заявку с подсказкой в query при необходимости.
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden border-t border-white/5 py-10 md:py-16">
        <p
          className="pointer-events-none select-none text-center font-display font-bold leading-[0.85] tracking-[-0.04em] text-white/[0.08]"
          style={{ fontSize: "clamp(3.5rem, 14vw, 11rem)" }}
          aria-hidden
        >
          {displayBrand}
        </p>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-[var(--neutral-500)]">
        © {new Date().getFullYear()} {displayBrand} · {site.domain}
      </div>
    </footer>
  );
}
