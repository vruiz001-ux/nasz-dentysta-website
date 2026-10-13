import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowRight, MapPin, Languages } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { clinic, whatsappLink } from "@/content/clinic";
import { TrackedLink } from "./TrackedLink";
import { WhatsAppIcon } from "./icons";

export async function Hero() {
  const t = await getTranslations();
  const wa = whatsappLink(t("whatsappMessage"));
  const doctors = clinic.team.filter((m) => m.group === "doctor" && m.photo).slice(0, 6);

  const chips = [
    { icon: MapPin, text: `Zielona Góra · ${clinic.locations.map((l) => l.label).join(" / ")}` },
    clinic.spokenLanguages.length > 1 && { icon: Languages, text: "PL · УКР" },
  ].filter(Boolean) as { icon: typeof MapPin; text: string }[];

  return (
    <section aria-labelledby="hero-title" className="relative -mt-20 overflow-hidden pt-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 right-[-10%] h-[38rem] w-[38rem] rounded-full bg-sage blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-15%] h-[30rem] w-[30rem] rounded-full bg-sand blur-3xl" />
      </div>

      <div className="container-x grid items-center gap-14 py-12 sm:py-16 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-12 lg:gap-10 lg:py-20">
        <div className="lg:col-span-6">
          <p className="eyebrow">{t("hero.eyebrow")}</p>
          <h1 id="hero-title" className="h-display mt-5">{t("hero.title")}</h1>
          <p className="lead mt-6 max-w-xl">{t("hero.subtitle")}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href={{ pathname: "/kontakt", hash: "wizyta" }} className="btn-primary group sm:!min-h-14 sm:!px-8">
              {t("actions.book")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
            <Link href="/uslugi" className="btn-ghost sm:!min-h-14 sm:!px-8">{t("actions.exploreServices")}</Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            {wa && (
              <TrackedLink event="whatsapp_click" source="hero" href={wa} target="_blank" rel="noopener noreferrer" aria-label={t("actions.whatsappAria")} className="inline-flex items-center gap-2 text-sm font-semibold text-[#17633e] underline-offset-4 hover:underline">
                <WhatsAppIcon className="h-5 w-5" /> {t("actions.whatsappLong")}
              </TrackedLink>
            )}
            <ul className="flex flex-wrap gap-2">
              {chips.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-navy-soft ring-1 ring-navy/10">
                  <Icon className="h-3.5 w-3.5 text-teal-dark" aria-hidden /> {text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Real team portraits — no stock imagery */}
        <div className="relative lg:col-span-6">
          <ul aria-label={t("hero.teamAlt")} className="grid grid-cols-3 gap-3 sm:gap-4">
            {doctors.map((d, i) => (
              <li
                key={d.name}
                className={`relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-sage shadow-lg shadow-navy/[0.06] ${i % 3 === 1 ? "translate-y-6 sm:translate-y-10" : ""}`}
              >
                <Image
                  src={d.photo!}
                  alt={d.name}
                  fill
                  priority={i < 3}
                  sizes="(min-width: 1024px) 16vw, 33vw"
                  className="object-cover object-top"
                />
              </li>
            ))}
          </ul>
          <div className="absolute -bottom-8 left-4 rounded-3xl bg-navy px-6 py-5 text-ivory shadow-2xl shadow-navy/25 sm:-bottom-6 sm:left-[-1.5rem]">
            <p className="text-3xl font-semibold tracking-tight">{t("hero.since")}</p>
            <p className="mt-1 text-sm text-ivory/75">{t("hero.sinceText")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
