import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCertificates } from "@/lib/data";
import { routing } from "@/i18n/routing";
import { BadgeCheck } from "lucide-react";
import { FadeInStagger, FadeInStaggerItem } from "@/components/fade-in";
import { alternatesForPath } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "fa" | "en" }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "certificates" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: alternatesForPath("/certificates"),
  };
}

export default async function CertificatesPage({
  params,
}: {
  params: Promise<{ locale: "fa" | "en" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("certificates");
  const certificates = await getCertificates();

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <FadeInStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
      </section>
    </>
  );
}
