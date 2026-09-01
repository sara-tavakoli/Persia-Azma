import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navLinks, siteConfig } from "@/lib/site-config";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MobileNav } from "@/components/mobile-nav";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { WhatsappIcon } from "@/components/whatsapp-icon";

export function SiteHeader() {
  const t = useTranslations("nav");
  const tMeta = useTranslations("meta");

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/brand/logo-main.png"
            alt="Persia Azma System"
            width={300}
            height={300}
            priority
            className="size-9"
          />
          <span className="hidden font-heading text-sm font-semibold sm:inline">
            {tMeta("siteName")}
          </span>
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
            <WhatsappIcon className="size-4" />
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
