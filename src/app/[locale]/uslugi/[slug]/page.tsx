import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, Phone } from "lucide-react";
import { routing, type Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { clinic, formatPhone, nfzLocationsFor, type ServiceId } from "@/content/clinic";
import { activeServices, isPreview } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { AppointmentCTA } from "@/components/Sections";
import { SERVICE_ICONS } from "@/components/ServiceIcon";
import { TrackedLink } from "@/components/TrackedLink";

type Params = { locale: Locale; slug: string };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => activeServices().map((slug) => ({ locale, slug })));
}
export const dynamicParams = false;

const isService = (s: string): s is ServiceId => activeServices().includes(s as ServiceId);

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  if (!isService(slug)) return {};
  const t = await getTranslations({ locale });
  const name = t(`services.items.${slug}.name`);
  return pageMetadata(locale, { pathname: "/uslugi/[slug]", params: { slug } }, "services", {
    title: t("meta.serviceTitle", { name }),
    description: `${t(`services.items.${slug}.long`)}`.slice(0, 158),
  });
}

/**
 * One page per service. The detailed clinical sections (what / when / visit / after) are shown
 * on production only once clinic.serviceContentReviewed is true; until then they render on
 * deploy previews with a visible "draft" note, and production shows the reviewed summary only.
 */
export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  if (!isService(slug)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations();
  const Icon = SERVICE_ICONS[slug];
  const name = t(`services.items.${slug}.name`);
  const nfzAt = nfzLocationsFor(slug);
  const showDetail = clinic.serviceContentReviewed || isPreview;
  const others = activeServices().filter((s) => s !== slug);
  const prices = clinic.prices.filter((p) => p.service === slug);
  const sections = ["what", "when", "visit", "after"] as const;

  return (
    <>
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: t("nav.home"), href: "/" },
          { name: t("nav.services"), href: "/uslugi" },
          { name, href: { pathname: "/uslugi/[slug]", params: { slug } } },
        ]}
      />
      <section className="pb-10 pt-6 sm:pt-10">
        <div className="container-x">
          <Link href="/uslugi" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-teal-dark hover:underline">
            <ArrowLeft className="h-4 w-4" aria-hidden /> {t("servicePage.back")}
          </Link>
          <div className="mt-4 flex items-start gap-4">
            <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-sage text-teal-dark sm:flex">
              <Icon className="h-7 w-7" aria-hidden />
            </span>
            <div>
              <h1 className="h-display">{name}</h1>
              <p className="lead mt-4 max-w-2xl">{t(`services.items.${slug}.long`)}</p>
            </div>
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href={{ pathname: "/kontakt", hash: "wizyta", query: { usluga: slug } }} className="btn-primary">
              {t("servicePage.book")}
            </Link>
            {clinic.locations.map((l) => (
              <TrackedLink key={l.id} event="phone_click" source={`service-${slug}-${l.id}`} href={`tel:${l.phone}`} className="btn-ghost">
                <Phone className="h-4 w-4" aria-hidden /> {l.label} <span className="tabular-nums">{formatPhone(l.phone)}</span>
              </TrackedLink>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container-x grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {showDetail ? (
              <>
                {!clinic.serviceContentReviewed && (
                  <p role="note" className="mb-6 rounded-xl bg-[#fff4d6] px-4 py-3 text-sm font-semibold text-[#6b4a00]">{t("servicePage.draft")}</p>
                )}
                <div className="space-y-8">
                  {sections.map((s) => (
                    <section key={s} aria-labelledby={`s-${s}`}>
                      <h2 id={`s-${s}`} className="text-2xl font-semibold">{t(`servicePage.${s}`)}</h2>
                      <p className="mt-3 max-w-[68ch] leading-relaxed text-navy-soft">{t(`serviceDetail.${slug}.${s}`)}</p>
                    </section>
                  ))}
                </div>
              </>
            ) : null}
          </div>

          <aside className="space-y-4 lg:col-span-4" aria-label={name}>
            <div className="card p-6">
              {nfzAt.length ? (
                <>
                  <span className="badge-nfz">{t("servicePage.nfz")}</span>
                  <p className="mt-3 text-[0.95rem] leading-relaxed">
                    {t("servicePage.nfzWhere", { places: nfzAt.map((l) => l.street).join(", ") })}
                  </p>
                  <p className="mt-3 text-[0.95rem] text-ink-muted">{t("servicePage.privateAlso")}</p>
                </>
              ) : (
                <p className="text-[0.95rem] leading-relaxed">{t("servicePage.privateOnly")}</p>
              )}
            </div>
            <div className="card p-6">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-muted">{t("servicePage.price")}</h2>
              {prices.length ? (
                <ul className="mt-3 divide-y divide-navy/[0.07]">
                  {prices.map((p) => (
                    <li key={p.name.pl} className="flex justify-between gap-4 py-2">
                      <span>{p.name[locale]}</span><span className="font-semibold tabular-nums">{p.price}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-[0.95rem] leading-relaxed text-navy-soft">{t("servicePage.pricePending")}</p>
              )}
            </div>
          </aside>
        </div>
      </section>

      <nav aria-labelledby="other-title" className="pb-8">
        <div className="container-x">
          <h2 id="other-title" className="text-xl font-semibold">{t("servicePage.other")}</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {others.map((s) => (
              <li key={s}>
                <Link href={{ pathname: "/uslugi/[slug]", params: { slug: s } }} className="inline-flex min-h-11 items-center rounded-full bg-white px-4 font-semibold ring-1 ring-navy/10 hover:ring-navy/30">
                  {t(`services.items.${s}.name`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <AppointmentCTA />
    </>
  );
}
