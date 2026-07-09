import "server-only";
import { cookies } from "next/headers";
import { getAdminAuth } from "@/lib/firebase-admin";

export const SESSION_COOKIE_NAME = "__session";
const SESSION_MAX_AGE_MS = 5 * 24 * 60 * 60 * 1000; // 5 days

export async function createSessionCookie(idToken: string) {
  const auth = await getAdminAuth();
  const decoded = await auth.verifyIdToken(idToken);
  if (decoded.admin !== true) {
    throw new Error("not_admin");
  }
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: SESSION_MAX_AGE_MS,
  });
  return { sessionCookie, maxAge: SESSION_MAX_AGE_MS / 1000 };
}

export type AdminSession = { uid: string; email: string | undefined };

export async function verifySession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionCookie) return null;

  try {
    const auth = await getAdminAuth();
    const decoded = await auth.verifySessionCookie(sessionCookie, true);
    if (decoded.admin !== true) return null;
    return { uid: decoded.uid, email: decoded.email };
  } catch {
    return null;
  }
}

export async function requireSession(): Promise<AdminSession> {
  const session = await verifySession();
  if (!session) {
    throw new Error("unauthenticated");
  }
  return session;
}
