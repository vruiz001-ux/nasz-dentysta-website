import { test, expect } from "@playwright/test";

/**
 * Regression guard for the Nov 2026 production defect: legacy redirects in netlify.toml
 * looped on localized paths (/uk/pro-nas, /uk/kontakty, /fr/politique-de-confidentialite).
 * Every localized page must answer 200 directly, and every legacy URL must land on a
 * real page through a permanent redirect.
 *
 * Run against a Netlify deploy preview too:  BASE_URL=https://deploy-preview-N--nasz-dentysta.netlify.app npx playwright test redirects
 */

const pages = [
  "/pl", "/fr", "/uk",
  "/pl/o-nas", "/fr/a-propos", "/uk/pro-nas",
  "/pl/uslugi", "/fr/soins", "/uk/poslugy",
  "/pl/cennik", "/fr/tarifs", "/uk/tsiny",
  "/pl/kontakt", "/fr/contact", "/uk/kontakty",
  "/pl/polityka-prywatnosci", "/fr/politique-de-confidentialite", "/uk/polityka-konfidentsiinosti",
];

const legacy: [string, string][] = [
  ["/oferta", "/pl/uslugi"],
  ["/certifykaty", "/pl/o-nas"],
  ["/o-nas", "/pl/o-nas"],
  ["/kontakt", "/pl/kontakt"],
  ["/o-firmie,s2.html", "/pl/o-nas"],
  ["/oferta,s3.html", "/pl/uslugi"],
  ["/kadra,s4.html", "/pl/o-nas"],
  ["/gabinety,s5.html", "/pl/kontakt"],
  ["/certyfikaty,s6.html", "/pl/o-nas"],
  ["/kontakt,s7.html", "/pl/kontakt"],
  ["/main/", "/pl"],
  ["/uk/oferta", "/uk/poslugy"],
  ["/uk/o-nas", "/uk/pro-nas"],
  ["/uk/kontakt", "/uk/kontakty"],
  ["/uk/certifykaty", "/uk/pro-nas"],
  ["/ua/oferta", "/uk/poslugy"],
  ["/fr/a-propos-fr", "/fr/a-propos"],
  ["/fr/fr-nos-offres", "/fr/soins"],
  ["/fr/frcontact", "/fr/contact"],
  ["/fr/polityka-prywatnosci", "/fr/politique-de-confidentialite"],
];

test.describe("redirects", () => {
  test.skip(({ isMobile }) => isMobile, "HTTP-level checks run once");

  for (const p of pages) {
    test(`${p} answers 200 without redirecting`, async ({ request }) => {
      const res = await request.get(p, { maxRedirects: 0 });
      expect(res.status(), `${p} must not redirect (loop guard)`).toBe(200);
    });
  }

  for (const [from, to] of legacy) {
    test(`${from} → ${to}`, async ({ request }) => {
      const first = await request.get(from, { maxRedirects: 0 });
      expect([301, 307, 308], `${from} first hop`).toContain(first.status());
      const res = await request.get(from, { maxRedirects: 4 });
      expect(res.status()).toBe(200);
      expect(new URL(res.url()).pathname).toBe(to);
    });
  }
});
