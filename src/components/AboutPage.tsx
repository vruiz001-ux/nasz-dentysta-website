import { getTranslations } from "next-intl/server";
import {
  ArrowRight, ArrowUpRight, Users, HeartHandshake, Languages, FlaskConical, UserRound, Armchair, BadgeCheck,
  History, Stethoscope, MapPinned, CalendarPlus,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { activeServices } from "@/lib/site";
import { SERVICE_ICONS } from "./ServiceIcon";
import { HeroArtwork } from "./Hero";

/** "O nas" page — layout modelled on the owner's mockup, built with the site's design system. Verified facts only. */
export async function AboutPage() {
  const t = await getTranslations("aboutPage");
  const ts = await getTranslations("services.items");
  const ta = await getTranslations("actions");
  const services = activeServices();

  const points = [
    { key: "team", icon: Users },
    { key: "individual", icon: HeartHandshake },
    { key: "languages", icon: Languages },
  ] as const;
  const trust = [
    { key: "lab", icon: FlaskConical },
    { key: "individual", icon: UserRound },
    { key: "comfort", icon: Armchair },
    { key: "quality", icon: BadgeCheck },
  ] as const;
  const stats = [
    { key: "since", icon: History },
    { key: "range", icon: Stethoscope },
    { key: "places", icon: MapPinned },
  ] as const;

  return (
    <>
      {/* 1 — Intro */}
      <section aria-labelledby="about-hero" className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[30rem] w-[30rem] rounded-full bg-sage/70 blur-3xl" />
        <div className="container-x grid grid-cols-1 items-center gap-12 pb-20 pt-10 sm:pt-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="eyebrow">{t("eyebrow")}</p>
            <h1 id="about-hero" className="h-display mt-5 !text-[2.4rem] sm:!text-5xl lg:!text-6xl">{t("title")}</h1>
            <p className="lead mt-6 max-w-xl">{t("lead")}</p>
            <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {points.map(({ key, icon: Icon }) => (
                <li key={key} className="flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sage text-teal-dark">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="text-sm leading-snug">
                    <span className="block font-semibold text-navy">{t(`points.${key}.t`)}</span>
                    <span className="text-ink-muted">{t(`points.${key}.d`)}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] shadow-xl shadow-navy/[0.08]">
              <HeroArtwork />
            </div>
            <div className="absolute -bottom-6 left-4 rounded-3xl bg-navy px-6 py-5 text-ivory shadow-2xl shadow-navy/25 sm:left-[-1.5rem]">
              <p className="text-3xl font-semibold tracking-tight">{t("badge")}</p>
              <p className="mt-1 text-sm text-ivory/75">{t("badgeText")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — Services */}
      <section aria-labelledby="about-services" className="bg-sand/50 py-24 sm:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center" data-reveal>
            <p className="eyebrow justify-center">{t("servicesEyebrow")}</p>
            <h2 id="about-services" className="h-section mt-4">{t("servicesTitle")}</h2>
            <p className="lead mt-4 !text-lg">{t("servicesIntro")}</p>
          </div>
          <ul className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((id, i) => {
              const Icon = SERVICE_ICONS[id];
              return (
                <li key={id} data-reveal style={{ transitionDelay: `${(i % 4) * 60}ms` }}>
                  <Link href={{ pathname: "/uslugi", hash: id }} className="card group flex h-full flex-col p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/[0.07]">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage text-teal-dark transition-colors duration-500 group-hover:bg-navy group-hover:text-sage">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="mt-5 text-lg font-semibold">{ts(`${id}.name`)}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{ts(`${id}.short`)}</p>
                    <span className="mt-5 flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-navy/15 transition-colors group-hover:bg-navy group-hover:text-ivory group-hover:ring-navy">
                      <ArrowRight className="h-4 w-4" aria-hidden />
                      <span className="sr-only">{ta("learnMore")}: {ts(`${id}.name`)}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
            <li data-reveal>
              <Link href={{ pathname: "/kontakt", hash: "wizyta" }} className="group flex h-full flex-col rounded-[var(--radius-card)] bg-navy p-6 text-ivory transition-all duration-500 hover:-translate-y-1 hover:bg-teal-dark">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ivory/10 text-sage">
                  <CalendarPlus className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{t("consultTitle")}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ivory/75">{t("consultText")}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sage">
                  {ta("book")} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* 3 — Why trust us */}
      <section aria-labelledby="about-trust" className="py-24 sm:py-28">
        <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5" data-reveal>
            <p className="eyebrow">{t("trustEyebrow")}</p>
            <h2 id="about-trust" className="h-section mt-4">{t("trustTitle")}</h2>
            <p className="lead mt-5 !text-lg">{t("trustText")}</p>
            <Link href={{ pathname: "/kontakt", hash: "wizyta" }} className="btn-primary group mt-8">
              <CalendarPlus className="h-4 w-4" aria-hidden /> {ta("book")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
            {trust.map(({ key, icon: Icon }, i) => (
              <li key={key} data-reveal style={{ transitionDelay: `${i * 60}ms` }} className="card flex gap-4 p-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sage text-teal-dark">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-semibold">{t(`trust.${key}.t`)}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{t(`trust.${key}.d`)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* 4 — Key facts strip */}
        <div className="container-x mt-16">
          <ul className="grid grid-cols-1 divide-y divide-navy/10 rounded-[var(--radius-card)] bg-sage/60 sm:grid-cols-3 sm:divide-x sm:divide-y-0" data-reveal>
            {stats.map(({ key, icon: Icon }) => (
              <li key={key} className="flex items-center gap-4 px-6 py-6 sm:justify-center">
                <Icon className="h-7 w-7 shrink-0 text-teal-dark" aria-hidden />
                <span className="leading-snug">
                  <span className="block font-semibold">{t(`stats.${key}.t`, { count: services.length })}</span>
                  <span className="text-sm text-ink-muted">{t(`stats.${key}.d`)}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5 — Closing CTA */}
      <section aria-labelledby="about-cta" className="pb-24 sm:pb-28">
        <div className="container-x">
          <div className="grid grid-cols-1 overflow-hidden rounded-[2.5rem] bg-sand lg:grid-cols-2" data-reveal>
            <div className="p-8 sm:p-12 lg:p-14">
              <h2 id="about-cta" className="h-section">{t("ctaTitle")}</h2>
              <p className="lead mt-4 !text-lg">{t("ctaText")}</p>
              <Link href={{ pathname: "/kontakt", hash: "wizyta" }} className="btn-primary group mt-8">
                <CalendarPlus className="h-4 w-4" aria-hidden /> {ta("book")}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <div className="relative hidden min-h-64 lg:block">
              <HeroArtwork />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
