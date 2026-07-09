import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { services, certificates, homeStats } from "@/lib/placeholder-data";
import {
  Stethoscope,
  Scan,
  Gauge,
  LineChart,
  ShieldCheck,
  Wrench,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
} from "lucide-react";

const iconMap = {
  stethoscope: Stethoscope,
  scan: Scan,
  gauge: Gauge,
  lineChart: LineChart,
  shieldCheck: ShieldCheck,
  wrench: Wrench,
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: "fa" | "en" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const tServices = await getTranslations("services");
  const tCommon = await getTranslations("common");
  const ArrowIcon = locale === "fa" ? ArrowLeft : ArrowRight;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-secondary/60 to-background">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              {t("hero.eyebrow")}
            </Badge>
            <h1 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-5xl">
              {t("hero.title")}
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground text-balance">
              {t("hero.subtitle")}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className={cn(buttonVariants({ size: "lg" }), "gap-2")}
              >
                {t("hero.ctaPrimary")}
                <ArrowIcon className="size-4" />
              </Link>
              <Link
                href="/services"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                {t("hero.ctaSecondary")}
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
            {homeStats.map((stat) => (
              <div key={stat.key} className="text-center">
                <div className="font-heading text-3xl font-bold text-primary">
                  {locale === "fa" ? stat.value : stat.valueEn}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {t(`stats.${stat.key}` as "stats.accuracy")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-2xl font-bold sm:text-3xl">
            {t("servicesTitle")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("servicesSubtitle")}</p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = iconMap[service.iconKey];
            return (
              <Card
                key={service.slug.en}
                className="transition-shadow hover:shadow-md"
              >
                <CardHeader>
                  <div className="mb-2 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <CardTitle>{service.title[locale]}</CardTitle>
                  <CardDescription>
                    {service.shortDescription[locale]}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline">
                    {tServices(`categories.${service.category}`)}
                  </Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Certificates */}
      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">
              {t("certificatesTitle")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t("certificatesSubtitle")}
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {certificates.map((cert) => (
              <Card key={cert.issuer}>
                <CardHeader>
                  <div className="mb-2 flex size-11 items-center justify-center rounded-lg bg-brand-teal/15 text-brand-teal-foreground">
                    <BadgeCheck className="size-5" />
                  </div>
                  <CardTitle>{cert.title[locale]}</CardTitle>
                  <CardDescription>{cert.description[locale]}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/certificates"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              {tCommon("viewAll")}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-primary px-8 py-12 text-center text-primary-foreground sm:flex-row sm:text-start">
          <div>
            <h2 className="font-heading text-2xl font-bold">
              {t("ctaBannerTitle")}
            </h2>
            <p className="mt-2 text-primary-foreground/80">
              {t("ctaBannerSubtitle")}
            </p>
          </div>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "secondary", size: "lg" }),
              "shrink-0"
            )}
          >
            {tCommon("getInTouch")}
          </Link>
        </div>
      </section>
    </>
  );
}
