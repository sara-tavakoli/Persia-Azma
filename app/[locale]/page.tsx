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
import { getServices, getCertificates } from "@/lib/data";
import { homeStats } from "@/lib/placeholder-data";
import { ServiceIcon } from "@/components/service-icon";
import { categoryColorClasses } from "@/lib/category-colors";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/fade-in";
import { ArrowLeft, ArrowRight, BadgeCheck } from "lucide-react";

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

  const [services, certificates] = await Promise.all([
    getServices(),
    getCertificates(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="bg-mesh bg-noise relative overflow-hidden border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <Badge
              variant="secondary"
              className="mb-4 border border-primary/15 bg-primary/10 text-primary"
            >
              {t("hero.eyebrow")}
            </Badge>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-balance sm:text-6xl">
              <span className="bg-gradient-to-br from-primary via-primary to-cat-imaging bg-clip-text text-transparent">
                {t("hero.title")}
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground text-balance">
              {t("hero.subtitle")}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className={cn(buttonVariants({ size: "lg" }), "gap-2 shadow-lg shadow-primary/20")}
              >
                {t("hero.ctaPrimary")}
                <ArrowIcon className="size-4" />
              </Link>
              <Link
                href="/services"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "bg-background/80 backdrop-blur-sm")}
              >
                {t("hero.ctaSecondary")}
              </Link>
            </div>
          </FadeIn>

          {/* Stats */}
          <FadeInStagger className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            {homeStats.map((stat, i) => {
              const palette = [
                categoryColorClasses.medical,
                categoryColorClasses.imaging,
                categoryColorClasses.industrial,
                categoryColorClasses.consulting,
              ][i % 4];
              return (
                <FadeInStaggerItem key={stat.key}>
                  <div
                    className={cn(
                      "rounded-2xl border border-border/60 bg-background/70 p-5 text-center shadow-sm backdrop-blur-sm ring-1",
                      palette.ring
                    )}
                  >
                    <div className={cn("font-heading text-3xl font-bold", palette.text)}>
                      {locale === "fa" ? stat.value : stat.valueEn}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {t(`stats.${stat.key}` as "stats.accuracy")}
                    </div>
                  </div>
                </FadeInStaggerItem>
              );
            })}
          </FadeInStagger>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-2xl font-bold sm:text-3xl">
            {t("servicesTitle")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("servicesSubtitle")}</p>
        </FadeIn>

        <FadeInStagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const palette = categoryColorClasses[service.category];
            return (
              <FadeInStaggerItem key={service.id}>
                <Link href={`/services/${service.slug[locale]}`} className="block h-full">
                  <Card className="h-full transition-all hover:-translate-y-1 hover:shadow-lg">
                    <CardHeader>
                      <div
                        className={cn(
                          "mb-2 flex size-11 items-center justify-center rounded-xl ring-1",
                          palette.bg,
                          palette.text,
                          palette.ring
                        )}
                      >
                        <ServiceIcon iconKey={service.iconKey} className="size-5" />
                      </div>
                      <CardTitle>{service.title[locale]}</CardTitle>
                      <CardDescription>
                        {service.shortDescription[locale]}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="outline" className={cn(palette.text, "border-current/25")}>
                        {tServices(`categories.${service.category}`)}
                      </Badge>
                    </CardContent>
                  </Card>
                </Link>
              </FadeInStaggerItem>
            );
          })}
        </FadeInStagger>
      </section>

      {/* Certificates */}
      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">
              {t("certificatesTitle")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t("certificatesSubtitle")}
            </p>
          </FadeIn>

          <FadeInStagger className="mt-12 grid gap-5 sm:grid-cols-3">
            {certificates.map((cert) => (
              <FadeInStaggerItem key={cert.id}>
                <Card className="h-full transition-all hover:-translate-y-1 hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-2 flex size-11 items-center justify-center rounded-xl bg-brand-teal/15 text-brand-teal-foreground ring-1 ring-brand-teal/25">
                      <BadgeCheck className="size-5" />
                    </div>
                    <CardTitle>{cert.title[locale]}</CardTitle>
                    <CardDescription>{cert.description[locale]}</CardDescription>
                  </CardHeader>
                </Card>
              </FadeInStaggerItem>
            ))}
          </FadeInStagger>

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
        <FadeIn>
          <div className="bg-noise relative flex flex-col items-center justify-between gap-6 overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-cat-imaging px-8 py-14 text-center text-primary-foreground shadow-xl sm:flex-row sm:text-start">
            <div>
              <h2 className="font-heading text-2xl font-bold sm:text-3xl">
                {t("ctaBannerTitle")}
              </h2>
              <p className="mt-2 text-primary-foreground/85">
                {t("ctaBannerSubtitle")}
              </p>
            </div>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "shrink-0 shadow-lg"
              )}
            >
              {tCommon("getInTouch")}
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
