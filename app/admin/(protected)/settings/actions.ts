"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireSession } from "@/lib/auth/session";
import { adminDb } from "@/lib/firebase-admin";
import type { SiteSettingsDoc } from "@/lib/types";

const settingsFormSchema = z.object({
  phone1: z.string().trim().min(1),
  phone2: z.string().trim().min(1),
  mobile: z
    .string()
    .trim()
    .regex(/^09\d{9}$/, "شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود"),
  email: z.string().trim().email(),
  addressFa: z.string().trim().min(1),
  addressEn: z.string().trim().min(1),
});

export async function updateSiteSettings(formData: FormData) {
  await requireSession();

  const parsed = settingsFormSchema.parse({
    phone1: formData.get("phone1"),
    phone2: formData.get("phone2"),
    mobile: formData.get("mobile"),
    email: formData.get("email"),
    addressFa: formData.get("addressFa"),
    addressEn: formData.get("addressEn"),
  });

  // WhatsApp/Bale need the international format (leading "98", no "+").
  const internationalMobile = "98" + parsed.mobile.slice(1);

  const doc: SiteSettingsDoc = {
    phones: [parsed.phone1, parsed.phone2, parsed.mobile],
    whatsappNumber: internationalMobile,
    baleNumber: internationalMobile,
    email: parsed.email,
    addressFa: parsed.addressFa,
    addressEn: parsed.addressEn,
    updatedAt: Date.now(),
  };

  await adminDb.collection("settings").doc("contact").set(doc);

  revalidatePath("/[locale]", "layout");
  revalidatePath("/admin/settings");
}
