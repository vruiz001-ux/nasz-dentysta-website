import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Hero } from "@/components/Hero";
import { CareChoice, ServicesGrid, TeamPreview, WhyUs, AppointmentCTA, FAQ } from "@/components/Sections";
import { ContactInfo, Locations } from "@/components/Contact";
import { SectionHeading } from "@/components/SectionHeading";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return pageMetadata(locale, "/", "home");
}

/**
 * Home (Direction A, Nov 2026). Order answers the patient's questions in turn:
 * who/where/how to book (hero) → NFZ or private → services → doctors → facts →
 * clinics & hours → FAQ → book.
 */
export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  return (
    <>
      <Hero />
      <CareChoice />
      <ServicesGrid />
      <TeamPreview />
      <WhyUs />
      <section aria-labelledby="visit-title" className="py-16 sm:py-24">
        <div className="container-x">
          <SectionHeading id="visit-title" eyebrow={t("eyebrow")} title={t("title")} />
          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8"><Locations /></div>
            <div className="lg:col-span-4"><ContactInfo /></div>
          </div>
        </div>
      </section>
      <FAQ />
      <AppointmentCTA />
    </>
  );
}
