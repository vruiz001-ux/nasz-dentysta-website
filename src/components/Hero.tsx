import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { clinic, whatsappLink, formatPhone } from "@/content/clinic";
import { TrackedLink } from "./TrackedLink";
import { WhatsAppIcon } from "./icons";

/**
 * Home hero (Direction A). Answers, above the fold: who / where / NFZ or private / how to book.
 * Sized to its content (no 100vh) so the clinics and actions are visible on a phone's first screen.
 */
export async function Hero() {
  const t = await getTranslations();
  const wa = whatsappLink(t("whatsappMessage"));

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[34rem] w-[34rem] rounded-full bg-sage blur-3xl" />

      <div className="container-x grid items-center gap-10 pb-14 pt-6 sm:pt-10 lg:grid-cols-12 lg:gap-12 lg:pb-20">
        <div className="lg:col-span-7">
          <p className="eyebrow">{t("hero.eyebrow")}</p>
          <h1 id="hero-title" className="h-display mt-4 max-w-3xl">
            {t.rich("hero.title", {
              // NFZ letter mark (cropped from the official logo) in place of the letters;
              // alt keeps "NFZ" in the heading for screen readers and SEO.
              nfz: () => (
                <Image
                  src="/images/nfz-mark.png"
                  alt="NFZ"
                  width={674}
                  height={270}
                  priority
                  className="inline-block h-[0.74em] w-auto align-baseline"
                />
              ),
            })}
          </h1>
          <p className="lead mt-5 max-w-2xl">{t("hero.subtitle")}</p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href={{ pathname: "/kontakt", hash: "wizyta" }} className="btn-primary sm:!min-h-13 sm:!px-7">
              {t("actions.book")}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            {wa && (
              <TrackedLink event="whatsapp_click" source="hero" href={wa} target="_blank" rel="noopener noreferrer" aria-label={t("actions.whatsappAria")} className="btn-ghost !hidden sm:!inline-flex sm:!min-h-13 sm:!px-7">
                <WhatsAppIcon className="h-5 w-5 text-[#17633e]" /> {t("actions.whatsappLong")}
              </TrackedLink>
            )}
          </div>

          {/* Both clinics, each with its own phone and NFZ status — the most-needed facts */}
          <ul aria-label={t("hero.callTitle")} className="mt-8 grid gap-3 sm:grid-cols-2">
            {clinic.locations.map((l) => (
              <li key={l.id} className="card flex items-start justify-between gap-3 p-4">
                <div className="min-w-0">
                  <p className="flex items-center gap-1.5 font-semibold">
                    <MapPin className="h-4 w-4 shrink-0 text-teal-dark" aria-hidden /> {l.street}
                  </p>
                  <p className="mt-1">
                    {l.nfz ? (
                      <span className="badge-nfz">{t("hero.nfzChip")}</span>
                    ) : (
                      <span className="text-sm text-ink-muted">{t("hero.privateChip")}</span>
                    )}
                  </p>
                </div>
                <TrackedLink event="phone_click" source={`hero-${l.id}`} href={`tel:${l.phone}`} className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full bg-sage px-3.5 text-sm font-semibold tabular-nums text-navy hover:bg-sage-deep">
                  <Phone className="h-4 w-4" aria-hidden />
                  <span className="sr-only">{t("actions.call")} {l.label}: </span>
                  {formatPhone(l.phone)}
                </TrackedLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-white ring-1 ring-navy/[0.06]">
            {clinic.images.hero ? (
              <Image
                src={clinic.images.hero}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                quality={85}
                className="object-cover"
                style={{ objectPosition: clinic.images.heroFocus ?? "center" }}
              />
            ) : (
              <HeroArtwork />
            )}
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
