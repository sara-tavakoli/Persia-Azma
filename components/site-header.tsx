import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navLinks, siteConfig } from "@/lib/site-config";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MobileNav } from "@/components/mobile-nav";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

export function SiteHeader() {
  const t = useTranslations("nav");
  const tMeta = useTranslations("meta");

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-heading font-semibold">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            PA
          </span>
          <span className="hidden text-base sm:inline">{tMeta("siteName")}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks
            .filter((l) => l.key !== "home")
            .map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {t(link.key)}
              </Link>
            ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
            aria-label="WhatsApp"
          >
            <MessageCircle />
          </a>
          <LanguageSwitcher />
          <Link
            href="/contact"
            className={cn(buttonVariants({ variant: "default", size: "sm" }))}
          >
            {t("requestQuote")}
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
