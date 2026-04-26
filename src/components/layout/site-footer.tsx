import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { site } from "@/config/site";
import { Button } from "@/components/ui/button";
import { TrackedTelLink } from "@/components/contact/tracked-tel-link";

const displayBrand = site.brandName.replace(/_/g, " ");

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const tn = await getTranslations("nav");

  return (
    <footer className="border-t border-[var(--neutral-200)] bg-[var(--primary-dark)] text-[var(--neutral-200)]">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="font-display text-lg font-semibold text-white">{displayBrand}</p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--neutral-200)]">
            {t("innOgrn", { inn: site.inn, ogrn: site.ogrn })}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--neutral-200)]">{site.legalAddress}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--neutral-500)]">{t("navTitle")}</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link className="hover:text-white" href="/uslugi">
                {tn("services")}
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/personal">
                {tn("personal")}
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/otrasli">
                {tn("industries")}
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/ploshchadki">
                {tn("platforms")}
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/geografiya">
                {tn("geo")}
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/blog">
                {tn("blog")}
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/pravovaya-informaciya">
                {t("legal")}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--neutral-500)]">{t("contactsTitle")}</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <TrackedTelLink className="hover:text-white" href={`tel:${site.phone.replace(/\s/g, "")}`}>
                {site.phone}
              </TrackedTelLink>
            </li>
            <li>
              <a className="hover:text-white" href={`mailto:${site.emailHello}`}>
                {site.emailHello}
              </a>
            </li>
            <li>
              <a className="hover:text-white" href={site.telegram} rel="noopener noreferrer">
                {t("telegram")}
              </a>
            </li>
            <li>
              <a className="hover:text-white" href={site.whatsapp} rel="noopener noreferrer">
                {t("whatsapp")}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/15 px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-[1280px] lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.12em] text-[var(--neutral-500)]">{t("digestTitle")}</p>
          <form
            className="mx-auto mt-6 flex max-w-lg flex-col gap-3 sm:flex-row sm:items-stretch"
            action="/zayavka"
            method="get"
          >
            <label htmlFor="footer-digest-email" className="sr-only">
              {t("digestEmailLabel")}
            </label>
            <input
              id="footer-digest-email"
              name="email_hint"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder={t("digestPlaceholder")}
              className="h-11 flex-1 rounded-xl border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-white/40 outline-none ring-[var(--accent)] transition focus:ring-2"
            />
            <Button type="submit" className="shrink-0 sm:w-auto">
              {t("digestSubmit")}
            </Button>
          </form>
          <p className="mt-3 text-center text-[11px] leading-relaxed text-[var(--neutral-500)]">{t("digestDisclaimer")}</p>
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
