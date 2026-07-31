import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/fade-in";
import { siteConfig } from "@/lib/site-config";
import { routing } from "@/i18n/routing";
import { alternatesForPath } from "@/lib/seo";
import { Target, Eye, Award, MapPin, Building2, FlaskConical, Factory, Scan } from "lucide-react";
import { ExpertiseGrid } from "@/components/expertise-grid";

const capabilityIcons = [Building2, FlaskConical, Factory, Scan];

const galleryImages = [
  "ventilator-monitor-check",
  "defibrillator-calibration",
  "infusion-pump-calibration",
  "syringe-pump-calibration",
  "multimeter-calibration",
  "precision-balance-calibration",
  "ph-meter-calibration",
  "spectrophotometer-calibration",
  "centrifuge-calibration",
  "xray-equipment-qc",
  "ultrasound-qc",
];

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
  const tQuantities = await getTranslations("quantities");

  const capabilities = [
    t("capability1"),
    t("capability2"),
    t("capability3"),
    t("capability4"),
  ];

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
                src="/images/work/pipette-calibration.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
          </FadeIn>
        </div>

        <FadeInStagger className="mt-16 grid gap-6 sm:grid-cols-2">
          <FadeInStaggerItem>
            <div className="group h-full rounded-2xl border border-border/60 p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-3 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-110">
                <Target className="size-5" />
              </div>
              <h2 className="font-heading text-xl font-semibold">
                {t("missionTitle")}
              </h2>
              <p className="mt-2 leading-7 text-muted-foreground">
                {t("missionBody")}
              </p>
            </div>
          </FadeInStaggerItem>

          <FadeInStaggerItem>
            <div className="group h-full rounded-2xl border border-border/60 p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-3 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-110">
                <Eye className="size-5" />
              </div>
              <h2 className="font-heading text-xl font-semibold">
                {t("visionTitle")}
              </h2>
              <p className="mt-2 leading-7 text-muted-foreground">
                {t("visionBody")}
              </p>
            </div>
          </FadeInStaggerItem>

          <FadeInStaggerItem>
            <div className="group h-full rounded-2xl border border-border/60 p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-3 flex size-11 items-center justify-center rounded-lg bg-brand-teal/15 text-brand-teal-foreground transition-transform group-hover:scale-110">
                <Award className="size-5" />
              </div>
              <h2 className="font-heading text-xl font-semibold">
                {t("qmsTitle")}
              </h2>
              <p className="mt-2 leading-7 text-muted-foreground">
                {t("qmsBody")}
              </p>
            </div>
          </FadeInStaggerItem>

          <FadeInStaggerItem>
            <div className="group h-full rounded-2xl border border-border/60 p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-3 flex size-11 items-center justify-center rounded-lg bg-brand-teal/15 text-brand-teal-foreground transition-transform group-hover:scale-110">
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
          </FadeInStaggerItem>
        </FadeInStagger>
      </section>

      {/* Parameters we calibrate */}
      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">
              {t("parametersTitle")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t("parametersSubtitle")}
            </p>
          </FadeIn>

          <div className="mt-10">
            <ExpertiseGrid getLabel={(key) => tQuantities(key as "pressure")} />
          </div>
        </div>
      </section>

      {/* Who we serve */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-2xl font-bold sm:text-3xl">
            {t("capabilitiesTitle")}
          </h2>
        </FadeIn>

        <FadeInStagger className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-4">
          {capabilities.map((label, i) => {
            const Icon = capabilityIcons[i];
            return (
              <FadeInStaggerItem key={label}>
                <div className="group flex flex-col items-center gap-3 text-center">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-brand-teal/15 text-brand-teal-foreground transition-transform group-hover:scale-110">
                    <Icon className="size-6" />
                  </div>
                  <span className="text-sm font-medium">{label}</span>
                </div>
              </FadeInStaggerItem>
            );
          })}
        </FadeInStagger>
      </section>

      {/* Real work gallery */}
      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">
              {t("galleryTitle")}
            </h2>
            <p className="mt-3 text-muted-foreground">{t("gallerySubtitle")}</p>
          </FadeIn>

          <FadeInStagger className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {galleryImages.map((name) => (
              <FadeInStaggerItem key={name} className="group">
                <div className="relative aspect-4/3 overflow-hidden rounded-xl shadow-sm ring-1 ring-black/5">
                  <Image
                    src={`/images/work/${name}.jpg`}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 280px, (min-width: 640px) 33vw, 50vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </FadeInStaggerItem>
            ))}
          </FadeInStagger>
        </div>
      </section>
    </>
  );
}
