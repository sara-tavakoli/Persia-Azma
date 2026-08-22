import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { vazirmatn, inter } from "../fonts";
import { siteConfig } from "@/lib/site-config";
import { alternatesForPath } from "@/lib/seo";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AnnouncementBar } from "@/components/announcement-bar";
import { ScrollProgress } from "@/components/scroll-progress";
import { BackToTop } from "@/components/back-to-top";
import { Toaster } from "@/components/ui/sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(siteConfig.url),
    verification: {
      google: "LuaIOnEZFDb4spTZXguSxspFV0ZhP4Sv2pJuEPpoFuU",
    },
    title: {
      default: t("defaultTitle"),
      template: `%s | ${t("siteName")}`,
    },
    description: t("defaultDescription"),
    alternates: alternatesForPath("", locale as "fa" | "en"),
    openGraph: {
      title: t("defaultTitle"),
      description: t("defaultDescription"),
      siteName: t("siteName"),
      locale: locale === "fa" ? "fa_IR" : "en_US",
      type: "website",
      images: [{ url: "/brand/logo-main.png", width: 300, height: 300 }],
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const dir = locale === "fa" ? "rtl" : "ltr";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    alternateName: siteConfig.nameFa,
    description:
      locale === "fa"
        ? "شرکت کالیبراسیون و کنترل کیفیت تجهیزات پزشکی، تصویربرداری، صنعتی و آزمایشگاهی در شیراز و جنوب کشور."
        : "Calibration and quality-control company for medical, imaging, industrial, and laboratory equipment in Shiraz and southern Iran.",
    url: siteConfig.url,
    logo: `${siteConfig.url}/brand/logo-main.png`,
    image: `${siteConfig.url}/brand/logo-alt.png`,
    email: siteConfig.email,
    telephone: siteConfig.phones,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Shiraz",
      addressRegion: "Fars",
      addressCountry: "IR",
      streetAddress: siteConfig.addressEn,
    },
    areaServed: [
      { "@type": "City", name: "Shiraz" },
      { "@type": "AdministrativeArea", name: "Fars Province" },
      { "@type": "Place", name: "Southern Iran" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
        opens: "08:00",
        closes: "16:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Thursday"],
        opens: "08:00",
        closes: "12:00",
      },
    ],
  };

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${vazirmatn.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className={`flex min-h-full flex-col ${
          locale === "fa" ? "font-vazirmatn" : "font-inter"
        }`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider>
          <ScrollProgress />
          <AnnouncementBar />
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <BackToTop />
          <Toaster />
        </NextIntlClientProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
