import type { AppPath } from "@/i18n/routing";
import { clinic } from "@/content/clinic";

type NavKey = "home" | "about" | "services" | "nfz" | "team" | "pricing" | "contact";
/** Static routes only (no "[param]" segments). */
type StaticPath = Exclude<AppPath, `${string}[${string}`>;

const ALL: { href: StaticPath; key: NavKey }[] = [
  { href: "/", key: "home" },
  { href: "/uslugi", key: "services" },
  { href: "/nfz", key: "nfz" },
  { href: "/zespol", key: "team" },
  { href: "/cennik", key: "pricing" },
  { href: "/o-nas", key: "about" },
  { href: "/kontakt", key: "contact" },
];

/**
 * Main navigation. "Cennik" is hidden while no prices are published (an empty price page
 * damages trust); "NFZ" is hidden if no location has an NFZ contract. The pages themselves
 * stay reachable by URL.
 */
export const NAV = ALL.filter(
  (n) => (n.key !== "pricing" || clinic.prices.length > 0) && (n.key !== "nfz" || clinic.locations.some((l) => l.nfz)),
);
