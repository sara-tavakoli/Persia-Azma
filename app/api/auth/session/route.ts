import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSessionCookie, SESSION_COOKIE_NAME } from "@/lib/auth/session";

export async function POST(request: Request) {
  const { idToken } = await request.json().catch(() => ({ idToken: null }));
  if (typeof idToken !== "string") {
    return NextResponse.json({ error: "missing_id_token" }, { status: 400 });
  }

  try {
    const { sessionCookie, maxAge } = await createSessionCookie(idToken);
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to create admin session:", err);
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  return NextResponse.json({ ok: true });
}
