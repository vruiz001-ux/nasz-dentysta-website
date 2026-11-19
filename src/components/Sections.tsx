import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight, History, FlaskConical, MapPinned, Languages, Phone, CalendarCheck, Smile, Check, Plus, Users } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { clinic, whatsappLink, formatPhone, nfzLocationsFor, type ServiceId } from "@/content/clinic";
import { activeServices } from "@/lib/site";
import { SectionHeading } from "./SectionHeading";
import { SERVICE_ICONS } from "./ServiceIcon";
import { TrackedLink } from "./TrackedLink";
import { WhatsAppIcon } from "./icons";

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
    <section aria-labelledby="why-title" className="py-16 sm:py-24">
      <div className="container-x">
        <SectionHeading id="why-title" eyebrow={t("eyebrow")} title={t("title")} />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ key, icon: Icon }) => (
            <li key={key} className="card group p-7 transition-shadow duration-500 hover:shadow-xl hover:shadow-navy/[0.06]">
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
    <div className="mt-6 flex flex-col gap-6 rounded-[var(--radius-card)] bg-white p-7 ring-1 ring-navy/[0.06] sm:flex-row sm:items-center sm:justify-between sm:p-8">
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
export async function ServiceCard({ id, detailed = false }: { id: ServiceId; index?: number; detailed?: boolean }) {
  const t = await getTranslations("services");
  const Icon = SERVICE_ICONS[id];
  const nfz = nfzLocationsFor(id).length > 0;
  const page = { pathname: "/uslugi/[slug]" as const, params: { slug: id } };
  const H = detailed ? "h2" : "h3";
  return (
    <article
      id={detailed ? id : undefined}
      className="card group relative flex h-full scroll-mt-28 flex-col p-6 transition-shadow duration-200 hover:shadow-lg hover:shadow-navy/[0.06] sm:p-7"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sage text-teal-dark">
          <Icon className="h-6 w-6" aria-hidden />
        </span>
        {nfz && <span className="badge-nfz">{t("nfzBadge")}</span>}
      </div>
      <H className="mt-5 text-xl font-semibold sm:text-[1.35rem]">{t(`items.${id}.name`)}</H>
      <p className="mt-2 flex-1 leading-relaxed text-ink-muted">
        {detailed ? t(`items.${id}.long`) : t(`items.${id}.short`)}
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
        {detailed ? (
          <>
            <Link href={{ pathname: "/kontakt", hash: "wizyta", query: { usluga: id } }} className="btn-primary !min-h-11 !px-5 !text-sm">
              {t("bookThis")}
            </Link>
            <Link href={page} className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-teal-dark hover:underline">
              {t("details")}<span className="sr-only">: {t(`items.${id}.name`)}</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </>
        ) : (
          <Link href={page} className="inline-flex items-center gap-1.5 font-semibold text-teal-dark after:absolute after:inset-0 after:content-['']">
            {(await getTranslations("actions"))("learnMore")}
            <span className="sr-only">: {t(`items.${id}.name`)}</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden />
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
    <section aria-labelledby={withHeading ? "services-title" : undefined} className={detailed ? "pb-24" : "bg-sand/50 py-16 sm:py-24"}>
      <div className="container-x">
        {withHeading && (
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading id="services-title" eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
            {services.length > 0 && !detailed && (
              <Link href="/uslugi" className="btn-ghost shrink-0">
                {(await getTranslations("actions"))("exploreServices")}
              </Link>
            )}
          </div>
        )}
        {services.length ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
  const values = ["individual", "comfort", "quality"] as const;

  return (
    <section aria-labelledby="about-title" className={full ? "pb-16 sm:pb-24" : "py-16 sm:py-24"}>
      <div className="container-x grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
        <div className={full ? "sr-only" : "lg:col-span-5"}>
          <SectionHeading id="about-title" eyebrow={t("eyebrow")} title={t("title")} />
          {!full && (
            <Link href="/o-nas" className="btn-ghost mt-10 hidden lg:inline-flex">
              {t("meetTeam")} <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          )}
        </div>
        <div className={full ? "lg:col-span-12 max-w-3xl" : "lg:col-span-7"}>
          <div className="space-y-5 text-lg leading-relaxed text-navy-soft">
            <p>{t("text1")}</p>
            <p>{t("text2")}</p>
          </div>
          <ul className="mt-8 flex flex-wrap gap-3">
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
        <div className="container-x mt-16">
          <TeamStatement />
        </div>
      )}
    </section>
  );
}

/** Team statement shown instead of individual names (owner's request, Nov 2026). */
export async function TeamStatement() {
  const t = await getTranslations("teamPreview");
  return (
    <div className="card flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:p-8">
      <span aria-hidden className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-sage text-teal-dark">
        <Users className="h-7 w-7" />
      </span>
      <p className="text-lg leading-relaxed text-navy sm:text-xl">{t("text")}</p>
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
    <section aria-labelledby="faq-title" className="pb-16 sm:pb-24">
      <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-12">
        <h2 id="faq-title" className="h-section lg:col-span-4">{t("title")}</h2>
        <div className="divide-y divide-navy/10 border-y border-navy/10 lg:col-span-8">
          {keys.map((k) => (
            <details key={k} className="group py-2">
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
          {steps.map(({ n, icon: Icon }) => (
            <li key={n} className="relative text-center">
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
        <div className="relative overflow-hidden rounded-[var(--radius-card)] bg-teal-dark px-6 py-16 text-center text-white sm:px-12 sm:py-24">
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

/* ── Doctors preview on the home page ────────────────── */
export async function TeamPreview() {
  const t = await getTranslations("teamPreview");
  return (
    <section aria-labelledby="team-title" className="py-16 sm:py-24">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading id="team-title" eyebrow={t("eyebrow")} title={t("title")} />
          <Link href="/zespol" className="btn-ghost shrink-0">
            {t("all")} <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <div className="mt-10"><TeamStatement /></div>
      </div>
    </section>
  );
}
