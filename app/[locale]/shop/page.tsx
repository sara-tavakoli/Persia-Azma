import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ShopGrid } from "@/components/shop-grid";
import { getProducts } from "@/lib/data";
import { formatPrice } from "@/lib/product-format";
import { routing } from "@/i18n/routing";
import { alternatesForPath } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "fa" | "en" }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "shop" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: alternatesForPath("/shop", locale),
    openGraph: {
      title: t("title"),
      description: t("subtitle"),
      images: [{ url: `${siteConfig.url}/images/industrial-gauge2.jpg` }],
    },
  };
}

export default async function ShopPage({
  params,
}: {
  params: Promise<{ locale: "fa" | "en" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("shop");
  const tNav = await getTranslations("nav");
  const products = await getProducts();

  const items = products.map((p) => {
    const price = formatPrice(p.price, locale);
    return {
      id: p.id,
      slug: p.slug[locale],
      title: p.title[locale],
      shortDescription: p.shortDescription[locale],
      category: p.category,
      imageUrl: p.images[0]?.url,
      priceLabel: price ? `${price} ${t("currency")}` : t("callForPrice"),
      inStock: p.inStock,
    };
  });

  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[{ label: tNav("home"), href: "/" }, { label: tNav("shop") }]}
      />
      <PageHero
        title={t("title")}
        subtitle={t("subtitle")}
        image="/images/industrial-gauge2.jpg"
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {items.length === 0 ? (
          <p className="text-center text-muted-foreground">{t("empty")}</p>
        ) : (
          <ShopGrid
            products={items}
            categoryLabels={{
              calibrator: t("categories.calibrator"),
              equipment: t("categories.equipment"),
              accessory: t("categories.accessory"),
            }}
            allLabel={t("all")}
            outOfStockLabel={t("outOfStock")}
          />
        )}
      </section>
    </>
  );
}
