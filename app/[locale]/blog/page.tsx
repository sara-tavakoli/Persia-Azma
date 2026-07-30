import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/page-hero";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getBlogPosts } from "@/lib/data";
import { getBlogCoverImage } from "@/lib/blog-images";
import { routing } from "@/i18n/routing";
import { Newspaper } from "lucide-react";
import { alternatesForPath } from "@/lib/seo";
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
  const t = await getTranslations({ locale, namespace: "blog" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: alternatesForPath("/blog"),
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: "fa" | "en" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("blog");
  const posts = await getBlogPosts(locale);

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {posts.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center text-muted-foreground">
            <Newspaper className="size-10" />
            <p>{t("empty")}</p>
          </div>
        ) : (
          <FadeInStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
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
        )}
      </section>
    </>
  );
}
