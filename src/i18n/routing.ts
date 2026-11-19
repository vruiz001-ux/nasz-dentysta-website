import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pl", "fr", "uk"],
  defaultLocale: "pl",
  localePrefix: "always",
  // hreflang is emitted in <head> by generateMetadata (single source of truth).
  alternateLinks: false,
  pathnames: {
    "/": "/",
    "/o-nas": { pl: "/o-nas", fr: "/a-propos", uk: "/pro-nas" },
    "/uslugi": { pl: "/uslugi", fr: "/soins", uk: "/poslugy" },
    // One page per service; [slug] is the ServiceId (same in every language).
    "/uslugi/[slug]": { pl: "/uslugi/[slug]", fr: "/soins/[slug]", uk: "/poslugy/[slug]" },
    "/nfz": { pl: "/nfz", fr: "/nfz", uk: "/nfz" },
    "/zespol": { pl: "/zespol", fr: "/equipe", uk: "/komanda" },
    "/cennik": { pl: "/cennik", fr: "/tarifs", uk: "/tsiny" },
    "/kontakt": { pl: "/kontakt", fr: "/contact", uk: "/kontakty" },
    "/polityka-prywatnosci": {
      pl: "/polityka-prywatnosci",
      fr: "/politique-de-confidentialite",
      uk: "/polityka-konfidentsiinosti",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPath = keyof typeof routing.pathnames;
