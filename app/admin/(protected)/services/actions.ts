"use server";

import { revalidatePath } from "next/cache";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { requireSession } from "@/lib/auth/session";
import { adminDb } from "@/lib/firebase-admin";
import type { ServiceDoc } from "@/lib/types";

const serviceFormSchema = z.object({
  id: z.string().optional(),
  slugFa: z.string().trim().min(1),
  slugEn: z.string().trim().min(1),
  titleFa: z.string().trim().min(1),
  titleEn: z.string().trim().min(1),
  shortDescriptionFa: z.string().trim().min(1),
  shortDescriptionEn: z.string().trim().min(1),
  bodyFa: z.string().trim().min(1),
  bodyEn: z.string().trim().min(1),
  category: z.enum(["medical", "imaging", "industrial", "consulting"]),
  iconKey: z.string().trim().min(1),
  order: z.coerce.number().int().min(0),
  isPublished: z.coerce.boolean(),
});

export async function saveService(formData: FormData) {
  await requireSession();

  const parsed = serviceFormSchema.parse({
    id: formData.get("id") || undefined,
    slugFa: formData.get("slugFa"),
    slugEn: formData.get("slugEn"),
    titleFa: formData.get("titleFa"),
    titleEn: formData.get("titleEn"),
    shortDescriptionFa: formData.get("shortDescriptionFa"),
    shortDescriptionEn: formData.get("shortDescriptionEn"),
    bodyFa: formData.get("bodyFa"),
    bodyEn: formData.get("bodyEn"),
    category: formData.get("category"),
    iconKey: formData.get("iconKey"),
    order: formData.get("order"),
    isPublished: formData.get("isPublished") === "on",
  });

  const now = Date.now();
  const id = parsed.id || randomUUID();

  const doc: ServiceDoc = {
    slug: { fa: parsed.slugFa, en: parsed.slugEn },
    title: { fa: parsed.titleFa, en: parsed.titleEn },
    shortDescription: { fa: parsed.shortDescriptionFa, en: parsed.shortDescriptionEn },
    body: { fa: parsed.bodyFa, en: parsed.bodyEn },
    category: parsed.category,
    iconKey: parsed.iconKey,
    order: parsed.order,
    isPublished: parsed.isPublished,
    createdAt: now,
    updatedAt: now,
  };

  if (parsed.id) {
    await adminDb.collection("services").doc(id).set(doc, { merge: true });
  } else {
    await adminDb.collection("services").doc(id).set(doc);
  }

  revalidatePath("/[locale]", "layout");
  revalidatePath("/admin/services");
}

export async function deleteService(id: string) {
  await requireSession();
  await adminDb.collection("services").doc(id).delete();
  revalidatePath("/[locale]", "layout");
  revalidatePath("/admin/services");
}
