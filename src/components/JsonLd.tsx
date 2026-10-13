import { clinic, type Location } from "@/content/clinic";
import { getPathname } from "@/i18n/navigation";
import type { AppPath, Locale } from "@/i18n/routing";

const DAY = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function dentist(l: Location, url: string) {
  const open = clinic.openingHours.filter((h) => h.open && h.close);
  return {
    "@type": "Dentist",
    "@id": `${clinic.siteUrl}/#${l.id}`,
    name: `${clinic.name} — ${l.label}`,
    url,
    telephone: l.phone,
    ...(clinic.email ? { email: clinic.email } : {}),
    image: clinic.siteUrl + "/images/logo.png",
    address: { "@type": "PostalAddress", streetAddress: l.street, postalCode: l.postalCode, addressLocality: l.city, addressCountry: "PL" },
    ...(l.lat && l.lng ? { geo: { "@type": "GeoCoordinates", latitude: l.lat, longitude: l.lng } } : {}),
    ...(open.length
      ? { openingHoursSpecification: open.map((h) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: `https://schema.org/${DAY[h.day]}`, opens: h.open, closes: h.close })) }
      : {}),
    knowsLanguage: clinic.spokenLanguages,
    parentOrganization: { "@id": `${clinic.siteUrl}/#org` },
  };
}

/** Organization + one Dentist entry per clinic location (verified data from clinic.ts only). */
export function ClinicJsonLd({ locale }: { locale: Locale }) {
  const url = clinic.siteUrl + getPathname({ locale, href: "/" });
  const sameAs = [clinic.social.facebook, clinic.social.instagram].filter(Boolean);
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${clinic.siteUrl}/#org`,
        name: clinic.name,
        ...(clinic.legalName ? { legalName: clinic.legalName } : {}),
        ...(clinic.nip ? { vatID: `PL${clinic.nip}` } : {}),
        url,
        logo: clinic.siteUrl + "/images/logo.png",
        foundingDate: String(clinic.foundedYear),
        ...(sameAs.length ? { sameAs } : {}),
      },
      ...clinic.locations.map((l) => dentist(l, url)),
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function BreadcrumbJsonLd({ locale, items }: { locale: Locale; items: { name: string; href: AppPath }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: clinic.siteUrl + getPathname({ locale, href: it.href }) })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
