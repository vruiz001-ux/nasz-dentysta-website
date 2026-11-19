import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pl", "uk"],
  defaultLocale: "pl",
  localePrefix: "always",
  // hreflang is emitted in <head> by generateMetadata (single source of truth).
  alternateLinks: false,
  pathnames: {
    "/": "/",
    "/o-nas": { pl: "/o-nas", uk: "/pro-nas" },
    "/uslugi": { pl: "/uslugi", uk: "/poslugy" },
    // One page per service; [slug] is the ServiceId (same in every language).
    "/uslugi/[slug]": { pl: "/uslugi/[slug]", uk: "/poslugy/[slug]" },
    "/zespol": { pl: "/zespol", uk: "/komanda" },
    "/cennik": { pl: "/cennik", uk: "/tsiny" },
    "/kontakt": { pl: "/kontakt", uk: "/kontakty" },
    "/polityka-prywatnosci": {
      pl: "/polityka-prywatnosci",
      uk: "/polityka-konfidentsiinosti",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPath = keyof typeof routing.pathnames;
