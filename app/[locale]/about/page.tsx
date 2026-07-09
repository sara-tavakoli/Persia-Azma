import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { siteConfig } from "@/lib/site-config";
import { routing } from "@/i18n/routing";
import { alternatesForPath } from "@/lib/seo";
import { Target, MapPin } from "lucide-react";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "fa" | "en" }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: alternatesForPath("/about"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: "fa" | "en" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("about");

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-lg leading-8 text-muted-foreground">
          {t("introBody")}
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          <div>
            <div className="mb-3 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Target className="size-5" />
            </div>
            <h2 className="font-heading text-xl font-semibold">
              {t("missionTitle")}
            </h2>
            <p className="mt-2 leading-7 text-muted-foreground">
              {t("missionBody")}
            </p>
          </div>

          <div>
            <div className="mb-3 flex size-11 items-center justify-center rounded-lg bg-brand-teal/15 text-brand-teal-foreground">
              <MapPin className="size-5" />
            </div>
            <h2 className="font-heading text-xl font-semibold">
              {t("locationTitle")}
            </h2>
            <p className="mt-2 leading-7 text-muted-foreground">
              {t("locationBody")}
            </p>
            <p className="mt-2 text-sm text-muted-foreground" dir="ltr">
              {siteConfig.addressEn}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
