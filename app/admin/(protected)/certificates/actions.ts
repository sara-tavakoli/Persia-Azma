"use server";

import { revalidatePath } from "next/cache";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { requireSession } from "@/lib/auth/session";
import { adminDb } from "@/lib/firebase-admin";
import type { CertificateDoc } from "@/lib/types";

const certificateFormSchema = z.object({
  id: z.string().optional(),
  titleFa: z.string().trim().min(1),
  titleEn: z.string().trim().min(1),
  issuer: z.string().trim().min(1),
  descriptionFa: z.string().trim().min(1),
  descriptionEn: z.string().trim().min(1),
  order: z.coerce.number().int().min(0),
  isPublished: z.coerce.boolean(),
});

export async function saveCertificate(formData: FormData) {
  await requireSession();

  const parsed = certificateFormSchema.parse({
    id: formData.get("id") || undefined,
    titleFa: formData.get("titleFa"),
    titleEn: formData.get("titleEn"),
    issuer: formData.get("issuer"),
    descriptionFa: formData.get("descriptionFa"),
    descriptionEn: formData.get("descriptionEn"),
    order: formData.get("order"),
    isPublished: formData.get("isPublished") === "on",
  });

  const now = Date.now();
  const id = parsed.id || randomUUID();

  const doc: CertificateDoc = {
    title: { fa: parsed.titleFa, en: parsed.titleEn },
    issuer: parsed.issuer,
    description: { fa: parsed.descriptionFa, en: parsed.descriptionEn },
    order: parsed.order,
    isPublished: parsed.isPublished,
    createdAt: now,
    updatedAt: now,
  };

  await adminDb.collection("certificates").doc(id).set(doc, { merge: true });

  revalidatePath("/[locale]", "layout");
  revalidatePath("/admin/certificates");
}

export async function deleteCertificate(id: string) {
  await requireSession();
  await adminDb.collection("certificates").doc(id).delete();
  revalidatePath("/[locale]", "layout");
  revalidatePath("/admin/certificates");
}
