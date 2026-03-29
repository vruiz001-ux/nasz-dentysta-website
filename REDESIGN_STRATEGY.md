# NASZ DENTYSTA — Complete Website Redesign Strategy
### Version 1.0 | March 2026

---

## A. EXECUTIVE REDESIGN VISION

### The Problem
The current naszdentysta.pl is a basic Zyro-built site that fails to convert visitors into patients. It lists services without descriptions, has English meta tags on Polish pages, shows no testimonials, no FAQ, no booking flow, and feels like a 2015 template. For a clinic operating since 1989 with 6 dentists and 2 locations, this massively undersells the practice.

### The Vision: "Quiet Confidence"
We're building a website that communicates trust before the visitor reads a single word. Think: the calm you feel walking into a well-designed clinic — clean surfaces, warm lighting, unhurried staff. Every pixel should reduce anxiety and increase confidence.

This is NOT a "medical blue template." This is a premium, human-centered experience that happens to be for a dental clinic.

### Design Philosophy
- **Silence over noise** — generous whitespace, one message per section
- **Show don't tell** — real team photos, real clinic, real results
- **Reduce friction to zero** — booking/calling within 1 tap at all times
- **Equal citizenship** — Ukrainian users are first-class, not afterthoughts
- **Speed is trust** — sub-2s load time, no bloat

---

## B. HOMEPAGE WIREFRAME (Section-by-Section)

### Section 1: Navigation Bar (Fixed)
```
┌─────────────────────────────────────────────────────┐
│ [LOGO]     Usługi  Lekarze  O nas  Kontakt  [PL|UA] │
│                                    [📞 Umów wizytę] │
└─────────────────────────────────────────────────────┘
```
- Logo left, nav center, language switcher + CTA right
- Sticky on scroll with subtle backdrop blur
- Mobile: logo + hamburger + phone icon
- Language switcher: pill toggle `PL | UA` (drop English — see Section E)

### Section 2: Hero (Above the Fold)
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  Od 1989 roku  ← heritage badge                    │
│                                                     │
│  Twój uśmiech.                                     │
│  Nasza pasja.                                      │
│                                                     │
│  Kompleksowa opieka stomatologiczna                │
│  w Zielonej Górze — dla całej rodziny.             │
│                                                     │
│  [Umów wizytę]  [Zadzwoń: 68 320 50 66]           │
│                                                     │
│  ★★★★★ Zaufało nam ponad 10 000 pacjentów         │
│  [NFZ badge] [Mediraty badge]                      │
│                                                     │
│                          ┌──────────────────┐      │
│                          │  [Hero photo:     │      │
│                          │   clinic interior │      │
│                          │   or smiling team]│      │
│                          └──────────────────┘      │
└─────────────────────────────────────────────────────┘
```
- Split layout: text left (60%), photo right (40%)
- Heritage badge floats with subtle animation
- Two CTAs: primary (book) + secondary (call with number visible)
- Trust bar below CTAs: star rating + partner logos inline
- Photo: use existing clinic/team photo with subtle warm overlay

### Section 3: Trust Bar (Social Proof Strip)
```
┌─────────────────────────────────────────────────────┐
│  🏥 2 gabinety   👨‍⚕️ 6 lekarzy   📅 Od 1989   🦷 NFZ │
└─────────────────────────────────────────────────────┘
```
- Horizontal strip, 4 key metrics with icons
- Light background, high-contrast numbers
- Animated count-up on scroll into view

### Section 4: Services Overview (6 Cards)
```
┌─────────────────────────────────────────────────────┐
│            Nasza Oferta                             │
│   Kompleksowa stomatologia w jednym miejscu        │
│                                                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │ 🦷       │ │ 🔧       │ │ 🦿       │           │
│  │Protetyka │ │Zachowaw. │ │Implanty  │           │
│  │ 2-line   │ │ 2-line   │ │ 2-line   │           │
│  │ desc     │ │ desc     │ │ desc     │           │
│  │[Więcej →]│ │[Więcej →]│ │[Więcej →]│           │
│  └──────────┘ └──────────┘ └──────────┘           │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │ 🔬       │ │ 😁       │ │ 👶       │           │
│  │Endodoncja│ │Ortodoncja│ │Dziecięca │           │
│  │ 2-line   │ │ 2-line   │ │ 2-line   │           │
│  │ desc     │ │ desc     │ │ desc     │           │
│  │[Więcej →]│ │[Więcej →]│ │[Więcej →]│           │
│  └──────────┘ └──────────┘ └──────────┘           │
│                                                     │
│           [Zobacz pełną ofertę →]                   │
└─────────────────────────────────────────────────────┘
```
- 3x2 grid (desktop), 2-col or stacked (mobile)
- Each card: custom icon, title, 2-line description, link to dedicated page
- Hover: subtle lift + accent color top-border reveal
- "Więcej →" links to individual service SEO landing pages

### Section 5: Why Choose Us
```
┌─────────────────────────────────────────────────────┐
│  ┌──────────────────┐                               │
│  │ [Clinic photo    │  Dlaczego Nasz Dentysta?      │
│  │  showing modern  │                               │
│  │  equipment]      │  ✓ Ponad 35 lat doświadczenia │
│  │                  │  ✓ Własne laboratorium         │
│  │                  │  ✓ Nowoczesny sprzęt           │
│  │                  │  ✓ Dwujęzyczny zespół PL/UA   │
│  └──────────────────┘  ✓ 2 wygodne lokalizacje      │
│                        ✓ Współpraca z NFZ            │
│                                                     │
│                     [Umów bezpłatną konsultację]     │
└─────────────────────────────────────────────────────┘
```
- Photo left, benefits right (desktop); stacked (mobile)
- Each benefit: green checkmark icon + one-line text
- Emphasize bilingual team (PL/UA) — competitive differentiator
- CTA at bottom of section

### Section 6: Meet Our Doctors (Team Preview)
```
┌─────────────────────────────────────────────────────┐
│            Nasz Zespół                               │
│   Doświadczeni specjaliści, którym możesz zaufać    │
│                                                     │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐      │
│  │ [photo]│ │ [photo]│ │ [photo]│ │ [photo]│      │
│  │Dr Yulia│ │Dr Ewa  │ │Dr Hanna│ │Dr Olek.│      │
│  │Stetska │ │Witkow. │ │Zhbank. │ │Brodyk  │      │
│  │Chirurg.│ │Protet. │ │Stom.og.│ │Stom.og.│      │
│  └────────┘ └────────┘ └────────┘ └────────┘      │
│                                                     │
│          [Poznaj cały zespół →]                     │
└─────────────────────────────────────────────────────┘
```
- Show 4 lead doctors in card format with real photos
- Each card: circular photo, name, specialization
- Hover: card elevates, subtle blue border
- Link to full team page
- On mobile: horizontal scroll carousel

### Section 7: Patient Comfort & Anxiety Reassurance
```
┌─────────────────────────────────────────────────────┐
│  🤝 Boisz się dentysty? Rozumiemy.                  │
│                                                     │
│  Nasz zespół jest przeszkolony w pracy z            │
│  pacjentami odczuwającymi lęk. Zapewniamy:         │
│                                                     │
│  😌 Spokojną atmosferę                              │
│  💬 Wyjaśnienie każdego kroku                       │
│  ⏸️  Przerwy kiedy potrzebujesz                     │
│  🎧 Komfortowe warunki leczenia                     │
│                                                     │
│  [Porozmawiaj z nami o swoich obawach]              │
└─────────────────────────────────────────────────────┘
```
- Warm background tint (cream/sage)
- Conversational, empathetic tone
- Direct CTA: encourages reaching out without pressure
- This section is a conversion multiplier for anxious patients

### Section 8: Two Locations Map
```
┌─────────────────────────────────────────────────────┐
│            Nasze Gabinety                            │
│                                                     │
│  ┌─────────────────┐  ┌─────────────────┐          │
│  │ 📍 Morelowa 23  │  │ 📍 Drzewna 35   │          │
│  │ 65-434 Zielona G│  │ 65-001 Zielona G│          │
│  │ ☎ 68 320 50 66  │  │ ☎ 68 320 23 96  │          │
│  │ [Nawiguj]       │  │ [Nawiguj]       │          │
│  └─────────────────┘  └─────────────────┘          │
│                                                     │
│  ┌─────────────────────────────────────────┐        │
│  │         [Google Maps embed]              │        │
│  │         showing both locations           │        │
│  └─────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────┘
```
- Two location cards side-by-side
- Each: address, phone (click-to-call), "Navigate" link (Google Maps deeplink)
- Embedded map below showing both pins
- Opening hours visible on each card

### Section 9: FAQ Preview (3–4 Questions)
```
┌─────────────────────────────────────────────────────┐
│  Często zadawane pytania                             │
│                                                     │
│  ▶ Czy przyjmujecie pacjentów z NFZ?                │
│  ▶ Czy mówicie po ukraińsku?                        │
│  ▶ Jak umówić się na pierwszą wizytę?               │
│  ▶ Czy jest parking przy gabinecie?                  │
│                                                     │
│  [Zobacz więcej pytań →]                            │
└─────────────────────────────────────────────────────┘
```
- Accordion-style, expand on click
- Top 4 most-asked questions
- Links to full FAQ page
- FAQ schema markup on each answer

### Section 10: Closing CTA
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  Gotowy na piękny uśmiech?                          │
│                                                     │
│  Zadzwoń lub umów wizytę online.                    │
│  Nasz zespół mówi po polsku i ukraińsku.            │
│                                                     │
│  [Umów wizytę]  [📞 68 320 50 66]                  │
│                                                     │
└─────────────────────────────────────────────────────┘
```
- Full-width, gradient background (primary → primary-light)
- Large text, high contrast
- Two prominent CTAs
- Explicit mention of bilingual service

### Section 11: Footer
```
┌─────────────────────────────────────────────────────┐
│ [LOGO]              Usługi        Lokalizacje       │
│ Od 1989 roku.       Protetyka     Morelowa 23       │
│ Stomatologia        Chirurgia     ☎ 68 320 50 66   │
│ na najwyższym       Implanty      Drzewna 35        │
│ poziomie.           Endodoncja    ☎ 68 320 23 96   │
│                     Ortodoncja                      │
│ [FB] [IG]           Dziecięca     naszdentystazgora │
│                                   @gmail.com        │
│ [NFZ] [Mediraty]                                    │
│─────────────────────────────────────────────────────│
│ © 2026 Nasz Dentysta | Polityka Prywatności | RODO  │
└─────────────────────────────────────────────────────┘
```
- 4-column grid: brand, services, locations, contact
- Social links, partner logos
- Legal links bottom row

---

## C. FULL SITEMAP

```
naszdentysta.pl/
├── /                           ← Homepage (PL)
├── /ua/                        ← Homepage (UA)
│
├── /uslugi/                    ← Services overview (PL)
│   ├── /uslugi/protetyka/
│   ├── /uslugi/implanty/
│   ├── /uslugi/chirurgia-stomatologiczna/
│   ├── /uslugi/endodoncja/
│   ├── /uslugi/ortodoncja/
│   ├── /uslugi/stomatologia-zachowawcza/
│   └── /uslugi/stomatologia-dziecieca/
│
├── /ua/posluhy/                ← Services overview (UA)
│   ├── /ua/posluhy/protezuvannya/
│   ├── /ua/posluhy/implanty/
│   ├── /ua/posluhy/khirurhiya/
│   ├── /ua/posluhy/endodontiya/
│   ├── /ua/posluhy/ortodontiya/
│   ├── /ua/posluhy/konservatyvna-stomatolohiya/
│   └── /ua/posluhy/dytyacha-stomatolohiya/
│
├── /lekarze/                   ← Team page (PL)
├── /ua/likari/                 ← Team page (UA)
│
├── /o-nas/                     ← About clinic (PL)
├── /ua/pro-nas/                ← About clinic (UA)
│
├── /certyfikaty/               ← Certificates & technology (PL)
├── /ua/sertyfikaty/            ← Certificates & technology (UA)
│
├── /opinie/                    ← Testimonials (PL)
├── /ua/vidhuky/                ← Testimonials (UA)
│
├── /faq/                       ← FAQ (PL)
├── /ua/faq/                    ← FAQ (UA)
│
├── /kontakt/                   ← Contact & booking (PL)
├── /ua/kontakt/                ← Contact & booking (UA)
│
├── /polityka-prywatnosci/      ← Privacy Policy (PL)
├── /ua/polityka-konfidentsiynosti/ ← Privacy Policy (UA)
│
├── /sitemap.xml
└── /robots.txt
```

**Total: 30 pages** (15 PL + 15 UA)

---

## D. VISUAL DESIGN SYSTEM

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--primary` | `#1B3A6B` | Deep navy — headers, CTAs, nav |
| `--primary-light` | `#2D5AA0` | Lighter navy — gradients, hover |
| `--accent` | `#C8956C` | Warm copper/gold — CTAs, highlights, badges |
| `--accent-light` | `#E8C9A8` | Light copper — subtle backgrounds |
| `--success` | `#3D8B6E` | Sage green — checkmarks, confirmations |
| `--text` | `#1A1A2E` | Near-black — body text |
| `--text-secondary` | `#5A6178` | Muted — descriptions, captions |
| `--bg` | `#FFFFFF` | White — main background |
| `--bg-warm` | `#FAF8F5` | Warm off-white — alternate sections |
| `--bg-accent` | `#F0EDE8` | Warm gray — cards, subtle containers |
| `--border` | `#E8E4DF` | Warm border color |

**Rationale:** Moving away from generic "medical blue" (#1e3a8a + amber) toward a deep navy + warm copper palette. The copper tone adds warmth and premium feel without losing medical authority. The warm neutrals make the site feel inviting rather than clinical.

### Typography

| Element | Font | Weight | Size (Desktop) | Size (Mobile) |
|---------|------|--------|----------------|---------------|
| H1 (Hero) | Plus Jakarta Sans | 800 | 56px / 3.5rem | 36px / 2.25rem |
| H2 (Section) | Plus Jakarta Sans | 700 | 40px / 2.5rem | 28px / 1.75rem |
| H3 (Card title) | Plus Jakarta Sans | 600 | 24px / 1.5rem | 20px / 1.25rem |
| Body | Plus Jakarta Sans | 400 | 17px / 1.0625rem | 16px / 1rem |
| Small / Caption | Plus Jakarta Sans | 400 | 14px / 0.875rem | 13px / 0.8125rem |
| CTA Button | Plus Jakarta Sans | 600 | 16px / 1rem | 16px / 1rem |

**Line heights:** Headings 1.15, body 1.7, captions 1.5
**Letter spacing:** Headings -0.02em, body normal

### Spacing System (8px base)
```
--space-xs:  4px
--space-sm:  8px
--space-md:  16px
--space-lg:  24px
--space-xl:  32px
--space-2xl: 48px
--space-3xl: 64px
--space-4xl: 96px
--space-5xl: 128px
```

Section padding: `96px` (desktop), `64px` (mobile)
Container max-width: `1200px`
Card border-radius: `16px`
Button border-radius: `12px`
Photo border-radius: `20px`

### UI Style
- **Cards:** Subtle border (`1px solid var(--border)`), no shadow at rest. On hover: `box-shadow: 0 8px 32px rgba(27, 58, 107, 0.08)` + `translateY(-4px)`
- **Buttons (Primary):** Solid `--accent` background, white text, no gradient. Hover: darken 10% + slight lift
- **Buttons (Secondary):** White background, `--primary` border + text. Hover: fill primary
- **Images:** All clinic/team photos get `border-radius: 20px` and a subtle warm overlay (`linear-gradient(to bottom, transparent 60%, rgba(27,58,107,0.03))`)
- **Dividers:** Never use lines. Use whitespace and background color shifts
- **Icons:** Custom SVG line icons (Lucide or Phosphor) — NOT emoji in production. Use emoji only in this wireframe doc for clarity
- **Animations:** Fade-up on scroll (IntersectionObserver), 300ms ease-out. No bouncing, no spinning. Subtle and fast

### Imagery Treatment
- **Existing team photos:** Crop to consistent aspect ratios (1:1 for cards, 3:4 for profiles). Apply subtle warm color grade if lighting varies between shots
- **Existing clinic photos:** Use as hero backgrounds with dark overlay for text contrast (`linear-gradient(135deg, rgba(27,58,107,0.7), rgba(27,58,107,0.4))`)
- **Logo:** Use as-is, ensure sufficient padding around it, display on white/light backgrounds only
- **NFZ/Mediraty logos:** Desaturate slightly for visual consistency, display in a "partners" strip

---

## E. BILINGUAL STRATEGY (POLISH + UKRAINIAN)

### Language Architecture
**Drop English and French.** The analytics and audience don't justify 4 languages. Focus on PL (primary market) and UA (significant patient base in Zielona Góra). This doubles the quality instead of spreading thin.

### URL Structure
```
Polish (default):  naszdentysta.pl/uslugi/implanty/
Ukrainian:         naszdentysta.pl/ua/posluhy/implanty/
```

- PL is the default — no `/pl/` prefix (cleaner URLs, better for SEO since PL is primary)
- UA lives under `/ua/` prefix
- All UA URLs use transliterated Ukrainian slugs where practical

### hreflang Implementation
Every page includes:
```html
<link rel="alternate" hreflang="pl" href="https://naszdentysta.pl/uslugi/implanty/" />
<link rel="alternate" hreflang="uk" href="https://naszdentysta.pl/ua/posluhy/implanty/" />
<link rel="alternate" hreflang="x-default" href="https://naszdentysta.pl/uslugi/implanty/" />
```

Also declared in `sitemap.xml` with `<xhtml:link>` elements.

### Language Switcher UX
- **Position:** Top-right of nav bar, always visible
- **Format:** Pill toggle with flag icons: `🇵🇱 PL | 🇺🇦 UA`
- **Behavior:** Switches to equivalent page in other language (not homepage)
- **Persistence:** Stores preference in `localStorage` + cookie. On next visit, redirects to preferred language via lightweight JS (no server-side detection — keeps static hosting)
- **First visit:** Show in PL (default) with a subtle banner for UA users:
  ```
  🇺🇦 Говоримо українською! [Перейти на українську]
  ```
  This banner appears once, dismissible, and sets the language preference.

### Localization Principles
- **NOT literal translation.** Each language version is independently written for its audience
- Polish copy: professional, uses formal "Pan/Pani" (Państwo)
- Ukrainian copy: warm but formal, uses native dental terminology (not Polish calques)
- Service names in Ukrainian use established medical terms, not transliterations
- Addresses and phone numbers remain identical (they're in Poland)
- Doctor names: use consistent Latin spelling across both languages, with Ukrainian patronymics where applicable on UA pages
- Legal pages: translated with proper RODO/GDPR terminology in both languages

### Ukrainian-Specific Considerations
- Prominently mention that the team includes Ukrainian-speaking doctors (Yulia Stetska, Hanna Zhbankova, Oleksandyr Brodyk, Halina Kolodiichak, etc.)
- Add a "Ми говоримо вашою мовою" (We speak your language) badge on UA homepage
- UA FAQ should include: "Чи потрібна мені реєстрація в NFZ?" (Do I need NFZ registration?) — practical immigration question
- Ensure all phone CTAs work with Polish country code formatting (+48)

---

## F. SEO ARCHITECTURE

### Domain & Technical SEO
- **Domain:** Keep `naszdentysta.pl` (strong local signal)
- **Canonical:** `https://naszdentysta.pl/` (enforce HTTPS, non-www)
- **Sitemap:** Auto-generated, includes all PL and UA pages with hreflang
- **Robots.txt:** Allow all, point to sitemap
- **Core Web Vitals targets:** LCP < 2.0s, FID < 100ms, CLS < 0.05

### Local SEO (Critical)
1. **Google Business Profile:** Ensure both locations are claimed and optimized
   - Morelowa 23 — primary listing
   - Drzewna 35 — secondary listing
   - Categories: Dentist, Dental Clinic, Dental Implants Provider
   - Photos: upload all existing team/clinic photos
   - Posts: weekly updates in PL and UA

2. **NAP Consistency:** Name, Address, Phone must be identical everywhere:
   ```
   Nasz Dentysta Sp. z o.o.
   ul. Morelowa 23, 65-434 Zielona Góra
   tel. 68 320 50 66
   ```

3. **Local directories:** Register on ZnanyLekarz, Mediraty, Yelp PL, Google Maps

### Keyword Strategy

#### Polish Keywords (Primary)
| Page | Primary Keyword | Secondary Keywords |
|------|----------------|-------------------|
| Homepage | dentysta Zielona Góra | stomatolog Zielona Góra, gabinet dentystyczny Zielona Góra |
| Protetyka | protetyka Zielona Góra | korony porcelanowe, protezy zębowe, mosty |
| Implanty | implanty zębów Zielona Góra | implantologia, wszczepienie implantu, cena implantów |
| Chirurgia | chirurgia stomatologiczna Zielona Góra | usuwanie zębów mądrości, ekstrakcja |
| Endodoncja | leczenie kanałowe Zielona Góra | endodoncja, leczenie kanałowe pod mikroskopem |
| Ortodoncja | ortodonta Zielona Góra | aparat ortodontyczny, prostowanie zębów |
| Zachowawcza | leczenie próchnicy Zielona Góra | stomatologia zachowawcza, plomby |
| Dziecięca | dentysta dla dzieci Zielona Góra | stomatologia dziecięca, pediatric dentist |
| Zespół | lekarze dentyści Zielona Góra | najlepszy dentysta, specjalista protetyk |

#### Ukrainian Keywords
| Page | Primary Keyword |
|------|----------------|
| Homepage | стоматолог Зелена Гура |
| Implanty | імпланти зубів Зелена Гура |
| General | стоматологія для українців в Польщі |
| General | український стоматолог Зелена Гура |

### Meta Tag Examples

**Homepage (PL):**
```html
<title>Dentysta Zielona Góra — Nasz Dentysta | Od 1989 roku</title>
<meta name="description" content="Gabinet dentystyczny w Zielonej Górze z 35-letnim doświadczeniem. Protetyka, implanty, ortodoncja, stomatologia dziecięca. 2 lokalizacje. Mówimy po polsku i ukraińsku. Umów wizytę: 68 320 50 66.">
```

**Homepage (UA):**
```html
<title>Стоматолог Зелена Гура — Nasz Dentysta | Говоримо українською</title>
<meta name="description" content="Стоматологічна клініка в Зеленій Гурі з 35-річним досвідом. Протезування, імпланти, ортодонтія. Українськомовні лікарі. 2 кабінети. Запишіться: 68 320 50 66.">
```

**Service page example — Implanty (PL):**
```html
<title>Implanty zębów Zielona Góra — Cena, Procedura | Nasz Dentysta</title>
<meta name="description" content="Implanty zębowe w Zielonej Górze. Doświadczeni implantolodzy, nowoczesny sprzęt, bezbolesna procedura. Własne laboratorium protetyczne. Umów konsultację: 68 320 50 66.">
```

### Schema Markup

**Dentist (LocalBusiness) — on every page:**
```json
{
  "@context": "https://schema.org",
  "@type": "Dentist",
  "name": "Nasz Dentysta",
  "url": "https://naszdentysta.pl",
  "logo": "https://naszdentysta.pl/images/logo.png",
  "image": "https://naszdentysta.pl/images/clinic-exterior.jpg",
  "telephone": ["+48683205066", "+48683202396"],
  "email": "naszdentystazgora@gmail.com",
  "foundingDate": "1989",
  "numberOfEmployees": "11",
  "availableLanguage": ["Polish", "Ukrainian"],
  "address": [
    {
      "@type": "PostalAddress",
      "streetAddress": "ul. Morelowa 23",
      "addressLocality": "Zielona Góra",
      "postalCode": "65-434",
      "addressCountry": "PL"
    },
    {
      "@type": "PostalAddress",
      "streetAddress": "ul. Drzewna 35",
      "addressLocality": "Zielona Góra",
      "postalCode": "65-001",
      "addressCountry": "PL"
    }
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "08:00",
      "closes": "20:00"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/naszdentystapl",
    "https://www.instagram.com/nasz_dentystazg/"
  ]
}
```

**FAQPage — on /faq/ page:**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Czy przyjmujecie pacjentów z NFZ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tak, współpracujemy z NFZ..."
      }
    }
  ]
}
```

**MedicalBusiness service schema — on each service page**

### Internal Linking Strategy
- Every service page links to related services (e.g., Implanty → Protetyka, Chirurgia)
- Team page links from doctor → their specialty service page
- FAQ answers link to relevant service pages
- Footer always links to all service pages
- Breadcrumbs on every subpage: `Strona główna > Usługi > Implanty`

### Heading Hierarchy (per page)
```
<h1> — One per page, contains primary keyword
  <h2> — Section headings (3-6 per page)
    <h3> — Subsection headings
```
Never skip levels. Never use headings for styling.

---

## G. CTA STRATEGY

### CTA Hierarchy
| Priority | CTA | Where | Style |
|----------|-----|-------|-------|
| 1 | Umów wizytę / Записатися | Hero, nav, sticky mobile, closing section, each service page | Primary (copper) |
| 2 | Zadzwoń / Зателефонуйте | Hero, nav (mobile), sticky mobile, contact section | Secondary (phone icon + number) |
| 3 | Bezpłatna konsultacja | Why Us section, service pages | Primary variant |
| 4 | Poznaj nasz zespół | After services section | Text link with arrow |
| 5 | Zobacz więcej | FAQ preview, services overview | Text link |

### Sticky Mobile CTA Bar
```
┌─────────────────────────────────────────┐
│  [📞 Zadzwoń]      [📅 Umów wizytę]    │
└─────────────────────────────────────────┘
```
- Fixed to bottom of screen on mobile
- Two buttons: call (left, secondary style) + book (right, primary style)
- Appears after scrolling past hero section
- Respects iOS safe area (env(safe-area-inset-bottom))
- Disappears when footer is in view (prevents overlap)

### CTA Copy (Localized)

| Context | Polish | Ukrainian |
|---------|--------|-----------|
| Primary booking | Umów wizytę | Записатися на прийом |
| Call | Zadzwoń teraz | Зателефонуйте зараз |
| Consultation | Bezpłatna konsultacja | Безкоштовна консультація |
| Contact | Napisz do nas | Напишіть нам |
| Team | Poznaj nasz zespół | Познайомтеся з командою |
| Services | Zobacz pełną ofertę | Переглянути всі послуги |
| Emergency | Ból zęba? Zadzwoń! | Біль у зубі? Телефонуйте! |

### Click-to-Call Implementation
All phone numbers wrapped in `tel:` links:
```html
<a href="tel:+48683205066">68 320 50 66</a>
```
Track as GA4 event: `phone_click` with `location` parameter.

---

## H. UX/CRO RECOMMENDATIONS

### Navigation
- **Desktop:** Logo | Usługi (dropdown) | Lekarze | O nas | Kontakt | [PL|UA] | [Umów wizytę]
- **Mobile:** Logo | [📞] | [☰]
- Mobile menu: full-screen overlay, large touch targets (min 48px), language switcher at top
- "Usługi" dropdown shows all 6 services on hover/tap — no extra click needed
- Active page indicated by underline accent

### Forms (Contact/Booking)
**Minimal fields for maximum conversion:**
```
┌──────────────────────────┐
│ Imię                     │
│ Telefon                  │
│ Preferowany gabinet ▼    │
│ [Morelowa / Drzewna]     │
│ Uwagi (opcjonalnie)      │
│                          │
│ [Wyślij →]               │
│                          │
│ lub zadzwoń: 68 320 50 66│
└──────────────────────────┘
```
- **4 fields only** (name, phone, location, optional note)
- NO email required (patients prefer phone callback)
- NO CAPTCHA visible (use honeypot + reCAPTCHA v3 invisible)
- Success state: "Dziękujemy! Odezwiemy się w ciągu 2 godzin."
- Phone alternative always visible below form

### Accessibility
- WCAG 2.1 AA minimum
- Contrast ratios: all text ≥ 4.5:1, large text ≥ 3:1
- Focus indicators on all interactive elements
- Alt text on all images (descriptive, in page language)
- Keyboard navigation for all interactions
- Font size: minimum 16px body (prevents iOS zoom)
- Touch targets: minimum 44x44px
- Reduced motion: `@media (prefers-reduced-motion: reduce)` — disable all animations

### Trust Signals Placement
| Signal | Where |
|--------|-------|
| "Od 1989 roku" badge | Hero, about, footer |
| NFZ logo | Hero trust bar, footer |
| Mediraty badge | Hero trust bar, footer |
| Team photos | Team section, about page |
| Certificates | Certificates page, about page |
| "Mówimy po ukraińsku" | Hero (UA banner), why us, footer |

### Performance
- All images: WebP format, lazy-loaded below fold
- Hero image: preloaded, max 100KB
- Font: self-hosted Plus Jakarta Sans (WOFF2), subset PL+UA characters
- CSS: single file, minified, < 20KB
- JS: vanilla, no framework, < 10KB
- Target: Lighthouse 95+ on all metrics

---

## I. CONTENT STRATEGY

### Tone of Voice

**Polish version:**
- Professional but approachable — "Pan/Pani" formality but with warmth
- Confident without arrogance: "Pomagamy" (we help), not "Jesteśmy najlepsi" (we're the best)
- Simple language: avoid Latin medical terms when Polish equivalents exist
- Example: "Leczenie kanałowe" not "endodoncja" in patient-facing copy (use "endodoncja" in SEO headings)

**Ukrainian version:**
- Warm and reassuring — many UA patients are new to the Polish medical system
- Practical: include system-navigation info (NFZ, how booking works in Poland)
- Empathetic: acknowledge the experience of being a patient in a foreign country
- Example: "Ми розуміємо, що пошук стоматолога в новій країні може бути стресовим. Тому наші лікарі говорять вашою мовою."

### Simplifying Medical Language
| Medical Term | Patient-Friendly (PL) | Patient-Friendly (UA) |
|-------------|----------------------|----------------------|
| Protetyka | Korony, mosty i protezy | Коронки, мости та протези |
| Endodoncja | Leczenie kanałowe | Лікування каналів |
| Stomatologia zachowawcza | Leczenie próchnicy i plomby | Лікування карієсу та пломби |
| Implantologia | Wszczepienie implantów | Встановлення імплантів |
| Ortodoncja | Prostowanie zębów, aparaty | Вирівнювання зубів, брекети |

### Doctor Bio Structure (per doctor)
```
[Photo — circular, 200x200]
Dr. Yulia Stetska
Lekarz dentysta

Specjalizacja: chirurgia stomatologiczna, implantologia
Doświadczenie: X lat praktyki
Języki: polski, ukraiński

"Krótki cytat od lekarza o podejściu do pacjentów"

[Umów wizytę z Dr. Stetską]
```

### Service Page Structure (each of 6 services)
```
1. H1: Service name + "Zielona Góra"
2. Hero paragraph: What it is, who it's for (3 sentences)
3. "Kiedy warto się zgłosić?" — symptoms/indications (bullet list)
4. "Jak wygląda zabieg?" — step-by-step process (3-5 steps)
5. "Dlaczego u nas?" — clinic advantages for this service (3 points)
6. Photo/illustration of the procedure type
7. Related services (internal links)
8. FAQ (2-3 service-specific questions)
9. CTA: Book consultation for this service
```

### FAQ Structure (15-20 questions across categories)
Categories:
1. **Pierwsza wizyta** (First visit) — 4-5 questions
2. **Usługi** (Services) — 4-5 questions
3. **Płatności i NFZ** (Payments & NFZ) — 3-4 questions
4. **Dla pacjentów ukraińskojęzycznych** (For Ukrainian speakers) — 3-4 questions
5. **Praktyczne** (Practical: parking, hours, emergency) — 3-4 questions

### Testimonial Strategy
Since the current site has no testimonials:
1. **Immediate:** Add a Mediraty/Google Reviews widget (external, verified)
2. **Short-term:** Collect 5-10 patient quotes (with consent) for the site
3. **Structure:** First name + initial, service received, brief quote
4. Example: *"Bałam się dentysty od dziecka. W Nasz Dentysta po raz pierwszy czułam się naprawdę komfortowo."* — Anna K., pacjentka od 2020

---

## J. TECHNICAL IMPLEMENTATION

### Recommended Stack

**Option A: Static Site (Recommended)**
- **Framework:** Astro (or 11ty) — generates pure HTML, near-zero JS
- **Styling:** Tailwind CSS (purged, ~5KB final)
- **Hosting:** Netlify or Cloudflare Pages (free tier, global CDN, auto-SSL)
- **Forms:** Netlify Forms or Formspree (no backend needed)
- **CMS:** Decap CMS (formerly Netlify CMS) — Git-based, so non-technical staff can edit content
- **i18n:** Astro's built-in i18n routing (`/ua/` prefix)

**Why Astro over Next.js/Nuxt:** This is a content site, not a web app. Zero JS on client = fastest possible load. Astro renders everything to static HTML and only hydrates interactive islands (language switcher, mobile menu, form).

**Option B: WordPress (If non-technical maintenance is priority)**
- Theme: Custom theme on GeneratePress/Bricks
- Multilingual: WPML or Polylang
- Hosting: Cloudways (managed VPS)
- Cache: WP Rocket + Cloudflare CDN

**Recommendation:** Go with Option A (Astro). The site has ~30 pages, content changes rarely, and performance will be significantly better.

### i18n Implementation (Astro)
```
src/
├── pages/
│   ├── index.astro          ← PL homepage
│   ├── uslugi/
│   │   ├── index.astro
│   │   ├── protetyka.astro
│   │   └── ...
│   └── ua/
│       ├── index.astro      ← UA homepage
│       └── posluhy/
│           ├── index.astro
│           └── protezuvannya.astro
├── i18n/
│   ├── pl.json              ← All PL strings
│   └── ua.json              ← All UA strings
├── components/
│   ├── Nav.astro
│   ├── Hero.astro
│   ├── ServiceCard.astro
│   ├── DoctorCard.astro
│   ├── FAQ.astro
│   ├── ContactForm.astro
│   ├── StickyMobileCTA.astro
│   └── LanguageSwitcher.astro
└── layouts/
    └── BaseLayout.astro      ← Head, nav, footer, schema
```

### Analytics & Tracking
- **GA4** with Google Consent Mode v2 (GDPR-compliant)
- **Events to track:**
  - `phone_click` (location: morelowa/drzewna)
  - `form_submit` (page, language)
  - `cta_click` (position: hero/sticky/closing)
  - `language_switch` (from, to)
  - `service_page_view` (service name)
- **Google Search Console:** Verify both PL and UA sitemaps
- **Cookie consent:** Lightweight custom banner (no third-party bloat)

### GDPR/RODO Compliance
- Cookie consent before any tracking fires
- Google Consent Mode: `analytics_storage: denied` by default
- Privacy policy in both PL and UA
- Contact form: checkbox for processing consent
- No third-party cookies except GA4 (after consent)
- Data controller info clearly stated

### Performance Optimization
- Images: WebP via `<picture>` element, responsive `srcset`
- Fonts: Self-host WOFF2, `font-display: swap`, subset to Latin + Cyrillic
- CSS: Tailwind purge → ~5KB
- JS: Only language switcher + mobile menu + form validation + scroll animations → ~8KB
- No jQuery, no Bootstrap, no external widget scripts
- Preload: hero image, font files
- Lazy load: all images below fold, Google Maps iframe

---

## K. SAMPLE HERO COPY

### Polish
```
Od 1989 roku

Twój uśmiech.
Nasza pasja.

Kompleksowa opieka stomatologiczna w Zielonej Górze
— dla całej rodziny, z sercem i doświadczeniem.

[Umów wizytę]  [Zadzwoń: 68 320 50 66]
```

### Ukrainian
```
З 1989 року

Ваша посмішка.
Наша турбота.

Повний спектр стоматологічних послуг у Зеленій Гурі
— для всієї родини, українською мовою.

[Записатися на прийом]  [Зателефонувати: 68 320 50 66]
```

### Alternative Hero Variants

**Variant B (Emotional):**
- PL: "Piękny uśmiech zaczyna się od zaufania."
- UA: "Гарна посмішка починається з довіри."

**Variant C (Direct/Practical):**
- PL: "Dentysta w Zielonej Górze. 2 gabinety. 6 lekarzy. Bez kolejek."
- UA: "Стоматолог у Зеленій Гурі. 2 кабінети. 6 лікарів. Говоримо українською."

---

## L. SAMPLE CTA COPY

### Booking CTAs
| Context | Polish | Ukrainian |
|---------|--------|-----------|
| Hero primary | Umów wizytę | Записатися на прийом |
| Hero secondary | Zadzwoń: 68 320 50 66 | Зателефонувати: 68 320 50 66 |
| Sticky mobile | 📞 Zadzwoń / 📅 Umów | 📞 Дзвінок / 📅 Запис |
| After services | Potrzebujesz pomocy? Umów konsultację | Потрібна допомога? Запишіться на консультацію |
| Closing section | Gotowy na piękny uśmiech? | Готові до гарної посмішки? |
| Service page | Umów wizytę na [nazwa usługi] | Записатися на [назва послуги] |
| Anxiety section | Porozmawiaj z nami — bez zobowiązań | Поговоріть з нами — без зобов'язань |
| Emergency | Ostry ból zęba? Zadzwoń teraz | Гострий зубний біль? Телефонуйте зараз |
| UA welcome banner | 🇺🇦 Говоримо українською! Перейти на українську | — |

### Microcopy
| Element | Polish | Ukrainian |
|---------|--------|-----------|
| Form success | Dziękujemy! Odezwiemy się w ciągu 2 godzin | Дякуємо! Ми зв'яжемося протягом 2 годин |
| Form phone label | Numer telefonu | Номер телефону |
| Location selector | Wybierz gabinet | Оберіть кабінет |
| Opening hours | Pon–Pt: 8:00–20:00 | Пн–Пт: 8:00–20:00 |

---

## M. THREE PREMIUM DESIGN DIRECTIONS

### Direction 1: "IVORY" — Warm Minimalism
- **Palette:** Deep navy + warm copper + cream backgrounds
- **Feel:** Like a luxury hotel lobby meets modern clinic
- **Typography:** Plus Jakarta Sans (current choice, refined)
- **Key feature:** Generous whitespace, warm photography overlays, copper accent CTAs
- **Card style:** Borderless, floating on cream backgrounds with subtle shadows
- **Nav:** Transparent over hero, becomes white on scroll
- **Best for:** Standing out from every other dental clinic in Poland. Premium without pretension.
- **Risk:** May feel too "lifestyle" for older patients. Mitigate with clear medical credentials section.

### Direction 2: "CLARITY" — Clean Clinical Modern
- **Palette:** Navy + white + electric blue accent + warm gray
- **Feel:** Apple Store meets medical practice
- **Typography:** Inter or DM Sans — geometric, ultra-clean
- **Key feature:** Bold headings, lots of white, sharp card borders, blue gradient accents
- **Card style:** Crisp borders, minimal shadows, colored top accents
- **Nav:** White with slight blur, always visible
- **Best for:** Maximum trust and clarity. Feels modern but unmistakably medical. Easy to scan quickly.
- **Risk:** Could feel cold. Mitigate with team photos and warm copy.

### Direction 3: "HAVEN" — Soft & Reassuring
- **Palette:** Sage green + deep teal + soft cream + warm wood tones
- **Feel:** Spa-like calm meets dental care
- **Typography:** Plus Jakarta Sans (headers) + Source Serif 4 (body) — serif adds warmth
- **Key feature:** Rounded corners, soft gradients, nature-inspired color, calming illustrations
- **Card style:** Large border-radius (24px), soft drop shadows, sage green accents
- **Nav:** Frosted glass effect, sage tint
- **Best for:** Anxious patients. Parents choosing a kids' dentist. Anyone who dreads dental visits.
- **Risk:** May feel less "serious" for complex procedures (implants, surgery). Mitigate with technology/credentials section.

### Recommendation
**Direction 1: IVORY** — It's the most differentiated. Every dental clinic in Poland uses Direction 2 (blue + white). Direction 3 is beautiful but niche. IVORY balances premium feel with medical trust, and the warm copper tones will make the existing photos look their best.

---

## NEXT STEPS

1. **Approve design direction** (IVORY / CLARITY / HAVEN)
2. **Content creation:** Write service descriptions, doctor bios, FAQ answers (PL + UA)
3. **Asset preparation:** Crop/optimize existing photos, create WebP versions
4. **Development:** Build in Astro with Tailwind, deploy to Netlify
5. **SEO setup:** Google Business Profile, Search Console, schema validation
6. **Analytics:** Configure GA4 + conversion tracking
7. **Launch:** DNS switch from Zyro to new hosting
8. **Post-launch:** Monitor Core Web Vitals, conversion rates, set up A/B tests on hero copy

---

*This strategy is ready for immediate handoff to designers and developers.*
*All recommendations are based on analysis of the current naszdentysta.pl site and existing GitHub repo.*
