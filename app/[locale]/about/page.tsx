import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { FadeIn } from "@/components/fade-in";
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

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeIn>
            <p className="text-lg leading-8 text-muted-foreground">
              {t("introBody")}
            </p>
          </FadeIn>
          <FadeIn delay={0.1} className="relative">
            <div className="relative aspect-4/3 overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5">
              <Image
                src="/images/hero-lab.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
          </FadeIn>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          <FadeIn>
            <div className="mb-3 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Target className="size-5" />
            </div>
            <h2 className="font-heading text-xl font-semibold">
              {t("missionTitle")}
            </h2>
            <p className="mt-2 leading-7 text-muted-foreground">
              {t("missionBody")}
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
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
          </FadeIn>
        </div>

        <FadeIn className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            "/images/imaging-hospital.jpg",
            "/images/medical-equipment.jpg",
            "/images/industrial-gauge2.jpg",
            "/images/consulting-meeting.jpg",
          ].map((src) => (
            <div
              key={src}
              className="relative aspect-square overflow-hidden rounded-2xl ring-1 ring-black/5"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(min-width: 640px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </FadeIn>
      </section>
    </>
  );
}
