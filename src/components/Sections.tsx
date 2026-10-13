import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { ArrowUpRight, History, FlaskConical, MapPinned, Languages, Phone, CalendarCheck, Smile, Check, Plus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { clinic, whatsappLink, formatPhone, type ServiceId } from "@/content/clinic";
import { activeServices } from "@/lib/site";
import { SectionHeading } from "./SectionHeading";
import { SERVICE_ICONS } from "./ServiceIcon";
import { TrackedLink } from "./TrackedLink";
import { WhatsAppIcon } from "./icons";
import type { Locale } from "@/i18n/routing";

/* ── Why choose us ───────────────────────────────────── */
export async function WhyUs() {
  const t = await getTranslations("why");
  const items = [
    { key: "since", icon: History },
    { key: "lab", icon: FlaskConical },
    { key: "locations", icon: MapPinned },
    { key: "languages", icon: Languages },
  ] as const;
  return (
    <section aria-labelledby="why-title" className="py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading id="why-title" eyebrow={t("eyebrow")} title={t("title")} />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ key, icon: Icon }, i) => (
            <li key={key} data-reveal style={{ transitionDelay: `${i * 70}ms` }} className="card group p-7 transition-shadow duration-500 hover:shadow-xl hover:shadow-navy/[0.06]">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage text-teal-dark transition-colors duration-500 group-hover:bg-navy group-hover:text-sage">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-6 text-xl font-semibold">{t(`items.${key}.title`)}</h3>
              <p className="mt-3 leading-relaxed text-ink-muted">{t(`items.${key}.text`)}</p>
            </li>
          ))}
        </ul>
        <Partners />
      </div>
    </section>
  );
}

export async function Partners() {
  const t = await getTranslations("partners");
  if (!clinic.partners.length) return null;
  return (
    <div data-reveal className="mt-6 flex flex-col gap-6 rounded-[var(--radius-card)] bg-white p-7 ring-1 ring-navy/[0.06] sm:flex-row sm:items-center sm:justify-between sm:p-8">
      <div className="max-w-xl">
        <h3 className="text-lg font-semibold">{t("title")}</h3>
        <p className="mt-1.5 text-ink-muted">{t("text")}</p>
      </div>
      <ul className="flex shrink-0 items-center gap-8">
        {clinic.partners.map((p) => (
          <li key={p.name}>
            <Image src={p.logo} alt={p.name} width={p.width} height={p.height} className="h-10 w-auto object-contain sm:h-12" />
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Service card + grid ─────────────────────────────── */
export async function ServiceCard({ id, index, detailed = false }: { id: ServiceId; index: number; detailed?: boolean }) {
  const t = await getTranslations("services");
  const Icon = SERVICE_ICONS[id];
  return (
    <article
      id={detailed ? id : undefined}
      data-reveal
      style={{ transitionDelay: `${(index % 3) * 70}ms` }}
      className="card group relative flex h-full flex-col overflow-hidden p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/[0.07] sm:p-8"
    >
      <div aria-hidden className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-sage/60 transition-transform duration-700 group-hover:scale-125" />
      <div className="relative flex items-start justify-between">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-sage">
          <Icon className="h-6 w-6" aria-hidden />
        </span>
        <span aria-hidden className="text-sm font-semibold tabular-nums text-ink-muted">{String(index + 1).padStart(2, "0")}</span>
      </div>
      {(() => {
        const H = detailed ? "h2" : "h3";
        return <H className="relative mt-8 text-xl font-semibold sm:text-2xl">{t(`items.${id}.name`)}</H>;
      })()}
      <p className="relative mt-3 flex-1 leading-relaxed text-ink-muted">
        {detailed ? t(`items.${id}.long`) : t(`items.${id}.short`)}
      </p>
      <div className="relative mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
        {detailed ? (
          <Link href={{ pathname: "/kontakt", hash: "wizyta", query: { usluga: id } }} className="btn-primary !min-h-11 !px-5 !text-sm">
            {t("bookThis")}
          </Link>
        ) : (
          <Link
            href={{ pathname: "/uslugi", hash: id }}
            className="inline-flex items-center gap-1.5 font-semibold text-teal-dark after:absolute after:inset-0 after:content-['']"
          >
            {(await getTranslations("actions"))("learnMore")}
            <span className="sr-only">: {t(`items.${id}.name`)}</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </Link>
        )}
      </div>
    </article>
  );
}

export async function ServicesGrid({ detailed = false, withHeading = true }: { detailed?: boolean; withHeading?: boolean }) {
  const t = await getTranslations("services");
  const services = activeServices();
  return (
    <section aria-labelledby={withHeading ? "services-title" : undefined} className={detailed ? "pb-24" : "bg-sand/50 py-24 sm:py-32"}>
      <div className="container-x">
        {withHeading && (
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading id="services-title" eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
            {services.length > 0 && !detailed && (
              <Link href="/uslugi" className="btn-ghost shrink-0" data-reveal>
                {(await getTranslations("actions"))("exploreServices")}
              </Link>
            )}
          </div>
        )}
        {services.length ? (
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((id, i) => (
              <ServiceCard key={id} id={id} index={i} detailed={detailed} />
            ))}
          </div>
        ) : (
          <p className="card mt-14 p-8 text-lg text-ink-muted">{t("empty")}</p>
        )}
      </div>
    </section>
  );
}

/* ── About + team ────────────────────────────────────── */
export async function AboutSection({ full = false }: { full?: boolean }) {
  const t = await getTranslations("about");
  const l = (await getLocale()) as Locale;
  const doctors = clinic.team.filter((m) => m.group === "doctor");
  const staff = clinic.team.filter((m) => m.group === "staff");
  const values = ["individual", "comfort", "quality"] as const;

  return (
    <section aria-labelledby="about-title" className={full ? "pb-24 sm:pb-32" : "py-24 sm:py-32"}>
      <div className="container-x grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
        <div className={full ? "sr-only" : "lg:col-span-5"}>
          <SectionHeading id="about-title" eyebrow={t("eyebrow")} title={t("title")} />
          {!full && (
            <Link href="/o-nas" data-reveal className="btn-ghost mt-10 hidden lg:inline-flex">
              {t("meetTeam")} <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          )}
        </div>
        <div className={full ? "lg:col-span-12 max-w-3xl" : "lg:col-span-7"}>
          <div data-reveal className="space-y-5 text-lg leading-relaxed text-navy-soft">
            <p>{t("text1")}</p>
            <p>{t("text2")}</p>
          </div>
          <ul data-reveal className="mt-8 flex flex-wrap gap-3">
            {values.map((v) => (
              <li key={v} className="flex items-center gap-2 rounded-full bg-sage px-4 py-2 text-sm font-semibold text-navy">
                <Check className="h-4 w-4 text-teal-dark" aria-hidden /> {t(`values.${v}`)}
              </li>
            ))}
          </ul>
          {!full && (
            <Link href="/o-nas" className="btn-ghost mt-10 lg:hidden">
              {t("meetTeam")} <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          )}
        </div>
      </div>

      {full && (
        <div className="container-x mt-24 space-y-20">
          <TeamGrid title={t("doctorsTitle")} members={doctors} locale={l} intro={t("teamIntro")} />
          <TeamGrid title={t("staffTitle")} members={staff} locale={l} small />
        </div>
      )}
    </section>
  );
}

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).join("").slice(0, 2);
}

function TeamGrid({ title, intro, members, locale, small = false }: { title: string; intro?: string; members: typeof clinic.team; locale: Locale; small?: boolean }) {
  if (!members.length) return null;
  return (
    <div>
      <h2 className="h-section" data-reveal>{title}</h2>
      {intro && <p className="lead mt-4" data-reveal>{intro}</p>}
      <ul className={`mt-10 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`}>
        {members.map((m, i) => (
          <li key={m.name} data-reveal style={{ transitionDelay: `${(i % 3) * 70}ms` }} className="card flex items-center gap-4 p-5 sm:p-6">
            <span aria-hidden className={`flex shrink-0 items-center justify-center rounded-full bg-sage font-semibold text-teal-dark ${small ? "h-11 w-11 text-sm" : "h-14 w-14 text-lg"}`}>
              {initials(m.name)}
            </span>
            <div className="min-w-0">
              <h3 className={small ? "font-semibold" : "font-semibold sm:text-lg"}>{m.name}</h3>
              <p className="mt-0.5 text-sm text-teal-dark">{m.role[locale]}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── FAQ ─────────────────────────────────────────────── */
export async function FAQ() {
  const t = await getTranslations("faq");
  const keys = ["nfz", "where", "lab", "uk"] as const;
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: keys.map((k) => ({ "@type": "Question", name: t(`items.${k}.q`), acceptedAnswer: { "@type": "Answer", text: t(`items.${k}.a`) } })),
  };
  return (
    <section aria-labelledby="faq-title" className="pb-24 sm:pb-32">
      <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-12">
        <h2 id="faq-title" className="h-section lg:col-span-4" data-reveal>{t("title")}</h2>
        <div className="divide-y divide-navy/10 border-y border-navy/10 lg:col-span-8">
          {keys.map((k) => (
            <details key={k} className="group py-2" data-reveal>
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                {t(`items.${k}.q`)}
                <Plus className="h-5 w-5 shrink-0 text-teal-dark transition-transform duration-300 group-open:rotate-45" aria-hidden />
              </summary>
              <p className="pb-5 pr-10 leading-relaxed text-navy-soft">{t(`items.${k}.a`)}</p>
            </details>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
    </section>
  );
}

/* ── Patient journey ─────────────────────────────────── */
export async function Journey() {
  const t = await getTranslations("journey");
  const steps = [
    { n: "1", icon: Phone },
    { n: "2", icon: CalendarCheck },
    { n: "3", icon: Smile },
  ] as const;
  return (
    <section aria-labelledby="journey-title" className="bg-navy py-24 text-ivory sm:py-32">
      <div className="container-x">
        <SectionHeading id="journey-title" eyebrow={t("eyebrow")} title={t("title")} tone="light" align="center" />
        <ol className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-6">
          <div aria-hidden className="absolute left-[16.6%] right-[16.6%] top-8 hidden h-px bg-gradient-to-r from-transparent via-ivory/25 to-transparent md:block" />
          {steps.map(({ n, icon: Icon }, i) => (
            <li key={n} data-reveal style={{ transitionDelay: `${i * 100}ms` }} className="relative text-center">
              <span className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ivory text-navy ring-8 ring-navy">
                <Icon className="h-6 w-6" aria-hidden />
              </span>
              <p className="mt-6 text-sm font-semibold tabular-nums text-sage">0{n}</p>
              <h3 className="mt-2 text-2xl font-semibold">{t(`steps.${n}.title`)}</h3>
              <p className="mx-auto mt-3 max-w-xs text-ivory/70">{t(`steps.${n}.text`)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── Appointment CTA ─────────────────────────────────── */
export async function AppointmentCTA() {
  const t = await getTranslations();
  const wa = whatsappLink(t("whatsappMessage"));
  return (
    <section aria-labelledby="cta-title" className="py-20 sm:py-28">
      <div className="container-x">
        <div data-reveal className="relative overflow-hidden rounded-[2.5rem] bg-teal-dark px-6 py-16 text-center text-white sm:px-12 sm:py-24">
          <div aria-hidden className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10" />
          <div aria-hidden className="absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-navy/30" />
          <h2 id="cta-title" className="h-section relative mx-auto max-w-3xl">{t("cta.title")}</h2>
          <p className="relative mx-auto mt-5 max-w-xl text-lg text-white/80">{t("cta.text")}</p>
          <div className="relative mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Link href={{ pathname: "/kontakt", hash: "wizyta" }} className="btn-light sm:!min-h-14 sm:!px-8">
              {t("actions.book")}
            </Link>
            {clinic.locations.map((l) => (
              <TrackedLink key={l.id} event="phone_click" source={`cta-${l.id}`} href={`tel:${l.phone}`} className="btn-outline-light sm:!min-h-14">
                <Phone className="h-4 w-4" aria-hidden /> {l.label} <span className="tabular-nums opacity-80">{formatPhone(l.phone)}</span>
              </TrackedLink>
            ))}
            {wa && (
              <TrackedLink event="whatsapp_click" source="cta" href={wa} target="_blank" rel="noopener noreferrer" aria-label={t("actions.whatsappAria")} className="btn-outline-light sm:!min-h-14">
                <WhatsAppIcon /> {t("actions.whatsappLong")}
              </TrackedLink>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Page intro (inner pages) ────────────────────────── */
export function PageIntro({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="relative overflow-hidden pb-14 pt-10 sm:pb-20 sm:pt-16">
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[30rem] w-[30rem] rounded-full bg-sage/70 blur-3xl" />
      <div className="container-x">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="h-display mt-5 max-w-4xl">{title}</h1>
        {intro && <p className="lead mt-6 max-w-2xl">{intro}</p>}
      </div>
    </section>
  );
}
