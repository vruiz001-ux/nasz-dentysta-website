import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ExternalLink, MapPin, Phone } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { clinic, formatPhone, nfzLocations } from "@/content/clinic";
import { pageMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { AppointmentCTA, PageIntro } from "@/components/Sections";
import { TrackedLink } from "@/components/TrackedLink";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  return pageMetadata((await params).locale, "/nfz", "nfz");
}

/** Official NFZ waiting-times service (public, no personal data sent). */
const NFZ_QUEUES = "https://terminyleczenia.nfz.gov.pl/";

export default async function NfzPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const places = nfzLocations();
  if (!places.length) notFound();
  const t = await getTranslations();
  const sections = ["where", "covers", "bring", "book", "private"] as const;

  return (
    <>
      <BreadcrumbJsonLd locale={locale} items={[{ name: t("nav.home"), href: "/" }, { name: t("nav.nfz"), href: "/nfz" }]} />
      <PageIntro eyebrow={t("nfzPage.eyebrow")} title={t("nfzPage.title")} intro={t("nfzPage.intro")} />

      <section className="pb-16">
        <div className="container-x grid gap-8 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-7">
            {sections.map((s) => (
              <section key={s} aria-labelledby={`nfz-${s}`}>
                <h2 id={`nfz-${s}`} className="text-2xl font-semibold">{t(`nfzPage.${s}.h`)}</h2>
                <p className="mt-3 max-w-[68ch] leading-relaxed text-navy-soft">{t(`nfzPage.${s}.p`)}</p>
              </section>
            ))}
            <a href={NFZ_QUEUES} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 font-semibold text-teal-dark hover:underline">
              {t("nfzPage.queue")} <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
          </div>

          <aside className="space-y-4 lg:col-span-5">
            {clinic.locations.map((l) => (
              <div key={l.id} className={`card p-6 ${l.nfz ? "ring-2 ring-nfz/25" : ""}`}>
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-xl font-semibold">{l.label}</h2>
                  {l.nfz ? <span className="badge-nfz">{t("hero.nfzChip")}</span> : <span className="text-sm text-ink-muted">{t("hero.privateChip")}</span>}
                </div>
                <p className="mt-2 flex items-start gap-2 text-navy-soft">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-teal-dark" aria-hidden /> {l.street}, {l.postalCode} {l.city}
                </p>
                <TrackedLink event="phone_click" source={`nfz-${l.id}`} href={`tel:${l.phone}`} className={`${l.nfz ? "btn-primary" : "btn-ghost"} mt-4 !min-h-11`}>
                  <Phone className="h-4 w-4" aria-hidden /> <span className="tabular-nums">{formatPhone(l.phone)}</span>
                </TrackedLink>
              </div>
            ))}
            {places.length > 0 && (
              <Link href="/uslugi" className="inline-flex min-h-11 items-center font-semibold text-teal-dark hover:underline">
                {t("care.private.cta")} →
              </Link>
            )}
          </aside>
        </div>
      </section>
      <AppointmentCTA />
    </>
  );
}
