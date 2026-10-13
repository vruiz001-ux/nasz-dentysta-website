import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageIntro } from "@/components/Sections";
import { ContactInfo, Locations } from "@/components/Contact";
import { ContactForm } from "@/components/ContactForm";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { activeServices } from "@/lib/site";
import { clinic } from "@/content/clinic";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  return pageMetadata((await params).locale, "/kontakt", "contact");
}

export default async function Contact({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <>
      <BreadcrumbJsonLd locale={locale} items={[{ name: t("nav.home"), href: "/" }, { name: t("nav.contact"), href: "/kontakt" }]} />
      <PageIntro eyebrow={t("contact.eyebrow")} title={t("meta.contactTitle")} intro={t("cta.text")} />
      <section className="pb-16">
        <div className="container-x grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div id="wizyta" className="card scroll-mt-28 p-6 sm:p-10 lg:col-span-7">
            <h2 className="text-2xl font-semibold sm:text-3xl">{t("form.title")}</h2>
            <p className="mt-2 mb-8 text-ink-muted">{t("form.intro")}</p>
            <ContactForm services={activeServices()} legalName={clinic.legalName ?? clinic.name} locations={clinic.locations.map((l) => ({ id: l.id, label: `${l.label} — ${l.street}` }))} />
          </div>
          <div className="lg:col-span-5">
            <ContactInfo />
          </div>
        </div>
      </section>
      <section aria-labelledby="clinics-title" className="pb-24">
        <div className="container-x">
          <h2 id="clinics-title" className="h-section mb-10">{t("contact.title")}</h2>
          <Locations />
        </div>
      </section>
    </>
  );
}
