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
