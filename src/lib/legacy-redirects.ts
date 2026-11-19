/**
 * Permanent redirects from the old naszdentysta.pl site (Hostinger / older CMS) and the
 * previous draft. Legacy URLs were taken from the Wayback Machine index of naszdentysta.pl.
 *
 * Applied in TWO places, because Netlify runs the Next.js middleware as an edge function
 * BEFORE next.config redirects:
 *   - src/middleware.ts  → every path the middleware matches (no dot in it)
 *   - next.config.ts     → paths the middleware skips (e.g. "oferta,s3.html")
 *
 * NEVER add a source that is an internal next-intl path (/uk/o-nas, /uk/kontakt,
 * /fr/polityka-prywatnosci, …). next-intl already redirects those to the localized
 * pathname, and a second rule on them is what caused the Nov 2026 production loops.
 * Never use netlify.toml [[redirects]] for localized paths for the same reason.
 *
 * A source ending in "/:path*" matches that prefix and everything under it; the
 * remainder replaces ":path*" in the destination.
 */
export const legacyRedirects: { source: string; destination: string }[] = [
  // Old Polish pages (unprefixed)
  { source: "/oferta", destination: "/pl/uslugi" },
  { source: "/certifykaty", destination: "/pl/o-nas" },
  { source: "/o-nas", destination: "/pl/o-nas" },
  { source: "/kontakt", destination: "/pl/kontakt" },
  { source: "/polityka-prywatnosci", destination: "/pl/polityka-prywatnosci" },
  { source: "/privacy-policy", destination: "/pl/polityka-prywatnosci" },
  // Oldest CMS (",sN.html" pages and the Flash-era /main/)
  { source: "/o-firmie,s2.html", destination: "/pl/o-nas" },
  { source: "/oferta,s3.html", destination: "/pl/uslugi" },
  { source: "/kadra,s4.html", destination: "/pl/o-nas" },
  { source: "/gabinety,s5.html", destination: "/pl/kontakt" },
  { source: "/certyfikaty,s6.html", destination: "/pl/o-nas" },
  { source: "/kontakt,s7.html", destination: "/pl/kontakt" },
  { source: "/main", destination: "/pl" },
  { source: "/main/:path*", destination: "/pl" },
  // Old Ukrainian URLs
  { source: "/uk/oferta", destination: "/uk/poslugy" },
  { source: "/uk/certifykaty", destination: "/uk/pro-nas" },
  { source: "/ua/oferta", destination: "/uk/poslugy" },
  { source: "/ua/certifykaty", destination: "/uk/pro-nas" },
  { source: "/ua", destination: "/uk" },
  { source: "/ua/:path*", destination: "/uk/:path*" },
  // Old French URLs
  { source: "/fr/a-propos-fr", destination: "/fr/a-propos" },
  { source: "/fr/fr-nos-offres", destination: "/fr/soins" },
  { source: "/fr/frcontact", destination: "/fr/contact" },
  { source: "/fr/certifykaty", destination: "/fr/a-propos" },
];

/** Returns the redirect target for a request path, or null. Trailing slashes are ignored. */
export function findLegacyRedirect(pathname: string): string | null {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  for (const { source, destination } of legacyRedirects) {
    if (source.endsWith("/:path*")) {
      const prefix = source.slice(0, -"/:path*".length);
      if (path.startsWith(prefix + "/")) {
        const rest = path.slice(prefix.length + 1);
        return destination.replace(":path*", rest);
      }
    } else if (path === source) {
      return destination;
    }
  }
  return null;
}
