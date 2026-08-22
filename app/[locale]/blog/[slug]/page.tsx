import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "@/i18n/navigation";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/data";
import { getBlogCoverImage } from "@/lib/blog-images";
import { alternatesForSlugs } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { FadeIn } from "@/components/fade-in";
import { Breadcrumbs } from "@/components/breadcrumbs";

export async function generateStaticParams() {
  const [faPosts, enPosts] = await Promise.all([
    getBlogPosts("fa"),
    getBlogPosts("en"),
  ]);
  return [
    ...faPosts.map((p) => ({ locale: "fa", slug: p.slug.fa })),
    ...enPosts.map((p) => ({ locale: "en", slug: p.slug.en })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "fa" | "en"; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getBlogPostBySlug(locale, slug);
  if (!post) notFound();
  return {
    title: post.title[locale],
    description: post.excerpt[locale],
    alternates: alternatesForSlugs(
      `/fa/blog/${post.slug.fa}`,
      `/en/blog/${post.slug.en}`,
      locale
    ),
    openGraph: {
      title: post.title[locale],
      description: post.excerpt[locale],
      type: "article",
      publishedTime: new Date(post.publishedAt).toISOString(),
      images: [{ url: `${siteConfig.url}${getBlogCoverImage(post)}` }],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: "fa" | "en"; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = await getBlogPostBySlug(locale, slug);
  if (!post) notFound();

  const t = await getTranslations("blog");
  const tNav = await getTranslations("nav");

  const allPosts = await getBlogPosts(locale);
  const otherPosts = allPosts.filter((p) => p.id !== post.id);
  const sharedTagPosts = otherPosts.filter((p) =>
    p.tags.some((tag) => post.tags.includes(tag))
  );
  const relatedPosts = (sharedTagPosts.length > 0 ? sharedTagPosts : otherPosts).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title[locale],
    description: post.excerpt[locale],
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/brand/logo-main.png`,
      },
    },
    datePublished: new Date(post.publishedAt).toISOString(),
    dateModified: new Date(post.updatedAt).toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/${locale}/blog/${slug}`,
    },
    image: `${siteConfig.url}${getBlogCoverImage(post)}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs
        locale={locale}
        items={[
          { label: tNav("home"), href: "/" },
          { label: tNav("blog"), href: "/blog" },
          { label: post.title[locale] },
        ]}
      />
      <FadeIn className="relative h-[45vh] min-h-72 w-full overflow-hidden">
        <Image
          src={getBlogCoverImage(post)}
          alt={post.title[locale]}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-primary/10" />
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="mx-auto w-full max-w-3xl px-4 pb-10 text-white sm:px-6">
            <h1 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              {post.title[locale]}
            </h1>
            <p className="mt-3 text-sm text-white/80">
              {t("by")} {post.author} ·{" "}
              {new Date(post.publishedAt).toLocaleDateString(
                locale === "fa" ? "fa-IR" : "en-US"
              )}
            </p>
          </div>
        </div>
      </FadeIn>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <article className="prose prose-neutral dark:prose-invert max-w-none marker:text-primary prose-headings:font-heading prose-headings:text-foreground prose-a:font-medium prose-a:text-primary prose-strong:text-foreground prose-blockquote:border-primary prose-blockquote:not-italic prose-hr:border-border">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.body[locale]}
          </ReactMarkdown>
        </article>

        {relatedPosts.length > 0 && (
          <div className="mt-12 border-t border-border pt-8">
            <h2 className="font-heading text-xl font-semibold">
              {t("relatedPosts")}
            </h2>
            <ul className="mt-4 grid gap-4 sm:grid-cols-3">
              {relatedPosts.map((related) => (
                <li key={related.id}>
                  <Link
                    href={`/blog/${related.slug[locale]}`}
                    className="group block overflow-hidden rounded-xl border border-border transition-colors hover:border-primary/40"
                  >
                    <div className="relative aspect-16/9 w-full overflow-hidden">
                      <Image
                        src={getBlogCoverImage(related)}
                        alt={related.title[locale]}
                        fill
                        sizes="(min-width: 640px) 33vw, 100vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <p className="p-3 text-sm font-medium group-hover:text-primary">
                      {related.title[locale]}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </>
  );
}
