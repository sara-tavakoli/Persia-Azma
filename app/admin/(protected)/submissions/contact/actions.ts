"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireSession } from "@/lib/auth/session";
import { adminDb } from "@/lib/firebase-admin";

const statusSchema = z.enum(["new", "read", "archived"]);

export async function updateContactSubmissionStatus(id: string, status: string) {
  await requireSession();
  const parsed = statusSchema.parse(status);
  await adminDb.collection("contactSubmissions").doc(id).update({ status: parsed });
  revalidatePath("/admin/submissions/contact");
}
