import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { adminDashboardCounts } from "@/lib/admin-data";
import { Wrench, BadgeCheck, Newspaper, Inbox } from "lucide-react";

export default async function AdminDashboardPage() {
  const counts = await adminDashboardCounts();

  const tiles = [
    { label: "خدمات", value: counts.services, href: "/admin/services", icon: Wrench },
    { label: "گواهینامه‌ها", value: counts.certificates, href: "/admin/certificates", icon: BadgeCheck },
    { label: "مقالات", value: counts.blogPosts, href: "/admin/blog", icon: Newspaper },
    {
      label: "پیام‌های تماس جدید",
      value: counts.newContactSubmissions,
      href: "/admin/submissions/contact",
      icon: Inbox,
      highlight: counts.newContactSubmissions > 0,
    },
    {
      label: "درخواست‌های مشاوره جدید",
      value: counts.newQuoteRequests,
      href: "/admin/submissions/quotes",
      icon: Inbox,
      highlight: counts.newQuoteRequests > 0,
    },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">داشبورد</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        خلاصه‌ای از محتوا و درخواست‌های سایت
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((tile) => (
          <Link key={tile.href} href={tile.href}>
            <Card className="transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div
                    className={
                      tile.highlight
                        ? "flex size-10 items-center justify-center rounded-lg bg-destructive/10 text-destructive"
                        : "flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary"
                    }
                  >
                    <tile.icon className="size-5" />
                  </div>
                  <span className="font-heading text-2xl font-bold">{tile.value}</span>
                </div>
                <CardTitle className="mt-2 text-base">{tile.label}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
