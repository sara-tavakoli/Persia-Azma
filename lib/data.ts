import "server-only";
import { unstable_cache } from "next/cache";
import { adminDb } from "@/lib/firebase-admin";
import { siteConfig } from "@/lib/site-config";
import type {
  ServiceDoc,
  CertificateDoc,
  BlogPostDoc,
  FaqItemDoc,
  ClientLogoDoc,
  SiteSettingsDoc,
} from "@/lib/types";

export type ServiceWithId = ServiceDoc & { id: string };
export type CertificateWithId = CertificateDoc & { id: string };
export type BlogPostWithId = BlogPostDoc & { id: string };
export type FaqItemWithId = FaqItemDoc & { id: string };
export type ClientLogoWithId = ClientLogoDoc & { id: string };

// decodeURIComponent throws on a lone `%` not part of a valid escape
// sequence; fall back to the original string rather than crash.
function safeDecodeURIComponent(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

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

// Not wrapped in unstable_cache: these pages are already statically
// generated (generateStaticParams) with page-level ISR, so the extra
// caching layer was redundant — and unstable_cache's automatic
// argument-based cache keying proved unreliable here (served a stale
// "not found" result across different slug/locale calls).
export async function getServiceBySlug(
  locale: "fa" | "en",
  rawSlug: string
): Promise<ServiceWithId | null> {
  // Next.js 16 has been observed passing non-ASCII dynamic segments to
  // generateMetadata still percent-encoded (while the page component
  // gets the decoded value) — decode defensively; decodeURIComponent
  // is a no-op on already-decoded text with no `%` sequences.
  const slug = safeDecodeURIComponent(rawSlug);
  const snap = await adminDb
    .collection("services")
    .where(`slug.${locale}`, "==", slug)
    .where("isPublished", "==", true)
    .limit(1)
    .get();
  if (snap.empty) return null;
  const doc = snap.docs[0];
  return { id: doc.id, ...(doc.data() as ServiceDoc) };
}

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

// Not wrapped in unstable_cache — see note above getServiceBySlug;
// this also takes a `locale` argument so was at risk of the same bug.
export async function getBlogPosts(
  locale: "fa" | "en"
): Promise<BlogPostWithId[]> {
  const snap = await adminDb
    .collection("blogPosts")
    .where("isPublished", "==", true)
    .where("locales", "array-contains", locale)
    .orderBy("publishedAt", "desc")
    .get();
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as BlogPostDoc) }));
}

// See note above getServiceBySlug — same reasoning applies here.
export async function getBlogPostBySlug(
  locale: "fa" | "en",
  rawSlug: string
): Promise<BlogPostWithId | null> {
  const slug = safeDecodeURIComponent(rawSlug);
  const snap = await adminDb
    .collection("blogPosts")
    .where(`slug.${locale}`, "==", slug)
    .where("isPublished", "==", true)
    .limit(1)
    .get();
  if (snap.empty) return null;
  const doc = snap.docs[0];
  return { id: doc.id, ...(doc.data() as BlogPostDoc) };
}

export const getClientLogos = unstable_cache(
  async (): Promise<ClientLogoWithId[]> => {
    const snap = await adminDb
      .collection("clientLogos")
      .where("isPublished", "==", true)
      .orderBy("order", "asc")
      .get();
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as ClientLogoDoc) }));
  },
  ["clientLogos"],
  { tags: ["clientLogos"], revalidate: 86400 }
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

// Falls back to the hardcoded siteConfig values if the admin hasn't saved
// this doc yet, so the site never breaks on a fresh Firestore project.
export const getSiteSettings = unstable_cache(
  async (): Promise<SiteSettingsDoc> => {
    const doc = await adminDb.collection("settings").doc("contact").get();
    if (!doc.exists) {
      return {
        phones: [...siteConfig.phones],
        whatsappNumber: siteConfig.whatsappNumber,
        baleNumber: siteConfig.baleNumber,
        email: siteConfig.email,
        addressFa: siteConfig.addressFa,
        addressEn: siteConfig.addressEn,
        updatedAt: 0,
      };
    }
    return doc.data() as SiteSettingsDoc;
  },
  ["site-settings"],
  { tags: ["settings"], revalidate: 3600 }
);
