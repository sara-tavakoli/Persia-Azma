import "server-only";
import { cookies } from "next/headers";
import { jwtVerify, createRemoteJWKSet } from "jose";
import { getGoogleAccessToken } from "@/lib/auth/google-token";

// We deliberately avoid firebase-admin/auth here: its jwks-rsa dependency
// requires the ESM-only `jose` package via require(), which breaks under
// Next.js 16/Turbopack's externalized-module loader on Vercel (works
// locally, throws ERR_REQUIRE_ESM in production — a framework bundling
// bug, not something fixable via serverExternalPackages). Firebase ID
// tokens and session cookies are just JWTs signed by Google, so we verify
// them directly with `jose` against Google's public keys, and create
// session cookies via a direct REST call authenticated with a
// self-signed OAuth2 assertion (lib/auth/google-token.ts).

export const SESSION_COOKIE_NAME = "__session";
const SESSION_MAX_AGE_MS = 5 * 24 * 60 * 60 * 1000; // 5 days

const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID!;

// ID tokens and session cookies are both signed by the same Google service
// account key (securetoken@system.gserviceaccount.com), just with a
// different `iss` claim — one JWKS set covers both.
const secureTokenJwks = createRemoteJWKSet(
  new URL(
    "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com"
  )
);

type DecodedToken = {
  uid: string;
  email?: string;
  admin?: boolean;
};

async function verifyGoogleJwt(
  token: string,
  jwks: ReturnType<typeof createRemoteJWKSet>,
  issuer: string
): Promise<DecodedToken> {
  const { payload } = await jwtVerify(token, jwks, {
    issuer,
    audience: projectId,
  });
  return {
    uid: payload.sub!,
    email: typeof payload.email === "string" ? payload.email : undefined,
    admin: payload.admin === true,
  };
}

export async function verifyIdTokenAndGetClaims(
  idToken: string
): Promise<DecodedToken> {
  return verifyGoogleJwt(
    idToken,
    secureTokenJwks,
    `https://securetoken.google.com/${projectId}`
  );
}

export async function createSessionCookie(idToken: string) {
  const decoded = await verifyIdTokenAndGetClaims(idToken);
  if (decoded.admin !== true) {
    throw new Error("not_admin");
  }

  const accessToken = await getGoogleAccessToken(
    "https://www.googleapis.com/auth/identitytoolkit"
  );
  const validDuration = SESSION_MAX_AGE_MS / 1000;

  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/projects/${projectId}:createSessionCookie`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken, validDuration: String(validDuration) }),
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to create session cookie: ${res.status}`);
  }

  const data = (await res.json()) as { sessionCookie: string };
  return { sessionCookie: data.sessionCookie, maxAge: validDuration };
}

export type AdminSession = { uid: string; email: string | undefined };

export async function verifySession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionCookie) return null;

  try {
    const decoded = await verifyGoogleJwt(
      sessionCookie,
      secureTokenJwks,
      `https://session.firebase.google.com/${projectId}`
    );
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
