import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { AppointmentCTA, PageIntro } from "@/components/Sections";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Link } from "@/i18n/navigation";
import { clinic } from "@/content/clinic";
import { activeServices } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  return pageMetadata((await params).locale, "/cennik", "pricing");
}

export default async function Pricing({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const groups = activeServices()
    .map((id) => ({ id, items: clinic.prices.filter((p) => p.service === id) }))
    .filter((g) => g.items.length);

  return (
    <>
      <BreadcrumbJsonLd locale={locale} items={[{ name: t("nav.home"), href: "/" }, { name: t("nav.pricing"), href: "/cennik" }]} />
      <PageIntro eyebrow={t("pricing.eyebrow")} title={t("pricing.title")} intro={t("pricing.intro")} />
      <section className="pb-12">
        <div className="container-x">
          {groups.length ? (
            <div className="grid gap-6 lg:grid-cols-2">
              {groups.map((g) => (
                <section key={g.id} data-reveal aria-labelledby={`p-${g.id}`} className="card p-7 sm:p-8">
                  <h2 id={`p-${g.id}`} className="text-xl font-semibold sm:text-2xl">{t(`services.items.${g.id}.name`)}</h2>
                  <table className="mt-5 w-full">
                    <thead className="sr-only">
                      <tr><th scope="col">{t("pricing.service")}</th><th scope="col">{t("pricing.price")}</th></tr>
                    </thead>
                    <tbody className="divide-y divide-navy/[0.07]">
                      {g.items.map((p) => (
                        <tr key={p.name.pl}>
                          <th scope="row" className="py-3.5 pr-4 text-left font-medium text-navy-soft">{p.name[locale]}</th>
                          <td className="whitespace-nowrap py-3.5 text-right font-semibold tabular-nums">{p.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Link href={{ pathname: "/kontakt", hash: "wizyta", query: { usluga: g.id } }} className="mt-6 inline-flex font-semibold text-teal-dark hover:underline">
                    {t("actions.book")} →
                  </Link>
                </section>
              ))}
            </div>
          ) : (
            <p className="card p-8 text-lg text-ink-muted">{t("pricing.empty")}</p>
          )}
        </div>
      </section>
      <AppointmentCTA />
    </>
  );
}
