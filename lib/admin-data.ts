import "server-only";
import { adminDb } from "@/lib/firebase-admin";
import type {
  ServiceDoc,
  CertificateDoc,
  BlogPostDoc,
  ClientLogoDoc,
  ContactSubmissionDoc,
  QuoteRequestDoc,
} from "@/lib/types";

function withId<T>(doc: FirebaseFirestore.QueryDocumentSnapshot): T & { id: string } {
  return { id: doc.id, ...(doc.data() as T) };
}

export async function adminListServices() {
  const snap = await adminDb.collection("services").orderBy("order", "asc").get();
  return snap.docs.map((d) => withId<ServiceDoc>(d));
}

export async function adminGetService(id: string) {
  const doc = await adminDb.collection("services").doc(id).get();
  return doc.exists ? withId<ServiceDoc>(doc as FirebaseFirestore.QueryDocumentSnapshot) : null;
}

export async function adminListCertificates() {
  const snap = await adminDb.collection("certificates").orderBy("order", "asc").get();
  return snap.docs.map((d) => withId<CertificateDoc>(d));
}

export async function adminGetCertificate(id: string) {
  const doc = await adminDb.collection("certificates").doc(id).get();
  return doc.exists ? withId<CertificateDoc>(doc as FirebaseFirestore.QueryDocumentSnapshot) : null;
}

export async function adminListBlogPosts() {
  const snap = await adminDb.collection("blogPosts").orderBy("createdAt", "desc").get();
  return snap.docs.map((d) => withId<BlogPostDoc>(d));
}

export async function adminGetBlogPost(id: string) {
  const doc = await adminDb.collection("blogPosts").doc(id).get();
  return doc.exists ? withId<BlogPostDoc>(doc as FirebaseFirestore.QueryDocumentSnapshot) : null;
}

export async function adminListClientLogos() {
  const snap = await adminDb.collection("clientLogos").orderBy("order", "asc").get();
  return snap.docs.map((d) => withId<ClientLogoDoc>(d));
}

export async function adminListContactSubmissions() {
  const snap = await adminDb.collection("contactSubmissions").orderBy("createdAt", "desc").get();
  return snap.docs.map((d) => withId<ContactSubmissionDoc>(d));
}

export async function adminListQuoteRequests() {
  const snap = await adminDb.collection("quoteRequests").orderBy("createdAt", "desc").get();
  return snap.docs.map((d) => withId<QuoteRequestDoc>(d));
}

export async function adminDashboardCounts() {
  const [services, certificates, blogPosts, contactSubs, quoteReqs] = await Promise.all([
    adminDb.collection("services").count().get(),
    adminDb.collection("certificates").count().get(),
    adminDb.collection("blogPosts").count().get(),
    adminDb.collection("contactSubmissions").where("status", "==", "new").count().get(),
    adminDb.collection("quoteRequests").where("status", "==", "new").count().get(),
  ]);
  return {
    services: services.data().count,
    certificates: certificates.data().count,
    blogPosts: blogPosts.data().count,
    newContactSubmissions: contactSubs.data().count,
    newQuoteRequests: quoteReqs.data().count,
  };
}
