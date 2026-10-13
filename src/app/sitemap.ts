import type { MetadataRoute } from "next";
import { routing, type AppPath } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/seo";

const PAGES: AppPath[] = ["/", "/o-nas", "/uslugi", "/cennik", "/kontakt", "/polityka-prywatnosci"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap((href) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(locale, href),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: href === "/" ? 1 : href === "/polityka-prywatnosci" ? 0.2 : 0.8,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, absoluteUrl(l, href)])),
      },
    })),
  );
}
