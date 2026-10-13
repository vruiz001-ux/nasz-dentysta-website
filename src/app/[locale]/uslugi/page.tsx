import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { ServicesGrid, AppointmentCTA, PageIntro } from "@/components/Sections";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  return pageMetadata((await params).locale, "/uslugi", "services");
}

export default async function Services({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <>
      <BreadcrumbJsonLd locale={locale} items={[{ name: t("nav.home"), href: "/" }, { name: t("nav.services"), href: "/uslugi" }]} />
      <PageIntro eyebrow={t("services.eyebrow")} title={t("services.title")} intro={t("services.intro")} />
      <ServicesGrid detailed withHeading={false} />
      <AppointmentCTA />
    </>
  );
}
