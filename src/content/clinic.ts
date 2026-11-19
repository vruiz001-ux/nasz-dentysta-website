/**
 * ─────────────────────────────────────────────────────────────
 *  CLINIC DATA — the only file staff need to edit.
 * ─────────────────────────────────────────────────────────────
 *  Anything left as `null` (or an empty list) is NOT shown on the
 *  website. Nothing is invented or shown as a placeholder.
 *  Texts that differ per language use { pl, fr, uk }.
 *
 *  Sources: naszdentysta.pl (original site) and the clinic's own
 *  previous redesign (nasz-dentysta.netlify.app). Items marked
 *  CONFIRM came only from the previous redesign — please verify.
 * ─────────────────────────────────────────────────────────────
 */

export type Localized = { pl: string; uk: string };

export type ServiceId =
  | "zachowawcza"
  | "higienizacja"
  | "endodoncja"
  | "protetyka"
  | "implantologia"
  | "estetyczna"
  | "chirurgia"
  | "dziecieca"
  | "ortodoncja"
  | "periodontologia";

export type PriceItem = { service: ServiceId; name: Localized; price: string };

export type TeamMember = {
  name: string;
  role: Localized;
  group: "doctor" | "staff";
};

export type OpeningHours = { day: 1 | 2 | 3 | 4 | 5 | 6 | 7; open: string | null; close: string | null };

export type Location = {
  id: string;
  /** Short label, e.g. "Morelowa" */
  label: string;
  street: string;
  postalCode: string;
  city: string;
  /** International format, no spaces */
  phone: string;
  lat: number | null;
  lng: number | null;
  note?: Localized;
  /**
   * NFZ (public insurance) contract at this location, or null for private only.
   * `services` = which of our services are (at least partly) available on NFZ here.
   * The exact scope of NFZ-funded treatment is defined by NFZ, not by us.
   */
  nfz: { services: ServiceId[] } | null;
};


export const clinic = {
  name: "Nasz Dentysta",
  legalName: "Nasz Dentysta Sp. z o.o." as string | null,
  /** Public company registry (KRS) — registered office ul. Drzewna 35 */
  nip: "9291860550" as string | null,
  regon: "081226675" as string | null,
  krs: null as string | null,
  foundedYear: 1989,

  /** Set NEXT_PUBLIC_SITE_URL once naszdentysta.pl points to Netlify. */
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || "https://naszdentysta.pl").replace(/\/$/, ""),

  locations: [
    {
      id: "morelowa",
      label: "Morelowa",
      street: "ul. Morelowa 23",
      postalCode: "65-434",
      city: "Zielona Góra",
      phone: "+48683205066",
      lat: null,
      lng: null,
      /** CONFIRM — NFZ open data (api.nfz.gov.pl, Oct 2026): contract for "poradnia stomatologiczna"
       *  and "poradnia protetyki stomatologicznej" at Morelowa 23 only. */
      nfz: { services: ["zachowawcza", "protetyka"] },
    },
    {
      id: "drzewna",
      label: "Drzewna",
      street: "ul. Drzewna 35",
      postalCode: "65-001",
      city: "Zielona Góra",
      phone: "+48683202396",
      lat: null,
      lng: null,
      /** CONFIRM — no NFZ contract found for Drzewna 35 in NFZ open data. */
      nfz: null,
    },
  ] as Location[],

  /**
   * Detailed treatment descriptions on the service pages (messages/*.json → serviceDetail).
   * Keep `false` until a dentist from the practice has reviewed the text in every language.
   * While `false`, the detailed sections appear ONLY on Netlify deploy previews
   * (NEXT_PUBLIC_PREVIEW=1), never on the production site.
   */
  serviceContentReviewed: false,

  /** CONFIRM — from the previous redesign */
  whatsapp: "+48797707168" as string | null,
  email: "naszdentystazgora@gmail.com" as string | null,
  /** Netlify Forms sends notifications — set the recipient in Netlify → Forms → Notifications */

  /** Mon–Sat 9:00–17:00 (both clinics) — Mon–Fri confirmed 2026-10-13, Saturday added by the owner 2026-11-19 */
  openingHours: [
    { day: 1, open: "09:00", close: "17:00" },
    { day: 2, open: "09:00", close: "17:00" },
    { day: 3, open: "09:00", close: "17:00" },
    { day: 4, open: "09:00", close: "17:00" },
    { day: 5, open: "09:00", close: "17:00" },
    { day: 6, open: "09:00", close: "17:00" },
    { day: 7, open: null, close: null },
  ] as OpeningHours[],

  /** Services listed on naszdentysta.pl */
  services: ["protetyka", "implantologia", "chirurgia", "endodoncja", "ortodoncja", "zachowawcza", "dziecieca"] as ServiceId[],

  /** No prices published yet — add rows here to fill the Cennik page */
  prices: [] as PriceItem[],

  /** Individual names are not published (owner's decision, 2026-11-19). */
  team: [] as TeamMember[],

  /** Languages spoken in the clinic */
  spokenLanguages: ["pl", "uk"] as ("pl" | "fr" | "uk" | "en")[],

  /** Payment / insurance partners shown on the site (both on naszdentysta.pl) */
  partners: [
    { name: "NFZ", logo: "/images/nfz.png", width: 1024, height: 388 },
    { name: "Mediraty", logo: "/images/mediraty.jpg", width: 1000, height: 614 },
  ],

  images: {
    logo: "/images/logo.png" as string | null,
    /** Real clinic interior photos go here. Stock photos are deliberately not used. */
    /** Must be a licensed file (no watermark). Shown decoratively, never presented as a real patient or doctor. */
    hero: "/images/hero-usmiech.jpg" as string | null,
    /** CSS object-position for the hero crop, e.g. "65% 30%" */
    heroFocus: null as string | null,
    about: null as string | null,
  },

  social: {
    facebook: "https://www.facebook.com/naszdentystapl" as string | null,
    instagram: "https://www.instagram.com/nasz_dentystazg/" as string | null,
  },
};

/* ── helpers ───────────────────────────────────────────── */

export const primaryPhone = () => clinic.locations[0]?.phone ?? null;

/** Locations where this service is available on NFZ. */
export const nfzLocationsFor = (id: ServiceId) => clinic.locations.filter((l) => l.nfz?.services.includes(id));

export const nfzLocations = () => clinic.locations.filter((l) => l.nfz);

export const locationAddress = (l: Location) => `${l.street}, ${l.postalCode} ${l.city}`;

/** Landlines (clinic phones) → "68 320 50 66"; mobiles → "797 707 168" */
export const formatPhone = (p: string) => {
  const d = p.replace(/^\+48/, "");
  const landline = clinic.locations.some((l) => l.phone === p);
  return landline ? d.replace(/^(\d{2})(\d{3})(\d{2})(\d{2})$/, "$1 $2 $3 $4") : d.replace(/^(\d{3})(\d{3})(\d{3})$/, "$1 $2 $3");
};

export const whatsappLink = (message: string) =>
  clinic.whatsapp ? `https://wa.me/${clinic.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}` : null;

export const directionsLink = (l: Location) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${clinic.name}, ${locationAddress(l)}`)}`;

export const mapEmbed = (l: Location) =>
  `https://www.google.com/maps?q=${encodeURIComponent(l.lat && l.lng ? `${l.lat},${l.lng}` : locationAddress(l))}&output=embed`;
