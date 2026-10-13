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

        {/* One hero photo (clinic.images.hero). Until a licensed photo is set, a neutral brand graphic is shown. */}
        <div className="relative lg:col-span-6">
          <div className="relative aspect-[530/377] overflow-hidden rounded-[2.5rem] bg-white shadow-xl shadow-navy/[0.08] ring-1 ring-navy/[0.06]">
            {clinic.images.hero ? (
              <Image
                src={clinic.images.hero}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                quality={90}
                className="object-cover"
                style={{ objectPosition: clinic.images.heroFocus ?? "center" }}
              />
            ) : (
              <HeroArtwork />
            )}
          </div>
          <div className="absolute -bottom-8 left-4 rounded-3xl bg-navy px-6 py-5 text-ivory shadow-2xl shadow-navy/25 sm:-bottom-6 sm:left-[-1.5rem]">
            <p className="text-3xl font-semibold tracking-tight">{t("hero.since")}</p>
            <p className="mt-1 text-sm text-ivory/75">{t("hero.sinceText")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Neutral brand graphic (logo blue + navy smile arc) — no photography. */
export function HeroArtwork() {
  return (
    <svg viewBox="0 0 500 600" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="hg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#eef5fb" />
          <stop offset="1" stopColor="#c8ddf0" />
        </linearGradient>
      </defs>
      <rect width="500" height="600" fill="url(#hg)" />
      <circle cx="400" cy="120" r="150" fill="#ffffff" opacity="0.55" />
      <circle cx="90" cy="520" r="120" fill="#4c99d6" opacity="0.12" />
      <path d="M110 300c45 110 235 110 280 0" fill="none" stroke="#13293d" strokeWidth="14" strokeLinecap="round" />
      <path d="M150 300c38 70 162 70 200 0" fill="none" stroke="#4c99d6" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      <circle cx="250" cy="430" r="9" fill="#4c99d6" />
    </svg>
  );
}
