import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { adminDb, getAdminStorage } from "@/lib/firebase-admin";
import {
  quoteRequestSchema,
  ALLOWED_ATTACHMENT_TYPES,
  MAX_ATTACHMENT_SIZE,
  MAX_ATTACHMENTS,
} from "@/lib/schemas";
import type { QuoteRequestDoc, StoredFile } from "@/lib/types";

export async function POST(request: Request) {
  const formData = await request.formData();

  const parsed = quoteRequestSchema.safeParse({
    name: formData.get("name"),
    company: formData.get("company") ?? "",
    email: formData.get("email"),
    phone: formData.get("phone"),
    serviceInterest: formData.get("serviceInterest") ?? "",
    message: formData.get("message"),
    locale: formData.get("locale"),
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid_input", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const files = formData
    .getAll("attachments")
    .filter((f): f is File => f instanceof File && f.size > 0)
    .slice(0, MAX_ATTACHMENTS);

  for (const file of files) {
    if (!ALLOWED_ATTACHMENT_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "invalid_file_type", fileName: file.name },
        { status: 400 }
      );
    }
    if (file.size > MAX_ATTACHMENT_SIZE) {
      return NextResponse.json(
        { error: "file_too_large", fileName: file.name },
        { status: 400 }
      );
    }
  }

  const requestId = randomUUID();
  const bucket = (await getAdminStorage()).bucket();

  const attachments: StoredFile[] = await Promise.all(
    files.map(async (file) => {
      const safeName = file.name.replace(/[^\w.\-]/g, "_");
      const storagePath = `quote-requests/${requestId}/${safeName}`;
      const buffer = Buffer.from(await file.arrayBuffer());
      const storageFile = bucket.file(storagePath);

      await storageFile.save(buffer, {
        contentType: file.type,
        metadata: { contentType: file.type },
      });
      await storageFile.makePublic();

      return {
        storagePath,
        url: `https://storage.googleapis.com/${bucket.name}/${storagePath}`,
        mimeType: file.type,
      };
    })
  );

  const { name, company, email, phone, serviceInterest, message, locale } =
    parsed.data;

  const doc: QuoteRequestDoc = {
    name,
    company: company ?? "",
    email,
    phone,
    serviceInterest: serviceInterest ?? "",
    message,
    attachments,
    locale,
    status: "new",
    createdAt: Date.now(),
  };

  await adminDb.collection("quoteRequests").doc(requestId).set(doc);

  return NextResponse.json({ ok: true });
}
