import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { contactSchema } from "@/lib/schemas";
import type { ContactSubmissionDoc } from "@/lib/types";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid_input", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const { name, email, phone, message, locale } = parsed.data;

  const doc: ContactSubmissionDoc = {
    name,
    email,
    phone,
    message,
    locale,
    status: "new",
    createdAt: Date.now(),
  };

  await adminDb.collection("contactSubmissions").add(doc);

  return NextResponse.json({ ok: true });
}
