import { getTranslations } from "next-intl/server";
import { MapPin, Clock, Phone, Mail, Navigation, Users } from "lucide-react";
import { clinic, locationAddress, formatPhone, directionsLink, whatsappLink, mapEmbed } from "@/content/clinic";
import { TrackedLink } from "./TrackedLink";
import { WhatsAppIcon, FacebookIcon, InstagramIcon } from "./icons";
import { LocationMap } from "./LocationMap";

/** Both clinics side by side, each with address, phone, directions and a consent-gated map. */
export async function Locations({ withMaps = true }: { withMaps?: boolean }) {
  const t = await getTranslations();
  return (
    <div id="gabinety" className="grid scroll-mt-28 gap-6 md:grid-cols-2">
      {clinic.locations.map((l) => (
        <article key={l.id} className="card flex flex-col overflow-hidden" data-reveal>
          <div className="flex-1 p-7 sm:p-8">
            <p className="eyebrow">{t("contact.clinic")}</p>
            <h3 className="mt-3 text-2xl font-semibold">{l.label}</h3>
            <address className="mt-4 flex items-start gap-3 not-italic text-navy-soft">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-teal-dark" aria-hidden />
              <span>{l.street}<br />{l.postalCode} {l.city}</span>
            </address>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <TrackedLink event="phone_click" source={`location-${l.id}`} href={`tel:${l.phone}`} className="btn-primary !min-h-11 !px-5">
                <Phone className="h-4 w-4" aria-hidden /> <span className="tabular-nums">{formatPhone(l.phone)}</span>
              </TrackedLink>
              <a href={directionsLink(l)} target="_blank" rel="noopener noreferrer" className="btn-ghost !min-h-11 !px-5">
                <Navigation className="h-4 w-4" aria-hidden /> {t("actions.directions")}
              </a>
            </div>
          </div>
          {withMaps && (
            <div className="h-64 border-t border-navy/[0.06]">
              <LocationMap
                src={mapEmbed(l)}
                title={`${t("contact.mapTitle")} — ${locationAddress(l)}`}
                consentText={t("contact.mapConsent")}
                loadLabel={t("contact.mapLoad")}
                compact
              />
            </div>
          )}
        </article>
      ))}
    </div>
  );
}

/** Opening hours + WhatsApp + email + social. */
export async function ContactInfo() {
  const t = await getTranslations();
  const wa = whatsappLink(t("whatsappMessage"));

  return (
    <div className="space-y-4">
      <dl className="card divide-y divide-navy/[0.07]">
        {clinic.openingHours.length > 0 && (
          <Row icon={Clock} label={t("contact.hours")}>
            <table className="w-full text-[0.95rem]">
              <tbody>
                {[...clinic.openingHours].sort((a, b) => a.day - b.day).map((h) => (
                  <tr key={h.day}>
                    <th scope="row" className="py-1 pr-4 text-left font-medium text-navy-soft">{t(`contact.days.${h.day}`)}</th>
                    <td className="py-1 text-right font-semibold tabular-nums">
                      {h.open && h.close ? `${h.open} – ${h.close}` : <span className="font-normal text-ink-muted">{t("contact.closed")}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-sm text-ink-muted">{t("contact.hoursNote")}</p>
          </Row>
        )}
        {clinic.email && (
          <Row icon={Mail} label={t("contact.email")}>
            <a href={`mailto:${clinic.email}`} className="font-semibold break-all hover:text-teal-dark">{clinic.email}</a>
          </Row>
        )}
        {(clinic.social.facebook || clinic.social.instagram) && (
          <Row icon={Users} label={t("contact.social")}>
            <div className="flex gap-4">
              {clinic.social.facebook && (
                <a href={clinic.social.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold hover:text-teal-dark">
                  <FacebookIcon className="h-4 w-4" aria-hidden /> Facebook
                </a>
              )}
              {clinic.social.instagram && (
                <a href={clinic.social.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold hover:text-teal-dark">
                  <InstagramIcon className="h-4 w-4" aria-hidden /> Instagram
                </a>
              )}
            </div>
          </Row>
        )}
      </dl>
      {wa && (
        <TrackedLink event="whatsapp_click" source="contact" href={wa} target="_blank" rel="noopener noreferrer" aria-label={t("actions.whatsappAria")} className="btn w-full bg-[#1f7a4d] text-white hover:bg-[#17633e]">
          <WhatsAppIcon /> {t("actions.whatsappLong")}
        </TrackedLink>
      )}
      {wa && <p className="px-2 text-center text-xs text-ink-muted">{t("contact.whatsappNote")}</p>}
    </div>
  );
}

function Row({ icon: Icon, label, children }: { icon: typeof MapPin; label: string; children: React.ReactNode }) {
  return (
    <div className="p-6">
        <dt className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sage text-teal-dark">
            <Icon className="h-4 w-4" aria-hidden />
          </span>
          {label}
        </dt>
        <dd className="mt-3">{children}</dd>
    </div>
  );
}
