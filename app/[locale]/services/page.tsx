import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/page-hero";
import { ServiceIcon } from "@/components/service-icon";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getServices } from "@/lib/data";
import { routing } from "@/i18n/routing";
import { categoryColorClasses } from "@/lib/category-colors";
import { cn } from "@/lib/utils";
import { FadeInStagger, FadeInStaggerItem } from "@/components/fade-in";

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
  return { title: t("title"), description: t("subtitle") };
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
                    <div className="px-(--card-spacing)">
                      <Badge variant="outline" className={cn(palette.text, "border-current/25")}>
                        {t(`categories.${service.category}`)}
                      </Badge>
                    </div>
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
