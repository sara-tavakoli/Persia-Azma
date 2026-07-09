import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/page-hero";
import { ServiceIcon } from "@/components/service-icon";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getServices } from "@/lib/data";
import { routing } from "@/i18n/routing";
import { categoryColorClasses } from "@/lib/category-colors";
import { getServiceImage } from "@/lib/service-images";
import { cn } from "@/lib/utils";
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
  const t = await getTranslations({ locale, namespace: "services" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: alternatesForPath("/services"),
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: "fa" | "en" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("services");
  const services = await getServices();

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <FadeInStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
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
                        {t(`categories.${service.category}`)}
                      </Badge>
                    </CardContent>
                  </Card>
                </Link>
              </FadeInStaggerItem>
            );
          })}
        </FadeInStagger>
      </section>
    </>
  );
}
