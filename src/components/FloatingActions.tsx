import { getTranslations } from "next-intl/server";
import { CalendarPlus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { clinic, whatsappLink, formatPhone } from "@/content/clinic";
import { TrackedLink } from "./TrackedLink";
import { WhatsAppIcon } from "./icons";
import { CallMenu } from "./CallMenu";

/** Desktop: floating WhatsApp bubble. Mobile: bottom action bar (Call | WhatsApp | Book). */
export async function FloatingActions() {
  const t = await getTranslations();
  const wa = whatsappLink(t("whatsappMessage"));
  const phones = clinic.locations.map((l) => ({ id: l.id, label: l.label, href: `tel:${l.phone}`, display: formatPhone(l.phone) }));

  return (
    <>
      {wa && (
        <TrackedLink event="whatsapp_click" source="floating" href={wa} target="_blank" rel="noopener noreferrer" aria-label={t("actions.whatsappAria")}
          className="group fixed bottom-6 right-6 z-30 hidden h-14 items-center gap-2 rounded-full bg-[#1f7a4d] px-4 text-white shadow-xl shadow-navy/20 transition-all duration-300 hover:pr-5 lg:flex">
          <WhatsAppIcon className="h-6 w-6" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-40 group-focus-visible:max-w-40">{t("actions.whatsapp")}</span>
        </TrackedLink>
      )}

      <nav aria-label={t("nav.book")} className="fixed inset-x-0 bottom-0 z-30 border-t border-navy/10 bg-ivory/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden">
        <ul className="flex h-16 items-stretch">
          <li className="flex-1">
            <CallMenu label={t("actions.call")} title={t("contact.chooseClinic")} phones={phones} />
          </li>
          {wa && (
            <li className="flex-1">
              <TrackedLink event="whatsapp_click" source="mobile-bar" href={wa} target="_blank" rel="noopener noreferrer" aria-label={t("actions.whatsappAria")} className="flex h-full flex-col items-center justify-center gap-1 text-xs font-semibold text-[#17633e]">
                <WhatsAppIcon className="h-5 w-5" /> {t("actions.whatsapp")}
              </TrackedLink>
            </li>
          )}
          <li className="flex-[1.4] p-2">
            <Link href={{ pathname: "/kontakt", hash: "wizyta" }} className="flex h-full items-center justify-center gap-2 rounded-xl bg-navy text-sm font-semibold text-ivory">
              <CalendarPlus className="h-4 w-4" aria-hidden /> {t("nav.book")}
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
