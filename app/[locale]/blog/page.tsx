import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/page-hero";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getBlogPosts } from "@/lib/data";
import { routing } from "@/i18n/routing";
import { Newspaper } from "lucide-react";

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
  return { title: t("title"), description: t("subtitle") };
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
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug[locale]}`}
              >
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardHeader>
                    <CardTitle>{post.title[locale]}</CardTitle>
                    <CardDescription>{post.excerpt[locale]}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
