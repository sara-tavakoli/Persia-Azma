// Creates (or updates) a pre-provisioned admin user with the `admin: true`
// custom claim required by lib/auth/session.ts.
// Run with: node --env-file=.env.local scripts/create-admin.mjs <email> <password>
import { cert, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const [, , email, password] = process.argv;
if (!email || !password) {
  console.error("Usage: node --env-file=.env.local scripts/create-admin.mjs <email> <password>");
  process.exit(1);
}

const app = initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
});
const auth = getAuth(app);

async function run() {
  let user;
  try {
    user = await auth.getUserByEmail(email);
    await auth.updateUser(user.uid, { password });
    console.log(`Updated existing user ${email} (${user.uid})`);
  } catch {
    user = await auth.createUser({ email, password, emailVerified: true });
    console.log(`Created new user ${email} (${user.uid})`);
  }

  await auth.setCustomUserClaims(user.uid, { admin: true });
  console.log("Set admin:true custom claim.");
}

run()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
