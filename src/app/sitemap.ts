import type { MetadataRoute } from "next";
import { site, withBase } from "@/config/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${site.url}${withBase("/")}`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
