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

// auth/storage pull in extra dependency graphs (auth -> jwks-rsa -> jose,
// which fails to bundle for serverless functions evaluated at request
// time — see incident where importing `firebase-admin/auth` eagerly broke
// every dynamic route, even ones that never touch auth). Load lazily so
// only routes that actually call these functions pay for/risk that import.
let _adminAuth: import("firebase-admin/auth").Auth | undefined;
export async function getAdminAuth() {
  if (!_adminAuth) {
    const { getAuth } = await import("firebase-admin/auth");
    _adminAuth = getAuth(adminApp);
  }
  return _adminAuth;
}

let _adminStorage: import("firebase-admin/storage").Storage | undefined;
export async function getAdminStorage() {
  if (!_adminStorage) {
    const { getStorage } = await import("firebase-admin/storage");
    _adminStorage = getStorage(adminApp);
  }
  return _adminStorage;
}
