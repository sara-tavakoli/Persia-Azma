"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireSession } from "@/lib/auth/session";
import { adminDb } from "@/lib/firebase-admin";

const statusSchema = z.enum(["new", "contacted", "quoted", "closed"]);

export async function updateQuoteRequestStatus(id: string, status: string) {
  await requireSession();
  const parsed = statusSchema.parse(status);
  await adminDb.collection("quoteRequests").doc(id).update({ status: parsed });
  revalidatePath("/admin/submissions/quotes");
}
