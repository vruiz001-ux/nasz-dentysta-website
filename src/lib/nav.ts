import type { AppPath } from "@/i18n/routing";

export const NAV: { href: AppPath; key: "home" | "about" | "services" | "pricing" | "contact" }[] = [
  { href: "/", key: "home" },
  { href: "/o-nas", key: "about" },
  { href: "/uslugi", key: "services" },
  { href: "/cennik", key: "pricing" },
  { href: "/kontakt", key: "contact" },
];
