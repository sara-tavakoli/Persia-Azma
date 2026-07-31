import Image from "next/image";
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
import { getServices, getCertificates, getClientLogos, getBlogPosts } from "@/lib/data";
import { homeStats } from "@/lib/placeholder-data";
import { ServiceIcon } from "@/components/service-icon";
import { categoryColorClasses } from "@/lib/category-colors";
import { getServiceImage } from "@/lib/service-images";
import { getBlogCoverImage } from "@/lib/blog-images";
import { calibrationQuantities } from "@/lib/quantity-icons";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/fade-in";
import { Counter } from "@/components/counter";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  ShieldCheck,
  Award,
  MapPinned,
  UserCheck,
  ClipboardList,
  SearchCheck,
  Gauge,
  FileCheck2,
  Flame,
  Factory,
  Anvil,
  Zap,
  Anchor,
  Droplets,
  Pill,
  Building2,
} from "lucide-react";

const whyUsIcons = [ShieldCheck, Award, MapPinned, UserCheck];
const processIcons = [ClipboardList, SearchCheck, Gauge, FileCheck2];
const industryIcons = [Flame, Factory, Anvil, Zap, Anchor, Droplets, Pill, Building2];

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
  const tQuantities = await getTranslations("quantities");
  const ArrowIcon = locale === "fa" ? ArrowLeft : ArrowRight;

  const [services, certificates, clientLogos, blogPosts] = await Promise.all([
    getServices(),
    getCertificates(),
    getClientLogos(),
    getBlogPosts(locale),
  ]);

  const whyUs = [1, 2, 3, 4].map((i) => ({
    title: t(`whyUs${i}Title` as "whyUs1Title"),
    body: t(`whyUs${i}Body` as "whyUs1Body"),
    Icon: whyUsIcons[i - 1],
  }));

  const process = [1, 2, 3, 4].map((i) => ({
    title: t(`process${i}Title` as "process1Title"),
    body: t(`process${i}Body` as "process1Body"),
    Icon: processIcons[i - 1],
  }));

  const industries = [1, 2, 3, 4, 5, 6, 7, 8].map((i) => ({
    label: t(`industry${i}` as "industry1"),
    Icon: industryIcons[i - 1],
  }));

  return (
    <>
      {/* Hero */}
      <section className="bg-hero-scrim relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/hero-lab.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 sm:py-32">
          <FadeIn>
            <Badge
              variant="secondary"
              className="mb-4 border border-white/20 bg-white/10 text-white backdrop-blur-sm"
            >
              {t("hero.eyebrow")}
            </Badge>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-balance text-white sm:text-5xl">
              {t("hero.title")}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-balance text-white/85">
              {t("hero.subtitle")}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className={cn(buttonVariants({ size: "lg", variant: "secondary" }), "gap-2 shadow-lg")}
              >
                {t("hero.ctaPrimary")}
                <ArrowIcon className="size-4" />
              </Link>
              <Link
                href="/services"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-white/30 bg-white/5 text-white backdrop-blur-sm hover:bg-white/15 hover:text-white"
                )}
              >
                {t("hero.ctaSecondary")}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <FadeInStagger className="grid grid-cols-2 gap-4 sm:grid-cols-4">
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
                      "rounded-2xl border border-border/60 bg-card p-5 text-center shadow-sm ring-1",
                      palette.ring
                    )}
                  >
                    <Counter
                      value={stat.value}
                      decimals={stat.decimals}
                      locale={locale}
                      prefix={locale === "fa" ? stat.symbolFa : ""}
                      suffix={locale === "en" ? stat.symbolEn : ""}
                      className={cn("font-heading text-3xl font-bold", palette.text)}
                    />
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
          {services.map((service, index) => {
            const palette = categoryColorClasses[service.category];
            return (
              <FadeInStaggerItem key={service.id}>
                <Link href={`/services/${service.slug[locale]}`} className="group block h-full">
                  <Card className="h-full overflow-hidden py-0 transition-all hover:-translate-y-1 hover:shadow-lg">
                    <div className="relative aspect-16/9 w-full overflow-hidden">
                      <Image
                        src={getServiceImage(service.id)}
                        alt=""
                        fill
                        priority={index === 0}
                        sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent" />
                      <div
                        className={cn(
                          "absolute bottom-3 flex size-10 items-center justify-center rounded-lg ring-1 backdrop-blur-sm start-3",
                          palette.bg,
                          palette.text,
                          palette.ring
                        )}
                      >
                        <ServiceIcon iconKey={service.iconKey} className="size-5" />
                      </div>
                    </div>
                    <CardHeader className="pt-4">
                      <CardTitle>{service.title[locale]}</CardTitle>
                      <CardDescription>
                        {service.shortDescription[locale]}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-4">
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

      {/* Expertise / calibration quantities */}
      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">
              {t("expertiseTitle")}
            </h2>
            <p className="mt-3 text-muted-foreground">{t("expertiseSubtitle")}</p>
          </FadeIn>

          <FadeInStagger className="mt-12 grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-5">
            {calibrationQuantities.map(({ key, Icon }) => (
              <FadeInStaggerItem key={key}>
                <div className="group flex flex-col items-center gap-3 rounded-2xl border border-border/60 bg-card p-5 text-center transition-all hover:-translate-y-1 hover:shadow-md">
                  <div className="flex size-11 items-center justify-center rounded-full ring-2 ring-primary/20 text-primary transition-transform group-hover:scale-110">
                    <Icon className="size-5" />
                  </div>
                  <span className="text-sm font-medium">
                    {tQuantities(key as "pressure")}
                  </span>
                </div>
              </FadeInStaggerItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-2xl font-bold sm:text-3xl">
            {t("processTitle")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("processSubtitle")}</p>
        </FadeIn>

        <FadeInStagger className="relative mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {process.map(({ title, body, Icon }, i) => (
            <FadeInStaggerItem
              key={title}
              className="group relative rounded-2xl p-4 transition-colors hover:bg-muted/60"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform group-hover:scale-110">
                  <Icon className="size-5" />
                </div>
                <span className="font-heading text-2xl font-bold text-muted-foreground/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-4 font-heading font-semibold">{title}</h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {body}
              </p>
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>
      </section>

      {/* Why Us */}
      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <FadeIn className="relative order-2 lg:order-1">
              <div className="relative aspect-4/3 overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5">
                <Image
                  src="/images/facility-interior.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover"
                />
              </div>
            </FadeIn>

            <div className="order-1 lg:order-2">
              <FadeIn>
                <h2 className="font-heading text-2xl font-bold sm:text-3xl">
                  {t("whyUsTitle")}
                </h2>
                <p className="mt-3 text-muted-foreground">{t("whyUsSubtitle")}</p>
              </FadeIn>
              <FadeInStagger className="mt-8 grid gap-6 sm:grid-cols-2">
                {whyUs.map(({ title, body, Icon }) => (
                  <FadeInStaggerItem key={title} className="group">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-110">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="mt-3 font-heading font-semibold">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {body}
                    </p>
                  </FadeInStaggerItem>
                ))}
              </FadeInStagger>
            </div>
          </div>
        </div>
      </section>

      {/* Industries we serve */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-2xl font-bold sm:text-3xl">
            {t("industriesTitle")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("industriesSubtitle")}</p>
        </FadeIn>

        <FadeInStagger className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-4">
          {industries.map(({ label, Icon }) => (
            <FadeInStaggerItem key={label}>
              <div className="group flex flex-col items-center gap-3 rounded-2xl border border-border/60 bg-card p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                  <Icon className="size-6" />
                </div>
                <span className="text-sm font-medium">{label}</span>
              </div>
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>
      </section>

      {/* Certificates */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
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
      </section>

      {/* Client / partner logos */}
      {clientLogos.length > 0 && (
        <section className="border-y border-border bg-muted/40">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <FadeIn className="mx-auto max-w-2xl text-center">
              <h2 className="font-heading text-2xl font-bold sm:text-3xl">
                {t("partnersTitle")}
              </h2>
              <p className="mt-3 text-muted-foreground">{t("partnersSubtitle")}</p>
            </FadeIn>

            <FadeInStagger className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
              {clientLogos.map((logo) => (
                <FadeInStaggerItem key={logo.id}>
                  <div className="relative h-12 w-32 grayscale transition-all hover:grayscale-0">
                    <Image
                      src={logo.logo.url}
                      alt={logo.name}
                      fill
                      sizes="128px"
                      className="object-contain"
                    />
                  </div>
                </FadeInStaggerItem>
              ))}
            </FadeInStagger>
          </div>
        </section>
      )}

      {/* Blog teaser */}
      {blogPosts.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">
              {t("blogTitle")}
            </h2>
            <p className="mt-3 text-muted-foreground">{t("blogSubtitle")}</p>
          </FadeIn>

          <FadeInStagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.slice(0, 3).map((post) => (
              <FadeInStaggerItem key={post.id}>
                <Link href={`/blog/${post.slug[locale]}`} className="group block h-full">
                  <Card className="h-full overflow-hidden py-0 transition-all hover:-translate-y-1 hover:shadow-lg">
                    <div className="relative aspect-16/9 w-full overflow-hidden">
                      <Image
                        src={getBlogCoverImage(post)}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardHeader className="pt-4">
                      <CardTitle>{post.title[locale]}</CardTitle>
                      <CardDescription>{post.excerpt[locale]}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </FadeInStaggerItem>
            ))}
          </FadeInStagger>

          <div className="mt-10 text-center">
            <Link href="/blog" className={cn(buttonVariants({ variant: "outline" }))}>
              {tCommon("viewAll")}
            </Link>
          </div>
        </section>
      )}

      {/* CTA banner */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <FadeIn>
          <div className="bg-noise relative flex flex-col items-center justify-between gap-6 overflow-hidden rounded-3xl bg-primary px-8 py-14 text-center text-primary-foreground shadow-xl sm:flex-row sm:text-start">
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
