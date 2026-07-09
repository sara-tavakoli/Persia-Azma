import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
  // firebase-admin is externalized by default, but its transitive auth
  // dependency (jwks-rsa -> jose, ESM-only) isn't, so Turbopack still
  // bundles it and breaks the internal require() chain at runtime on
  // Vercel. Externalize these too so Node's native resolution handles it.
  serverExternalPackages: ["firebase-admin", "jwks-rsa", "jose"],
};

export default withNextIntl(nextConfig);
