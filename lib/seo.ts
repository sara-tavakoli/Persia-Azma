import { siteConfig } from "@/lib/site-config";

/**
 * hreflang alternates for a static path that's identical across locales
 * (e.g. "/about", "" for home). For pages with locale-specific slugs
 * (service/blog detail), build the languages map manually instead.
 */
export function alternatesForPath(path: string) {
  return {
    languages: {
      fa: `${siteConfig.url}/fa${path}`,
      en: `${siteConfig.url}/en${path}`,
    },
  };
}

export function alternatesForSlugs(faPath: string, enPath: string) {
  return {
    languages: {
      fa: `${siteConfig.url}${faPath}`,
      en: `${siteConfig.url}${enPath}`,
    },
  };
}
