# naszdentysta.pl: the new website

This is a trilingual site (Polish, French and Ukrainian) built with Next.js 15 (App Router), TypeScript, Tailwind CSS 4, next-intl and Lucide icons. The font, Manrope, is self-hosted, so no Google Fonts requests are made. The site is ready to deploy on Netlify.

## Pages and URLs

| | PL (default) | FR | UK |
|---|---|---|---|
| Home | `/pl` | `/fr` | `/uk` |
| About | `/pl/o-nas` | `/fr/a-propos` | `/uk/pro-nas` |
| Services | `/pl/uslugi` | `/fr/soins` | `/uk/poslugy` |
| Pricing | `/pl/cennik` | `/fr/tarifs` | `/uk/tsiny` |
| Contact and booking | `/pl/kontakt` | `/fr/contact` | `/uk/kontakty` |
| Privacy policy | `/pl/polityka-prywatnosci` | `/fr/politique-de-confidentialite` | `/uk/polityka-konfidentsiinosti` |

The root `/` redirects each visitor based on their browser language, with Polish as the fallback. The language switcher keeps the visitor on the same page in the new language.

## Updating content (no coding needed)

**Everything about the clinic lives in one file: `src/content/clinic.ts`.** It covers both clinics (Morelowa and Drzewna), opening hours, WhatsApp, the team with photos, services, prices, and the NFZ and Mediraty partner logos. Lines marked `CONFIRM` came from the previous draft site and should be checked.

- Any field left as `null`, or any list left empty, is **not shown** anywhere on the site. Nothing is made up or shown as a placeholder.
- Once you fill a field in, it appears everywhere it belongs: header, footer, contact page, WhatsApp buttons, mobile action bar, Google structured data and the map.

| What | Field |
|---|---|
| Clinics (address, phone) | `locations: [...]`, phone written as `"+48683205066"` |
| WhatsApp | `whatsapp` |
| Opening hours | `openingHours: [{ day: 1, open: "09:00", close: "18:00" }, …]` (1 = Monday) |
| Services offered | `services: ["zachowawcza", "higienizacja", …]`; only list what you really offer |
| Price list | `prices: [{ service: "higienizacja", name: { pl, fr, uk }, price: "od 250 zł" }]` |
| Team | `team: [{ name, role: { pl, fr, uk }, bio?, photo: "/images/team/x.jpg" }]` |
| Photos | Put files in `public/images/` and set `images.hero` / `images.about` |
| Legal details | `legalName`, `nip`, `regon`, `krs`; these appear in the footer and privacy policy |

The wording for every service, button and message is in `messages/pl.json`, `fr.json` and `uk.json`. All three files use the same structure, so a change to one should be made in the other two as well.

## Appointment form (Netlify Forms)

The form posts to **Netlify Forms**. It's registered through `public/__forms.html`, and the field names there must match `src/components/ContactForm.tsx` exactly.

- **Viewing requests:** open the Netlify dashboard, choose **nasz-dentysta**, then **Forms**, then **wizyta**.
- **Email alerts:** go to **Forms → Form notifications → Add notification → Email** and enter `naszdentystazgora@gmail.com`.
- **Spam protection:** there is a honeypot field, and Netlify's Akismet filter screens every request. If a real request seems to be missing, look in the **Spam** list first.
- **What the visitor sees:** after sending, they are told the request was received and that **no appointment is confirmed yet**.
- **Medical details:** the form never asks for them.

## GDPR

- The cookie banner offers two choices: "Accept" and "Necessary only". Google Tag Manager (`NEXT_PUBLIC_GTM_ID`) loads only after the visitor accepts.
- Google Maps loads only after the visitor clicks, or after they have accepted analytics.
- Clicks on WhatsApp, phone and booking links are tracked through `dataLayer` events, but only with consent.
- The privacy policy text covers the form, cookies and WhatsApp. **It should be reviewed by your data-protection advisor**, and the controller details come from `clinic.ts`.

## Development

```bash
npm install
npm run dev                          # http://localhost:3000
NEXT_PUBLIC_PREVIEW=1 npm run dev    # design preview: all service categories + banner
npm run lint && npx tsc --noEmit && npm run build
```

## Domain and indexing

While the site is served from `*.netlify.app`, it is hidden from search engines (`noindex`). This stops it competing with naszdentysta.pl in Google. Once **naszdentysta.pl** is pointed at this Netlify project, set `NEXT_PUBLIC_SITE_URL=https://naszdentysta.pl` in Netlify and redeploy. Indexing, canonical URLs, hreflang and the sitemap then switch over to the real domain automatically.

## Deploying to Netlify

1. Push this folder to a GitHub repository.
2. In Netlify, choose **Add new site → Import from Git** and pick the repository. Netlify detects Next.js and reads `netlify.toml` automatically.
3. Add the environment variables from `.env.example`.
4. Under **Domain management**, point `naszdentysta.pl` to Netlify.
5. In Google Search Console, submit `https://naszdentysta.pl/sitemap.xml`.

Deploy previews automatically show the preview banner and are hidden from search engines (`noindex`).
