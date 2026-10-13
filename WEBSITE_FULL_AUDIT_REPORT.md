# Nasz Dentysta: website audit report

**Scope:** the redesigned website (Next.js 15, next-intl; PL/FR/UK) in the repo `vruiz001-ux/nasz-dentysta-website`. It is live at https://nasz-dentysta.netlify.app, deployed from commit `39fb535`.
**Branch with the fixes:** `audit-rodo-2026`. It is **not deployed**: merging into `main` publishes it, so it needs your approval.
**Date:** 13 October 2026.

> ⚖️ **Legal note.** This report covers technical implementation. It is **not** a legal opinion, and the site cannot be called "fully RODO-compliant" on technical checks alone. Every item marked **NEEDS VERIFICATION** needs a decision from the clinic or a qualified Polish lawyer or IOD.

---

## A. Executive summary

The redesigned site already worked well: there are no broken links, all three languages are complete with 206 translation keys each, and the clinic data is verified. The audit found **2 critical**, **4 high** and several **medium** issues. All technical ones are fixed on the branch:

| Severity | Finding | Status |
|---|---|---|
| CRITICAL | The cookie banner offered only Accept / "Necessary only", with no per-category choice. Consent wasn't versioned or timestamped. The Maps choice was separate from the consent store. | **Fixed:** per-category consent manager (see B) |
| CRITICAL | The privacy policy was incomplete under Art. 13: no Netlify processor, no transfers to the USA, no WhatsApp/Meta, no Art. 9 basis. It stated a **12-month retention period that had not been confirmed**. The form relied on "consent" as its legal basis. | **Fixed:** policy rewritten in PL/FR/UK. Basis changed to Art. 6(1)(b) + 9(2)(h); the checkbox is now an acknowledgement, not consent. Retention is now described by criteria. |
| HIGH | Dependency vulnerability: PostCSS ≤ 8.5.22 bundled with Next.js (XSS / file read in the CSS toolchain; build time only) | **Fixed:** `overrides.postcss ^8.5.23`, `npm audit` = 0 |
| HIGH | No Content-Security-Policy | **Fixed:** CSP + COOP + extended Permissions-Policy (production) |
| HIGH | Mobile performance 78: the hero animation and a late-rendered cookie banner delayed LCP (3.7 s) | **Fixed:** mobile LCP 1.0–2.4 s, Performance 96–98 |
| HIGH | Layout shift on the contact page, CLS 0.24 (the form appeared late through a Suspense fallback) | **Fixed:** CLS ≤ 0.04 |
| MEDIUM | Invalid `<dl>` markup, language buttons' accessible names didn't match visible text, a contrast failure, wrong heading order on the services page | **Fixed:** axe WCAG 2.2 AA shows 0 violations on 10 pages |
| MEDIUM | The form could be submitted twice by a double click | **Fixed:** submit guard + test |
| MEDIUM | Nothing told visitors not to send medical information through WhatsApp | **Fixed:** note under the WhatsApp button + a policy section |
| MEDIUM | Duplicate hreflang (HTTP `Link` header with "pl" plus HTML "pl-PL") | **Fixed:** a single source of truth in `<head>` |
| LOW | Legacy JS polyfills (~12 KB) | **Fixed:** modern `browserslist` |

---

## B. GDPR / RODO compliance matrix

| # | Requirement | Current implementation | Evidence | Status | Technical action completed | Remaining legal / organisational action |
|---|---|---|---|---|---|---|
| 1 | Controller identified (Art. 13(1)(a)) | Nasz Dentysta Sp. z o.o., ul. Drzewna 35, 65-001 Zielona Góra, NIP 9291860550, REGON 081226675 | KRS registry; `clinic.ts`; privacy page | **NEEDS VERIFICATION** | Shown on the privacy page and in the footer | Confirm the registered office and that the company runs **both** clinics (Morelowa 23 and Drzewna 35) |
| 2 | DPO (IOD) contact (Art. 13(1)(b)) | No DPO named; contact goes to the clinic e-mail | Privacy page | **NEEDS VERIFICATION** | None. **No DPO was invented** | Decide whether an IOD is required (Art. 37: large-scale processing of health data). If one is appointed, add their contact details |
| 3 | Purposes and legal bases (Art. 6) | Appointment requests: 6(1)(b). Claims and security: 6(1)(f). Maps and analytics: 6(1)(a) | Privacy §"Cele i podstawy" | **PASS (technical)** | Form changed from "consent" to an information acknowledgement | A lawyer should confirm the bases |
| 4 | Health data (Art. 9) | The form asks for none and warns against entering it. The service choice is optional. If health data is given anyway: 9(2)(h) + 9(3) | `ContactForm.tsx`, privacy | **NEEDS VERIFICATION** | Data minimisation; warning on the form and under WhatsApp | Confirm Art. 9(2)(h) for pre-visit enquiries. Decide whether "type of visit" should stay in the form |
| 5 | Recipients / processors (Art. 28) | Netlify, Inc. (hosting + Forms storage); the e-mail provider; Google Ireland only after Maps consent | Privacy §"Odbiorcy" | **NEEDS VERIFICATION** | Listed in the policy | Netlify's DPA is part of its Self-Serve Subscription Agreement; keep a copy. **The clinic uses a consumer Gmail account (`naszdentystazgora@gmail.com`)**, which doesn't come with a GDPR processor agreement. Move to Google Workspace (with its DPA) or a Polish provider that offers one |
| 6 | International transfers (Ch. V) | Netlify (USA): EU-US Data Privacy Framework, with SCC as the fallback (Netlify DPA §14). Google: DPF | [Netlify DPA](https://www.netlify.com/pdf/netlify-dpa.pdf) | **PASS (documented)** | Described in all three languages | Keep evidence of DPF certification. Re-check if the DPF is invalidated |
| 7 | Retention (Art. 13(2)(a)) | Described by criteria: "until the request is handled, then deleted, unless needed for claims". Medical records follow the Patients' Rights Act | Privacy §"Jak długo" | **NEEDS VERIFICATION** | Removed the unconfirmed "12 months" | Set a concrete period (e.g. delete Netlify form submissions 30/90 days after contact) and **delete regularly** in Netlify → Forms (Netlify keeps submissions until deleted) |
| 8 | Data-subject rights + complaint to UODO | Access, rectification, erasure, restriction, portability, objection, withdrawal of consent; complaint to the President of UODO (ul. Stawki 2, Warsaw) | Privacy §"Twoje prawa" | **PASS (technical)** | Written in all three languages | Set up a procedure and a responsible person for handling requests (one-month deadline) |
| 9 | Mandatory vs voluntary data | Name and phone are needed to call back; everything else is optional | Privacy §"Formularz" + the form | **PASS** | – | – |
| 10 | Automated decisions / profiling | None | Privacy §"Profilowanie" | **PASS** | – | – |
| 11 | Cookie consent: blocking before consent | No third-party request before a choice is made | Test D: `external` list is empty | **PASS** | Consent manager; Maps gated | – |
| 12 | Accept and Reject equally accessible | Identical classes and size; both on the first layer | Test D compares the class attributes | **PASS** | – | – |
| 13 | Per-category consent, nothing preselected | Necessary (locked on) / Google Maps / Statistics, with optional categories **off** by default; marketing not used | Test D checks the switch state | **PASS** | `CookieConsent.tsx` | – |
| 14 | Withdraw or change consent at any time | "Ustawienia cookies" in the footer and on the privacy page; withdrawing analytics reloads the page to stop the tags | Test D reopens settings | **PASS** | – | – |
| 15 | Consent record (Art. 7(1)) | Stored as `{categories, version, ISO timestamp, random id}` in the browser's localStorage; a new version triggers a fresh prompt | `lib/analytics.ts` | **NEEDS VERIFICATION** | Stored on the visitor's device only | Decide whether a server-side consent log is required. It would need a small endpoint and a retention rule |
| 16 | No consent from scrolling or continued browsing | Only an explicit click is recorded | Code review | **PASS** | – | – |
| 17 | Hidden tracking | No GTM, Meta Pixel or analytics are configured (`NEXT_PUBLIC_GTM_ID` empty). Fonts are self-hosted. The CSP blocks unlisted origins | CSP header; network test | **PASS** | – | If GTM is enabled later, configure **Consent Mode** and list each tag in the policy |
| 18 | Data in analytics events | Events carry only the event name and a UI source, never form values | `track()` | **PASS** | – | – |
| 19 | Secure transmission | HTTPS + HSTS (Netlify + header) | Response headers | **PASS** | HSTS added in the app as well | – |
| 20 | Personal data in URLs | Only `?usluga=<service id>` (no personal data). The form is POSTed | Code review | **PASS** | – | – |
| 21 | Access control to submissions | Netlify dashboard team (1 member) | Netlify team page | **NEEDS VERIFICATION** | – | Turn on 2FA for the Netlify and GitHub accounts. Limit who sees Forms. Set e-mail notifications only to authorised staff |
| 22 | Records of processing (Art. 30) | Not present | – | **FAIL (organisational)** | – | Create a register (RCP) covering patients, appointment requests, website contacts and staff |
| 23 | Breach procedure (Art. 33/34) | Not present | – | **FAIL (organisational)** | – | Write a 72-hour UODO notification procedure |
| 24 | DPIA screening (Art. 35) | Not documented | – | **NEEDS VERIFICATION** | – | Screen against the UODO DPIA list (health data) |
| 25 | WhatsApp for patient contact | Optional; a warning not to send medical information; WhatsApp Ireland is an independent controller | Contact page, privacy | **NEEDS VERIFICATION** | Warning added | Write an internal rule: which phone and account is used, who has access, no medical documents |
| 26 | Medical confidentiality / patients' rights | Website doesn't store medical records | – | **NOT APPLICABLE (website)** | – | Covered by the clinic's medical-record system |

---

## C. Functionality audit

| Feature | Result |
|---|---|
| Navigation: 5 pages + privacy page × 3 languages (18 URLs) | ✅ 200, a single `<h1>`, correct `lang` |
| Language switcher keeps the equivalent page (`/pl/uslugi` → `/uk/poslugy`) | ✅ test B |
| `tel:` links (Morelowa +48 68 320 50 66, Drzewna +48 68 320 23 96) | ✅ test C; mobile "Zadzwoń" opens a clinic chooser |
| `mailto:` naszdentystazgora@gmail.com | ✅ |
| WhatsApp `wa.me/48797707168` with a prefilled message per language, opens in a new tab | ✅ test C (the number itself still needs confirming, see J) |
| Appointment form: validation, preselected service from `?usluga=`, success message ("not yet booked"), error message, keeps data after a network error, no double submission | ✅ tests A and F (**mocked**: no real request was sent to the clinic) |
| Netlify Forms registration (`/__forms.html`, form `wizyta`) | ✅ deployed; Forms enabled on the project |
| 404 page per language | ✅ test F |
| 301 redirects from old naszdentysta.pl URLs (`/oferta`, `/uk/oferta`, `/fr/fr-nos-offres`, …) | ✅ live check (`/oferta` → redirect) |
| Console errors / CSP violations | ✅ none across 5 pages and after accepting Maps |
| Broken images | ✅ none |

---

## D. Mobile responsiveness

Checked automatically at **320, 375, 414, 480, 768, 1024, 1280 and 1920 px** across 10 pages, plus landscape at 844×390. Result: no horizontal overflow at any size.

- Touch targets in the mobile action bar are at least 44 px (tested).
- Safe-area padding is in place on the action bar.
- The sticky bar doesn't cover content (the footer has extra bottom padding).
- Form fields use the right keyboards: `type="tel"` + `inputMode`, `type="email"`, `type="date"`, and `autocomplete` attributes.

---

## E. UI/UX recommendations (prioritised)

| # | Current problem | Recommended change | Reason | User benefit | Complexity |
|---|---|---|---|---|---|
| 1 | No authentic clinic interior photos (stock photos were deliberately removed) | A 1-day photo session of both clinics, the reception and the lab | Trust; the brief rules out stock | Patients see where they're going | Low (content) |
| 2 | Pricing page empty | Publish price ranges for common treatments | The most-searched information | Fewer calls just to ask prices | Low (content) |
| 3 | No patient reviews | Embed the real Google reviews widget (with consent) or link to the Google profile | Social proof (never invented) | Trust | Medium |
| 4 | Doctors without bios or specialities (except Ewa Witkowska) | Add 1–2 lines per doctor with their verified specialisation | Helps choose a doctor | Better matching | Low |
| 5 | Opening hours are the same for both clinics | Confirm or split per clinic | Accuracy | No wasted trips | Low |
| 6 | No online calendar | Optionally connect a booking system (e.g. via a processor agreement) | Fewer steps | Instant booking | High (legal + integration) |

No major visual or architectural changes were made in this round, as the brief required.

---

## F. Technical and security findings

| Item | Before | After |
|---|---|---|
| `npm audit` (production) | 2 (1 high: postcss; 1 moderate) | **0** |
| Content-Security-Policy | missing | `default-src 'self'`; scripts limited to self + GTM; frames limited to Google Maps; `object-src 'none'`; `frame-ancestors 'self'`; `form-action 'self'`; `upgrade-insecure-requests` |
| HSTS | Netlify only | Also set in the app: `max-age=31536000; includeSubDomains` |
| Other headers | XFO, nosniff, Referrer-Policy, basic Permissions-Policy | + COOP `same-origin`, Permissions-Policy extended (payment, usb, interest-cohort) |
| XSS | React escaping; JSON-LD built from static config only | No user input is rendered as HTML ✅ |
| CSRF / injection | No backend endpoint (the Resend API route was removed earlier); Netlify Forms handles POSTs; no database | N/A ✅ |
| Spam | Honeypot + Akismet (Netlify) | ✅ |
| Secrets | None in the repo; Netlify secret scan found 0 | ✅ |
| Cookies | The site sets none (consent is kept in localStorage). Google Maps cookies only after consent | ✅ |

**Remaining risks:**
1. The CSP needs `'unsafe-inline'` for scripts, because Next.js statically generated pages inline their bootstrap scripts. Moving to nonces would need dynamic rendering, which would cost performance.
2. Netlify Forms keeps submissions indefinitely until they are deleted by hand (see B7).
3. The form notifications go to a consumer Gmail account (see B5).

---

## G. Performance comparison

Lighthouse 12, local production build, mobile emulation (simulated slow 4G):

| Page | Metric | Before | After |
|---|---|---|---|
| `/pl` | Performance / A11y / BP / SEO | 78 / 94 / 100 / 92* | **97 / 100 / 100 / 100** |
| `/pl` | LCP · CLS · TBT | 3.7 s · 0 · 260 ms | **1.0 s · 0 · 190 ms** |
| `/pl/kontakt` | Performance / A11y / BP / SEO | 80 / 94 / 100 / 92* | **98 / 100 / 100 / 100** |
| `/pl/kontakt` | LCP · CLS · TBT | 3.1 s · **0.236** · 130 ms | **2.2 s · 0.001 · 60 ms** |
| `/uk` | Performance / A11y | – | **96 / 100** (LCP 2.4 s, CLS 0.041) |
| `/pl` desktop | All categories | – | **100 / 100 / 100 / 100** (LCP 0.6 s) |

\* The "before" SEO score of 92 came from the canonical URL pointing at the production host during the local run. INP can't be measured in a lab test; TBT is used as its stand-in. These are lab targets and don't guarantee real-user results.

---

## H. SEO and accessibility

- **SEO:**
  - unique titles and descriptions per page and language
  - one `<h1>` per page
  - canonical + hreflang (pl-PL, fr, uk, x-default), from one source
  - a sitemap with alternates
  - `Organization` and two `Dentist` JSON-LD entries built only from verified data, plus `FAQPage` and `BreadcrumbList`
  - 301 redirects from the old URLs
  - the `*.netlify.app` address is `noindex`, so it doesn't compete with naszdentysta.pl
- **Accessibility:**
  - axe-core (WCAG 2.0/2.1/2.2 A + AA) reports **0 violations** on 10 pages in PL/FR/UK
  - skip link, `:focus-visible` outline, reduced-motion support, labelled form fields with `aria-invalid`/`aria-describedby`, `role="status"`/`role="alert"` messages, and an accessible `<dialog>` for consent settings
- **Needs manual testing:** a full pass with a real screen reader (NVDA/VoiceOver) and with 200% zoom.

---

## I. Implementation log (branch `audit-rodo-2026`)

| File | Change |
|---|---|
| `src/components/CookieConsent.tsx` | New consent manager: equal Accept/Reject, per-category `<dialog>`, server-rendered banner (LCP fix), GTM only with analytics consent |
| `src/lib/analytics.ts`, `src/lib/consent-version.ts` | Versioned, timestamped consent record; `hasConsent()`; events without personal data |
| `src/components/LocationMap.tsx` | Maps load on "maps" consent or a one-off click |
| `src/app/[locale]/layout.tsx`, `globals.css` | Inline pre-paint script so returning visitors don't see the banner flash |
| `src/app/[locale]/polityka-prywatnosci/page.tsx`, `messages/*.json` | Art. 13 privacy notice in PL/FR/UK; cookie texts; form acknowledgement + notice; WhatsApp warning |
| `src/components/ContactForm.tsx`, `kontakt/page.tsx` | Double-submit guard; no Suspense (CLS); privacy notice under the form |
| `src/components/Contact.tsx` | Valid `<dl>` markup; WhatsApp note |
| `src/components/LanguageSwitcher.tsx`, `Sections.tsx`, `Hero.tsx` | Accessible names; contrast; heading order; no animation on the LCP text |
| `next.config.ts` | CSP, HSTS, COOP, Permissions-Policy |
| `src/i18n/routing.ts` | `alternateLinks: false` (no duplicate hreflang) |
| `package.json` | `overrides.postcss`, modern `browserslist`, `typecheck` and `test:e2e` scripts, dev dependencies `@playwright/test`, `@axe-core/playwright`, `lighthouse` |
| `playwright.config.ts`, `tests/e2e/*` | 60 tests (desktop + mobile projects): scenarios A–G + SEO |

**Results:** `tsc` ✅ · `eslint` 0 issues ✅ · `next build` ✅ · Playwright **51 passed, 9 skipped by design** (the viewport loop runs in the desktop project only) ✅ · `npm audit` 0 ✅

Run the tests locally with `npm run build && npm run test:e2e`. Form submissions in tests are always mocked.

---

## J. Outstanding decisions for the owner

1. **Approve deployment.** Merge PR `audit-rodo-2026` into `main` to publish.
2. **Confirm facts:**
   - ~~opening hours~~ (confirmed: Mon–Fri 9:00–17:00)
   - WhatsApp number +48 797 707 168
   - that Nasz Dentysta Sp. z o.o. runs both clinics
3. **Email (GDPR):** replace the consumer Gmail account with a provider that signs a processor agreement, and update the Netlify Forms notification.
4. **Retention:** choose a deletion period for form requests, and delete submissions in Netlify regularly.
5. **IOD:** decide whether a Data Protection Officer is required. If so, add their contact details.
6. **Organisational RODO documents:**
   - register of processing activities (RCP)
   - breach procedure
   - DPIA screening
   - procedure for data-subject requests
   - internal WhatsApp rules
7. **Security:** enable 2FA on the Netlify and GitHub accounts.
8. **Domain:** when naszdentysta.pl moves to Netlify, set `NEXT_PUBLIC_SITE_URL=https://naszdentysta.pl` so indexing, canonical URLs and the sitemap switch over.
9. **Content:** real clinic photos, a price list, doctors' specialisations, and (optionally) real Google reviews.
10. **Legal review:** have a Polish lawyer or IOD review the privacy policy text in all three languages before relying on it.
