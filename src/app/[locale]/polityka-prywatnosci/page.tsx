import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageIntro } from "@/components/Sections";
import { clinic, locationAddress } from "@/content/clinic";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  return pageMetadata((await params).locale, "/polityka-prywatnosci", "privacy");
}

const SECTIONS = ["scope", "purpose", "retention", "rights", "recipients", "cookies", "whatsapp"] as const;

export default async function Privacy({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");
  const seat = clinic.locations.find((l) => l.id === "drzewna");
  const controller = [clinic.legalName, seat && locationAddress(seat), clinic.nip && `NIP ${clinic.nip}`, clinic.email].filter(Boolean);

  return (
    <>
      <PageIntro eyebrow={clinic.name} title={t("title")} />
      <section className="pb-24">
        <div className="container-x max-w-3xl space-y-10 text-lg leading-relaxed text-navy-soft">
          <div>
            <h2 className="text-2xl font-semibold text-navy">{t("controller")}</h2>
            <p className="mt-3">{controller.length ? controller.join(", ") : t("controllerPending")}</p>
          </div>
          {SECTIONS.map((s) => (
            <div key={s}>
              <h2 className="text-2xl font-semibold text-navy">{t(`sections.${s}.h`)}</h2>
              <p className="mt-3">{t(`sections.${s}.p`)}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
