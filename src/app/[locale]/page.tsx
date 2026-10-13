import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Hero } from "@/components/Hero";
import { WhyUs, ServicesGrid, AboutSection, Journey, AppointmentCTA, FAQ } from "@/components/Sections";
import { ContactInfo, Locations } from "@/components/Contact";
import { SectionHeading } from "@/components/SectionHeading";
import { pageMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return pageMetadata(locale, "/", "home");
}

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  return (
    <>
      <Hero />
      <WhyUs />
      <ServicesGrid />
      <AboutSection />
      <Journey />
      <AppointmentCTA />
      <FAQ />
      <section aria-labelledby="visit-title" className="pb-24 sm:pb-32">
        <div className="container-x">
          <SectionHeading id="visit-title" eyebrow={t("eyebrow")} title={t("title")} />
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8"><Locations /></div>
            <div className="lg:col-span-4"><ContactInfo /></div>
          </div>
        </div>
      </section>
    </>
  );
}
