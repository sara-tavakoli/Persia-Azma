"use server";

import { revalidatePath } from "next/cache";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { requireSession } from "@/lib/auth/session";
import { adminDb } from "@/lib/firebase-admin";
import type { BlogPostDoc } from "@/lib/types";

const blogFormSchema = z.object({
  id: z.string().optional(),
  slugFa: z.string().trim().min(1),
  slugEn: z.string().trim().min(1),
  titleFa: z.string().trim().min(1),
  titleEn: z.string().trim().min(1),
  excerptFa: z.string().trim().min(1),
  excerptEn: z.string().trim().min(1),
  bodyFa: z.string().trim().min(1),
  bodyEn: z.string().trim().min(1),
  author: z.string().trim().min(1),
  tags: z.string().trim(),
  isPublished: z.coerce.boolean(),
});

export async function saveBlogPost(formData: FormData) {
  await requireSession();

  const parsed = blogFormSchema.parse({
    id: formData.get("id") || undefined,
    slugFa: formData.get("slugFa"),
    slugEn: formData.get("slugEn"),
    titleFa: formData.get("titleFa"),
    titleEn: formData.get("titleEn"),
    excerptFa: formData.get("excerptFa"),
    excerptEn: formData.get("excerptEn"),
    bodyFa: formData.get("bodyFa"),
    bodyEn: formData.get("bodyEn"),
    author: formData.get("author"),
    tags: formData.get("tags") ?? "",
    isPublished: formData.get("isPublished") === "on",
  });

  const now = Date.now();
  const id = parsed.id || randomUUID();
  const tags = parsed.tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const doc: BlogPostDoc = {
    slug: { fa: parsed.slugFa, en: parsed.slugEn },
    title: { fa: parsed.titleFa, en: parsed.titleEn },
    excerpt: { fa: parsed.excerptFa, en: parsed.excerptEn },
    body: { fa: parsed.bodyFa, en: parsed.bodyEn },
    author: parsed.author,
    tags,
    locales: ["fa", "en"],
    isPublished: parsed.isPublished,
    publishedAt: now,
    createdAt: now,
    updatedAt: now,
  };

  await adminDb.collection("blogPosts").doc(id).set(doc, { merge: true });

  revalidatePath("/[locale]", "layout");
  revalidatePath("/admin/blog");
}

export async function deleteBlogPost(id: string) {
  await requireSession();
  await adminDb.collection("blogPosts").doc(id).delete();
  revalidatePath("/[locale]", "layout");
  revalidatePath("/admin/blog");
}
