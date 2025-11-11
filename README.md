# Nasz Dentysta - Official Website

Professional dental clinic website for Nasz Dentysta in Zielona Góra, Poland.

## 🦷 About

Nasz Dentysta is a professional dental clinic operating since 1989, providing comprehensive dental services in Zielona Góra, Poland. This repository contains the official website with full trilingual support.

## 🌐 Website Features

- ✅ **Trilingual Support**: Polish, English, and Ukrainian
- ✅ **Responsive Design**: Mobile, tablet, and desktop optimized
- ✅ **GDPR/RODO Compliant**: Full privacy compliance
- ✅ **Google Analytics 4**: Integrated with consent mode
- ✅ **SEO Optimized**: Meta tags, sitemap, robots.txt
- ✅ **Accessibility**: WCAG 2.1 compliant
- ✅ **Cookie Consent**: GDPR-compliant cookie banner
- ✅ **Privacy Policies**: Complete policies in 3 languages

## 📁 Repository Structure

```
├── index.html                    # Main website (trilingual)
├── privacy-policy.html           # Privacy policy (Polish)
├── privacy-policy-en.html        # Privacy policy (English)
├── privacy-policy-ua.html        # Privacy policy (Ukrainian)
├── sitemap.xml                   # SEO sitemap
├── robots.txt                    # Search engine directives
├── README.md                     # This file
└── docs/
    ├── GOOGLE_ANALYTICS_SETUP_GUIDE.txt
    ├── GA4_OPTIMIZATION_SUMMARY.txt
    ├── GA4_QUICK_START.txt
    ├── POLISH_COMPLIANCE_CHECKLIST.txt
    ├── TRANSLATION_VERIFICATION_REPORT.txt
    └── FINAL_DEPLOYMENT_SUMMARY.txt
```

## 🚀 Quick Start

### Option 1: View Locally

1. Download the repository
2. Open `index.html` in your browser
3. That's it! No build process needed.

### Option 2: Deploy to Web Server

1. Upload all `.html`, `.xml`, and `.txt` files to your server
2. Ensure HTTPS is enabled
3. Update Google Analytics Measurement ID (see below)
4. Test the website

### Option 3: Deploy with GitHub Pages

1. Go to Settings → Pages
2. Select branch: `main` (or `master`)
3. Select folder: `/` (root)
4. Save
5. Your site will be available at: `https://[username].github.io/[repo-name]/`

## ⚙️ Configuration

### Google Analytics Setup

The website includes Google Analytics 4 integration. To enable:

1. Create a GA4 property at https://analytics.google.com
2. Get your Measurement ID (format: `G-XXXXXXXXXX`)
3. Replace `G-XXXXXXXXXX` in `index.html` (appears 2 times):
   - Line ~89: `<script async src="...?id=G-XXXXXXXXXX">`
   - Line ~96: `gtag('config', 'G-XXXXXXXXXX', {`
4. Upload the updated file

📖 See `docs/GA4_QUICK_START.txt` for detailed instructions.

### Company Information

Update these values in all privacy policy files:
- **NIP**: 9291794899 (already filled)
- **REGON**: 081081188 (already filled)

## 📞 Contact Information

**Locations:**
- **Morelowa**: ul. Morelowa 23, 65-001 Zielona Góra | ☎️ 68 320 50 66
- **Drzewna**: ul. Drzewna 35, 65-001 Zielona Góra | ☎️ 68 320 23 96

**Contact:**
- 📧 Email: naszdentystazgora@gmail.com
- 💬 WhatsApp: +48 797 707 168
- 🌐 Website: https://www.naszdentystazgora.com

## 🔒 Privacy & Compliance

### GDPR/RODO Compliance

- ✅ Cookie consent banner
- ✅ Privacy policies (PL/EN/UA)
- ✅ Google Consent Mode V2
- ✅ IP anonymization
- ✅ 14-month data retention
- ✅ Easy opt-out mechanism
- ✅ User rights documented

### Polish Legal Requirements

- ✅ NIP displayed: 9291794899
- ✅ REGON displayed: 081081188
- ✅ Privacy policy in Polish
- ✅ Medical data protection
- ✅ UODO compliant

## 🌍 Languages

The website automatically detects and switches between:
- 🇵🇱 **Polski** (Polish) - Default
- 🇬🇧 **English**
- 🇺🇦 **Українська** (Ukrainian)

Language preference is saved in browser localStorage.

## 🎨 Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Custom styling, responsive design
- **JavaScript**: Vanilla JS (no frameworks)
- **Google Fonts**: Plus Jakarta Sans
- **Google Analytics 4**: Web analytics
- **Schema.org**: Structured data for SEO

## 📊 Features in Detail

### Sections

1. **Hero**: Eye-catching introduction with CTAs
2. **About**: Company history and expertise
3. **Services**: 6 dental specialties
4. **Why Us**: Unique selling points
5. **Contact**: Contact information and CTAs
6. **Footer**: Quick links, services, locations

### Services Offered

- 🦷 Prosthetics (Protetyka)
- 💉 Surgery (Chirurgia)
- 🔬 Implantology (Implantologia)
- ✨ Conservative Dentistry (Stomatologia Zachowawcza)
- 🩺 Endodontics (Endodoncja)
- 🌟 Periodontology (Periodontologia)

### SEO Features

- ✅ Meta tags (title, description, keywords)
- ✅ Open Graph tags
- ✅ Schema.org structured data (Local Business)
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Canonical URLs
- ✅ Language alternates (hreflang)

## 📱 Browser Compatibility

Tested and working on:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS/Android)

## 🛠️ Development

### Making Changes

1. Edit `index.html` for main website
2. Edit privacy policy files for legal text
3. Test locally before deploying
4. Commit changes with descriptive messages

### Adding New Features

See documentation files in `docs/` folder for:
- Adding custom analytics events
- Modifying SEO settings
- Updating privacy policies
- Compliance guidelines

## 📝 Documentation

Comprehensive documentation available in `docs/` folder:

1. **FINAL_DEPLOYMENT_SUMMARY.txt**: Complete deployment guide
2. **GA4_QUICK_START.txt**: 3-step Google Analytics setup
3. **GOOGLE_ANALYTICS_SETUP_GUIDE.txt**: Detailed GA4 guide
4. **POLISH_COMPLIANCE_CHECKLIST.txt**: Legal compliance
5. **TRANSLATION_VERIFICATION_REPORT.txt**: Language quality report
6. **GA4_OPTIMIZATION_SUMMARY.txt**: Analytics technical docs

## 🔄 Updates & Maintenance

### Regular Updates
- Update copyright year annually
- Review privacy policy for legal changes
- Check for broken links quarterly
- Update contact information as needed

### Security
- Use HTTPS only (SSL certificate required)
- Keep server software updated
- Regular security audits
- Monitor for vulnerabilities

## 📄 License

Copyright © 2025 Nasz Dentysta. All rights reserved.

**NIP**: 9291794899
**REGON**: 081081188

## 🤝 Support

For technical support or questions:
- Review documentation in `docs/` folder
- Check privacy policies for compliance questions
- Contact via email: naszdentystazgora@gmail.com

## 🎯 Project Status

- ✅ **Website**: Production ready
- ✅ **Translations**: Complete (PL/EN/UA)
- ✅ **GDPR Compliance**: Complete
- ✅ **SEO**: Optimized
- ✅ **Analytics**: Configured (needs Measurement ID)
- ✅ **Mobile**: Fully responsive
- ✅ **Documentation**: Complete

## 📈 Analytics & Tracking

Once Google Analytics is configured:
- Track visitor behavior
- Monitor traffic sources
- Analyze language preferences
- Measure engagement
- Track conversions (phone/email clicks)

All tracking respects user privacy and GDPR/RODO requirements.

---

**Last Updated**: November 11, 2025
**Version**: 1.0
**Status**: ✅ Production Ready

Made with ❤️ for Nasz Dentysta
