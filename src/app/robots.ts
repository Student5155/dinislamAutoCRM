import type { MetadataRoute } from "next";
import { site, withBase } from "@/config/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}${withBase("/sitemap.xml")}`,
    host: site.url,
  };
}
