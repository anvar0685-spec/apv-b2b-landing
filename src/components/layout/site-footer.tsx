import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { site, siteHasValidAdErid } from "@/config/site";
import { TrackedTelLink } from "@/components/contact/tracked-tel-link";

const displayBrand = site.brandName.replace(/_/g, " ");

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const tn = await getTranslations("nav");
  const showAdErid = siteHasValidAdErid();

  return (
    <footer className="border-t border-[var(--neutral-200)] bg-[var(--primary-dark)] text-[var(--neutral-200)]">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="font-display text-lg font-semibold text-white">{displayBrand}</p>
          <p className="mt-2 text-[13px] leading-snug text-[var(--text-on-dark-base)]">{site.legalEntityFullName}</p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--neutral-200)]">
            {t("innOgrn", { inn: site.inn, ogrn: site.ogrn })}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--neutral-200)]">{site.legalAddress}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--neutral-500)]">{t("navTitle")}</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link className="flex min-h-11 items-center py-2 hover:text-white" href="/uslugi">
                {tn("services")}
              </Link>
            </li>
            <li>
              <Link className="flex min-h-11 items-center py-2 hover:text-white" href="/personal">
                {tn("personal")}
              </Link>
            </li>
            <li>
              <Link className="flex min-h-11 items-center py-2 hover:text-white" href="/otrasli">
                {tn("industries")}
              </Link>
            </li>
            <li>
              <Link className="flex min-h-11 items-center py-2 hover:text-white" href="/ploshchadki">
                {tn("platforms")}
              </Link>
            </li>
            <li>
              <Link className="flex min-h-11 items-center py-2 hover:text-white" href="/blog">
                {tn("blog")}
              </Link>
            </li>
            <li>
              <Link className="flex min-h-11 items-center py-2 hover:text-white" href="/faq">
                {t("linkFaq")}
              </Link>
            </li>
            <li>
              <Link className="flex min-h-11 items-center py-2 hover:text-white" href="/garantii">
                {t("linkGarantii")}
              </Link>
            </li>
            <li>
              <Link className="flex min-h-11 items-center py-2 hover:text-white" href="/pravovaya-informaciya">
                {t("legal")}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--neutral-500)]">{t("contactsTitle")}</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <TrackedTelLink className="flex min-h-11 items-center py-2 hover:text-white" href={`tel:${site.phone.replace(/\s/g, "")}`}>
                {site.phone}
              </TrackedTelLink>
            </li>
            <li>
              <a className="flex min-h-11 items-center break-all py-2 hover:text-white" href={`mailto:${site.emailHello}`}>
                {site.emailHello}
              </a>
            </li>
            <li>
              <a className="flex min-h-11 items-center py-2 hover:text-white" href={site.telegram} rel="noopener noreferrer">
                {t("telegram")}
              </a>
            </li>
            <li>
              <a className="flex min-h-11 items-center py-2 hover:text-white" href={site.whatsapp} rel="noopener noreferrer">
                {t("whatsapp")}
              </a>
            </li>
          </ul>
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

      <div className="border-t border-white/10 px-4 py-6 text-center text-[11px] leading-relaxed text-[var(--neutral-500)] sm:px-6">
        <p>{t("legalStripB2b")}</p>
        {showAdErid ? (
          <p className="mt-2">
            {t("adMarkingLine", { advertiser: site.legalEntityFullName, erid: site.erid.trim() })}
          </p>
        ) : (
          <p className="mt-2">{t("adMarkingPending")}</p>
        )}
        <p className="mt-4 text-xs">
          © {new Date().getFullYear()} {displayBrand} · {site.domain}
        </p>
      </div>
    </footer>
  );
}
