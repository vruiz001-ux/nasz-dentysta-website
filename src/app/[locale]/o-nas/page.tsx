import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { AboutSection, Journey, AppointmentCTA, PageIntro } from "@/components/Sections";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  return pageMetadata((await params).locale, "/o-nas", "about");
}

export default async function About({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <>
      <BreadcrumbJsonLd locale={locale} items={[{ name: t("nav.home"), href: "/" }, { name: t("nav.about"), href: "/o-nas" }]} />
      <PageIntro eyebrow={t("about.eyebrow")} title={t("about.title")} />
      <AboutSection full />
      <Journey />
      <AppointmentCTA />
    </>
  );
}
