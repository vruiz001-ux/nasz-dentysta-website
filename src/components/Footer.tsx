import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { clinic, formatPhone } from "@/content/clinic";
import { NAV } from "@/lib/nav";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { CookieSettingsButton } from "./CookieConsent";
import { TrackedLink } from "./TrackedLink";
import { FacebookIcon, InstagramIcon } from "./icons";

export async function Footer() {
  const t = await getTranslations();
  const year = new Date().getFullYear();
  const legal = [clinic.legalName, clinic.nip && `NIP ${clinic.nip}`, clinic.regon && `REGON ${clinic.regon}`, clinic.krs && `KRS ${clinic.krs}`]
    .filter(Boolean)
    .join(" · ");

  return (
    <footer className="bg-navy pb-28 pt-20 text-ivory lg:pb-10">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link href="/" className="inline-flex rounded-2xl bg-white px-4 py-3">
              <Image src="/images/logo.png" alt={clinic.name} width={700} height={320} className="h-9 w-auto" />
            </Link>
            <p className="mt-5 max-w-xs text-ivory/70">{t("footer.tagline")}</p>
            <div className="mt-6 flex gap-3">
              {clinic.social.facebook && (
                <a href={clinic.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-ivory/20 hover:bg-ivory/10">
                  <FacebookIcon className="h-5 w-5" aria-hidden />
                </a>
              )}
              {clinic.social.instagram && (
                <a href={clinic.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-ivory/20 hover:bg-ivory/10">
                  <InstagramIcon className="h-5 w-5" aria-hidden />
                </a>
              )}
            </div>
            <div className="mt-8"><LanguageSwitcher tone="light" /></div>
          </div>
          <nav aria-label={t("footer.nav")} className="md:col-span-2">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">{t("footer.nav")}</h2>
            <ul className="mt-5 space-y-3">
              {NAV.map((n) => (
                <li key={n.key}><Link href={n.href} className="text-ivory/80 hover:text-ivory">{t(`nav.${n.key}`)}</Link></li>
              ))}
            </ul>
          </nav>
          {clinic.locations.map((l) => (
            <div key={l.id} className="md:col-span-3">
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">{t("contact.clinic")} {l.label}</h2>
              <address className="mt-5 space-y-2 not-italic text-ivory/80">
                <p>{l.street}<br />{l.postalCode} {l.city}</p>
                <p>
                  <TrackedLink event="phone_click" source={`footer-${l.id}`} href={`tel:${l.phone}`} className="font-semibold text-ivory hover:text-sage">
                    {formatPhone(l.phone)}
                  </TrackedLink>
                </p>
              </address>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col gap-4 border-t border-ivory/10 pt-8 text-sm text-ivory/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {clinic.legalName ?? clinic.name}. {t("footer.rights")}
            {legal && <span className="block md:ml-2 md:inline">{legal.replace(`${clinic.legalName} · `, "")}</span>}
          </p>
          <div className="flex flex-wrap gap-6">
            {clinic.email && <a href={`mailto:${clinic.email}`} className="hover:text-ivory">{clinic.email}</a>}
            <Link href="/polityka-prywatnosci" className="hover:text-ivory">{t("footer.privacy")}</Link>
            <CookieSettingsButton label={t("footer.cookies")} />
          </div>
        </div>
      </div>
    </footer>
  );
}
