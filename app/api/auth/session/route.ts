import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSessionCookie, SESSION_COOKIE_NAME } from "@/lib/auth/session";

// Signs in with Google directly from this server route rather than the
// browser (which used to call identitytoolkit.googleapis.com via the
// Firebase client SDK). Google blocks/throttles direct API access from
// Iranian IPs under US sanctions, which broke login for admins accessing
// the site from inside Iran (surfaced as a misleading "wrong password"
// error). Vercel's servers aren't subject to that block.
const WEB_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

export async function POST(request: Request) {
  const { email, password } = await request
    .json()
    .catch(() => ({ email: null, password: null }));
  if (typeof email !== "string" || typeof password !== "string") {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const signInRes = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${WEB_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    }
  );

  if (!signInRes.ok) {
    return NextResponse.json({ error: "invalid_credentials" }, { status: 401 });
  }

  const { idToken } = (await signInRes.json()) as { idToken: string };

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
