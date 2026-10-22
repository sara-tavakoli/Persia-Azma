"use server";

import { revalidatePath } from "next/cache";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { requireSession } from "@/lib/auth/session";
import { adminDb, getAdminStorage } from "@/lib/firebase-admin";
import { adminGetProduct } from "@/lib/admin-data";
import type { ProductDoc, StoredFile } from "@/lib/types";

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

// Admins may type the price with Persian/Arabic digits and separators.
function normalizeDigits(value: string) {
  return value
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[,،٬\s]/g, "");
}

const productFormSchema = z.object({
  id: z.string().optional(),
  slugFa: z.string().trim().min(1),
  slugEn: z.string().trim().min(1),
  titleFa: z.string().trim().min(1),
  titleEn: z.string().trim().min(1),
  shortDescriptionFa: z.string().trim().min(1),
  shortDescriptionEn: z.string().trim().min(1),
  bodyFa: z.string().trim(),
  bodyEn: z.string().trim(),
  category: z.enum(["calibrator", "equipment", "accessory"]),
  brand: z.string().trim(),
  model: z.string().trim(),
  condition: z.enum(["new", "used"]),
  // Empty input means "call for price".
  price: z
    .string()
    .trim()
    .transform((v) => (v === "" ? null : Number(normalizeDigits(v))))
    .pipe(z.number().int().min(0).nullable()),
  inStock: z.coerce.boolean(),
  order: z.coerce.number().int().min(0),
  isPublished: z.coerce.boolean(),
});

export async function saveProduct(formData: FormData) {
  await requireSession();

  const parsed = productFormSchema.parse({
    id: formData.get("id") || undefined,
    slugFa: formData.get("slugFa"),
    slugEn: formData.get("slugEn"),
    titleFa: formData.get("titleFa"),
    titleEn: formData.get("titleEn"),
    shortDescriptionFa: formData.get("shortDescriptionFa"),
    shortDescriptionEn: formData.get("shortDescriptionEn"),
    bodyFa: formData.get("bodyFa") ?? "",
    bodyEn: formData.get("bodyEn") ?? "",
    category: formData.get("category"),
    brand: formData.get("brand") ?? "",
    model: formData.get("model") ?? "",
    condition: formData.get("condition"),
    price: formData.get("price") ?? "",
    inStock: formData.get("inStock") === "on",
    order: formData.get("order"),
    isPublished: formData.get("isPublished") === "on",
  });

  const now = Date.now();
  const id = parsed.id || randomUUID();
  const existing = parsed.id ? await adminGetProduct(parsed.id) : null;

  // Existing images the admin kept, in their original order; the rest
  // are removed from storage below.
  const keepPaths = new Set(formData.getAll("keepImages").map(String));
  const keptImages = (existing?.images ?? []).filter((img) =>
    keepPaths.has(img.storagePath)
  );
  const removedImages = (existing?.images ?? []).filter(
    (img) => !keepPaths.has(img.storagePath)
  );

  const bucket = (await getAdminStorage()).bucket();
  const uploaded: StoredFile[] = [];
  for (const file of formData.getAll("images")) {
    if (!(file instanceof File) || file.size === 0) continue;
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      throw new Error("invalid_image_type");
    }
    const safeName = file.name.replace(/[^\w.\-]/g, "_");
    const storagePath = `products/${id}/${randomUUID()}-${safeName}`;
    const storageFile = bucket.file(storagePath);
    await storageFile.save(Buffer.from(await file.arrayBuffer()), {
      contentType: file.type,
      metadata: { contentType: file.type },
    });
    await storageFile.makePublic();
    uploaded.push({
      storagePath,
      url: `https://storage.googleapis.com/${bucket.name}/${storagePath}`,
      mimeType: file.type,
    });
  }

  const doc: ProductDoc = {
    slug: { fa: parsed.slugFa, en: parsed.slugEn },
    title: { fa: parsed.titleFa, en: parsed.titleEn },
    shortDescription: { fa: parsed.shortDescriptionFa, en: parsed.shortDescriptionEn },
    body: { fa: parsed.bodyFa, en: parsed.bodyEn },
    category: parsed.category,
    brand: parsed.brand,
    model: parsed.model,
    condition: parsed.condition,
    price: parsed.price,
    inStock: parsed.inStock,
    images: [...keptImages, ...uploaded],
    order: parsed.order,
    isPublished: parsed.isPublished,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };

  await adminDb.collection("products").doc(id).set(doc);

  // Best-effort: a missing file shouldn't fail an otherwise good save.
  await Promise.all(
    removedImages.map((img) =>
      bucket.file(img.storagePath).delete({ ignoreNotFound: true }).catch(() => {})
    )
  );

  revalidatePath("/[locale]", "layout");
  revalidatePath("/admin/products");
}

export async function deleteProduct(id: string) {
  await requireSession();
  const existing = await adminGetProduct(id);
  await adminDb.collection("products").doc(id).delete();
  if (existing?.images.length) {
    const bucket = (await getAdminStorage()).bucket();
    await Promise.all(
      existing.images.map((img) =>
        bucket.file(img.storagePath).delete({ ignoreNotFound: true }).catch(() => {})
      )
    );
  }
  revalidatePath("/[locale]", "layout");
  revalidatePath("/admin/products");
}
