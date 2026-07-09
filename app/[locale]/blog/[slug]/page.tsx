import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/data";
import { routing } from "@/i18n/routing";

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
  if (!post) return {};
  return { title: post.title[locale], description: post.excerpt[locale] };
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

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <header className="mb-8 text-center">
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          {post.title[locale]}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {t("by")} {post.author} —{" "}
          {new Date(post.publishedAt).toLocaleDateString(
            locale === "fa" ? "fa-IR" : "en-US"
          )}
        </p>
      </header>
      <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-primary">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.body[locale]}
        </ReactMarkdown>
      </article>
    </section>
  );
}
