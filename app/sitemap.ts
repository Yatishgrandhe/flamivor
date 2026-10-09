import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { resources } from "@/lib/resources";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/about",
    "/team",
    "/join",
    "/resources",
    "/privacy",
    ...resources.map((r) => `/resources/${r.slug}`),
  ].map((path) => ({ url: `${site.url}${path}` }));
}
