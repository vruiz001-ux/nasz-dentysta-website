import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { absoluteUrl, type Href } from "@/lib/seo";
import { activeServices } from "@/lib/site";
import { clinic } from "@/content/clinic";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { href: Href; priority: number }[] = [
    { href: "/", priority: 1 },
    { href: "/uslugi", priority: 0.9 },
    ...activeServices().map((slug) => ({ href: { pathname: "/uslugi/[slug]", params: { slug } } as Href, priority: 0.8 })),
    { href: "/zespol", priority: 0.7 },
    ...(clinic.prices.length ? [{ href: "/cennik" as Href, priority: 0.7 }] : []),
    { href: "/o-nas", priority: 0.6 },
    { href: "/kontakt", priority: 0.9 },
    { href: "/polityka-prywatnosci", priority: 0.2 },
  ];
  return pages.flatMap(({ href, priority }) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(locale, href),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority,
      alternates: { languages: Object.fromEntries(routing.locales.map((l) => [l, absoluteUrl(l, href)])) },
    })),
  );
}
