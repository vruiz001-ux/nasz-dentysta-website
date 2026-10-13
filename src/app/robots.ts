import type { MetadataRoute } from "next";
import { clinic } from "@/content/clinic";
import { noIndex } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  if (noIndex) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${clinic.siteUrl}/sitemap.xml`,
  };
}
