import "server-only";
import { SignJWT, importPKCS8 } from "jose";

// Self-signs a JWT-bearer assertion with the service account's private key
// and exchanges it for a Google OAuth2 access token. This replaces
// firebase-admin's internal credential flow, which we can't use here — see
// lib/auth/session.ts for why.
export async function getGoogleAccessToken(scope: string): Promise<string> {
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL!;
  const privateKeyPem = process.env.FIREBASE_ADMIN_PRIVATE_KEY!.replace(
    /\\n/g,
    "\n"
  );

  const privateKey = await importPKCS8(privateKeyPem, "RS256");
  const now = Math.floor(Date.now() / 1000);

  const assertion = await new SignJWT({ scope })
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
    .setIssuer(clientEmail)
    .setSubject(clientEmail)
    .setAudience("https://oauth2.googleapis.com/token")
    .setIssuedAt(now)
    .setExpirationTime(now + 3600)
    .sign(privateKey);

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  if (!res.ok) {
    throw new Error(`Failed to obtain Google access token: ${res.status}`);
  }

  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}
