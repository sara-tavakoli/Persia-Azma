import "server-only";
import { cookies } from "next/headers";
import {
  jwtVerify,
  createRemoteJWKSet,
  importX509,
  decodeProtectedHeader,
  type JWTPayload,
} from "jose";
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

// ID tokens are signed by Google's shared secure-token key set (standard JWKS).
const idTokenJwks = createRemoteJWKSet(
  new URL(
    "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com"
  )
);

// Session cookies minted via Identity Toolkit's createSessionCookie are
// signed with a *different*, legacy key set that's only published as X.509
// certs (kid -> PEM cert), not a standard JWKS.
const SESSION_CERTS_URL =
  "https://www.googleapis.com/identitytoolkit/v3/relyingparty/publicKeys";
let sessionCertsCache: { certs: Record<string, string>; expiresAt: number } | null =
  null;

async function refreshSessionCerts() {
  const res = await fetch(SESSION_CERTS_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch session cookie certs: ${res.status}`);
  }
  const certs = (await res.json()) as Record<string, string>;
  sessionCertsCache = { certs, expiresAt: Date.now() + 60 * 60 * 1000 };
}

async function getSessionCert(kid: string): Promise<string> {
  if (!sessionCertsCache || sessionCertsCache.expiresAt < Date.now()) {
    await refreshSessionCerts();
  }
  let cert = sessionCertsCache!.certs[kid];
  if (!cert) {
    await refreshSessionCerts();
    cert = sessionCertsCache!.certs[kid];
  }
  if (!cert) throw new Error("unknown_session_cert_kid");
  return cert;
}

type DecodedToken = {
  uid: string;
  email?: string;
  admin?: boolean;
};

function toDecodedToken(payload: JWTPayload): DecodedToken {
  return {
    uid: payload.sub!,
    email: typeof payload.email === "string" ? payload.email : undefined,
    admin: payload.admin === true,
  };
}

export async function verifyIdTokenAndGetClaims(
  idToken: string
): Promise<DecodedToken> {
  const { payload } = await jwtVerify(idToken, idTokenJwks, {
    issuer: `https://securetoken.google.com/${projectId}`,
    audience: projectId,
  });
  return toDecodedToken(payload);
}

async function verifySessionCookieJwt(
  sessionCookie: string
): Promise<DecodedToken> {
  const { kid } = decodeProtectedHeader(sessionCookie);
  if (!kid) throw new Error("missing_kid");
  const cert = await getSessionCert(kid);
  const key = await importX509(cert, "RS256");
  const { payload } = await jwtVerify(sessionCookie, key, {
    issuer: `https://session.firebase.google.com/${projectId}`,
    audience: projectId,
  });
  return toDecodedToken(payload);
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
    const decoded = await verifySessionCookieJwt(sessionCookie);
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
