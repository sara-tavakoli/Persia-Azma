import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Breadcrumbs } from "@/components/breadcrumbs";
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
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { WhatsappIcon } from "@/components/whatsapp-icon";
import { alternatesForPath } from "@/lib/seo";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/fade-in";

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
    alternates: alternatesForPath("/contact", locale),
    openGraph: {
      title: t("title"),
      description: t("subtitle"),
      images: [{ url: `${siteConfig.url}/images/contact-support.jpg` }],
    },
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
  const tNav = await getTranslations("nav");
  const services = await getServices();
  const serviceOptions = services.map((s) => ({
    slug: s.slug[locale],
    title: s.title[locale],
  }));

  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[{ label: tNav("home"), href: "/" }, { label: tNav("contact") }]}
      />
      <PageHero
        title={t("title")}
        subtitle={t("subtitle")}
        image="/images/contact-support.jpg"
      />

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <FadeInStagger className="flex flex-col gap-5">
            <FadeInStaggerItem>
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MapPin className="size-5" />
                </div>
                <div>
                  <h2 className="font-heading text-sm font-semibold">
                    {t("info.address")}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {locale === "fa" ? siteConfig.addressFa : siteConfig.addressEn}
                  </p>
                </div>
              </div>
            </FadeInStaggerItem>
            <FadeInStaggerItem>
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Phone className="size-5" />
                </div>
                <div>
                  <h2 className="font-heading text-sm font-semibold">
                    {t("info.phones")}
                  </h2>
                  <div className="mt-1 flex flex-col gap-1">
                    {siteConfig.phones.map((p) => (
                      <a
                        key={p}
                        href={`tel:${p.replace(/-/g, "")}`}
                        dir="ltr"
                        className="text-start text-sm text-muted-foreground hover:text-foreground"
                      >
                        {p}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </FadeInStaggerItem>
            <FadeInStaggerItem>
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="size-5" />
                </div>
                <div>
                  <h2 className="font-heading text-sm font-semibold">
                    {t("info.email")}
                  </h2>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    dir="ltr"
                    className="mt-1 block text-start text-sm text-muted-foreground hover:text-foreground"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>
            </FadeInStaggerItem>
            <FadeInStaggerItem>
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Clock className="size-5" />
                </div>
                <div>
                  <h2 className="font-heading text-sm font-semibold">
                    {t("info.hours")}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {await getTranslations("footer").then((tf) => tf("hoursValue"))}
                  </p>
                </div>
              </div>
            </FadeInStaggerItem>
            <FadeInStaggerItem>
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-fit items-center gap-2 rounded-lg bg-[#25D366]/10 px-4 py-2 text-sm font-medium text-[#128C7E] transition-transform hover:scale-105 hover:bg-[#25D366]/20"
              >
                <WhatsappIcon className="size-5" />
                {t("info.whatsapp")}
              </a>
            </FadeInStaggerItem>
          </FadeInStagger>

          <FadeIn delay={0.1}>
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
          </FadeIn>
        </div>
      </section>
    </>
  );
}
