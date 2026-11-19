import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { clinic } from "@/content/clinic";

/** The netlify.app address must not compete with naszdentysta.pl in Google. */
export const noIndex = clinic.siteUrl.includes(".netlify.app") || process.env.NEXT_PUBLIC_PREVIEW === "1";

const HREFLANG: Record<Locale, string> = { pl: "pl-PL", fr: "fr", uk: "uk" };

/** Any link target the router accepts, including dynamic routes ({ pathname, params }). */
export type Href = Parameters<typeof getPathname>[0]["href"];

export const absoluteUrl = (locale: Locale, href: Href) => clinic.siteUrl + getPathname({ locale, href });

type PageKey = "home" | "about" | "services" | "pricing" | "contact" | "privacy" | "nfz" | "team";

export async function pageMetadata(
  locale: Locale,
  href: Href,
  key: PageKey,
  override?: { title: string; description: string },
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = override?.title ?? (key === "home" ? t("homeTitle") : `${t(`${key}Title`)} | ${clinic.name}`);
  const description = override?.description ?? t(`${key}Description`);
  const languages = Object.fromEntries(routing.locales.map((l) => [HREFLANG[l], absoluteUrl(l, href)]));
  languages["x-default"] = absoluteUrl("pl", href);

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: absoluteUrl(locale, href), languages },
    openGraph: {
      type: "website",
      siteName: clinic.name,
      title,
      description,
      url: absoluteUrl(locale, href),
      locale: { pl: "pl_PL", fr: "fr_FR", uk: "uk_UA" }[locale],
      images: [{ url: clinic.siteUrl + "/images/og.jpg", width: 1200, height: 630 }],
    },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}
