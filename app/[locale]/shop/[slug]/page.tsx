import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getProductBySlug, getProducts, getSiteSettings } from "@/lib/data";
import { formatPrice } from "@/lib/product-format";
import { routing } from "@/i18n/routing";
import { FadeIn } from "@/components/fade-in";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductGallery } from "@/components/product-gallery";
import { WhatsappIcon } from "@/components/whatsapp-icon";
import { alternatesForSlugs } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { Package, Phone, Send } from "lucide-react";

export async function generateStaticParams() {
  const products = await getProducts();
  return routing.locales.flatMap((locale) =>
    products.map((product) => ({ locale, slug: product.slug[locale] }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "fa" | "en"; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getProductBySlug(locale, slug);
  if (!product) notFound();
  return {
    title: product.title[locale],
    description: product.shortDescription[locale],
    alternates: alternatesForSlugs(
      `/fa/shop/${product.slug.fa}`,
      `/en/shop/${product.slug.en}`,
      locale
    ),
    openGraph: {
      title: product.title[locale],
      description: product.shortDescription[locale],
      images: product.images[0] ? [{ url: product.images[0].url }] : undefined,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: "fa" | "en"; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = await getProductBySlug(locale, slug);
  if (!product) notFound();

  const t = await getTranslations("shop");
  const tNav = await getTranslations("nav");
  const settings = await getSiteSettings();

  const title = product.title[locale];
  const price = formatPrice(product.price, locale);
  const productUrl = `${siteConfig.url}/${locale}/shop/${product.slug[locale]}`;
  const whatsappText = `${t("whatsappMessage", { title })}\n${productUrl}`;

  const allProducts = await getProducts();
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  const specs = [
    { label: t("category"), value: t(`categories.${product.category}`) },
    product.brand && { label: t("brand"), value: product.brand, ltr: true },
    product.model && { label: t("model"), value: product.model, ltr: true },
    { label: t("condition"), value: t(`conditions.${product.condition}`) },
    { label: t("availability"), value: product.inStock ? t("inStock") : t("outOfStock") },
  ].filter(Boolean) as { label: string; value: string; ltr?: boolean }[];

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: title,
    description: product.shortDescription[locale],
    image: product.images.map((img) => img.url),
    url: productUrl,
    ...(product.brand && { brand: { "@type": "Brand", name: product.brand } }),
    ...(product.model && { model: product.model }),
    offers: {
      "@type": "Offer",
      priceCurrency: "IRR",
      // schema.org expects the ISO currency; 1 Toman = 10 Rial.
      ...(product.price !== null && { price: product.price * 10 }),
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition:
        product.condition === "new"
          ? "https://schema.org/NewCondition"
          : "https://schema.org/UsedCondition",
      seller: { "@type": "Organization", name: siteConfig.name },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Breadcrumbs
        locale={locale}
        items={[
          { label: tNav("home"), href: "/" },
          { label: tNav("shop"), href: "/shop" },
          { label: title },
        ]}
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <FadeIn>
            <ProductGallery images={product.images} alt={title} />
          </FadeIn>

          <FadeIn delay={0.1} className="flex flex-col gap-6">
            <div>
              <Badge variant="outline" className="mb-3">
                {t(`categories.${product.category}`)}
              </Badge>
              <h1 className="font-heading text-3xl font-bold tracking-tight">{title}</h1>
              <p className="mt-3 text-muted-foreground">{product.shortDescription[locale]}</p>
            </div>

            <div className="rounded-xl bg-muted/50 p-5">
              <p className="text-sm text-muted-foreground">{t("price")}</p>
              <p className="mt-1 font-heading text-2xl font-bold text-primary">
                {price ? `${price} ${t("currency")}` : t("callForPrice")}
              </p>
            </div>

            <dl className="divide-y divide-border rounded-xl border border-border">
              {specs.map((spec) => (
                <div key={spec.label} className="flex justify-between gap-4 px-4 py-3 text-sm">
                  <dt className="text-muted-foreground">{spec.label}</dt>
                  <dd className="font-medium" dir={spec.ltr ? "ltr" : undefined}>
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-col gap-3">
              <h2 className="font-heading text-lg font-semibold">{t("buyTitle")}</h2>
              <p className="text-sm text-muted-foreground">{t("buySubtitle")}</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(whatsappText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-[#25D366]/10 px-4 py-2 text-sm font-medium text-[#128C7E] transition-transform hover:scale-105 hover:bg-[#25D366]/20"
                >
                  <WhatsappIcon className="size-5" />
                  {t("buyWhatsapp")}
                </a>
                <Link
                  href={{ pathname: "/contact", query: { product: product.slug[locale] } }}
                  className={cn(buttonVariants({ variant: "default" }))}
                >
                  <Send className="size-4" />
                  {t("buyForm")}
                </Link>
                {settings.phones[0] && (
                  <a
                    href={`tel:${settings.phones[0].replace(/-/g, "")}`}
                    className={cn(buttonVariants({ variant: "outline" }))}
                  >
                    <Phone className="size-4" />
                    <span dir="ltr">{settings.phones[0]}</span>
                  </a>
                )}
              </div>
            </div>
          </FadeIn>
        </div>

        {product.body[locale] && (
          <article className="prose prose-neutral dark:prose-invert mt-14 max-w-3xl marker:text-primary prose-headings:font-heading prose-headings:text-foreground prose-a:font-medium prose-a:text-primary prose-strong:text-foreground prose-blockquote:border-primary prose-blockquote:not-italic prose-hr:border-border">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{product.body[locale]}</ReactMarkdown>
          </article>
        )}

        {relatedProducts.length > 0 && (
          <div className="mt-14">
            <h2 className="font-heading text-xl font-semibold">{t("relatedProducts")}</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {relatedProducts.map((related) => (
                <li key={related.id}>
                  <Link
                    href={`/shop/${related.slug[locale]}`}
                    className="group flex h-full items-center gap-3 rounded-xl border border-border p-3 transition-colors hover:border-primary/40 hover:bg-muted/40"
                  >
                    <div className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white text-muted-foreground ring-1 ring-border">
                      {related.images[0] ? (
                        <Image
                          src={related.images[0].url}
                          alt={related.title[locale]}
                          fill
                          sizes="56px"
                          className="object-contain"
                        />
                      ) : (
                        <Package className="size-5" />
                      )}
                    </div>
                    <span className="font-medium group-hover:text-primary">
                      {related.title[locale]}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </>
  );
}
