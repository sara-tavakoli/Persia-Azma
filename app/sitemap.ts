import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getServices, getBlogPosts } from "@/lib/data";
import { routing } from "@/i18n/routing";

const staticPaths = [
  "",
  "/about",
  "/services",
  "/certificates",
  "/blog",
  "/faq",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${siteConfig.url}/${locale}${path}`,
      });
    }
  }

  const services = await getServices();
  for (const locale of routing.locales) {
    for (const service of services) {
      entries.push({
        url: `${siteConfig.url}/${locale}/services/${service.slug[locale]}`,
        lastModified: new Date(service.updatedAt),
      });
    }
  }

  for (const locale of routing.locales) {
    const posts = await getBlogPosts(locale);
    for (const post of posts) {
      entries.push({
        url: `${siteConfig.url}/${locale}/blog/${post.slug[locale]}`,
        lastModified: new Date(post.updatedAt),
      });
    }
  }

  return entries;
}
