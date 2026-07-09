"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Wrench,
  Newspaper,
  BadgeCheck,
  Building2,
  Inbox,
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "داشبورد", icon: LayoutDashboard },
  { href: "/admin/services", label: "خدمات", icon: Wrench },
  { href: "/admin/blog", label: "مقالات", icon: Newspaper },
  { href: "/admin/certificates", label: "گواهینامه‌ها", icon: BadgeCheck },
  { href: "/admin/logos", label: "لوگوی مشتریان", icon: Building2 },
  { href: "/admin/submissions/contact", label: "پیام‌های تماس", icon: Inbox },
  { href: "/admin/submissions/quotes", label: "درخواست‌های مشاوره", icon: Inbox },
];

export function AdminSidebar({ email }: { email?: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/session", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex w-64 shrink-0 flex-col border-e border-border bg-background">
      <div className="border-b border-border px-5 py-4">
        <Image
          src="/brand/logo-alt.png"
          alt="Persia Azma System"
          width={548}
          height={195}
          className="h-7 w-auto"
        />
        {email && (
          <p className="mt-2 truncate text-xs text-muted-foreground" dir="ltr">
            {email}
          </p>
        )}
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        <Button variant="ghost" className="w-full justify-start gap-2.5" onClick={logout}>
          <LogOut className="size-4" />
          خروج
        </Button>
      </div>
    </aside>
  );
}
