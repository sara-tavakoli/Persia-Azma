import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { ContactForm } from "@/components/contact-form";
import { QuoteForm } from "@/components/quote-form";
import { getServices } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";
import { routing } from "@/i18n/routing";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
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
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: alternatesForPath("/contact"),
  };
}

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: "fa" | "en" }>;
  searchParams: Promise<{ service?: string }>;
}) {
  const { locale } = await params;
  const { service } = await searchParams;
  setRequestLocale(locale);

  const t = await getTranslations("contact");
  const services = await getServices();
  const serviceOptions = services.map((s) => ({
    slug: s.slug[locale],
    title: s.title[locale],
  }));

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} />

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="font-heading text-lg font-semibold">
                {t("info.address")}
              </h2>
              <p className="mt-1 flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 size-4 shrink-0" />
                {locale === "fa" ? siteConfig.addressFa : siteConfig.addressEn}
              </p>
            </div>
            <div>
              <h2 className="font-heading text-lg font-semibold">
                {t("info.phones")}
              </h2>
              <div className="mt-1 flex flex-col gap-1.5">
                {siteConfig.phones.map((p) => (
                  <a
                    key={p}
                    href={`tel:${p.replace(/-/g, "")}`}
                    dir="ltr"
                    className="flex items-center gap-2 py-0.5 text-start text-sm text-muted-foreground hover:text-foreground"
                  >
                    <Phone className="size-4 shrink-0" />
                    {p}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-heading text-lg font-semibold">
                {t("info.email")}
              </h2>
              <a
                href={`mailto:${siteConfig.email}`}
                dir="ltr"
                className="mt-1 flex items-center gap-2 text-start text-sm text-muted-foreground hover:text-foreground"
              >
                <Mail className="size-4 shrink-0" />
                {siteConfig.email}
              </a>
            </div>
            <div>
              <h2 className="font-heading text-lg font-semibold">
                {t("info.hours")}
              </h2>
              <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="size-4 shrink-0" />
                {await getTranslations("footer").then((tf) => tf("hoursValue"))}
              </p>
            </div>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-fit items-center gap-2 rounded-lg bg-[#25D366]/10 px-4 py-2 text-sm font-medium text-[#128C7E] hover:bg-[#25D366]/20"
            >
              <MessageCircle className="size-4" />
              {t("info.whatsapp")}
            </a>
          </div>

          <Tabs defaultValue={service ? "quote" : "contact"}>
            <TabsList className="mb-4">
              <TabsTrigger value="contact">{t("tabContact")}</TabsTrigger>
              <TabsTrigger value="quote">{t("tabQuote")}</TabsTrigger>
            </TabsList>
            <TabsContent value="contact">
              <ContactForm />
            </TabsContent>
            <TabsContent value="quote">
              <QuoteForm
                serviceOptions={serviceOptions}
                defaultService={service}
              />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
