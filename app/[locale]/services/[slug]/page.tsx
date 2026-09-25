import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "@/i18n/navigation";
import { ServiceIcon } from "@/components/service-icon";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getServiceBySlug, getServices, getSiteSettings } from "@/lib/data";
import { routing } from "@/i18n/routing";
import { categoryColorClasses } from "@/lib/category-colors";
import { FadeIn } from "@/components/fade-in";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { alternatesForSlugs } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { getServiceImage } from "@/lib/service-images";
import Image from "next/image";

export async function generateStaticParams() {
  const services = await getServices();
  return routing.locales.flatMap((locale) =>
    services.map((service) => ({ locale, slug: service.slug[locale] }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "fa" | "en"; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = await getServiceBySlug(locale, slug);
  if (!service) notFound();
  return {
    title: service.title[locale],
    description: service.shortDescription[locale],
    alternates: alternatesForSlugs(
      `/fa/services/${service.slug.fa}`,
      `/en/services/${service.slug.en}`,
      locale
    ),
    openGraph: {
      title: service.title[locale],
      description: service.shortDescription[locale],
      images: [{ url: `${siteConfig.url}${getServiceImage(service.id)}` }],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: "fa" | "en"; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const service = await getServiceBySlug(locale, slug);
  if (!service) notFound();

  const t = await getTranslations("services");
  const tCommon = await getTranslations("common");
  const tNav = await getTranslations("nav");
  const palette = categoryColorClasses[service.category];

  const allServices = await getServices();
  const relatedServices = allServices
    .filter((s) => s.id !== service.id && s.category === service.category)
    .slice(0, 3);

  const settings = await getSiteSettings();

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title[locale],
    description: service.shortDescription[locale],
    image: `${siteConfig.url}${getServiceImage(service.id)}`,
    url: `${siteConfig.url}/${locale}/services/${slug}`,
    serviceType: t(`categories.${service.category}`),
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      alternateName: siteConfig.nameFa,
      url: siteConfig.url,
      telephone: settings.phones[0],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Shiraz",
        addressRegion: "Fars",
        addressCountry: "IR",
        streetAddress: settings.addressEn,
      },
    },
    areaServed: {
      "@type": "Country",
      name: "Iran",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Breadcrumbs
        locale={locale}
        items={[
          { label: tNav("home"), href: "/" },
          { label: tNav("services"), href: "/services" },
          { label: service.title[locale] },
        ]}
      />
      <section className="bg-noise relative overflow-hidden border-b border-border bg-muted/40">
        <FadeIn className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <div
            className={cn(
              "mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl ring-1",
              palette.bg,
              palette.text,
              palette.ring
            )}
          >
            <ServiceIcon iconKey={service.iconKey} className="size-6" />
          </div>
          <Badge variant="outline" className={cn(palette.text, "mb-3 border-current/25")}>
            {t(`categories.${service.category}`)}
          </Badge>
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {service.title[locale]}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground text-balance">
            {service.shortDescription[locale]}
          </p>
        </FadeIn>
      </section>

      <div className="mx-auto max-w-3xl px-4 pt-12 sm:px-6">
        <div className="relative aspect-21/9 overflow-hidden rounded-3xl shadow-lg ring-1 ring-black/5">
          <Image
            src={getServiceImage(service.id)}
            alt={service.title[locale]}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <article className="prose prose-neutral dark:prose-invert max-w-none marker:text-primary prose-headings:font-heading prose-headings:text-foreground prose-a:font-medium prose-a:text-primary prose-strong:text-foreground prose-blockquote:border-primary prose-blockquote:not-italic prose-hr:border-border">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {service.body[locale]}
          </ReactMarkdown>
        </article>

        {relatedServices.length > 0 && (
          <div className="mt-12">
            <h2 className="font-heading text-xl font-semibold">
              {t("relatedServices")}
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {relatedServices.map((related) => {
                const relatedPalette = categoryColorClasses[related.category];
                return (
                  <li key={related.id}>
                    <Link
                      href={`/services/${related.slug[locale]}`}
                      className="group flex h-full flex-col gap-2 rounded-xl border border-border p-4 transition-colors hover:border-primary/40 hover:bg-muted/40"
                    >
                      <div
                        className={cn(
                          "flex size-9 items-center justify-center rounded-lg ring-1",
                          relatedPalette.bg,
                          relatedPalette.text,
                          relatedPalette.ring
                        )}
                      >
                        <ServiceIcon iconKey={related.iconKey} className="size-4" />
                      </div>
                      <span className="font-medium group-hover:text-primary">
                        {related.title[locale]}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl bg-muted/50 p-8 text-center">
          <h2 className="font-heading text-xl font-semibold">
            {t("ctaTitle")}
          </h2>
          <Link
            href={{
              pathname: "/contact",
              query: { service: service.slug[locale] },
            }}
            className={cn(buttonVariants({ size: "lg" }))}
          >
            {tCommon("sendRequest")}
          </Link>
        </div>
      </section>
    </>
  );
}
