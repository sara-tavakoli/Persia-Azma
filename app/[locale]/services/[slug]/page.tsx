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
import { getServiceBySlug, getServices } from "@/lib/data";
import { routing } from "@/i18n/routing";
import { categoryColorClasses } from "@/lib/category-colors";
import { FadeIn } from "@/components/fade-in";
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
  if (!service) return {};
  return {
    title: service.title[locale],
    description: service.shortDescription[locale],
    alternates: alternatesForSlugs(
      `/fa/services/${service.slug.fa}`,
      `/en/services/${service.slug.en}`
    ),
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

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: tNav("home"),
        item: `${siteConfig.url}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: tNav("services"),
        item: `${siteConfig.url}/${locale}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title[locale],
        item: `${siteConfig.url}/${locale}/services/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <section className="bg-mesh bg-noise relative overflow-hidden border-b border-border bg-background">
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
            alt=""
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-primary">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {service.body[locale]}
          </ReactMarkdown>
        </article>

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
