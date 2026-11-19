import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/**
 * Content Security Policy. Next.js inlines small bootstrap scripts in statically
 * generated pages, so 'unsafe-inline' is required for script-src without per-request
 * nonces; every external origin is still explicitly allow-listed.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://www.googletagmanager.com https://*.google-analytics.com",
  "font-src 'self'",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
  "frame-src https://www.google.com https://maps.google.com",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

const isProd = process.env.NODE_ENV === "production";

/**
 * Permanent redirects from the old naszdentysta.pl site (Hostinger / older CMS) and the
 * previous draft. These live here — NOT in netlify.toml — because Netlify applies its
 * redirect rules after next-intl has rewritten a localized path (e.g. /uk/pro-nas → /uk/o-nas)
 * internally, which turned "/uk/o-nas → /uk/pro-nas" into an infinite loop. Next.js
 * redirects only match the incoming URL, before the middleware rewrite.
 *
 * Legacy URLs were taken from the Wayback Machine index of naszdentysta.pl.
 */
const legacyRedirects: { source: string; destination: string }[] = [
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
  // Old Ukrainian URLs.
  // NEVER add a rule whose source is an internal next-intl path (/uk/o-nas, /uk/kontakt,
  // /fr/polityka-prywatnosci, …): the middleware already redirects those to the localized
  // pathname, and a second rule on the same path is what caused the production loops.
  { source: "/uk/oferta", destination: "/uk/poslugy" },
  { source: "/uk/certifykaty", destination: "/uk/pro-nas" },
  { source: "/ua", destination: "/uk" },
  { source: "/ua/:path*", destination: "/uk/:path*" },
  // Old French URLs
  { source: "/fr/a-propos-fr", destination: "/fr/a-propos" },
  { source: "/fr/fr-nos-offres", destination: "/fr/soins" },
  { source: "/fr/frcontact", destination: "/fr/contact" },
  { source: "/fr/certifykaty", destination: "/fr/a-propos" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return legacyRedirects.map((r) => ({ ...r, permanent: true }));
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          ...(isProd
            ? [
                { key: "Content-Security-Policy", value: csp },
                { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
              ]
            : []),
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
