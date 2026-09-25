import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { navLinks } from "@/lib/site-config";
import { getSiteSettings } from "@/lib/data";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const tMeta = await getTranslations("meta");
  const locale = await getLocale();
  const settings = await getSiteSettings();

  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <Image
              src="/brand/logo-main.png"
              alt="Persia Azma System"
              width={300}
              height={300}
              className="size-9"
            />
            <span className="font-heading text-sm font-semibold">
              {tMeta("siteName")}
            </span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
            {t("description")}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">
            {t("quickLinks")}
          </h3>
          <ul className="mt-4 flex flex-col gap-2.5">
            {navLinks.map((link) => (
              <li key={link.key}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {tNav(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">
            {t("contactInfo")}
          </h3>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              <span>{locale === "fa" ? settings.addressFa : settings.addressEn}</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 size-4 shrink-0" />
              <span className="flex flex-col gap-1.5 py-0.5">
                {settings.phones.map((p) => (
                  <a key={p} href={`tel:${p.replace(/-/g, "")}`} dir="ltr" className="text-start hover:text-foreground">
                    {p}
                  </a>
                ))}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 size-4 shrink-0" />
              <a href={`mailto:${settings.email}`} dir="ltr" className="text-start hover:text-foreground">
                {settings.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="mt-0.5 size-4 shrink-0" />
              <span>{t("hoursValue")}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} {tMeta("siteName")} · {t("rights")}
      </div>
    </footer>
  );
}
