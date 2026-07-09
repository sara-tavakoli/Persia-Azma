import "server-only";
import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function getAdminApp(): App {
  const existing = getApps();
  if (existing.length > 0) return existing[0];

  return initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });
}

export const adminApp = getAdminApp();
export const adminDb = getFirestore(adminApp);

// storage pulls in an extra dependency graph, so it's loaded lazily —
// only routes that actually upload files pay for that import. (auth is
// handled separately via lib/auth/session.ts + lib/auth/google-token.ts,
// not the firebase-admin/auth SDK — see the comment at the top of
// lib/auth/session.ts for why.)
let _adminStorage: import("firebase-admin/storage").Storage | undefined;
export async function getAdminStorage() {
  if (!_adminStorage) {
    const { getStorage } = await import("firebase-admin/storage");
    _adminStorage = getStorage(adminApp);
  }
  return _adminStorage;
}
