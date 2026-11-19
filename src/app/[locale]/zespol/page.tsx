import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { clinic } from "@/content/clinic";
import { pageMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { AppointmentCTA, PageIntro, TeamGrid } from "@/components/Sections";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  return pageMetadata((await params).locale, "/zespol", "team");
}

/**
 * Team. Shows only what clinic.ts holds (name + role); no invented specialisations.
 * Add photos / languages / areas of practice there once each person has confirmed them.
 */
export default async function TeamPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const doctors = clinic.team.filter((m) => m.group === "doctor");
  const staff = clinic.team.filter((m) => m.group === "staff");
  return (
    <>
      <BreadcrumbJsonLd locale={locale} items={[{ name: t("nav.home"), href: "/" }, { name: t("nav.team"), href: "/zespol" }]} />
      <PageIntro eyebrow={t("teamPage.eyebrow")} title={t("teamPage.title")} intro={t("teamPage.intro")} />
      <section className="pb-16">
        <div className="container-x space-y-14">
          <TeamGrid title={t("about.doctorsTitle")} members={doctors} locale={locale} />
          <TeamGrid title={t("about.staffTitle")} members={staff} locale={locale} small />
        </div>
      </section>
      <AppointmentCTA />
    </>
  );
}
