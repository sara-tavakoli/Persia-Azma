"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navLinks, siteConfig } from "@/lib/site-config";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, MessageCircle } from "lucide-react";

export function MobileNav() {
  const t = useTranslations("nav");
  const tMeta = useTranslations("meta");
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" aria-label="Menu">
            <Menu />
          </Button>
        }
      />
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>{tMeta("siteName")}</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-muted"
            >
              {t(link.key)}
            </Link>
          ))}
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-muted"
          >
            <MessageCircle className="size-4" />
            WhatsApp
          </a>
        </nav>
        <div className="mt-auto px-4 pb-4">
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className={cn(buttonVariants({ variant: "default" }), "w-full")}
          >
            {t("requestQuote")}
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
