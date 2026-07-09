import "server-only";
import { unstable_cache } from "next/cache";
import { adminDb } from "@/lib/firebase-admin";
import type {
  ServiceDoc,
  CertificateDoc,
  BlogPostDoc,
  FaqItemDoc,
} from "@/lib/types";

export type ServiceWithId = ServiceDoc & { id: string };
export type CertificateWithId = CertificateDoc & { id: string };
export type BlogPostWithId = BlogPostDoc & { id: string };
export type FaqItemWithId = FaqItemDoc & { id: string };

export const getServices = unstable_cache(
  async (): Promise<ServiceWithId[]> => {
    const snap = await adminDb
      .collection("services")
      .where("isPublished", "==", true)
      .orderBy("order", "asc")
      .get();
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as ServiceDoc) }));
  },
  ["services"],
  { tags: ["services"], revalidate: 3600 }
);

export const getServiceBySlug = unstable_cache(
  async (locale: "fa" | "en", slug: string): Promise<ServiceWithId | null> => {
    const snap = await adminDb
      .collection("services")
      .where(`slug.${locale}`, "==", slug)
      .where("isPublished", "==", true)
      .limit(1)
      .get();
    if (snap.empty) return null;
    const doc = snap.docs[0];
    return { id: doc.id, ...(doc.data() as ServiceDoc) };
  },
  ["service-by-slug"],
  { tags: ["services"], revalidate: 3600 }
);

export const getCertificates = unstable_cache(
  async (): Promise<CertificateWithId[]> => {
    const snap = await adminDb
      .collection("certificates")
      .where("isPublished", "==", true)
      .orderBy("order", "asc")
      .get();
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as CertificateDoc) }));
  },
  ["certificates"],
  { tags: ["certificates"], revalidate: 86400 }
);

export const getBlogPosts = unstable_cache(
  async (locale: "fa" | "en"): Promise<BlogPostWithId[]> => {
    const snap = await adminDb
      .collection("blogPosts")
      .where("isPublished", "==", true)
      .where("locales", "array-contains", locale)
      .orderBy("publishedAt", "desc")
      .get();
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as BlogPostDoc) }));
  },
  ["blog-posts"],
  { tags: ["blogPosts"], revalidate: 3600 }
);

export const getBlogPostBySlug = unstable_cache(
  async (locale: "fa" | "en", slug: string): Promise<BlogPostWithId | null> => {
    const snap = await adminDb
      .collection("blogPosts")
      .where(`slug.${locale}`, "==", slug)
      .where("isPublished", "==", true)
      .limit(1)
      .get();
    if (snap.empty) return null;
    const doc = snap.docs[0];
    return { id: doc.id, ...(doc.data() as BlogPostDoc) };
  },
  ["blog-post-by-slug"],
  { tags: ["blogPosts"], revalidate: 3600 }
);

export const getFaqs = unstable_cache(
  async (): Promise<FaqItemWithId[]> => {
    const snap = await adminDb
      .collection("faqs")
      .where("isPublished", "==", true)
      .orderBy("order", "asc")
      .get();
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as FaqItemDoc) }));
  },
  ["faqs"],
  { tags: ["faqs"], revalidate: 86400 }
);
