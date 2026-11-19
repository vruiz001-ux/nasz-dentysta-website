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
  "/pl", "/uk",
  "/pl/o-nas", "/uk/pro-nas",
  "/pl/uslugi", "/uk/poslugy",
  "/pl/cennik", "/uk/tsiny",
  "/pl/kontakt", "/uk/kontakty",
  "/pl/polityka-prywatnosci", "/uk/polityka-konfidentsiinosti",
  "/pl/zespol", "/uk/komanda",
  "/pl/uslugi/protetyka", "/uk/poslugy/protetyka",
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
  // French version removed (19 Nov 2026) → Polish equivalents
  ["/fr", "/pl"],
  ["/fr/a-propos", "/pl/o-nas"],
  ["/fr/soins", "/pl/uslugi"],
  ["/fr/soins/protetyka", "/pl/uslugi/protetyka"],
  ["/fr/equipe", "/pl/zespol"],
  ["/fr/contact", "/pl/kontakt"],
  ["/fr/politique-de-confidentialite", "/pl/polityka-prywatnosci"],
  ["/fr/a-propos-fr", "/pl/o-nas"],
  ["/fr/fr-nos-offres", "/pl/uslugi"],
  ["/fr/frcontact", "/pl/kontakt"],
  ["/fr/polityka-prywatnosci", "/pl/polityka-prywatnosci"],
  ["/fr/cokolwiek", "/pl"],
  // NFZ page removed (19 Nov 2026)
  ["/pl/nfz", "/pl/kontakt"],
  ["/uk/nfz", "/uk/kontakty"],
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
