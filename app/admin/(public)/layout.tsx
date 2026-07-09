import type { Metadata } from "next";
import { vazirmatn } from "../../fonts";
import { Toaster } from "@/components/ui/sonner";
import "../../globals.css";

export const metadata: Metadata = {
  title: "ورود به پنل مدیریت | پرشیا آزما سیستم",
  robots: { index: false, follow: false },
};

export default function AdminPublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={`${vazirmatn.variable} h-full antialiased`}>
      <body className="flex min-h-full items-center justify-center bg-muted/40 font-vazirmatn">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
