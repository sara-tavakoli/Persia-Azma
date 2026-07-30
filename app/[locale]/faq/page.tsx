import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getFaqs } from "@/lib/data";
import { routing } from "@/i18n/routing";
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
  const t = await getTranslations({ locale, namespace: "faq" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: alternatesForPath("/faq"),
  };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: "fa" | "en" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("faq");
  const faqs = await getFaqs();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question[locale],
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer[locale],
      },
    })),
  };

  return (
    <>
      <PageHero
        title={t("title")}
        subtitle={t("subtitle")}
        image="/images/faq-documentation.jpg"
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <FadeIn className="lg:sticky lg:top-24">
            <div className="relative aspect-4/5 overflow-hidden rounded-3xl ring-1 ring-black/5">
              <Image
                src="/images/faq-documentation.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 400px, 100vw"
                className="object-cover"
              />
            </div>
          </FadeIn>

          <FadeInStagger>
            <Accordion>
              {faqs.map((faq) => (
                <FadeInStaggerItem key={faq.id}>
                  <AccordionItem value={faq.id}>
                    <AccordionTrigger className="text-start">
                      {faq.question[locale]}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer[locale]}
                    </AccordionContent>
                  </AccordionItem>
                </FadeInStaggerItem>
              ))}
            </Accordion>
          </FadeInStagger>
        </div>
      </section>
    </>
  );
}
