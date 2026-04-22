import { Link } from "@/i18n/navigation";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--neutral-200)] bg-[var(--primary-dark)] text-[var(--neutral-200)]">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="font-display text-lg font-semibold text-white">APV</p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--neutral-200)]">
            Реквизиты и юр. данные появятся здесь после финализации бренда (ИНН,
            ОГРН, адрес).
          </p>
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
            Контакты
          </p>
          <p className="mt-4 text-sm">
            Телефон, email, Telegram и WhatsApp — заглушки до финальных каналов.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-[var(--neutral-500)]">
        © {new Date().getFullYear()} APV · compliance-first workforce
      </div>
    </footer>
  );
}
