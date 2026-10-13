import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageIntro } from "@/components/Sections";
import { CookieSettingsInline } from "@/components/CookieSettingsInline";
import { clinic, locationAddress } from "@/content/clinic";
import { CONSENT_VERSION } from "@/lib/consent-version";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  return pageMetadata((await params).locale, "/polityka-prywatnosci", "privacy");
}

/** Order follows GDPR Art. 13: controller → purposes/bases → recipients → transfers → retention → rights. */
const SECTIONS = ["form", "purpose", "whatsapp", "cookies", "recipients", "transfers", "retention", "logs", "rights", "automated"] as const;

export default async function Privacy({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");
  const tf = await getTranslations("footer");
  const seat = clinic.locations.find((l) => l.id === "drzewna");
  const controller = [clinic.legalName, seat && locationAddress(seat), clinic.nip && `NIP ${clinic.nip}`, clinic.regon && `REGON ${clinic.regon}`].filter(Boolean);
  const updated = new Intl.DateTimeFormat(locale === "uk" ? "uk-UA" : locale, { dateStyle: "long" }).format(new Date(CONSENT_VERSION));

  return (
    <>
      <PageIntro eyebrow={clinic.name} title={t("title")} intro={t("intro")} />
      <section className="pb-24">
        <div className="container-x max-w-3xl space-y-10 text-lg leading-relaxed text-navy-soft">
          <p className="text-sm text-ink-muted">{t("updated")}: <time dateTime={CONSENT_VERSION}>{updated}</time></p>
          <div>
            <h2 className="text-2xl font-semibold text-navy">{t("controller")}</h2>
            <p className="mt-3">{controller.join(", ")}.</p>
            {clinic.email && (
              <p className="mt-2">
                {t("contactLine", { email: clinic.email }).split(clinic.email)[0]}
                <a href={`mailto:${clinic.email}`} className="font-semibold text-teal-dark underline">{clinic.email}</a>
                {t("contactLine", { email: clinic.email }).split(clinic.email)[1]}
              </p>
            )}
          </div>
          {SECTIONS.map((s) => (
            <div key={s}>
              <h2 className="text-2xl font-semibold text-navy">{t(`sections.${s}.h`)}</h2>
              <p className="mt-3">{t(`sections.${s}.p`)}</p>
              {s === "cookies" && <CookieSettingsInline label={tf("cookies")} />}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
