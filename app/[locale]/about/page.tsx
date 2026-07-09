import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/fade-in";
import { siteConfig } from "@/lib/site-config";
import { routing } from "@/i18n/routing";
import { alternatesForPath } from "@/lib/seo";
import {
  Target,
  MapPin,
  Thermometer,
  Droplets,
  Beaker,
  Weight,
  Wind,
  Building2,
  FlaskConical,
  Factory,
  Scan,
} from "lucide-react";

const parameterIcons = [Thermometer, Droplets, Beaker, Weight, Wind];
const capabilityIcons = [Building2, FlaskConical, Factory, Scan];

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

  const parameters = [
    t("parameterTemperature"),
    t("parameterHumidity"),
    t("parameterVolume"),
    t("parameterMass"),
    t("parameterFlow"),
  ];

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
                src="/images/pipette-closeup.jpg"
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

          <FadeInStagger className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-5">
            {parameters.map((label, i) => {
              const Icon = parameterIcons[i];
              return (
                <FadeInStaggerItem key={label}>
                  <div className="flex flex-col items-center gap-3 rounded-2xl border border-border/60 bg-background p-6 text-center shadow-sm">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-6" />
                    </div>
                    <span className="text-sm font-medium">{label}</span>
                  </div>
                </FadeInStaggerItem>
              );
            })}
          </FadeInStagger>
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
                <div className="flex flex-col items-center gap-3 text-center">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-brand-teal/15 text-brand-teal-foreground">
                    <Icon className="size-6" />
                  </div>
                  <span className="text-sm font-medium">{label}</span>
                </div>
              </FadeInStaggerItem>
            );
          })}
        </FadeInStagger>
      </section>
    </>
  );
}
