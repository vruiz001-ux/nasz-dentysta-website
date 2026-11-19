import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { AppointmentCTA, PageIntro, TeamStatement } from "@/components/Sections";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  return pageMetadata((await params).locale, "/zespol", "team");
}

/** Team. No individual names are published (owner's decision, Nov 2026). */
export default async function TeamPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <>
      <BreadcrumbJsonLd locale={locale} items={[{ name: t("nav.home"), href: "/" }, { name: t("nav.team"), href: "/zespol" }]} />
      <PageIntro eyebrow={t("teamPage.eyebrow")} title={t("teamPage.title")} />
      <section className="pb-16">
        <div className="container-x"><TeamStatement /></div>
      </section>
      <AppointmentCTA />
    </>
  );
}
