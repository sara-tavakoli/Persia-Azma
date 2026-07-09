"use server";

import { revalidatePath } from "next/cache";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { requireSession } from "@/lib/auth/session";
import { adminDb, getAdminStorage } from "@/lib/firebase-admin";
import type { ClientLogoDoc } from "@/lib/types";

const logoFormSchema = z.object({
  name: z.string().trim().min(1),
  category: z.enum(["hospital", "industrial", "government"]),
  order: z.coerce.number().int().min(0),
});

export async function saveClientLogo(formData: FormData) {
  await requireSession();

  const parsed = logoFormSchema.parse({
    name: formData.get("name"),
    category: formData.get("category"),
    order: formData.get("order"),
  });

  const file = formData.get("logo");
  if (!(file instanceof File) || file.size === 0) {
    throw new Error("logo_file_required");
  }

  const id = randomUUID();
  const bucket = getAdminStorage().bucket();
  const safeName = file.name.replace(/[^\w.\-]/g, "_");
  const storagePath = `logos/${id}/${safeName}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const storageFile = bucket.file(storagePath);

  await storageFile.save(buffer, {
    contentType: file.type,
    metadata: { contentType: file.type },
  });
  await storageFile.makePublic();

  const doc: ClientLogoDoc = {
    name: parsed.name,
    logo: {
      storagePath,
      url: `https://storage.googleapis.com/${bucket.name}/${storagePath}`,
      mimeType: file.type,
    },
    category: parsed.category,
    order: parsed.order,
    isPublished: true,
    createdAt: Date.now(),
  };

  await adminDb.collection("clientLogos").doc(id).set(doc);

  revalidatePath("/[locale]", "layout");
  revalidatePath("/admin/logos");
}

export async function deleteClientLogo(id: string) {
  await requireSession();
  await adminDb.collection("clientLogos").doc(id).delete();
  revalidatePath("/[locale]", "layout");
  revalidatePath("/admin/logos");
}
