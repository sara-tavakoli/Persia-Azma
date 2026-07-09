import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/auth/session";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { Toaster } from "@/components/ui/sonner";
import { vazirmatn } from "../../fonts";
import "../../globals.css";

export const metadata: Metadata = {
  title: "پنل مدیریت | پرشیا آزما سیستم",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifySession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <html lang="fa" dir="rtl" className={`${vazirmatn.variable} h-full antialiased`}>
      <body className="flex min-h-full font-vazirmatn">
        <AdminSidebar email={session.email} />
        <main className="flex-1 overflow-x-hidden bg-muted/30 p-6 sm:p-8">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
