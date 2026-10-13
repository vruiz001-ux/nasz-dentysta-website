import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { CookieConsent } from "@/components/CookieConsent";
import { RevealObserver } from "@/components/Reveal";
import { ClinicJsonLd } from "@/components/JsonLd";
import { isPreview } from "@/lib/site";
import { clinic } from "@/content/clinic";
import { CONSENT_VERSION } from "@/lib/consent-version";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = { themeColor: "#faf9f6", width: "device-width", initialScale: 1 };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(clinic.siteUrl),
    title: { default: t("siteTitle"), template: `%s | ${clinic.name}` },
    applicationName: clinic.name,
    formatDetection: { telephone: false },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("nav");

  return (
    <html lang={locale} className="js" suppressHydrationWarning>
      <head>
        {/* Hide the server-rendered consent banner before first paint if a valid choice exists. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var c=JSON.parse(localStorage.getItem("nd-consent")||"null");if(c&&c.version==="${CONSENT_VERSION}")document.documentElement.setAttribute("data-consent","1")}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-dvh">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:text-ivory">
          {t("skip")}
        </a>
        <NextIntlClientProvider>
          {isPreview && (
            <div className="bg-[#7a4b00] px-4 py-2 text-center text-sm font-semibold text-white">
              WERSJA TESTOWA — nowa strona Nasz Dentysta · niewidoczna w Google
            </div>
          )}
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">{children}</main>
          <Footer />
          <FloatingActions />
          <CookieConsent />
          <RevealObserver />
        </NextIntlClientProvider>
        <ClinicJsonLd locale={locale as Locale} />
      </body>
    </html>
  );
}
